export interface RealEstateInquiry {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  propertyCategory: 'Residential Properties' | 'Commercial Properties' | 'Agricultural Land' | 'Industrial Properties' | 'Villas' | 'Residential Plots' | 'Commercial Land';
  requirement: 'Buy' | 'Sell' | 'Rent' | 'Investment';
  preferredLocation: 'Bankura, West Bengal' | 'Durgapur, West Bengal' | 'Other West Bengal' | string;
  budgetRange: string;
  message: string;
  createdAt: string;
}

export interface ConstructionInquiry {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  projectType: 'Residential Building' | 'Commercial Building' | 'Turnkey Construction' | 'Renovation & Finishing' | 'Fabrication & Civil';
  projectLocation: string;
  approximateSize: string;
  requirementDescription: string;
  message: string;
  createdAt: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  category: 'Residential Developments' | 'Commercial Projects' | 'Turnkey Construction' | 'Architectural Planning' | 'Interior & Finishing';
  location: string;
  description: string;
  engineeringScope: string;
  image: string;
  highlights: string[];
}

export interface PropertyListing {
  id: string;
  title: string;
  category: 'Residential Opportunities' | 'Commercial Opportunities' | 'Land & Plot Opportunities' | 'Residential Plots' | 'Commercial Land' | 'Agricultural Land' | 'Commercial Properties' | 'Villas';
  location: 'Bankura, West Bengal' | 'Durgapur, West Bengal';
  city: 'Bankura' | 'Durgapur';
  intent: 'Buy' | 'Sell' | 'Investment';
  price?: string;
  size?: string;
  description: string;
  image: string;
  advisoryType: string;
  isAvailable: boolean;
}
