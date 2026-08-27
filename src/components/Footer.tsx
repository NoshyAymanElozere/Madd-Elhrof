import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { Language } from '../types';
import { agencyInfo } from '../data/agencyData';
import {
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  ArrowUp,
  Mail,
  Send,
  MapPin,
  Phone,
  CheckCircle2,
} from 'lucide-react';

interface FooterProps {
  lang: Language;
  onOpenEstimator: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenEstimator }) => {
  const isAr = lang === 'ar';
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setNewsletterEmail('');
  };

  const quickLinks = [
    { id: 'hero', label: 'Home', labelAr: 'الرئيسية' },
    { id: 'about', label: 'About Agency', labelAr: 'من نحن' },
    { id: 'services', label: 'Services', labelAr: 'خدماتنا' },
    { id: 'portfolio', label: 'Selected Work', labelAr: 'أعمالنا' },
    { id: 'case-studies', label: 'Case Studies', labelAr: 'دراسات الحالة' },
    { id: 'why-us', label: 'Why Us', labelAr: 'لماذا نحن' },
    { id: 'process', label: 'Our Process', labelAr: 'منهجيتنا' },
    { id: 'testimonials', label: 'Testimonials', labelAr: 'آراء العملاء' },
    { id: 'industries', label: 'Industries', labelAr: 'القطاعات' },
    { id: 'contact', label: 'Contact Us', labelAr: 'تواصل معنا' },
  ];

  const serviceLinks = [
    { title: 'Brand Strategy & Identity', titleAr: 'الهوية والعلامة التجارية' },
    { title: 'Performance Digital Marketing', titleAr: 'التسويق الرقمي والأداء' },
    { title: 'Social Media Management', titleAr: 'إدارة منصات التواصل الاجتماعي' },
    { title: 'Content & Studio Production', titleAr: 'صناعة المحتوى والإنتاج' },
    { title: 'Advertising & Media Campaigns', titleAr: 'الإعلانات والحملات الاستراتيجية' },
    { title: 'Websites & Digital Experiences', titleAr: 'المواقع والتجارب الرقمية' },
  ];

  return (
    <footer className="relative bg-[#05070D] border-t border-slate-800 pt-16 pb-12 overflow-hidden text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Bio (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div>
              <BrandLogo size="sm" isArabic={isAr} className="mb-4" />
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mb-6">
                {isAr
                  ? 'وكالة متكاملة للدعاية والتسويق الرقمي وبناء الهوية البصرية. نجمع بين التخطيط الاستراتيجي الصارم والإبداع الفني رفيع المستوى لتمكين الشركات من الريادة والنمو.'
                  : 'An integrated advertising and digital marketing agency delivering brand strategy, high-conversion digital marketing, and content production to help ambitious brands scale.'}
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-2">
              {[
                { icon: Linkedin, href: agencyInfo.socials.linkedin, label: 'LinkedIn' },
                { icon: Twitter, href: agencyInfo.socials.twitter, label: 'X / Twitter' },
                { icon: Instagram, href: agencyInfo.socials.instagram, label: 'Instagram' },
                { icon: Youtube, href: agencyInfo.socials.youtube, label: 'YouTube' },
              ].map((soc, idx) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={idx}
                    href={soc.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-[#0B1120] border border-slate-800 hover:border-[#3477BC] flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#3477BC] transition-all"
                    aria-label={soc.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Navigation Links (2 Cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {isAr ? 'أقسام الموقع' : 'Navigation'}
            </h4>
            <ul className="space-y-2 text-xs">
              {quickLinks.slice(0, 6).map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-slate-400 hover:text-sky-300 transition-colors"
                  >
                    {isAr ? link.labelAr : link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Core Services List (3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {isAr ? 'خدماتنا الأساسية' : 'Core Services'}
            </h4>
            <ul className="space-y-2 text-xs">
              {serviceLinks.map((s, idx) => (
                <li key={idx}>
                  <a
                    href="#services"
                    className="text-slate-400 hover:text-sky-300 transition-colors"
                  >
                    {isAr ? s.titleAr : s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Inquiries (3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {isAr ? 'النشرة الاستراتيجية' : 'Strategic Insights'}
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              {isAr
                ? 'اشترك للحصول على تحليلات دورية حول اتجاهات التسويق الرقمي وسلوك المستهلك.'
                : 'Subscribe to receive monthly briefings on marketing trends, consumer psychology, and market growth.'}
            </p>

            {newsletterSuccess ? (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-600/40 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{isAr ? 'شكراً لاشتراكك في النشرة' : 'Subscribed successfully'}</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={isAr ? 'بريدك الإلكتروني للعمل' : 'Corporate email'}
                  className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#3477BC]"
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#3477BC] to-[#2559CC] hover:brightness-110 flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3 h-3" />
                  <span>{isAr ? 'اشتراك' : 'Subscribe'}</span>
                </button>
              </form>
            )}

            {/* Address & Phone */}
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
                {isAr ? 'العنوان' : 'Address'}
              </h4>
              <p className="text-xs text-slate-400">
                {isAr ? 'الرياض، حي الخالدية، طريق الأصيل' : 'Riyadh, Al Khalidiyah, Al Asil Road'}
              </p>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mt-4 mb-2">
                {isAr ? 'رقم الجوال' : 'Mobile'}
              </h4>
              <p className="text-xs text-slate-400">0535368514</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            {isAr
              ? `© ${new Date().getFullYear()} ${agencyInfo.nameAr}. جميع الحقوق محفوظة.`
              : `© ${new Date().getFullYear()} ${agencyInfo.name}. All rights reserved.`}
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenEstimator}
              className="text-sky-400 hover:underline"
            >
              {isAr ? 'حاسبة نطاق وتكلفة المشاريع' : 'Project Estimator'}
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 p-2 rounded-lg bg-[#0B1120] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>{isAr ? 'للأعلى' : 'Top'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
