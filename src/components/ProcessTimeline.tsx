import React from 'react';
import { processSteps } from '../data/agencyData';
import { Language } from '../types';
import {
  Search,
  Compass,
  Palette,
  Rocket,
  TrendingUp,
  Clock,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface ProcessTimelineProps {
  lang: Language;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search':
        return Search;
      case 'Compass':
        return Compass;
      case 'Palette':
        return Palette;
      case 'Rocket':
        return Rocket;
      case 'TrendingUp':
        return TrendingUp;
      default:
        return Sparkles;
    }
  };

  return (
    <section
      id="process"
      className="relative py-20 lg:py-28 bg-[#070A14] border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3477BC]/10 border border-[#3477BC]/25 text-sky-400 text-xs font-semibold mb-3 uppercase tracking-wider">
            <span>{isAr ? 'منهجية العمل المعتمدة' : 'Our Strategic Process'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white mb-4">
            {isAr ? (
              <>
                منهجية واضحة ومدروسة:{' '}
                <span className="brand-gradient-text">من الفكرة إلى النتيجة</span>
              </>
            ) : (
              <>
                A STRUCTURED WORKFLOW:{' '}
                <span className="brand-gradient-text">FROM VISION TO SCALE</span>
              </>
            )}
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            {isAr
              ? 'نتبع خطوات تنفيذية دقيقة تضمن التنسيق الكامل بين الاستراتيجية والإبداع والأداء الرقمي.'
              : 'A disciplined, 5-phase delivery framework that aligns business objectives with high-velocity creative and technical execution.'}
          </p>
        </div>

        {/* 5-Step Progression Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
          {processSteps.map((step) => {
            const Icon = getStepIcon(step.iconName);

            return (
              <div
                key={step.number}
                className="bg-[#0B1120] hover:bg-[#0F172A] border border-slate-800 hover:border-slate-700 rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group shadow-md"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xl font-mono font-black text-sky-400">
                      {step.number}
                    </span>

                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 group-hover:bg-[#3477BC] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white mb-1 group-hover:text-sky-300 transition-colors">
                    {isAr ? step.titleAr : step.title}
                  </h3>

                  <div className="text-[11px] font-semibold text-sky-400 mb-3">
                    {isAr ? step.subtitleAr : step.subtitle}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {isAr ? step.descriptionAr : step.description}
                  </p>
                </div>

                {/* Duration & Key Deliverable Tag */}
                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                    <Clock className="w-3 h-3 text-sky-400" />
                    <span>{step.duration}</span>
                  </div>

                  <div className="text-[11px] font-medium text-slate-300 bg-slate-900 px-2 py-1 rounded border border-slate-800 line-clamp-1">
                    {isAr ? step.deliverableAr : step.deliverable}
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
