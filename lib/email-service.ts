import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import type { FormSubmissionData } from './email-client';

// Server-side email service (DO NOT import in client components)
// Use email-client.ts for client-side functions

export interface EmailSubmissionParams {
  formType: 'contact' | 'segmented-entry' | 'viewing' | 'advisory-session' | 'consultation' | 'chatbot';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message?: string;
  // Segmented entry specific
  intent?: "live" | "invest" | "signature";
  formData?: FormSubmissionData;
  emailContent?: string;
  // Viewing specific
  preferredDate?: string;
  preferredTime?: string;
  propertyTitle?: string;
  propertyLocation?: string;
  // Advisory/Consultation specific
  budget?: string;
  propertyType?: string;
  timeline?: string;
  location?: string;
  // Chatbot-specific metadata (all optional)
  chatbotUserIntent?: string;
  chatbotPropertyType?: string;
  chatbotPreferredLocation?: string;
  chatbotBudgetRange?: string;
  chatbotBhkPreference?: string;
  chatbotCommercialUse?: string;
  chatbotTimeline?: string;
  chatbotLeadScore?: string;
  chatbotWantsVirtualTour?: boolean;
  chatbotWantsShortlist?: boolean;
  chatbotWantsBestProjects?: boolean;
  chatbotWantsExpertCall?: boolean;
  chatbotContactPreference?: string;
  chatbotClientEmail?: string;
  chatbotSource?: string;
  chatbotTimestamp?: string;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Singleton transporter instance with connection pooling
let transporter: Transporter | null = null;

/**
 * Get or create the email transporter with connection pooling
 */
function getTransporter(): Transporter {
  if (!transporter) {
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      throw new Error('Email configuration missing: EMAIL_USER and EMAIL_PASS must be set');
    }

    // Clean the app password (remove any spaces)
    const cleanPassword = emailPass.trim().replace(/\s/g, '');

    // Gmail SMTP configuration with App Password
    // Using explicit host/port for better reliability
    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: emailUser.trim(),
        pass: cleanPassword, // Gmail App Password (cleaned, no spaces)
      },
      pool: true, // Use connection pooling
      maxConnections: 5,
      maxMessages: 100,
      rateDelta: 1000, // Time window for rate limiting (1 second)
      rateLimit: 5, // Max 5 emails per second
      // TLS options
      tls: {
        // Do not fail on invalid certificates
        rejectUnauthorized: false,
      },
    });

    // Verify connection on creation (async, don't wait)
    transporter.verify((error) => {
      if (error) {
        console.error('Email transporter verification failed:', error);
        console.error('Error details:', {
          code: (error as any).code,
          command: (error as any).command,
          response: (error as any).response,
        });
      } else {
        console.log('Email transporter ready (Gmail)');
      }
    });
  }

  return transporter;
}

/**
 * Verify email configuration
 */
export async function verifyEmailConfig(): Promise<{ success: boolean; error?: string }> {
  try {
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!emailUser || !emailPass) {
      return {
        success: false,
        error: 'Missing EMAIL_USER or EMAIL_PASS environment variables',
      };
    }

    if (!adminEmail) {
      return {
        success: false,
        error: 'Missing ADMIN_EMAIL environment variable',
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailUser) || !emailRegex.test(adminEmail)) {
      return {
        success: false,
        error: 'Invalid email format in environment variables',
      };
    }

    // Test connection
    const testTransporter = getTransporter();
    await testTransporter.verify();

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error during email verification',
    };
  }
}

/**
 * Validate email address format
 */
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize input to prevent email injection
 */
function sanitizeInput(input: string): string {
  return input
    .replace(/[\r\n]/g, ' ') // Remove line breaks
    .replace(/[<>]/g, '') // Remove HTML brackets
    .trim()
    .substring(0, 10000); // Limit length
}

/**
 * Send email with retry logic
 */
