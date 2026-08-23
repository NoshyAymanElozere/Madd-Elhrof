import React, { useState } from 'react';
import { coreServices } from '../data/agencyData';
import { ServiceItem, Language } from '../types';
import {
  Sparkles,
  TrendingUp,
  Share2,
  Clapperboard,
  Megaphone,
  Globe,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  X,
  Send,
  Zap,
} from 'lucide-react';

interface ServicesSectionProps {
  lang: Language;
  onSelectServiceForEstimate: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  onSelectServiceForEstimate,
}) => {
  const isAr = lang === 'ar';
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return Sparkles;
      case 'TrendingUp':
        return TrendingUp;
      case 'Share2':
        return Share2;
      case 'Clapperboard':
        return Clapperboard;
      case 'Megaphone':
        return Megaphone;
      case 'Globe':
        return Globe;
      default:
        return Sparkles;
    }
  };

  return (
    <section
      id="services"
      className="relative py-20 lg:py-28 bg-[#070A14] border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3477BC]/10 border border-[#3477BC]/25 text-sky-400 text-xs font-semibold mb-3 uppercase tracking-wider">
            <span>{isAr ? 'مجالات خبرتنا الأساسية' : 'Core Capabilities'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white mb-4">
            {isAr ? (
              <>
                خدمات متكاملة تصنع{' '}
                <span className="brand-gradient-text">حضوراً مؤثراً لعلامتك</span>
              </>
            ) : (
              <>
                STRATEGIC SERVICES DESIGNED FOR{' '}
                <span className="brand-gradient-text">MEASURABLE IMPACT</span>
              </>
            )}
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            {isAr
              ? 'نركز على الخدمات الأساسية التي تبني العلامة التجارية وتضاعف مبيعاتها عبر منظومة متناغمة من الاستراتيجية، الإبداع، والأداء الرقمي.'
              : 'Focused on the foundational disciplines required to establish market authority, scale customer acquisition, and maximize long-term enterprise value.'}
          </p>
        </div>

        {/* Core Services Grid (4 cards maximum in one row on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {coreServices.slice(0, 4).map((service, idx) => {
            const Icon = getIcon(service.iconName);

            return (
              <div
                key={service.id}
                data-aos="fade-up"
                data-aos-delay={idx * 150}
                className="bg-[#0B1120] hover:bg-[#0F172A] border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-md"
              >
                {/* Visual Photography Header */}
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={service.image}
                    alt={isAr ? service.titleAr : service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-black/30" />

                  {/* Service Number & Icon Badge */}
                  <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 flex items-center gap-2">
                    <span className="text-xs font-mono font-black text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                      {service.number}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 w-10 h-10 rounded-xl bg-[#0B1120] border border-slate-700 flex items-center justify-center text-sky-400 group-hover:bg-[#3477BC] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-sky-300 transition-colors line-clamp-2">
                      {isAr ? service.titleAr : service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 line-clamp-3">
                      {isAr ? service.shortDescAr : service.shortDesc}
                    </p>

                    {/* Key Deliverables Checkpoints (3 items) */}
                    <div className="space-y-2 mb-6">
                      {((isAr ? service.keyDeliverablesAr : service.keyDeliverables) || [])
                        .slice(0, 3)
                        .map((deliv, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 flex-shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{deliv}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className="text-xs font-semibold text-sky-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>{isAr ? 'اكتشف الخدمة' : 'Explore Service'}</span>
                      {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectServiceForEstimate(isAr ? service.titleAr : service.title)}
                      className="text-[11px] font-medium text-slate-400 hover:text-sky-300 bg-slate-800/60 px-2.5 py-1 rounded-lg border border-slate-700/60 cursor-pointer"
                    >
                      {isAr ? 'طلب تسعير' : 'Get Quote'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Detailed Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#0B1120] border border-slate-700 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            {/* Header with Image */}
            <div className="relative h-48 bg-slate-900">
              <img
                src={selectedService.image}
                alt={isAr ? selectedService.titleAr : selectedService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-black/40 to-transparent" />

              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 rtl:left-auto rtl:right-6">
                <span className="text-xs font-mono font-bold text-sky-400 bg-black/60 px-2.5 py-0.5 rounded border border-sky-400/30">
                  {selectedService.number} — {isAr ? selectedService.categoryAr : selectedService.category}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {isAr ? selectedService.titleAr : selectedService.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {isAr ? 'عن الخدمة والقيمة المضافة' : 'Overview & Business Value'}
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {isAr ? selectedService.fullDescAr : selectedService.fullDesc}
                </p>
              </div>

              {/* Deliverables */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  {isAr ? 'المخرجات الرئيسية للخدمة' : 'Key Deliverables & Capabilities'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(isAr ? selectedService.keyDeliverablesAr : selectedService.keyDeliverables).map(
                    (item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Business Impact Note */}
              <div className="p-4 rounded-xl bg-[#3477BC]/10 border border-[#3477BC]/30 text-xs text-sky-200">
                <div className="font-bold mb-1">{isAr ? 'الأثر التجاري المتوقع:' : 'Commercial Impact:'}</div>
                <div>{isAr ? selectedService.businessImpactAr : selectedService.businessImpact}</div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-[#080B14] border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>

              <button
                type="button"
                onClick={() => {
                  const title = isAr ? selectedService.titleAr : selectedService.title;
                  setSelectedService(null);
                  onSelectServiceForEstimate(title);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#3477BC] to-[#2559CC] hover:brightness-110 flex items-center gap-2"
              >
                <span>{isAr ? 'طلب هذه الخدمة لمشروعي' : 'Inquire for Your Project'}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
