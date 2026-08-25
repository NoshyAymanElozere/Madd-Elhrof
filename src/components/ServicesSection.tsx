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
  FileText,
  Package,
  Layers,
  ShoppingBag,
  Award,
} from 'lucide-react';

interface ServicesSectionProps {
  lang: Language;
  onSelectService: (service: ServiceItem) => void;
  onSelectServiceForEstimate: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  onSelectService,
  onSelectServiceForEstimate,
}) => {
  const isAr = lang === 'ar';

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
      case 'FileText':
        return FileText;
      case 'Package':
        return Package;
      case 'Layers':
        return Layers;
      case 'ShoppingBag':
        return ShoppingBag;
      case 'Award':
        return Award;
      case 'Zap':
        return Zap;
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

          <p className="text-base text-slate-300 leading-relaxed font-normal">
            {isAr
              ? 'نركز على الخدمات الأساسية التي تبني العلامة التجارية وتضاعف مبيعاتها عبر منظومة متناغمة من الاستراتيجية، الإبداع، والأداء الرقمي.'
              : 'Focused on the foundational disciplines required to establish market authority, scale customer acquisition, and maximize long-term enterprise value.'}
          </p>
        </div>

        {/* Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {coreServices.map((service, idx) => {
            const Icon = getIcon(service.iconName);

            return (
              <div
                key={service.id}
                data-aos="fade-up"
                data-aos-delay={idx * 150}
                onClick={() => onSelectService(service)}
                className="bg-[#0B1120] hover:bg-[#0F172A] border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-md cursor-pointer hover:shadow-2xl hover:shadow-sky-500/5 hover:-translate-y-0.5"
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
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-sky-305 transition-colors line-clamp-2">
                      {isAr ? service.titleAr : service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 line-clamp-3 font-normal">
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
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => onSelectService(service)}
                      className="text-xs font-semibold text-sky-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>{isAr ? 'اكتشف الخدمة' : 'Explore Service'}</span>
                      {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectServiceForEstimate(isAr ? service.titleAr : service.title)}
                      className="text-[11px] font-medium text-[#c4ccd4] hover:text-sky-300 bg-slate-850 px-2.5 py-1 rounded-lg border border-slate-700/60 cursor-pointer"
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
    </section>
  );
};
