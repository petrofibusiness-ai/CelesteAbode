import { NextRequest, NextResponse } from 'next/server';
import { sendFormSubmissionEmail } from '@/lib/email-service';
import { sanitizeInput, isValidPhone, isValidName, getClientIP, checkRateLimit } from '@/lib/security';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(`location-contact:${clientIP}`, 10, 60000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment before trying again.' },
        { status: 429 }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }
    
    // Extract and validate fields
    const { name, phone, message, location, locationDisplayName } = body;
    
    if (!name || !phone || !message || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Sanitize and validate inputs
    const sanitizedName = sanitizeInput(String(name));
    const sanitizedPhone = sanitizeInput(String(phone));
    const sanitizedMessage = sanitizeInput(String(message));
    const sanitizedLocation = sanitizeInput(String(location));
    const sanitizedLocationDisplay = locationDisplayName 
      ? sanitizeInput(String(locationDisplayName))
      : sanitizedLocation;

    // Split name into firstName and lastName
    const nameParts = sanitizedName.trim().split(" ");
    const firstName = nameParts[0] || sanitizedName;
    const lastName = nameParts.slice(1).join(" ") || "N/A";

    if (!isValidName(firstName) || !isValidName(lastName)) {
      return NextResponse.json(
        { error: 'Invalid name format' },
        { status: 400 }
      );
    }

    if (!isValidPhone(sanitizedPhone)) {
      return NextResponse.json(
        { error: 'Invalid phone format' },
        { status: 400 }
      );
    }

    if (sanitizedMessage.length < 10 || sanitizedMessage.length > 5000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 5000 characters' },
        { status: 400 }
      );
    }

    // Create full message with location context
    const fullMessage = `Location: ${sanitizedLocationDisplay}\n\n${sanitizedMessage}`;

    // Send email
    const emailResult = await sendFormSubmissionEmail({
      formType: 'contact',
      firstName: firstName,
      lastName: lastName,
      email: `location-form-${sanitizedLocation}@celesteabode.com`, // Placeholder email
      phone: sanitizedPhone,
      message: fullMessage
    });

    if (!emailResult.success) {
      console.error('Failed to send email:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully',
        messageId: emailResult.messageId 
      },
      { status: 200 }
    );

  } catch (error) {
    // Enhanced error logging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error('Location contact form submission error:', {
      message: errorMessage,
      stack: errorStack,
      timestamp: new Date().toISOString(),
      clientIP: getClientIP(request),
    });

    return NextResponse.json(
      { 
        error: process.env.NODE_ENV === 'production' 
          ? 'Internal server error. Please try again later.' 
          : errorMessage 
      },
      { status: 500 }
    );
  }
}

