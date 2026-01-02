import { NextRequest, NextResponse } from 'next/server';
import { sendFormSubmissionEmail } from '@/lib/email-service';
import { sanitizeInput, isValidEmail, getClientIP } from '@/lib/security';
import { storeLead, updateLeadEmailStatus } from '@/lib/lead-service';

// Comprehensive phone validation (same as chatbot)
function isValidPhoneNumber(phone: string): boolean {
  if (!phone || typeof phone !== 'string') {
    return false;
  }

  // Extract only digits
  const digits = phone.trim().replace(/\D/g, '');
  
  // Basic format check - must be 10-12 digits
  // 10 digits: local number (e.g., 9818735258)
  // 11-12 digits: with country code (e.g., +91 9818735258 = 12 digits, +1 5551234567 = 11 digits)
  if (digits.length < 10 || digits.length > 12) {
    return false;
  }
  
  // Check for all zeros (0000000000, etc.)
  if (/^0+$/.test(digits)) {
    return false;
  }
  
  // Check for repeated numbers (1111111111, 2222222222, etc.)
  // Check if all digits are the same
  if (/^(\d)\1{9,}$/.test(digits)) {
    return false;
  }
  
  // Check for sequential numbers (1234567890, 0123456789, etc.)
  const isSequential = (str: string) => {
    for (let i = 0; i < str.length - 1; i++) {
      const current = parseInt(str[i]);
      const next = parseInt(str[i + 1]);
      // Check if next digit is current + 1 (handles wrap-around like 9->0)
      if (next !== (current + 1) % 10) {
        return false;
      }
    }
    return str.length >= 10;
  };
  
  // Check for reverse sequential (9876543210, 987654321, etc.)
  const isReverseSequential = (str: string) => {
    for (let i = 0; i < str.length - 1; i++) {
      const current = parseInt(str[i]);
      const next = parseInt(str[i + 1]);
      // Check if next digit is current - 1 (handles wrap-around like 0->9)
      if (next !== (current - 1 + 10) % 10) {
        return false;
      }
    }
    return str.length >= 10;
  };
  
  if (isSequential(digits) || isReverseSequential(digits)) {
    return false;
  }
  
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, propertyName, propertySlug, brochureUrl } = body;
    
    // Validate required fields
    if (!name || !phone || !email || !propertyName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedPhone = sanitizeInput(String(phone));
    const sanitizedEmail = sanitizeInput(String(email));

    // Validate email format
    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone format (using comprehensive validation)
    if (!isValidPhoneNumber(sanitizedPhone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Split name into first and last name
    const sanitizedName = sanitizeInput(String(name));
    const nameParts = sanitizedName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const clientIP = getClientIP(request);

    // Store lead in database first
    const leadResult = await storeLead({
      firstName: firstName,
      lastName: lastName,
      email: sanitizedEmail.trim().toLowerCase(),
      phone: sanitizedPhone.trim(),
      formType: 'contact',
      formSource: propertyName ? `property-brochure-download:${propertyName}` : 'property-brochure-download',
      propertyName: propertyName,
      propertySlug: propertySlug || undefined,
      formData: {
        brochureUrl: brochureUrl || '',
        action: 'brochure-download',
        propertyName: propertyName,
      },
      clientIP: clientIP,
    });

    // Log if lead storage failed (but continue with email and download)
    if (!leadResult.success) {
      console.error('Failed to store lead in database:', leadResult.error);
    }

    // Send email notification
    const emailResult = await sendFormSubmissionEmail({
      formType: 'contact', // Using contact form type for brochure downloads
      firstName: firstName,
      lastName: lastName,
      email: sanitizedEmail.trim().toLowerCase(),
      phone: sanitizedPhone.trim(),
      message: `Brochure download request for ${propertyName}`,
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
