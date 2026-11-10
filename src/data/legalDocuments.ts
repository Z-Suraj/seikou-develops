export interface LegalSection {
  title: string;
  content: string[];
}

export interface LegalDocument {
  id: 'terms' | 'privacy' | 'cookies' | 'disclaimer' | 'ip' | 'inquiry';
  title: string;
  lastUpdated: string;
  leadNotice?: string;
  sections: LegalSection[];
}

export const LEGAL_DOCUMENTS: Record<string, LegalDocument> = {
  terms: {
    id: 'terms',
    title: 'Terms & Conditions',
    lastUpdated: 'November 2026',
    leadNotice: 'NOTICE: This document is prepared under applicable Indian commercial, property, and electronic contract guidelines. It requires formal review and customization by a qualified Indian legal advocate prior to formal execution.',
    sections: [
      {
        title: '1. Introduction & Acceptance of Terms',
        content: [
          'Welcome to SEIKOU DEVELOPS ("Company", "we", "our", or "us"). These Terms and Conditions govern your access to and use of our corporate website, communication channels (including WhatsApp click-to-chat), and advisory services.',
          'By accessing this website, requesting consultations, or submitting inquiry forms, you agree to be bound by these Terms and our Privacy Policy. If you do not agree, you must discontinue using our services immediately.',
        ],
      },
      {
        title: '2. Nature of Company Services',
        content: [
          'Seikou Develops operates two specialized business verticals:',
          '(a) Real Estate Consultancy & Brokerage: Property advisory, market research, transaction coordination, and documentation assistance for residential, commercial, industrial, and agricultural properties.',
          '(b) Construction & Turnkey Solutions: Civil construction, AutoCAD planning, architectural coordination, building materials procurement, fabrication, finishing, and turnkey execution.',
          'Each construction assignment or real estate transaction is governed by a separate, formal bipartite or tripartite contract executed in writing.',
        ],
      },
      {
        title: '3. Website Usage & Permitted Access',
        content: [
          'You agree to use this website solely for lawful purposes related to genuine property acquisition, investment exploration, or construction project inquiries.',
          'You shall not attempt to breach security, scrape proprietary project data, reverse-engineer digital assets, or transmit defamatory or unauthorized material through our forms.',
        ],
      },
      {
        title: '4. Property Information & Availability Disclaimers',
        content: [
          'All property descriptions, photographs, configurations, land measurements, and valuation guidelines displayed or discussed are indicative and subject to independent verification.',
          'Real estate listings, market rates, and land zoning parameters may change without notice due to market volatility or regulatory updates. Seikou Develops does not guarantee the ongoing availability of any listed parcel.',
        ],
      },
      {
        title: '5. Brokerage & Consultancy Engagements',
        content: [
          'Acting as a real estate consultancy and facilitator, Seikou Develops bridges buyers, sellers, tenants, and developers. Consultancy fees, brokerage percentages, and milestone structures are finalized in official engagement agreements.',
          'Clients are responsible for fulfilling their statutory stamp duty, registration charges, GST, and tax obligations under Indian taxation laws.',
        ],
      },
      {
        title: '6. Civil Construction & Turnkey Contracts',
        content: [
          'All civil works, structural calculations, fabrication schedules, and finishing deliverables are executed strictly under written work orders, bill of quantities (BOQ), and architect-approved drawings.',
          'Timelines are subject to force majeure, site clearance approvals, municipal sanctions, and client-approved variation orders.',
        ],
      },
      {
        title: '7. Customer Responsibilities & Declarations',
        content: [
          'You warrant that all information provided during inquiry submissions (including name, telephone number, and legal status) is accurate, current, and genuine.',
          'You acknowledge that property acquisition carries legal and capital risks, and agree to conduct independent title searches and valuation diligence.',
        ],
      },
      {
        title: '8. Inquiry Forms & Communication Requests',
        content: [
          'Submitting an inquiry through our digital forms, email, or WhatsApp constitutes an express invitation to our advisory team to contact you via phone call, messaging, or written correspondence.',
          'Submission of an inquiry does not create an exclusive brokerage agreement or contractor-client obligation until a formal agreement is executed.',
        ],
      },
      {
        title: '9. Third-Party Services & Integrations',
        content: [
          'Our platform utilizes trusted third-party providers including WhatsApp (Meta Platforms), Google Maps, and cloud hosting infrastructure. Your interaction with third-party tools is governed by their respective terms and data policies.',
        ],
      },
      {
        title: '10. Intellectual Property Rights',
        content: [
          'All trade names, trademarks, the Seikou Develops emblem and logo, visual identity, architectural photography, website code, and structural models are the exclusive intellectual property of Seikou Develops.',
          'Any unauthorized reproduction, modification, framing, or distribution is strictly prohibited and subject to legal prosecution under the Copyright Act, 1957.',
        ],
      },
      {
        title: '11. Limitation of Liability',
        content: [
          'To the fullest extent permitted under Indian law, Seikou Develops, its partners, and employees shall not be liable for any indirect, incidental, special, or consequential damages resulting from website downtime, property market fluctuations, or reliance on preliminary estimates.',
        ],
      },
      {
        title: '12. Indemnification',
        content: [
          'You agree to indemnify and hold harmless Seikou Develops from any claims, losses, or legal liabilities arising from your violation of these Terms, misrepresentation of identity, or infringement of third-party rights.',
        ],
      },
      {
        title: '13. Governing Law & Jurisdiction',
        content: [
          'These Terms shall be governed by and construed in accordance with the laws of the Republic of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in India.',
        ],
      },
      {
        title: '14. Contact for Legal Matters',
        content: [
          'For formal queries regarding these Terms and Conditions, please contact us in writing at seikou.develops10@gmail.com.',
        ],
      },
    ],
  },
  privacy: {
    id: 'privacy',
    title: 'Privacy Policy',
    lastUpdated: 'November 2026',
    leadNotice: 'Prepared in alignment with the Digital Personal Data Protection Act, 2023 (DPDP Act) and the Information Technology Act, 2000.',
    sections: [
      {
        title: '1. Commitment to Personal Data Protection',
        content: [
          'SEIKOU DEVELOPS respects your personal privacy. This Privacy Policy details how we collect, process, store, and safeguard personal data provided through our website, inquiry forms, and official WhatsApp channels.',
        ],
      },
      {
        title: '2. Information We Collect',
        content: [
          'We collect information only when voluntarily submitted by you:',
          '(a) Identity & Contact Data: Full name, phone number, email address.',
          '(b) Real Estate Preferences: Desired property type (residential/commercial), transaction mode (buy/sell/rent), preferred location, and estimated budget.',
          '(c) Construction Specifications: Project classification, proposed site location, approximate floor area, and scope descriptions.',
          '(d) Technical Log Data: IP address, browser type, and anonymous aggregate interaction data for security and performance optimization.',
        ],
      },
      {
        title: '3. Purpose of Processing (Lawful Grounds)',
        content: [
          'We process your personal data solely for legitimate business purposes under your explicit consent:',
          '• Responding to consultation and project inquiries.',
          '• Organizing property inspections and scheduling engineering discussions.',
          '• Providing accurate estimates, AutoCAD review notes, and customized project proposals.',
          '• Maintaining regulatory compliance under real estate and anti-fraud guidelines.',
        ],
      },
      {
        title: '4. WhatsApp & Mobile Communications',
        content: [
          'When you interact with our official WhatsApp number (+91 86702 79597), conversations are end-to-end encrypted by WhatsApp according to Meta\'s security standards. We use WhatsApp exclusively for project consultation and documentation sharing as requested by you.',
        ],
      },
      {
        title: '5. Data Storage, Security & Retention',
        content: [
          'We employ enterprise-grade SSL/TLS encryption, secure database hosting, and restricted access protocols to protect your personal details.',
          'Inquiry records are retained only for the duration necessary to fulfill consultation objectives or as required by statutory Indian taxation and corporate record-keeping mandates.',
        ],
      },
      {
        title: '6. Disclosure & Third-Party Sharing',
        content: [
          'We do NOT sell, rent, or trade your personal data to commercial third parties or advertisers.',
          'Data may only be shared with verified civil engineers, legal documentation associates, or government authorities where strictly necessary to execute your requested service or comply with legal orders.',
        ],
      },
      {
        title: '7. Your Rights under the DPDP Act, 2023',
        content: [
          'Under the Digital Personal Data Protection Act, 2023, you have the right to:',
          '• Access a summary of your personal data processed by us.',
          '• Request correction or updating of inaccurate records.',
          '• Withdraw your consent and request erasure of personal data, subject to statutory retention obligations.',
          '• Nominate another individual to exercise rights on your behalf in the event of incapacity.',
        ],
      },
      {
        title: '8. Privacy Inquiries & Grievance Officer',
        content: [
          'To exercise your privacy rights or file a data grievance, write to our designated data coordinator at seikou.develops10@gmail.com with the subject line "Privacy Request".',
        ],
      },
    ],
  },
  cookies: {
    id: 'cookies',
    title: 'Cookie Policy',
    lastUpdated: 'November 2026',
    sections: [
      {
        title: '1. What Are Cookies',
        content: [
          'Cookies are small text files placed on your device to ensure smooth website operation, remember preferences, and enhance navigation performance.',
        ],
      },
      {
        title: '2. Classification of Cookies We Use',
        content: [
          '• Essential Cookies: Necessary for page rendering, security checks, and form state retention. These cannot be disabled.',
          '• Functional Cookies: Remember your interactive preferences, such as selected vertical views or cookie acknowledgment status.',
          '• Anonymous Analytical Cookies: Help us understand aggregate page popularity and navigation flow without identifying individuals.',
        ],
      },
      {
        title: '3. Managing Cookie Preferences',
        content: [
          'You can manage or modify your cookie preferences at any time using our on-site Cookie Consent Settings or directly through your web browser configuration.',
        ],
      },
    ],
  },
  disclaimer: {
    id: 'disclaimer',
    title: 'General & Real Estate Disclaimer',
    lastUpdated: 'November 2026',
    leadNotice: 'CRITICAL NOTICE: Information provided on this website is for general guidance only and does not constitute formal legal, financial, or engineering counsel.',
    sections: [
      {
        title: '1. Not Legal or Investment Advice',
        content: [
          'All market commentaries, valuation benchmarks, and property feasibility notes are shared solely for informational convenience.',
          'They do not constitute certified legal opinions, investment endorsements, or tax advice. Prospective purchasers must engage independent advocates and chartered accountants before committing capital.',
        ],
      },
      {
        title: '2. RERA (Real Estate Regulatory Authority) Disclosures',
        content: [
          'Seikou Develops complies with applicable Real Estate (Regulation and Development) Act, 2016 (RERA) provisions.',
          'Where third-party developer projects are represented, clients are advised to independently verify the project\'s official RERA registration number and sanctioned plans on the respective State RERA portal.',
          'Company RERA Registration Details: [RERA-REGISTRATION-NO-PENDING-FINAL-FILING / Verified upon formal agreement].',
        ],
      },
      {
        title: '3. Construction Estimates & Site Conditions',
        content: [
          'Preliminary cost per square foot figures and construction timelines are indicative estimates based on standard soil and architectural assumptions.',
          'Final contractual commitments require formal soil bearing tests, architectural structural analysis, and an approved Bill of Quantities (BOQ).',
        ],
      },
      {
        title: '4. Visual Renderings & Sample Assets',
        content: [
          'Certain project photographs, 3D computer-generated models, and elevation renders are conceptual illustrations intended to demonstrate architectural execution capabilities and may differ from final built structures.',
        ],
      },
    ],
  },
  ip: {
    id: 'ip',
    title: 'Intellectual Property Notice',
    lastUpdated: 'November 2026',
    sections: [
      {
        title: '1. Brand Trademark & Corporate Identity',
        content: [
          'The corporate name "SEIKOU DEVELOPS", the circular architectural house-crest logo, the tagline "Building Trust. Creating Futures.", and associated color configurations are proprietary trademarks of Seikou Develops.',
        ],
      },
      {
        title: '2. Architectural Imagery & Content Rights',
        content: [
          'All custom photography, 3D procedural models, technical AutoCAD blueprints, and editorial copywriting appearing on this site are protected under the Indian Copyright Act, 1957 and international copyright conventions.',
        ],
      },
      {
        title: '3. Prohibited Acts',
        content: [
          'No portion of this site may be copied, reproduced, hotlinked, mirrored, or exploited for commercial gain without prior written authorization from Seikou Develops.',
        ],
      },
    ],
  },
  inquiry: {
    id: 'inquiry',
    title: 'Inquiry & Communication Policy',
    lastUpdated: 'November 2026',
    sections: [
      {
        title: '1. Inquiry Processing Protocol',
        content: [
          'All property and construction inquiries submitted via web forms, direct email, or WhatsApp are assigned a unique tracking reference code.',
          'Our senior advisors aim to review submissions and contact prospective clients within 1 to 2 business working days.',
        ],
      },
      {
        title: '2. Authorized Channels of Communication',
        content: [
          'Official communication from Seikou Develops originates exclusively from:',
          '• Email: seikou.develops10@gmail.com',
          '• Business Line & WhatsApp: +91 86702 79597',
          'We do not solicit funds or upfront registration fees via unverified personal accounts.',
        ],
      },
      {
        title: '3. Appointment & Site Visit Guidelines',
        content: [
          'Property walkthroughs, site measurements, and engineering meetings require prior scheduling and mutual confirmation.',
        ],
      },
    ],
  },
};
