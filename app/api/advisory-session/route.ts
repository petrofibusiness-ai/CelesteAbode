import { NextRequest, NextResponse } from 'next/server';
import { sendFormSubmissionEmail } from '@/lib/email-service';
import { storeLead, updateLeadEmailStatus } from '@/lib/lead-service';
import { getClientIP } from '@/lib/security';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, budget, propertyType, timeline, location, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !budget || !propertyType || !timeline) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone format
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone format' },
        { status: 400 }
      );
    }

    // Split name into first and last name
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const clientIP = getClientIP(request);

    // Store lead in database first
    const leadResult = await storeLead({
      firstName: firstName,
      lastName: lastName,
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      formType: 'advisory-session',
      formSource: 'advisory-session-page',
      formData: {
        budget,
        propertyType,
        timeline,
        location: location?.trim() || '',
        message: message?.trim() || '',
      },
      clientIP,
    });

    // Log if lead storage failed (but continue with email)
    if (!leadResult.success) {
      console.error('Failed to store lead in database:', leadResult.error);
    }

    // Send email (even if DB storage fails, still try to send email)
    const emailResult = await sendFormSubmissionEmail({
      formType: 'advisory-session',
      firstName: firstName,
      lastName: lastName,
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      budget: budget,
      propertyType: propertyType,
      timeline: timeline,
      location: location?.trim() || '',
      message: message?.trim() || ''
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
      console.error('Failed to send advisory session email:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Advisory session request submitted successfully',
        messageId: emailResult.messageId 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Advisory session form submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
