/**
 * SEIKOU DEVELOPS — Central Image Inventory & Verification Registry
 *
 * Strict Image Uniqueness Policy:
 * Every single section of the website has its own unique, visually appropriate photograph.
 * Zero duplicate image paths across the entire project.
 */

export interface ImageRecord {
  id: string;
  section: string;
  subject: string;
  path: string;
  aspectRatio: string;
}

export const CENTRAL_IMAGE_INVENTORY: ImageRecord[] = [
  {
    id: 'hero-main',
    section: 'Hero Section',
    subject: 'Modern landmark architecture at dusk with glass crown and ambient lighting',
    path: '/assets/images/hero_modern_architecture_1794335445299.jpg',
    aspectRatio: '16:9',
  },
  {
    id: 'founder-portrait',
    section: 'Executive Leadership / Founder',
    subject: 'Sayan Mahanta — Founder & Entrepreneur, Seikou Develops (21 Years)',
    path: '/assets/sayan-mahanta.png',
    aspectRatio: '3:4',
  },
  {
    id: 'about-headquarters',
    section: 'About Seikou Develops',
    subject: 'Executive corporate architecture and modern limestone facade with ambient illumination',
    path: '/assets/images/about_corporate_architecture_1794425239207.jpg',
    aspectRatio: '3:4',
  },
  {
    id: 'airport-collaboration',
    section: 'Regional Infrastructure / Airport Collaboration',
    subject: 'Modern airport terminal exterior with cantilever glass canopy, runway, and aviation tower',
    path: '/assets/images/airport_terminal_modern_1794424925648.jpg',
    aspectRatio: '16:9',
  },
  {
    id: 'vertical-re-card',
    section: 'Our Two Verticals — Vertical 01',
    subject: 'Luxury residential waterfront development in evening twilight',
    path: '/assets/images/vertical_real_estate_1794425314696.jpg',
    aspectRatio: '16:9',
  },
  {
    id: 'vertical-const-card',
    section: 'Our Two Verticals — Vertical 02',
    subject: 'Dramatic civil construction site with reinforced pillars and tower crane at sunset',
    path: '/assets/images/vertical_turnkey_civil_1794425315203.jpg',
    aspectRatio: '16:9',
  },
  {
    id: 'real-estate-banner',
    section: 'Real Estate Services Banner',
    subject: 'Prestige luxury property development panorama with promenade and fountain at dusk',
    path: '/assets/images/luxury_real_estate_banner_1794425271868.jpg',
    aspectRatio: '16:9',
  },
  {
    id: 'prop-commercial-land',
    section: 'Property Platform — Bankura',
    subject: 'Expansive commercial development land parcel adjacent to modern infrastructure',
    path: '/assets/images/commercial_development_parcel_1794424950813.jpg',
    aspectRatio: '4:3',
  },
  {
    id: 'prop-commercial-space',
    section: 'Property Platform — Durgapur',
    subject: 'Contemporary commercial retail and corporate building exterior',
    path: '/assets/images/commercial_retail_building_1794425039917.jpg',
    aspectRatio: '4:3',
  },
  {
    id: 'prop-residential-plot',
    section: 'Property Platform — Bankura',
    subject: 'Demarcated residential land parcel in peaceful green suburban setting',
    path: '/assets/images/residential_land_plot_1794424950224.jpg',
    aspectRatio: '4:3',
  },
  {
    id: 'prop-residential-home',
    section: 'Property Platform — Durgapur',
    subject: 'Modern two-storey independent residential house exterior with manicured lawn',
    path: '/assets/images/independent_modern_house_1794425040526.jpg',
    aspectRatio: '4:3',
  },
  {
    id: 'prop-agricultural-land',
    section: 'Property Platform — Bankura',
    subject: 'Fertile agricultural farmland and plantation under clear skies in West Bengal',
    path: '/assets/images/agricultural_farmland_bankura_1794425039195.jpg',
    aspectRatio: '4:3',
  },
  {
    id: 'const-stage-01',
    section: 'Construction Solutions — Stage 01',
    subject: 'Heavy structural civil framework, reinforced columns and rebar fabrication',
    path: '/assets/images/civil_construction_engineering_1794335448396.jpg',
    aspectRatio: '16:9',
  },
  {
    id: 'const-stage-02',
    section: 'Construction Solutions — Stage 02',
    subject: 'Precision architectural fabrication, structural glazing, and champagne gold mullions',
    path: '/assets/images/structural_fabrication_glazing_1794424926847.jpg',
    aspectRatio: '16:9',
  },
  {
    id: 'const-stage-03',
    section: 'Construction Solutions — Stage 03',
    subject: 'Polished Italian marble flooring, false ceiling, and bespoke acoustic wall paneling',
    path: '/assets/images/luxury_interior_finishing_1794424928066.jpg',
    aspectRatio: '16:9',
  },
  {
    id: 'interior-living-suite',
    section: 'Interior Visual Experience — Living Spaces',
    subject: 'Double-height panoramic luxury living room with floor-to-ceiling glass',
    path: '/assets/images/real_estate_luxury_property_1794335446043.jpg',
    aspectRatio: '16:9',
  },
  {
    id: 'interior-modular-kitchen',
    section: 'Interior Visual Experience — Kitchen & Joinery',
    subject: 'Statuario marble waterfall island and fluted dark oak cabinetry',
    path: '/assets/images/modern_modular_kitchen_1794424949167.jpg',
    aspectRatio: '4:3',
  },
  {
    id: 'interior-lighting-suite',
    section: 'Interior Visual Experience — Master Suite & Lighting',
    subject: 'Bespoke master suite with acoustic timber slat wall and warm cove illumination',
    path: '/assets/images/luxury_master_bedroom_1794424950658.jpg',
    aspectRatio: '4:3',
  },
  {
    id: 'luxury-villa-feature',
    section: 'Luxury Villa Specialization Banner',
    subject: 'Contemporary luxury independent villa exterior at twilight with reflection pond',
    path: '/assets/images/luxury_villa_exterior_1794424927417.jpg',
    aspectRatio: '16:9',
  },
  {
    id: 'portfolio-commercial-center',
    section: 'Featured Portfolio — Commercial Projects',
    subject: 'Multi-level corporate retail and commercial complex',
    path: '/assets/images/project_commercial_complex_1794335447966.jpg',
    aspectRatio: '16:9',
  },
  {
    id: 'portfolio-luxury-residence',
    section: 'Featured Portfolio — Residential Developments',
    subject: 'Modern luxury residential villa and private estate elevation',
    path: '/assets/images/project_luxury_residence_1794335447445.jpg',
    aspectRatio: '16:9',
  },
  {
    id: 'portfolio-civil-framing',
    section: 'Featured Portfolio — Turnkey Construction',
    subject: 'Reinforced concrete structural framing with climbing formwork and tower crane',
    path: '/assets/images/highrise_civil_structure_1794425098774.jpg',
    aspectRatio: '16:9',
  },
  {
    id: 'portfolio-civic-pavilion',
    section: 'Featured Portfolio — Architectural Planning',
    subject: 'Curved parametric civic masterplan pavilion with reflection pool',
    path: '/assets/images/civic_masterplan_pavilion_1794425099053.jpg',
    aspectRatio: '16:9',
  },
];

/**
 * Validation helper: confirms 100% uniqueness of all image paths
 */
export function verifyImageUniqueness(): boolean {
  const paths = CENTRAL_IMAGE_INVENTORY.map((item) => item.path);
  const uniquePaths = new Set(paths);
  return uniquePaths.size === paths.length;
}
