import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { Language } from '../types';
import {
  Menu,
  X,
  Globe2,
  ArrowRight,
  ArrowLeft,
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
    { id: 'services', label: 'Services', labelAr: 'خدماتنا' },
    { id: 'portfolio', label: 'Work', labelAr: 'أعمالنا' },
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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white border-b border-slate-200 shadow-sm h-20"
    >
      <div className="w-full h-full px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Logo without background or animation */}
        <div
          onClick={() => scrollToSection('hero')}
          className="cursor-pointer flex items-center justify-center transition-opacity hover:opacity-90"
        >
          <BrandLogo size="custom" isArabic={isAr} />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200 shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${isActive
                  ? 'bg-gradient-to-r from-sky-500 to-[#2559CC] text-white shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
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
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/75 px-3.5 py-1.5 rounded-full border border-slate-200 transition-all cursor-pointer"
            title={isAr ? 'Switch to English' : 'التحويل للغة العربية'}
          >
            <Globe2 className="w-3.5 h-3.5 text-sky-600" />
            <span>{isAr ? 'EN' : 'العربية'}</span>
          </button>

          {/* Primary CTA: "Start Your Project" */}
          <button
            type="button"
            onClick={() => {
              if (onStartProject) onStartProject();
              else scrollToSection('contact');
            }}
            className="flex items-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-[#2559CC] hover:brightness-110 px-4.5 py-1.5 rounded-full shadow-[0_4px_12px_rgba(37,89,204,0.18)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
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
            className="flex items-center gap-1 text-xs text-slate-700 bg-slate-150 px-2.5 py-1.5 rounded-lg border border-slate-250"
          >
            <Globe2 className="w-3 h-3 text-sky-600" />
            <span>{isAr ? 'EN' : 'AR'}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-2xl border-b border-slate-200 px-4 pt-4 pb-6 mt-3 space-y-3 shadow-md">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className={`text-left rtl:text-right px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${activeSection === link.id
                  ? 'bg-[#3477BC] text-white font-semibold'
                  : 'text-slate-650 hover:bg-slate-100'
                  }`}
              >
                {isAr ? link.labelAr : link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onStartProject) onStartProject();
                else scrollToSection('contact');
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-[#2559CC]"
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
