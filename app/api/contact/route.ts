import { NextRequest, NextResponse } from 'next/server';
import { sendFormSubmissionEmail } from '@/lib/email-service';
import { sanitizeInput, isValidEmail, isValidPhone, isValidName, getClientIP, checkRateLimit } from '@/lib/security';
import { storeLead, updateLeadEmailStatus } from '@/lib/lead-service';

async function handleSegmentedEntryForm(body: any, clientIP: string) {
  try {
    // Rate limiting
    const rateLimit = checkRateLimit(`contact:${clientIP}`, 10, 60000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment before trying again.' },
        { status: 429 }
      );
    }

    const { intent, firstName, lastName, email, phone, formData, emailContent } = body;
    
    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !intent) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Sanitize and validate inputs
    const sanitizedFirstName = sanitizeInput(String(firstName));
    const sanitizedLastName = sanitizeInput(String(lastName));
    const sanitizedEmail = sanitizeInput(String(email));
    const sanitizedPhone = sanitizeInput(String(phone));

    if (!isValidName(sanitizedFirstName) || !isValidName(sanitizedLastName)) {
      return NextResponse.json(
        { error: 'Invalid name format' },
        { status: 400 }
      );
    }

    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (!isValidPhone(sanitizedPhone)) {
      return NextResponse.json(
        { error: 'Invalid phone format' },
        { status: 400 }
      );
    }

    // Validate and sanitize intent
    const sanitizedIntent = sanitizeInput(String(intent));
    const validIntents = ['live', 'invest', 'signature'] as const;
    type ValidIntent = typeof validIntents[number];
    
    if (!validIntents.includes(sanitizedIntent as ValidIntent)) {
      return NextResponse.json(
        { error: 'Invalid intent value' },
        { status: 400 }
      );
    }

    // Store lead in database first
    const leadResult = await storeLead({
      firstName: sanitizedFirstName,
      lastName: sanitizedLastName,
      email: sanitizedEmail.toLowerCase(),
      phone: sanitizedPhone,
      formType: 'segmented-entry',
      formSource: 'homepage',
      formData: {
        intent: sanitizedIntent,
        formData: formData,
        emailContent: emailContent,
      },
      clientIP: clientIP,
    });

    // Log if lead storage failed (but continue with email)
    if (!leadResult.success) {
      console.error('Failed to store lead in database:', leadResult.error);
    }

    // Send email (even if DB storage fails, still try to send email)
    const emailResult = await sendFormSubmissionEmail({
      formType: 'segmented-entry',
      intent: sanitizedIntent as ValidIntent,
      firstName: sanitizedFirstName,
      lastName: sanitizedLastName,
      email: sanitizedEmail.toLowerCase(),
      phone: sanitizedPhone,
      message: `New ${sanitizedIntent} inquiry from ${sanitizedFirstName} ${sanitizedLastName}`,
      formData: formData,
      emailContent: emailContent
    });

    // Update lead email status if lead was stored
    if (leadResult.success && leadResult.leadId) {
      await updateLeadEmailStatus(
        leadResult.leadId,
        emailResult.success,
        emailResult.error
      );
    }

    if (!emailResult.success) {
      console.error('Failed to send segmented entry email:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Segmented entry form submitted successfully',
        messageId: emailResult.messageId 
      },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Limit': '10',
          'X-RateLimit-Remaining': String(rateLimit.remaining),
          'X-RateLimit-Reset': String(rateLimit.resetTime),
        }
      }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error('Segmented entry form submission error:', {
      message: errorMessage,
      stack: errorStack,
      timestamp: new Date().toISOString(),
      clientIP,
    });
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(`contact:${clientIP}`, 10, 60000);
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
    
    // Handle different form types
    if (body.formType === 'segmented-entry') {
      return handleSegmentedEntryForm(body, clientIP);
    }
    
    // Original contact form validation
    const { firstName, lastName, email, phone, message } = body;
    
    // Email is optional for contact form (phone is primary contact method)
    if (!firstName || !lastName || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Sanitize and validate inputs
    const sanitizedFirstName = sanitizeInput(String(firstName));
    const sanitizedLastName = sanitizeInput(String(lastName));
    const sanitizedEmail = email ? sanitizeInput(String(email)) : "";
    const sanitizedPhone = sanitizeInput(String(phone));
    const sanitizedMessage = sanitizeInput(String(message));

    if (!isValidName(sanitizedFirstName) || !isValidName(sanitizedLastName)) {
      return NextResponse.json(
        { error: 'Invalid name format' },
        { status: 400 }
      );
    }

    // Validate email only if provided
    if (sanitizedEmail && !isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
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

    // Extract property context if provided
    const propertyName = body.propertyTitle || body.propertyName || undefined;
    const propertyLocation = body.propertyLocation || undefined;
    const propertySlug = body.propertySlug || undefined;

    // Store lead in database first
    const leadResult = await storeLead({
      firstName: sanitizedFirstName,
      lastName: sanitizedLastName,
      email: sanitizedEmail ? sanitizedEmail.toLowerCase() : undefined,
      phone: sanitizedPhone,
      formType: 'contact',
      formSource: body.formSource || 'contact-page', // Allow formSource to be passed
      propertyName,
      propertyLocation,
      propertySlug,
      formData: {
        message: sanitizedMessage,
        ...(propertyName && { propertyTitle: propertyName }),
        ...(propertyLocation && { propertyLocation }),
      },
      clientIP: clientIP,
    });

    // Log if lead storage failed (but continue with email)
    if (!leadResult.success) {
      console.error('Failed to store lead in database:', leadResult.error);
    }

    // Send email (even if DB storage fails, still try to send email)
    // Only send email if email is provided
    let emailResult = { success: true, messageId: null };
    if (sanitizedEmail) {
      emailResult = await sendFormSubmissionEmail({
        formType: 'contact',
        firstName: sanitizedFirstName,
        lastName: sanitizedLastName,
        email: sanitizedEmail.toLowerCase(),
        phone: sanitizedPhone,
        message: sanitizedMessage
      });
    } else {
      // If no email, just log that email was skipped
      console.log('Contact form submitted without email - lead stored in database only');
    }

    // Update lead email status if lead was stored
    if (leadResult.success && leadResult.leadId) {
      await updateLeadEmailStatus(
        leadResult.leadId,
        emailResult.success,
        emailResult.error
      );
    }

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
    
    console.error('Contact form submission error:', {
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
          ? 'Internal server error. Please try again later.' 
          : errorMessage 
      },
      { status: 500 }
    );
  }
}
