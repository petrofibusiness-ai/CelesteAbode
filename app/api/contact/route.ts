import { NextRequest, NextResponse } from 'next/server';
import { sendFormSubmissionEmail } from '@/lib/email-service';
import { sanitizeInput, isValidEmail, isValidPhone, isValidName, getClientIP, checkRateLimit } from '@/lib/security';

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

    // Send email with segmented entry data
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
    
    if (!firstName || !lastName || !email || !phone || !message) {
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
    const sanitizedMessage = sanitizeInput(String(message));

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

    if (sanitizedMessage.length < 10 || sanitizedMessage.length > 5000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 5000 characters' },
        { status: 400 }
      );
    }

    // Send email
    const emailResult = await sendFormSubmissionEmail({
      formType: 'contact',
      firstName: sanitizedFirstName,
      lastName: sanitizedLastName,
      email: sanitizedEmail.toLowerCase(),
      phone: sanitizedPhone,
      message: sanitizedMessage
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
