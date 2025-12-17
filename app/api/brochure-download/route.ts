import { NextRequest, NextResponse } from 'next/server';
import { sendFormSubmissionEmail } from '@/lib/email-service';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary from environment variable
if (process.env.CLOUDINARY_URL) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_URL.match(/@(.+)$/)?.[1] || '',
    api_key: process.env.CLOUDINARY_URL.match(/cloudinary:\/\/([^:]+):/)?.[1] || '',
    api_secret: process.env.CLOUDINARY_URL.match(/:([^@]+)@/)?.[1] || '',
  });
}

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

    // Handle Cloudinary brochure download URL
    // Property-specific brochure public_ids (update these with actual Cloudinary public_ids)
    const brochurePublicIds: Record<string, string> = {
      'FOREST WALK VILLA': 'forest-walk-villa-brochure', // Update with actual public_id from Cloudinary
      // Add more properties as needed:
      // 'PROPERTY NAME': 'property-brochure-public-id',
    };

    let downloadUrl = '';
    
    // If a direct URL is provided, use it
    if (brochureUrl && brochureUrl.startsWith('http')) {
      downloadUrl = brochureUrl;
    } 
    // If using Cloudinary connection string or environment variable
    else if (process.env.CLOUDINARY_URL || brochureUrl) {
      const publicId = brochurePublicIds[propertyName] || 'forest-walk-villa-brochure';
      
      try {
        // Generate secure download URL using Cloudinary SDK
        // Format: https://res.cloudinary.com/[cloud_name]/raw/upload/[public_id].pdf
        const cloudName = process.env.CLOUDINARY_URL?.match(/@(.+)$/)?.[1] || 
                         brochureUrl?.match(/@(.+)$/)?.[1] || 
                         'da57wy2df';
        
        // Construct the download URL
        downloadUrl = `https://res.cloudinary.com/${cloudName}/raw/upload/${publicId}.pdf`;
        
        // Optional: Use Cloudinary SDK to generate signed URL (more secure)
        // Uncomment if you want signed URLs with expiration:
        // downloadUrl = cloudinary.utils.private_download_url(publicId, {
        //   resource_type: 'raw',
        //   format: 'pdf',
        //   expires_at: Math.floor(Date.now() / 1000) + 3600 // 1 hour expiry
        // });
      } catch (error) {
        console.error('Error generating Cloudinary URL:', error);
        // Fallback to basic URL construction
        const cloudName = process.env.CLOUDINARY_URL?.match(/@(.+)$/)?.[1] || 'da57wy2df';
        downloadUrl = `https://res.cloudinary.com/${cloudName}/raw/upload/forest-walk-villa-brochure.pdf`;
      }
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

