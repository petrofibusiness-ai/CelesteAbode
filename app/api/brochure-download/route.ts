import { NextRequest, NextResponse } from 'next/server';
import { sendFormSubmissionEmail } from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, propertyName, brochureUrl } = body;
    
    // Validate required fields
    if (!name || !phone || !email || !propertyName) {
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

    // Send email notification
    const emailResult = await sendFormSubmissionEmail({
      formType: 'contact', // Using contact form type for brochure downloads
      firstName: firstName,
      lastName: lastName,
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      message: `Brochure download request for ${propertyName}`,
    });

    if (!emailResult.success) {
      console.error('Failed to send brochure download email:', emailResult.error);
      // Still allow download even if email fails
    }

    // Use the R2 public URL directly (already provided in brochureUrl)
    // The brochureUrl should be the public R2 URL from Cloudflare R2
    let downloadUrl = '';
    
    if (brochureUrl && brochureUrl.startsWith('http')) {
      // Use the provided R2 public URL directly
      downloadUrl = brochureUrl;
    } else {
      // If no URL provided, return error
      return NextResponse.json(
        { error: 'Brochure URL not available' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Brochure download request processed successfully',
        downloadUrl: downloadUrl,
        messageId: emailResult.messageId 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Brochure download error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

