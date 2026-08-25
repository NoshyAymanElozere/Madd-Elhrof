import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CredibilityMetrics } from './components/CredibilityMetrics';
import { ClientsLogoWall } from './components/ClientsLogoWall';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { FeaturedCaseStudies } from './components/FeaturedCaseStudies';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ProcessTimeline } from './components/ProcessTimeline';
import { TestimonialsSection } from './components/TestimonialsSection';
import { IndustriesSection } from './components/IndustriesSection';
import { CTASection } from './components/CTASection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DepartmentDetailView } from './components/DepartmentDetailView';
import { Language, ServiceItem } from './types';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function App() {
  const [lang, setLang] = useState<Language>('ar'); // Default to Arabic with instant EN switch
  const [prefilledScope, setPrefilledScope] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<ServiceItem | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-quad',
    });
  }, []);

  // Handle document direction and font pairing for Arabic vs English
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    if (lang === 'ar') {
      document.body.classList.add('font-arabic');
    } else {
      document.body.classList.remove('font-arabic');
    }
  }, [lang]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleOpenEstimator = (initialService?: string) => {
    if (initialService) {
      setPrefilledScope(lang === 'ar'
        ? `أرغب في الحصول على تسعير وطلب تفاصيل حول: "${initialService}"`
        : `I am interested in obtaining a quote and information about: "${initialService}"`
      );
    } else {
      setPrefilledScope('');
    }
    setSelectedDepartment(null);
    setTimeout(() => {
      scrollToSection('contact');
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#080B14] text-slate-100 selection:bg-[#3477BC] selection:text-white relative">
      {/* 1. Header / Navbar */}
      <Navbar
        lang={lang}
        onLanguageChange={setLang}
        onOpenEstimator={() => handleOpenEstimator()}
        onStartProject={() => {
          setSelectedDepartment(null);
          setTimeout(() => scrollToSection('contact'), 50);
        }}
        onNavClick={(id) => {
          setSelectedDepartment(null);
          setTimeout(() => scrollToSection(id), 50);
        }}
      />

      {selectedDepartment ? (
        <DepartmentDetailView
          service={selectedDepartment}
          lang={lang}
          onClose={() => {
            setSelectedDepartment(null);
            setTimeout(() => {
              scrollToSection('services');
            }, 80);
          }}
          onStartEstimate={(serviceTitle) => {
            handleOpenEstimator(serviceTitle);
          }}
        />
      ) : (
        /* Main 15-Section Corporate Flow */
        <main>
          {/* 2. Hero Section */}
          <Hero
            lang={lang}
            onOpenEstimator={() => handleOpenEstimator()}
            onExploreWork={() => scrollToSection('portfolio')}
            onStartProject={() => scrollToSection('contact')}
          />

          {/* 3. Credibility Metrics Strip */}
          <CredibilityMetrics lang={lang} />

          {/* 4. Clients / Trusted Partners Logo Wall */}
          <ClientsLogoWall lang={lang} />

          {/* 5. Core Services Section (7 core services) */}
          <ServicesSection
            lang={lang}
            onSelectService={setSelectedDepartment}
            onSelectServiceForEstimate={(sTitle) => handleOpenEstimator(sTitle)}
          />

          {/* 6. Featured Work / Portfolio */}
          <PortfolioSection
            lang={lang}
            onRequestProject={(projectTitle) => {
              setPrefilledScope(`Interested in a project similar to: "${projectTitle}"`);
              scrollToSection('contact');
            }}
          />

          {/* 7. Documented Case Studies (Client, Challenge, Solution, Result) */}
          <FeaturedCaseStudies
            lang={lang}
            onSelectProjectForEstimate={(pName) => {
              setPrefilledScope(`Inquiry inspired by Case Study: "${pName}"`);
              scrollToSection('contact');
            }}
          />

          {/* 8. About Section (Mission, Vision, Philosophy & Team Photos) */}
          <AboutSection lang={lang} />

          {/* 9. Why Choose Us (5 Sharp Direct Pillars) */}
          <WhyChooseUs lang={lang} />

          {/* 10. Process / Workflow (5 Clear Steps) */}
          <ProcessTimeline lang={lang} />

          {/* 11. Testimonials / Client Feedback */}
          <TestimonialsSection lang={lang} />

          {/* 12. Industries We Serve (8 Compact Sectors) */}
          <IndustriesSection lang={lang} />

          {/* 13. Call to Action (CTA) */}
          <CTASection
            lang={lang}
            onStartProject={() => scrollToSection('contact')}
            onOpenEstimator={() => handleOpenEstimator()}
          />

          {/* 14. Contact Us / RFP Proposal Section */}
          <ContactSection
            lang={lang}
            prefilledScope={prefilledScope}
          />
        </main>
      )}

      {/* 15. Complete Corporate Footer */}
      <Footer
        lang={lang}
        onOpenEstimator={() => handleOpenEstimator()}
      />
    </div>
  );
}
