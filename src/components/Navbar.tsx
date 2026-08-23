import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { Language } from '../types';
import {
  Menu,
  X,
  Globe2,
  Calculator,
  ArrowRight,
  ArrowLeft,
  Send,
  PhoneCall,
} from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenEstimator: () => void;
  onStartProject?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  onOpenEstimator,
  onStartProject,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const isAr = lang === 'ar';

  const navLinks = [
    { id: 'hero', label: 'Home', labelAr: 'الرئيسية' },
    { id: 'about', label: 'About', labelAr: 'من نحن' },
    { id: 'services', label: 'Services', labelAr: 'خدماتنا' },
    { id: 'portfolio', label: 'Work', labelAr: 'أعمالنا' },
    { id: 'case-studies', label: 'Case Studies', labelAr: 'دراسات الحالة' },
    { id: 'why-us', label: 'Why Us', labelAr: 'لماذا نحن' },
    { id: 'process', label: 'Process', labelAr: 'منهجيتنا' },
    { id: 'testimonials', label: 'Testimonials', labelAr: 'آراء العملاء' },
    { id: 'industries', label: 'Industries', labelAr: 'القطاعات' },
    { id: 'contact', label: 'Contact', labelAr: 'تواصل معنا' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = navLinks.map((link) => document.getElementById(link.id));
      const scrollPos = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080B14]/90 backdrop-blur-xl border-b border-slate-800/80 py-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => scrollToSection('hero')}
          className="cursor-pointer transition-transform hover:opacity-95"
        >
          <BrandLogo size="md" isArabic={isAr} />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0F1526]/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-800 shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#3477BC] to-[#2559CC] text-white shadow-sm font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {isAr ? link.labelAr : link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Language Switcher */}
          <button
            type="button"
            onClick={() => onLanguageChange(lang === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-300 bg-slate-800/60 hover:bg-slate-700/60 px-3 py-2 rounded-xl border border-slate-700/60 transition-colors"
            title={isAr ? 'Switch to English' : 'التحويل للغة العربية'}
          >
            <Globe2 className="w-3.5 h-3.5 text-sky-400" />
            <span>{isAr ? 'EN' : 'العربية'}</span>
          </button>

          {/* Scope & Cost Calculator */}
          <button
            type="button"
            onClick={onOpenEstimator}
            className="hidden xl:flex items-center gap-1.5 text-xs font-medium text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 px-3.5 py-2 rounded-xl border border-slate-700 transition-all shadow-sm"
          >
            <Calculator className="w-3.5 h-3.5 text-sky-400" />
            <span>{isAr ? 'حاسبة التكلفة' : 'Scope Estimator'}</span>
          </button>

          {/* Primary CTA: "Start Your Project" */}
          <button
            type="button"
            onClick={() => {
              if (onStartProject) onStartProject();
              else scrollToSection('contact');
            }}
            className="flex items-center gap-2 text-xs font-semibold text-white bg-gradient-to-r from-[#3477BC] via-[#2559CC] to-[#322366] hover:brightness-110 px-4 py-2 rounded-xl shadow-[0_0_20px_rgba(52,119,188,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{isAr ? 'ابدأ مشروعك' : 'Start Project'}</span>
            {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => onLanguageChange(lang === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-1 text-xs text-slate-300 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700"
          >
            <Globe2 className="w-3 h-3 text-sky-400" />
            <span>{isAr ? 'EN' : 'AR'}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-[#0F1526] border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080B14]/98 backdrop-blur-2xl border-b border-slate-800 px-4 pt-4 pb-6 mt-3 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className={`text-left rtl:text-right px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-[#3477BC] text-white font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                {isAr ? link.labelAr : link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEstimator();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium text-sky-300 bg-[#3477BC]/20 border border-[#3477BC]/40"
            >
              <Calculator className="w-4 h-4 text-sky-400" />
              <span>{isAr ? 'حاسبة نطاق وتكلفة المشروع' : 'Project Scope & Budget Estimator'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onStartProject) onStartProject();
                else scrollToSection('contact');
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#3477BC] to-[#2559CC]"
            >
              <span>{isAr ? 'ابدأ مشروعك الآن' : 'Start Your Project Now'}</span>
              {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
