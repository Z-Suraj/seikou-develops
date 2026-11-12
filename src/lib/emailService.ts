/**
 * SEIKOU DEVELOPS — Email Dispatch & Mailto Helpers
 *
 * Official Recipient: seikou.develops10@gmail.com
 * Subject: New Real Estate Enquiry – SEIKOU DEVELOPS
 */

export const OFFICIAL_RE_RECIPIENT = 'seikou.develops10@gmail.com';
export const OFFICIAL_RE_SUBJECT = 'New Real Estate Enquiry – SEIKOU DEVELOPS';

export interface RealEstateFormData {
  fullName: string;
  phone: string;
  email: string;
  propertyCategory: string;
  requirement: string;
  preferredLocation: string;
  budgetRange?: string;
  message?: string;
}

const REQUIREMENT_LABELS: Record<string, string> = {
  Buy: 'Buy Property',
  Sell: 'Sell Property',
  Rent: 'Rent / Lease',
  Investment: 'Capital Investment',
};

/**
 * Formats the exact email body requested for SEIKOU DEVELOPS enquiries
 */
export function formatRealEstateEmailBody(data: RealEstateFormData): string {
  const reqDisplay = REQUIREMENT_LABELS[data.requirement] || data.requirement;

  return `Dear SEIKOU DEVELOPS Team,

I would like to submit a real estate enquiry.

CUSTOMER DETAILS

Full Name: ${data.fullName.trim()}
Phone Number: ${data.phone.trim()}
Email Address: ${data.email.trim()}

PROPERTY REQUIREMENTS

Property Category: ${data.propertyCategory}
Requirement Type: ${reqDisplay}
Preferred Location: ${data.preferredLocation}
Budget Range: ${data.budgetRange?.trim() ? data.budgetRange.trim() : 'Not specified'}

ADDITIONAL REQUIREMENTS

Message: ${data.message?.trim() ? data.message.trim() : 'None'}

I agree to the processing of my contact details for consultation purposes in accordance with the Privacy Policy.

Regards,
${data.fullName.trim()}`;
}

/**
 * Constructs a fully URL-encoded mailto link
 */
export function buildRealEstateMailtoUrl(data: RealEstateFormData): {
  recipient: string;
  subject: string;
  body: string;
  mailtoUrl: string;
} {
  const body = formatRealEstateEmailBody(data);
  const mailtoUrl = `mailto:${OFFICIAL_RE_RECIPIENT}?subject=${encodeURIComponent(
    OFFICIAL_RE_SUBJECT
  )}&body=${encodeURIComponent(body)}`;

  return {
    recipient: OFFICIAL_RE_RECIPIENT,
    subject: OFFICIAL_RE_SUBJECT,
    body,
    mailtoUrl,
  };
}

/**
 * Constructs a prefilled direct Gmail Web Compose URL
 */
export function buildGmailComposeUrl(data: RealEstateFormData): string {
  const body = formatRealEstateEmailBody(data);
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    OFFICIAL_RE_RECIPIENT
  )}&su=${encodeURIComponent(OFFICIAL_RE_SUBJECT)}&body=${encodeURIComponent(body)}`;
}

