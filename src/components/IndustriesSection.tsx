import React from 'react';
import { industriesData } from '../data/agencyData';
import { IndustryItem, Language } from '../types';
import {
  ShoppingBag,
  Building2,
  Plane,
  Landmark,
  Activity,
  Cpu,
  ShieldCheck,
  Utensils,
  Car,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

interface IndustriesSectionProps {
  lang: Language;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const getIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShoppingBag':
        return ShoppingBag;
      case 'Building2':
        return Building2;
      case 'Plane':
        return Plane;
      case 'Landmark':
        return Landmark;
      case 'Activity':
        return Activity;
      case 'Cpu':
        return Cpu;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Utensils':
        return Utensils;
      case 'Car':
        return Car;
      case 'GraduationCap':
        return GraduationCap;
      default:
        return Building2;
    }
  };

  return (
    <section
      id="industries"
      className="relative py-20 lg:py-28 bg-[#070A14] border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3477BC]/10 border border-[#3477BC]/25 text-sky-400 text-xs font-semibold mb-3 uppercase tracking-wider">
            <span>{isAr ? 'القطاعات والصناعات' : 'Sectors & Verticals'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white mb-4">
            {isAr ? (
              <>
                قطاعات نعمل معها{' '}
                <span className="brand-gradient-text">بخبرة وتخصص عميق</span>
              </>
            ) : (
              <>
                INDUSTRIES WE SERVE WITH{' '}
                <span className="brand-gradient-text">DEEP SPECIALIZATION</span>
              </>
            )}
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            {isAr
              ? 'نمتلك فهماً معمقاً لمتطلبات التسويق وسلوك العملاء في مختلف القطاعات الاقتصادية الحيوية.'
              : 'Our strategic and creative solutions are tailored to the distinct regulatory, consumer, and competitive dynamics of each industry.'}
          </p>
        </div>

        {/* 4 Industries Compact Grid (At most 4 cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {industriesData.slice(0, 4).map((ind, idx) => {
            const Icon = getIndustryIcon(ind.iconName);

            return (
              <div
                key={ind.id}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="bg-[#0B1120] hover:bg-[#0F172A] border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition-all duration-200 group flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-sky-400 group-hover:bg-[#3477BC] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>

                    {ind.growthStat && (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                        {ind.growthStat}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-sky-300 transition-colors">
                    {isAr ? ind.nameAr : ind.name}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {isAr ? ind.descriptionAr : ind.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                  {(isAr ? (ind.keySolutionsAr || ind.solutionsAr || []) : (ind.keySolutions || ind.solutions || []))
                    .slice(0, 2)
                    .map((sol, i) => (
                      <span
                        key={i}
                        className="text-[10px] text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800"
                      >
                        {sol}
                      </span>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
