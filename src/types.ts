export interface RealEstateInquiry {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  propertyCategory: 'Residential' | 'Commercial' | 'Agricultural' | 'Industrial';
  requirement: 'Buy' | 'Sell' | 'Rent' | 'Investment';
  preferredLocation: string;
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
  completionStatus: 'Completed & Handed Over' | 'Under Execution' | 'Phase Delivery';
  image: string;
  highlights: string[];
  isSampleDemonstration?: boolean;
}
