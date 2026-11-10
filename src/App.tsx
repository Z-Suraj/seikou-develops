/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Credibility } from './components/Credibility';
import { About } from './components/About';
import { Verticals } from './components/Verticals';
import { RealEstateServices } from './components/RealEstateServices';
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
          onExploreExpertise={() => scrollToSection('expertise')}
          onDiscussProject={() => scrollToSection('contact')}
        />

        {/* Section 02: Company Credibility */}
        <Credibility />

        {/* Section 03: About Seikou Develops */}
        <About onLearnMore={() => scrollToSection('expertise')} />

        {/* Section 04: The Two Business Verticals */}
        <Verticals
          onSelectRealEstate={() => scrollToSection('real-estate')}
          onSelectConstruction={() => scrollToSection('construction')}
        />

        {/* Section 05: Real Estate Services */}
        <RealEstateServices
          onOpenConsultation={() => scrollToSection('contact')}
          onWhatsAppInquiry={handleOpenWhatsAppRealEstate}
        />

        {/* Section 06: Construction & Turnkey Solutions */}
        <ConstructionServices
          onStartProject={() => scrollToSection('contact')}
        />

        {/* Section 06-B: Interactive 3D Architectural Experience (Three.js) */}
        <Architectural3DViewer />

        {/* Section 07: Featured Projects Showcase */}
        <Projects />

        {/* Section 08: Why Choose Seikou Develops */}
        <WhyChooseUs />

        {/* Section 09: Structured Work Process */}
        <Process />

        {/* Section 10: Client Testimonials & Confidentiality Notice */}
        <TestimonialsNotice />

        {/* Section 11: Contact & Consultation (Dual Form with DPDP Consent Checkbox) */}
        <Contact
          onOpenPrivacyPolicy={() => setActiveLegalDoc('privacy')}
        />
      </main>

      {/* Section 12: Footer with Major Enlarged Logo & Complete Legal Navigation */}
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
