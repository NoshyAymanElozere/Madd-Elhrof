import React, { useEffect, useState } from 'react';
import { credibilityStats } from '../data/agencyData';
import { Language } from '../types';
import { TrendingUp, ShieldCheck, Award, Users, CheckCircle2 } from 'lucide-react';

interface CredibilityMetricsProps {
  lang: Language;
}

export const CredibilityMetrics: React.FC<CredibilityMetricsProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [animatedValues, setAnimatedValues] = useState<number[]>(credibilityStats.map(() => 0));

  useEffect(() => {
    const duration = 1500;
    const steps = 30;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setAnimatedValues(
        credibilityStats.map((stat) => Math.floor(stat.numericValue * Math.min(progress, 1)))
      );

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="credibility-metrics"
      className="relative z-20 py-10 bg-[#060913] border-y border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Headline */}
        <div className="text-center mb-8" data-aos="fade-up">
          <span className="text-xs font-bold uppercase tracking-widest text-[#3477BC] bg-[#3477BC]/10 px-3 py-1 rounded-full border border-[#3477BC]/20">
            {isAr ? 'مؤشرات الأداء والخبرة' : 'Track Record & Performance'}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-2">
            {isAr ? 'نمو يعتمد على الخبرة والنتائج الملموسة' : 'Growth Driven by Proven Market Expertise'}
          </h2>
        </div>

        {/* 5 Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {credibilityStats.map((stat, idx) => {
            const isPercentage = stat.value.includes('%');
            const displayValue = isPercentage
              ? `${animatedValues[idx]}%`
              : `+${animatedValues[idx]}`;

            return (
              <div
                key={stat.id}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="bg-[#0B1120] hover:bg-[#0F172A] border border-slate-800 hover:border-slate-700 rounded-2xl p-4 sm:p-5 transition-all flex flex-col justify-between group shadow-sm"
              >
                <div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white group-hover:text-sky-400 transition-colors font-mono mb-1">
                    {displayValue}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-200 mb-1.5 font-sans">
                    {isAr ? stat.labelAr : stat.label}
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                  {isAr ? stat.descriptionAr : stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
