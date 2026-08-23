import React from 'react';
import { whyChooseUsPillars } from '../data/agencyData';
import { Language } from '../types';
import {
  Compass,
  BarChart3,
  Users,
  TrendingUp,
  Handshake,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface WhyChooseUsProps {
  lang: Language;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return Compass;
      case 'BarChart3':
        return BarChart3;
      case 'Users':
        return Users;
      case 'TrendingUp':
        return TrendingUp;
      case 'Handshake':
        return Handshake;
      default:
        return Sparkles;
    }
  };

  return (
    <section
      id="why-us"
      className="relative py-20 lg:py-28 bg-[#080B14] border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3477BC]/10 border border-[#3477BC]/25 text-sky-400 text-xs font-semibold mb-3 uppercase tracking-wider">
            <span>{isAr ? 'القيمة المضافة والشراكة' : 'Our Differentiators'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white mb-4">
            {isAr ? (
              <>
                لماذا تختار الشركات{' '}
                <span className="brand-gradient-text">الشراكة مع وكالتنا؟</span>
              </>
            ) : (
              <>
                WHY INDUSTRY LEADERS{' '}
                <span className="brand-gradient-text">CHOOSE OUR AGENCY</span>
              </>
            )}
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            {isAr
              ? 'نبتعد عن العبارات التسويقية العامة ونقدم منهجية عمل واضحة وصارمة تضمن تحقيق نتائج حقيقية وتجربة تعاون استثنائية.'
              : 'We replace vague marketing promises with strict execution standards, transparent communication, and relentless commercial accountability.'}
          </p>
        </div>

        {/* 5 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUsPillars.map((pillar) => {
            const Icon = getPillarIcon(pillar.iconName);

            return (
              <div
                key={pillar.id}
                className="bg-[#0B1120] hover:bg-[#0F172A] border border-slate-800 hover:border-slate-700 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group shadow-md"
              >
                <div>
                  {/* Top Bar: Icon & Number */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-[#3477BC]/15 border border-[#3477BC]/30 flex items-center justify-center text-sky-400 group-hover:bg-[#3477BC] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="text-xs font-mono font-bold text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                      {pillar.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-sky-300 transition-colors">
                    {isAr ? pillar.titleAr : pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                    {isAr ? pillar.descriptionAr : pillar.description}
                  </p>
                </div>

                {/* Bottom Proof Tag */}
                <div className="pt-3.5 border-t border-slate-800/80 flex items-center gap-2 text-xs font-medium text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{isAr ? pillar.proofPointAr : pillar.proofPoint}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
