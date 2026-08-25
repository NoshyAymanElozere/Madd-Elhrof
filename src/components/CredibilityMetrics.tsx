import React, { useEffect, useState, useRef } from 'react';
import { credibilityStats } from '../data/agencyData';
import { Language } from '../types';
import { TrendingUp, ShieldCheck, Award, Users, CheckCircle2 } from 'lucide-react';

interface CredibilityMetricsProps {
  lang: Language;
}

export const CredibilityMetrics: React.FC<CredibilityMetricsProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [animatedValues, setAnimatedValues] = useState<number[]>(credibilityStats.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);

  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return CheckCircle2;
      case 1:
        return Users;
      case 2:
        return Award;
      case 3:
        return TrendingUp;
      case 4:
        return ShieldCheck;
      default:
        return Award;
    }
  };

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    let timer: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          let currentStep = 0;
          const duration = 1800; // slightly slower for better readability
          const steps = 50;
          const stepTime = duration / steps;

          // Clear any active timer before starting a new one
          clearInterval(timer);

          timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;

            // easeOutQuad easing curve: f(t) = t * (2 - t)
            const easedProgress = progress * (2 - progress);

            setAnimatedValues(
              credibilityStats.map((stat) =>
                Math.floor(stat.numericValue * Math.min(easedProgress, 1))
              )
            );

            if (currentStep >= steps) {
              clearInterval(timer);
            }
          }, stepTime);
        } else {
          // Reset to 0 when scrolled away, so it animates again on return
          clearInterval(timer);
          setAnimatedValues(credibilityStats.map(() => 0));
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);

    return () => {
      clearInterval(timer);
      observer.unobserve(node);
    };
  }, []);

  return (
    <section
      id="credibility-metrics"
      ref={sectionRef}
      className="relative z-20 py-20 bg-[#070A14] border-y border-slate-900 overflow-hidden"
    >
      {/* Background visual glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#3477BC]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Headline */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3477BC]/10 border border-[#3477BC]/25 text-sky-400 text-xs font-semibold mb-3 uppercase tracking-wider">
            <span>{isAr ? 'مؤشرات الأداء والخبرة' : 'Track Record & Performance'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-white mt-2">
            {isAr ? 'نمو يعتمد على الخبرة والنتائج الملموسة' : 'Growth Driven by Proven Market Expertise'}
          </h2>
        </div>

        {/* 5 Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {credibilityStats.map((stat, idx) => {
            const Icon = getIcon(idx);
            const isPercentage = stat.value.includes('%');
            const displayValue = isPercentage
              ? `${animatedValues[idx]}%`
              : `${animatedValues[idx]}+`;

            return (
              <div
                key={stat.id}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="group relative bg-[#0B1120] hover:bg-[#0F172A] border border-slate-800/80 hover:border-slate-700/80 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-[#3477BC]/5 hover:-translate-y-1"
              >
                {/* Decorative top inner border line */}
                <div className="absolute inset-x-6 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#3477BC]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="space-y-4">
                  {/* Glassmorphic Icon Badge */}
                  <div className="w-12 h-12 rounded-2xl bg-[#0F1526] border border-slate-800 flex items-center justify-center text-sky-400 group-hover:bg-[#3477BC] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    {/* Animated Count Styled with Beautiful Blue/Indigo Gradient */}
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono tracking-tight bg-gradient-to-r from-white via-sky-300 to-sky-400 bg-clip-text text-transparent mb-1 select-none">
                      {displayValue}
                    </div>

                    <div className="text-sm font-bold text-slate-100 mb-2 font-heading">
                      {isAr ? stat.labelAr : stat.label}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-900">
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
