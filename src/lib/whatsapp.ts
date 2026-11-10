/**
 * WhatsApp Click-to-Chat Helper for Seikou Develops
 * Official Business Number: +91 86702 79597
 */

export const DEFAULT_WHATSAPP_NUMBER = '918670279597';

export function getCleanWhatsAppNumber(): string {
  const envNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
  const rawNumber = envNumber && envNumber.trim() ? envNumber : DEFAULT_WHATSAPP_NUMBER;
  // Strip any +, spaces, dashes, or parentheses
  return rawNumber.replace(/[^0-9]/g, '');
}

export function buildWhatsAppUrl(message: string): string {
  const cleanNumber = getCleanWhatsAppNumber();
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}

export const PRESET_MESSAGES = {
  general: 'Hello Seikou Develops, I would like to enquire about your services.',
  realEstate: 'Hello Seikou Develops, I am interested in your real estate services. I would like to discuss my property requirements.',
  construction: 'Hello Seikou Develops, I am interested in your construction and turnkey solutions. Please contact me regarding my project.',
  propertySpecific: (category: string, location?: string) =>
    `Hello Seikou Develops, I am inquiring regarding ${category} property opportunities${location ? ` in ${location}` : ''}. Please guide me on current availability.`,
  projectSpecific: (projectName: string) =>
    `Hello Seikou Develops, I noticed your work on ${projectName} and would like to discuss a similar project with your team.`,
};