async function sendEmailWithRetry(
  mailOptions: nodemailer.SendMailOptions,
  retries = 3
): Promise<EmailResult> {
  const transporter = getTransporter();

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const info = await transporter.sendMail(mailOptions);
      return {
        success: true,
        messageId: info.messageId,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorDetails = error instanceof Error ? {
        code: (error as any).code,
        command: (error as any).command,
        response: (error as any).response,
        responseCode: (error as any).responseCode,
      } : {};
      console.error(`Email send attempt ${attempt} failed:`, errorMessage);
      console.error('Error details:', errorDetails);

      if (attempt === retries) {
        return {
          success: false,
          error: `Failed to send email after ${retries} attempts: ${errorMessage}`,
        };
      }

      // Exponential backoff: wait 1s, 2s, 4s
      await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt - 1) * 1000));
    }
  }

  return {
    success: false,
    error: 'Failed to send email',
  };
}

/**
 * Create email template for contact form
 */
function createContactEmailTemplate(params: EmailSubmissionParams): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #CBB27A; padding-bottom: 20px;">
          <h1 style="color: #2B3035; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          <p style="color: #666; margin: 10px 0 0 0;">Celeste Abode</p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
          <h2 style="color: #2B3035; margin: 0 0 15px 0; font-size: 18px;">Contact Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333; width: 30%;">Name:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${sanitizeInput(params.firstName)} ${sanitizeInput(params.lastName)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Email:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;"><a href="mailto:${params.email}">${params.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Phone:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;"><a href="tel:${params.phone}">${params.phone}</a></td>
            </tr>
          </table>
        </div>

        ${params.message ? `
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
          <h2 style="color: #2B3035; margin: 0 0 15px 0; font-size: 18px;">Message</h2>
          <p style="color: #666; margin: 0; line-height: 1.6; white-space: pre-wrap;">${sanitizeInput(params.message)}</p>
        </div>
        ` : ''}

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #666; margin: 0; font-size: 14px;">
            This form was submitted through the Celeste Abode website.<br>
            Please respond to the client within 24 hours.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Create email template for chatbot lead
 */
function createChatbotEmailTemplate(params: EmailSubmissionParams): string {
  const safe = (value?: string) => sanitizeInput(value || 'Not specified');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 20px; background-color: #f4f5f7;">
      <div style="background-color: #ffffff; padding: 28px; border-radius: 10px; box-shadow: 0 4px 16px rgba(0,0,0,0.06); border: 1px solid #eee;">
        <div style="text-align: center; margin-bottom: 26px; border-bottom: 2px solid #CBB27A; padding-bottom: 18px;">
          <h1 style="color: #2B3035; margin: 0; font-size: 24px; letter-spacing: 0.03em;">New Chatbot Lead</h1>
          <p style="color: #777; margin: 10px 0 0 0; font-size: 13px;">Celeste Abode – Website Chatbot</p>
        </div>

        <div style="background-color: #f8f9fb; padding: 18px 20px; border-radius: 8px; margin-bottom: 18px;">
          <h2 style="color: #2B3035; margin: 0 0 12px 0; font-size: 17px;">Contact Information</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 6px 0; color: #555; font-weight: 600; width: 32%;">Name</td>
              <td style="padding: 6px 0; color: #333;">${safe(`${params.firstName} ${params.lastName}`)}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #555; font-weight: 600;">Phone</td>
              <td style="padding: 6px 0; color: #333;"><a href="tel:${params.phone}" style="color:#0b7285; text-decoration:none;">${sanitizeInput(params.phone)}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #555; font-weight: 600;">Email (client)</td>
              <td style="padding: 6px 0; color: #333;">${
                params.chatbotClientEmail
                  ? `<a href="mailto:${params.chatbotClientEmail}" style="color:#0b7285; text-decoration:none;">${sanitizeInput(params.chatbotClientEmail)}</a>`
                  : '<span style="color:#999;">Not provided</span>'
              }</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #f8f9fb; padding: 18px 20px; border-radius: 8px; margin-bottom: 18px;">
          <h2 style="color: #2B3035; margin: 0 0 12px 0; font-size: 17px;">Lead Summary</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 6px 0; color: #555; font-weight: 600; width: 32%;">Intent</td>
              <td style="padding: 6px 0; color: #333;">${safe(params.chatbotUserIntent)}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #555; font-weight: 600;">Property Type</td>
              <td style="padding: 6px 0; color: #333;">${safe(params.chatbotPropertyType)}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #555; font-weight: 600;">Preferred Location</td>
              <td style="padding: 6px 0; color: #333;">${safe(params.chatbotPreferredLocation)}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #555; font-weight: 600;">Budget Range</td>
              <td style="padding: 6px 0; color: #333;">${safe(params.chatbotBudgetRange)}</td>
            </tr>
            ${
              params.chatbotBhkPreference
                ? `<tr>
                    <td style="padding: 6px 0; color: #555; font-weight: 600;">BHK Preference</td>
                    <td style="padding: 6px 0; color: #333;">${safe(params.chatbotBhkPreference)}</td>
                  </tr>`
                : ''
            }
            ${
              params.chatbotCommercialUse
                ? `<tr>
                    <td style="padding: 6px 0; color: #555; font-weight: 600;">Commercial Use</td>
                    <td style="padding: 6px 0; color: #333;">${safe(params.chatbotCommercialUse)}</td>
                  </tr>`
                : ''
            }
            <tr>
              <td style="padding: 6px 0; color: #555; font-weight: 600;">Timeline</td>
              <td style="padding: 6px 0; color: #333;">${safe(params.chatbotTimeline)}</td>
            </tr>
            ${
              params.chatbotLeadScore
                ? `<tr>
                    <td style="padding: 6px 0; color: #555; font-weight: 600;">Lead Score</td>
                    <td style="padding: 6px 0; color: #333;"><span style="padding:2px 8px; border-radius:999px; background-color:#f1f3f5; font-size:12px;">${safe(params.chatbotLeadScore)}</span></td>
                  </tr>`
                : ''
            }
          </table>
        </div>

        <div style="background-color: #f8f9fb; padding: 18px 20px; border-radius: 8px; margin-bottom: 18px;">
          <h2 style="color: #2B3035; margin: 0 0 12px 0; font-size: 17px;">Preferences & Requests</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 6px 0; color: #555; font-weight: 600; width: 40%;">Virtual Tour</td>
              <td style="padding: 6px 0; color: #333;">${params.chatbotWantsVirtualTour ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #555; font-weight: 600;">Shortlisted Options with Guidance</td>
              <td style="padding: 6px 0; color: #333;">${params.chatbotWantsShortlist ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #555; font-weight: 600;">Best Projects in Area</td>
              <td style="padding: 6px 0; color: #333;">${params.chatbotWantsBestProjects ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #555; font-weight: 600;">Expert Call Requested</td>
              <td style="padding: 6px 0; color: #333;">${params.chatbotWantsExpertCall ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #555; font-weight: 600;">Preferred Follow-up</td>
              <td style="padding: 6px 0; color: #333;">${safe(params.chatbotContactPreference)}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #f8f9fb; padding: 16px 20px; border-radius: 8px; margin-bottom: 4px;">
          <h3 style="color: #2B3035; margin: 0 0 10px 0; font-size: 15px;">Meta</h3>
          <p style="color: #555; margin: 0; font-size: 13px; line-height: 1.5;">
            <strong>Source:</strong> ${safe(params.chatbotSource || 'Website Chatbot')}<br>
            <strong>Received at:</strong> ${safe(params.chatbotTimestamp)}
          </p>
        </div>

        <div style="text-align: center; margin-top: 22px; padding-top: 16px; border-top: 1px solid #e1e3e8;">
          <p style="color: #777; margin: 0; font-size: 12px;">
            This lead was generated via the Celeste Abode interactive chatbot.<br>
            Please respond to the client at the earliest for best experience.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Create email template for segmented entry form
 */
function createSegmentedEntryEmailTemplate(params: EmailSubmissionParams): string {
  const intentLabels = {
    live: "Buying to Live",
    invest: "Investing for Returns", 
    signature: "Luxury & Signature Residences"
  };

  const intent = params.intent || 'live';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #CBB27A; padding-bottom: 20px;">
          <h1 style="color: #2B3035; margin: 0; font-size: 24px;">New ${intentLabels[intent]} Inquiry</h1>
          <p style="color: #666; margin: 10px 0 0 0;">Celeste Abode</p>
        </div>
      
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
          <h2 style="color: #2B3035; margin: 0 0 15px 0; font-size: 18px;">Contact Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333; width: 30%;">Name:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${sanitizeInput(params.firstName)} ${sanitizeInput(params.lastName)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Email:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;"><a href="mailto:${params.email}">${params.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Phone:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;"><a href="tel:${params.phone}">${params.phone}</a></td>
            </tr>
          </table>
        </div>

        ${params.emailContent || params.formData ? `
        <div style="background-color: #fff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px; margin: 20px 0;">
          ${params.emailContent || 'Form data submitted'}
        </div>
        ` : ''}

        <div style="background-color: #CBB27A; color: white; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <p style="margin: 0; font-weight: bold;">Ready to provide personalized recommendations!</p>
      </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #666; margin: 0; font-size: 14px;">
            This inquiry was submitted through the Celeste Abode website.<br>
            Please contact the client within 24 hours.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Create email template for viewing request
 */
function createViewingEmailTemplate(params: EmailSubmissionParams): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #CBB27A; padding-bottom: 20px;">
          <h1 style="color: #2B3035; margin: 0; font-size: 24px;">New Property Viewing Request</h1>
          <p style="color: #666; margin: 10px 0 0 0;">Celeste Abode</p>
      </div>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
          <h2 style="color: #2B3035; margin: 0 0 15px 0; font-size: 18px;">Client Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333; width: 30%;">Name:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${sanitizeInput(params.firstName)} ${sanitizeInput(params.lastName)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Email:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;"><a href="mailto:${params.email}">${params.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Phone:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;"><a href="tel:${params.phone}">${params.phone}</a></td>
            </tr>
          </table>
        </div>

        ${params.propertyTitle || params.propertyLocation ? `
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
          <h2 style="color: #2B3035; margin: 0 0 15px 0; font-size: 18px;">Property Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${params.propertyTitle ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333; width: 30%;">Property:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${sanitizeInput(params.propertyTitle)}</td>
            </tr>
            ` : ''}
            ${params.propertyLocation ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Location:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${sanitizeInput(params.propertyLocation)}</td>
            </tr>
            ` : ''}
          </table>
        </div>
        ` : ''}

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
          <h2 style="color: #2B3035; margin: 0 0 15px 0; font-size: 18px;">Preferred Viewing Time</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333; width: 30%;">Date:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${params.preferredDate ? new Date(params.preferredDate).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Time:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${params.preferredTime || 'Not specified'}</td>
            </tr>
          </table>
        </div>

        ${params.message ? `
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
          <h2 style="color: #2B3035; margin: 0 0 15px 0; font-size: 18px;">Additional Notes</h2>
          <p style="color: #666; margin: 0; line-height: 1.6; white-space: pre-wrap;">${sanitizeInput(params.message)}</p>
        </div>
        ` : ''}

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #666; margin: 0; font-size: 14px;">
            This viewing request was submitted through the Celeste Abode website.<br>
            Please contact the client to confirm the viewing appointment.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Create email template for advisory session/consultation
 */
function createAdvisoryEmailTemplate(params: EmailSubmissionParams, type: 'advisory-session' | 'consultation'): string {
  const title = type === 'advisory-session' ? 'Advisory Session Request' : 'Consultation Request';
  
  const budgetLabels: { [key: string]: string } = {
    'under-50': 'Under ₹50 Lakhs',
    '50-100': '₹50 Lakhs - ₹1 Crore',
    '100-200': '₹1 Crore - ₹2 Crore',
    '200-500': '₹2 Crore - ₹5 Crore',
    '500-plus': '₹5 Crore+',
  };

  const timelineLabels: { [key: string]: string } = {
    'immediate': 'Immediate (0-3 months)',
    'short': 'Short term (3-6 months)',
    'medium': 'Medium term (6-12 months)',
    'long': 'Long term (1+ years)',
  };

  const propertyTypeLabels: { [key: string]: string } = {
    'apartment': 'Apartment',
    'villa': 'Villa',
    'plot': 'Residential Plot',
    'commercial': 'Commercial Property',
    'investment': 'Investment Property',
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #CBB27A; padding-bottom: 20px;">
          <h1 style="color: #2B3035; margin: 0; font-size: 24px;">New ${title}</h1>
          <p style="color: #666; margin: 10px 0 0 0;">Celeste Abode</p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
          <h2 style="color: #2B3035; margin: 0 0 15px 0; font-size: 18px;">Client Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333; width: 30%;">Name:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${sanitizeInput(params.firstName)} ${sanitizeInput(params.lastName)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Email:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;"><a href="mailto:${params.email}">${params.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Phone:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;"><a href="tel:${params.phone}">${params.phone}</a></td>
            </tr>
          </table>
        </div>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
          <h2 style="color: #2B3035; margin: 0 0 15px 0; font-size: 18px;">Property Requirements</h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${params.budget ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333; width: 30%;">Budget:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${budgetLabels[params.budget] || params.budget}</td>
            </tr>
            ` : ''}
            ${params.propertyType ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Property Type:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${propertyTypeLabels[params.propertyType] || params.propertyType}</td>
            </tr>
            ` : ''}
            ${params.timeline ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Timeline:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${timelineLabels[params.timeline] || params.timeline}</td>
            </tr>
            ` : ''}
            ${params.location ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Location:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;">${sanitizeInput(params.location)}</td>
            </tr>
      ` : ''}
          </table>
        </div>

        ${params.message ? `
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
          <h2 style="color: #2B3035; margin: 0 0 15px 0; font-size: 18px;">Additional Requirements</h2>
          <p style="color: #666; margin: 0; line-height: 1.6; white-space: pre-wrap;">${sanitizeInput(params.message)}</p>
        </div>
      ` : ''}

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #666; margin: 0; font-size: 14px;">
            This request was submitted through the Celeste Abode website.<br>
            Please contact the client within 24 hours to schedule their ${type === 'advisory-session' ? 'advisory session' : 'consultation'}.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Create confirmation email template for clients
 */
function createConfirmationEmailTemplate(
  name: string,
  type: 'advisory-session' | 'consultation' | 'viewing' | 'contact'
): string {
  const titles: Record<string, { main: string; sub: string }> = {
    'advisory-session': {
      main: 'Thank You for Your Interest',
      sub: 'Celeste Abode Advisory Services'
    },
    'consultation': {
      main: 'Consultation Request Confirmed',
      sub: 'Celeste Abode Consultation Services'
    },
    'viewing': {
      main: 'Viewing Request Received',
      sub: 'Celeste Abode'
    },
    'contact': {
      main: 'Thank You for Contacting Us',
      sub: 'Celeste Abode'
    }
  };

  const title = titles[type] || titles.contact;
  const phoneNumber = process.env.PHONE_NUMBER || '+91 9818735258';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #CBB27A; padding-bottom: 20px;">
          <h1 style="color: #2B3035; margin: 0; font-size: 24px;">${title.main}</h1>
          <p style="color: #666; margin: 10px 0 0 0;">${title.sub}</p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
          <p style="color: #333; margin: 0 0 15px 0; font-size: 16px; line-height: 1.6;">
            Dear ${sanitizeInput(name)},
          </p>
          <p style="color: #666; margin: 0; line-height: 1.6;">
            Thank you for reaching out to Celeste Abode. We have received your request and our expert team will review your needs.
          </p>
        </div>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
          <h2 style="color: #2B3035; margin: 0 0 15px 0; font-size: 18px;">What Happens Next?</h2>
          <ul style="color: #666; margin: 0; padding-left: 20px; line-height: 1.6;">
            <li>Our team will review your requirements within 24 hours</li>
            <li>We'll contact you to schedule a personalized consultation</li>
            <li>You'll receive tailored recommendations based on your needs</li>
          </ul>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #666; margin: 0; font-size: 14px;">
            For immediate assistance, please call us at <strong>${phoneNumber}</strong><br>
            or visit our website at <strong>www.celesteabode.com</strong>
          </p>
      </div>
    </div>
    </body>
    </html>
  `;
}

/**
 * Main function to send form submission emails
 */
export async function sendFormSubmissionEmail(params: EmailSubmissionParams): Promise<EmailResult> {
  try {
    const isChatbot = params.formType === 'chatbot';

    // Validate required fields
    if (!params.firstName || !params.phone) {
      return {
        success: false,
        error: `Missing required fields: ${!params.firstName ? 'firstName' : ''}${!params.firstName && !params.phone ? ', ' : ''}${!params.phone ? 'phone' : ''}`,
      };
    }
    
    // lastName is required for non-chatbot forms, optional for chatbot (can be "N/A")
    if (!isChatbot && !params.lastName) {
      return {
        success: false,
        error: 'Missing required field: lastName',
      };
    }
    
    // email is required for non-chatbot forms, optional for chatbot
    if (!isChatbot && !params.email) {
      return {
        success: false,
        error: 'Missing required field: email',
      };
    }

    // Validate email format (for non-chatbot flows, where client email is required)
    if (!isChatbot && !validateEmail(params.email)) {
      return {
        success: false,
        error: 'Invalid email format',
      };
    }

    // Validate environment variables
    const emailUser = process.env.EMAIL_USER;
    const adminEmail = process.env.ADMIN_EMAIL || emailUser;

    if (!emailUser) {
      return {
        success: false,
        error: 'EMAIL_USER environment variable is not set',
      };
    }

    if (!adminEmail) {
      return {
        success: false,
        error: 'ADMIN_EMAIL environment variable is not set',
      };
    }

    // Get email content based on form type
    let emailContent: string;
    let subject: string;
    const fullName = `${params.firstName} ${params.lastName}`;

    switch (params.formType) {
      case 'contact':
        emailContent = createContactEmailTemplate(params);
        subject = `New Contact Form Submission - ${fullName}`;
        break;
      case 'segmented-entry':
        emailContent = createSegmentedEntryEmailTemplate(params);
        const intentLabels = {
          live: "Buying to Live",
          invest: "Investing for Returns",
          signature: "Luxury & Signature Residences"
        };
        subject = `New ${intentLabels[params.intent || 'live']} Inquiry - ${fullName}`;
        break;
      case 'viewing':
        emailContent = createViewingEmailTemplate(params);
        subject = `New Property Viewing Request - ${fullName}`;
        break;
      case 'advisory-session':
        emailContent = createAdvisoryEmailTemplate(params, 'advisory-session');
        subject = `New Advisory Session Request - ${fullName}`;
        break;
      case 'consultation':
        emailContent = createAdvisoryEmailTemplate(params, 'consultation');
        subject = `New Consultation Request - ${fullName}`;
        break;
      case 'chatbot':
        emailContent = createChatbotEmailTemplate(params);
        subject = `New Chatbot Lead - ${fullName}`;
        break;
      default:
        return {
          success: false,
          error: `Unknown form type: ${params.formType}`,
        };
    }

    // Send email to admin
    const replyToAddress =
      isChatbot && params.chatbotClientEmail && validateEmail(params.chatbotClientEmail)
        ? params.chatbotClientEmail
        : params.email && validateEmail(params.email)
        ? params.email
        : emailUser;

    const adminResult = await sendEmailWithRetry({
      from: `"Celeste Abode" <${emailUser}>`,
      to: adminEmail,
      replyTo: replyToAddress,
      subject: subject,
      html: emailContent,
    });

    if (!adminResult.success) {
      return adminResult;
    }

    // Send confirmation email to client (for advisory-session, consultation, viewing)
    if (['advisory-session', 'consultation', 'viewing'].includes(params.formType)) {
      const confirmationContent = createConfirmationEmailTemplate(
        fullName,
        params.formType as 'advisory-session' | 'consultation' | 'viewing'
      );

      const confirmationSubject = params.formType === 'advisory-session'
        ? 'Advisory Session Request Confirmation - Celeste Abode'
        : params.formType === 'consultation'
        ? 'Consultation Request Confirmation - Celeste Abode'
        : 'Viewing Request Confirmation - Celeste Abode';

      // Don't fail if confirmation email fails, just log it
      try {
        await sendEmailWithRetry({
          from: `"Celeste Abode" <${emailUser}>`,
          to: params.email,
          subject: confirmationSubject,
          html: confirmationContent,
        });
      } catch (error) {
        console.error('Failed to send confirmation email:', error);
        // Continue - admin email was successful
      }
    }

    return adminResult;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in sendFormSubmissionEmail:', errorMessage);
    return {
      success: false,
      error: errorMessage,
    };
  }
}

