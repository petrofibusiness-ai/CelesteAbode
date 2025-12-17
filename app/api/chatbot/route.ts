import { NextRequest, NextResponse } from "next/server";
import { sendFormSubmissionEmail } from "@/lib/email-service";
import { sanitizeInput, isValidEmail, isValidPhone, isValidName, getClientIP, checkRateLimit } from "@/lib/security";

// Simple in-memory rate limiting per IP for chatbot submissions
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5; // max 5 chatbot submissions per minute per IP

type RateEntry = {
  count: number;
  firstRequestAt: number;
};

const ipRateMap = new Map<string, RateEntry>();

function getClientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const parts = xff.split(",");
    if (parts[0]) return parts[0].trim();
  }
  // @ts-expect-error: ip is available in some runtimes
  const directIp = (req.ip as string | undefined) || req.headers.get("x-real-ip");
  return directIp || "unknown";
}

function isRateLimited(req: NextRequest): boolean {
  const now = Date.now();
  const ip = getClientIp(req);
  const existing = ipRateMap.get(ip);

  if (!existing) {
    ipRateMap.set(ip, { count: 1, firstRequestAt: now });
    return false;
  }

  if (now - existing.firstRequestAt > RATE_LIMIT_WINDOW_MS) {
    // window expired, reset
    ipRateMap.set(ip, { count: 1, firstRequestAt: now });
    return false;
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  existing.count += 1;
  ipRateMap.set(ip, existing);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Enhanced rate limiting using security utility
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(`chatbot:${clientIP}`, 5, 60000);
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: "Too many requests. Please wait a moment before trying again.",
          retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateLimit.resetTime - Date.now()) / 1000)),
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(rateLimit.resetTime),
          }
        }
      );
    }

    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const {
      userIntent,
      propertyType,
      preferredLocation,
      budgetRange,
      bhkPreference,
      commercialUse,
      timeline,
      leadScore,
      wantsVirtualTour,
      wantsPriceComparison,
      wantsBestProjects,
      wantsExpertCall,
      userName,
      phoneNumber,
      contactPreference,
      email,
    } = body || {};

    // Validate and sanitize required fields
    if (!userName || !phoneNumber) {
      return NextResponse.json(
        { error: "Missing required contact details" },
        { status: 400 }
      );
    }

    // Sanitize and validate name
    const sanitizedName = sanitizeInput(String(userName));
    if (!isValidName(sanitizedName)) {
      return NextResponse.json(
        { error: "Invalid name format" },
        { status: 400 }
      );
    }

    // Sanitize and validate phone
    const sanitizedPhone = sanitizeInput(String(phoneNumber));
    if (!isValidPhone(sanitizedPhone)) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      );
    }

    // Validate email if provided
    if (email && !isValidEmail(String(email))) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const firstName = sanitizedName.split(" ")[0] || "";
    const lastName = sanitizedName.split(" ").slice(1).join(" ") || "";

    const ts = new Date();
    const timestamp = ts.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    const lines: string[] = [];
    lines.push(`Intent: ${userIntent || "N/A"}`);
    lines.push(`Property Type: ${propertyType || "N/A"}`);
    lines.push(`Location: ${preferredLocation || "N/A"}`);
    lines.push(`Budget: ${budgetRange || "N/A"}`);
    if (bhkPreference) lines.push(`BHK Preference: ${bhkPreference}`);
    if (commercialUse) lines.push(`Commercial Use: ${commercialUse}`);
    lines.push(`Timeline: ${timeline || "N/A"}`);
    if (leadScore) lines.push(`Lead Score: ${leadScore}`);
    lines.push(
      `Requested: Virtual Tour: ${wantsVirtualTour ? "Yes" : "No"}, Shortlisted Options with Guidance: ${
        wantsPriceComparison ? "Yes" : "No"
      }, Best Projects: ${wantsBestProjects ? "Yes" : "No"}, Expert Call: ${
        wantsExpertCall ? "Yes" : "No"
      }`
    );
    lines.push(`Contact Preference: ${contactPreference || "N/A"}`);
    lines.push(`User Email (if shared): ${email || "Not provided"}`);
    lines.push(`Source: Website Chatbot`);
    lines.push(`Date & Time: ${timestamp}`);

    const message = `New chatbot lead received via website chatbot. See structured details below.`;

    const clientEmail = typeof email === "string" ? email.trim() : "";

    const emailResult = await sendFormSubmissionEmail({
      formType: "chatbot",
      firstName,
      lastName,
      email: clientEmail ? sanitizeInput(clientEmail).toLowerCase() : "", // optional for chatbot; server will handle empty
      phone: sanitizedPhone,
      message,
      chatbotUserIntent: userIntent,
      chatbotPropertyType: propertyType,
      chatbotPreferredLocation: preferredLocation,
      chatbotBudgetRange: budgetRange,
      chatbotBhkPreference: bhkPreference,
      chatbotCommercialUse: commercialUse,
      chatbotTimeline: timeline,
      chatbotLeadScore: leadScore,
      chatbotWantsVirtualTour: !!wantsVirtualTour,
      chatbotWantsShortlist: !!wantsPriceComparison,
      chatbotWantsBestProjects: !!wantsBestProjects,
      chatbotWantsExpertCall: !!wantsExpertCall,
      chatbotContactPreference: contactPreference,
      chatbotClientEmail: clientEmail || undefined,
      chatbotSource: "Website Chatbot",
      chatbotTimestamp: timestamp,
    });

    if (!emailResult.success) {
      console.error("Failed to send chatbot email:", emailResult.error);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Chatbot data received",
      },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': String(rateLimit.remaining),
          'X-RateLimit-Reset': String(rateLimit.resetTime),
        }
      }
    );
  } catch (error) {
    // Enhanced error logging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error("Chatbot API error:", {
      message: errorMessage,
      stack: errorStack,
      timestamp: new Date().toISOString(),
      clientIP: getClientIP(request),
    });

    // In production, send to error monitoring service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to error monitoring service (e.g., Sentry, LogRocket)
    }

    return NextResponse.json(
      { 
        error: process.env.NODE_ENV === 'production' 
          ? "Internal server error. Please try again later." 
          : errorMessage 
      },
      { status: 500 }
    );
  }
}

