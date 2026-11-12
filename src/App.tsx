/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Credibility } from './components/Credibility';
import { Founder } from './components/Founder';
import { About } from './components/About';
import { AirportCollaboration } from './components/AirportCollaboration';
import { Verticals } from './components/Verticals';
import { RealEstateServices } from './components/RealEstateServices';
import { PropertyPlatform } from './components/PropertyPlatform';
import { ConstructionServices } from './components/ConstructionServices';
import { Architectural3DViewer } from './components/Architectural3DViewer';
import { Projects } from './components/Projects';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Process } from './components/Process';
import { TestimonialsNotice } from './components/TestimonialsNotice';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { AdminModal } from './components/AdminModal';
import { LegalPageModal } from './components/LegalPageModal';
import { CookieConsent } from './components/CookieConsent';
import { buildWhatsAppUrl, PRESET_MESSAGES } from './lib/whatsapp';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeLegalDoc, setActiveLegalDoc] = useState<string | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenWhatsAppRealEstate = () => {
    window.open(buildWhatsAppUrl(PRESET_MESSAGES.realEstate), '_blank');
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white font-manrope selection:bg-[#D4AF37] selection:text-[#080808] overflow-x-hidden">
      {/* Sticky Navigation with prominent logo & Let's Talk CTA */}
      <Navbar onOpenConsultation={() => scrollToSection('contact')} />

      <main id="main-content">
        {/* Section 01: Hero with Cinematic Architectural Aerial Background Video */}
        <Hero
          onExploreExpertise={() => scrollToSection('properties')}
          onDiscussProject={() => scrollToSection('contact')}
        />

        {/* Section 02: Company Credibility & Regional Focus */}
        <Credibility />

        {/* Section 03: Executive Leadership — Sayan Mahanta */}
        <Founder />

        {/* Section 04: About Seikou Develops */}
        <About onLearnMore={() => scrollToSection('properties')} />

        {/* Section 05: Regional Infrastructure Collaboration — Durgapur Airport */}
        <AirportCollaboration />

        {/* Section 06: The Two Business Verticals */}
        <Verticals
          onSelectRealEstate={() => scrollToSection('real-estate')}
          onSelectConstruction={() => scrollToSection('construction')}
        />

        {/* Section 07: Real Estate Services */}
        <RealEstateServices
          onOpenConsultation={() => scrollToSection('contact')}
          onWhatsAppInquiry={handleOpenWhatsAppRealEstate}
        />

        {/* Section 08: West Bengal Property Platform (Bankura & Durgapur Focus) */}
        <PropertyPlatform
          onOpenConsultation={() => scrollToSection('contact')}
        />

        {/* Section 09: Construction & Turnkey Solutions (12 Services + Interior Showcase + Luxury Villa) */}
        <ConstructionServices
          onStartProject={() => scrollToSection('contact')}
        />

        {/* Section 10: Interactive 3D Architectural Experience (Three.js) */}
        <Architectural3DViewer />

        {/* Section 11: Featured Conceptual Portfolio */}
        <Projects />

        {/* Section 12: Why Choose Seikou Develops */}
        <WhyChooseUs />

        {/* Section 13: Structured Work Process */}
        <Process />

        {/* Section 14: Client Confidentiality & Advisory Notice */}
        <TestimonialsNotice />

        {/* Section 15: Contact & Consultation Form (West Bengal Territories) */}
        <Contact
          onOpenPrivacyPolicy={() => setActiveLegalDoc('privacy')}
        />
      </main>

      {/* Section 16: Footer with Prominent Logo & Legal Directory */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenLegalDoc={(id) => setActiveLegalDoc(id)}
      />

      {/* Floating Interactive WhatsApp Widget */}
      <WhatsAppWidget />

      {/* Admin and Backend Operations Portal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Comprehensive Legal Documentation Pages Modal */}
      <LegalPageModal
        documentId={activeLegalDoc}
        onClose={() => setActiveLegalDoc(null)}
        onSelectDocument={(id) => setActiveLegalDoc(id)}
      />

      {/* DPDP Act 2023 Compliant Cookie Consent Interface */}
      <CookieConsent
        onOpenCookiePolicy={() => setActiveLegalDoc('cookies')}
      />
    </div>
  );
}
