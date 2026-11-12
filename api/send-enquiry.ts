/**
 * SEIKOU DEVELOPS — Serverless Email Handler (Resend Integration)
 *
 * Official Receiving Email: seikou.develops10@gmail.com
 * Subject: New Real Estate Enquiry – SEIKOU DEVELOPS
 *
 * Deployment:
 * - Vercel / Netlify: Place in `/api/send-enquiry.ts`
 * - Set environment variable: `RESEND_API_KEY`
 */

export interface RealEstateEnquiryPayload {
  fullName: string;
  phone: string;
  email: string;
  propertyCategory: string;
  requirement: string;
  preferredLocation: string;
  budgetRange?: string;
  message?: string;
}

export default async function handler(req: any, res: any) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      success: false,
      error: 'RESEND_API_KEY is not configured on the server environment.',
    });
  }

  const {
    fullName,
    phone,
    email,
    propertyCategory,
    requirement,
    preferredLocation,
    budgetRange,
    message,
  } = (req.body || {}) as RealEstateEnquiryPayload;

  // Validate mandatory fields
  if (!fullName?.trim() || !phone?.trim() || !email?.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Full Name, Phone Number, and Email Address are required.',
    });
  }

  const formattedBody = `Dear SEIKOU DEVELOPS Team,

I would like to submit a real estate enquiry.

CUSTOMER DETAILS

Full Name: ${fullName.trim()}
Phone Number: ${phone.trim()}
Email Address: ${email.trim()}

PROPERTY REQUIREMENTS

Property Category: ${propertyCategory || 'Not specified'}
Requirement Type: ${requirement || 'Not specified'}
Preferred Location: ${preferredLocation || 'Not specified'}
Budget Range: ${budgetRange?.trim() || 'Not specified'}

ADDITIONAL REQUIREMENTS

Message: ${message?.trim() || 'None'}

I agree to the processing of my contact details for consultation purposes in accordance with the Privacy Policy.

Regards,
${fullName.trim()}`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111; line-height: 1.6;">
      <div style="background-color: #0c0c0c; padding: 24px; text-align: center; border-bottom: 2px solid #D4AF37;">
        <h2 style="color: #D4AF37; margin: 0; font-family: Georgia, serif; letter-spacing: 2px;">SEIKOU DEVELOPS</h2>
        <p style="color: #aaa; margin: 6px 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">New Real Estate Enquiry</p>
      </div>

      <div style="padding: 24px; background: #ffffff; border: 1px solid #eee;">
        <h3 style="color: #0c0c0c; border-bottom: 1px solid #D4AF37; padding-bottom: 8px;">Customer Details</h3>
        <p><strong>Full Name:</strong> ${fullName.trim()}</p>
        <p><strong>Phone Number:</strong> ${phone.trim()}</p>
        <p><strong>Email:</strong> <a href="mailto:${email.trim()}">${email.trim()}</a></p>

        <h3 style="color: #0c0c0c; border-bottom: 1px solid #D4AF37; padding-bottom: 8px; margin-top: 24px;">Property Requirements</h3>
        <p><strong>Property Category:</strong> ${propertyCategory || 'Not specified'}</p>
        <p><strong>Requirement Type:</strong> ${requirement || 'Not specified'}</p>
        <p><strong>Preferred Location:</strong> ${preferredLocation || 'Not specified'}</p>
        <p><strong>Budget Range:</strong> ${budgetRange?.trim() || 'Not specified'}</p>

        <h3 style="color: #0c0c0c; border-bottom: 1px solid #D4AF37; padding-bottom: 8px; margin-top: 24px;">Additional Requirements</h3>
        <p style="background: #f9f9f9; padding: 12px; border-left: 3px solid #D4AF37; font-style: italic;">
          ${(message?.trim() || 'No additional notes provided.').replace(/\n/g, '<br/>')}
        </p>

        <p style="margin-top: 28px; font-size: 11px; color: #777;">
          ✓ Customer acknowledged Privacy Policy consent for consultation.
        </p>
      </div>

      <div style="background: #f5f5f5; padding: 16px; text-align: center; font-size: 11px; color: #888;">
        SEIKOU DEVELOPS • Real Estate Consultancy & Construction • Bankura & Durgapur, West Bengal
      </div>
    </div>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'SEIKOU DEVELOPS <onboarding@resend.dev>', // Replace with your verified custom domain once verified in Resend
        to: ['seikou.develops10@gmail.com'],
        reply_to: email.trim(),
        subject: 'New Real Estate Enquiry – SEIKOU DEVELOPS',
        text: formattedBody,
        html: htmlContent,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: data.message || 'Failed to dispatch email via Resend',
      });
    }

    return res.status(200).json({
      success: true,
      messageId: data.id,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error?.message || 'Internal server error while sending email.',
    });
  }
}
