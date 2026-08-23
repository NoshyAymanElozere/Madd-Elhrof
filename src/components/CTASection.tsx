import React from 'react';
import { CTA3DCanvas } from './3d/CTA3DCanvas';
import { Language } from '../types';
import { Sparkles, ArrowRight, ArrowLeft, Calendar, Calculator } from 'lucide-react';

interface CTASectionProps {
  lang: Language;
  onStartProject: () => void;
  onOpenEstimator: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({
  lang,
  onStartProject,
  onOpenEstimator,
}) => {
  const isAr = lang === 'ar';

  return (
    <section
      id="cta"
      className="relative py-24 lg:py-32 bg-[#060913] border-t border-slate-800 overflow-hidden"
    >
      {/* Subtle 3D Ambient Ring Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <CTA3DCanvas />
      </div>

      {/* Ambient Lighting Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#3477BC]/12 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge */}
        <div
          data-aos="fade-up"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1120] border border-[#3477BC]/30 text-sky-400 text-xs font-semibold mb-6 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span>{isAr ? 'جاهز لبناء حضور حقيقي لعلامتك؟' : 'Ready to Elevate Your Market Presence?'}</span>
        </div>

        {/* Headline */}
        <h2
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white mb-6 leading-tight"
        >
          {isAr ? (
            <>
              لديك فكرة؟{' '}
              <span className="brand-gradient-text">دعنا نحولها إلى نتيجة.</span>
            </>
          ) : (
            <>
              HAVE A VISION?{' '}
              <span className="brand-gradient-text">LET'S TURN IT INTO IMPACT.</span>
            </>
          )}
        </h2>

        {/* Supporting Text */}
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          {isAr
            ? 'شاركنا أهدافك وسنساعدك في بناء الحل المناسب لعلامتك التجارية وفق خطة استراتيجية وتنفيذ احترافي.'
            : 'Share your business goals with our strategists, and let us engineer the optimal roadmap to scale your audience and commercial revenue.'}
        </p>

        {/* CTAs */}
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={onStartProject}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-[#3477BC] via-[#2559CC] to-[#322366] hover:brightness-110 shadow-[0_10px_30px_rgba(52,119,188,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3"
          >
            <span>{isAr ? 'ابدأ مشروعك' : 'Start Your Project'}</span>
            {isAr ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
          </button>

          <button
            type="button"
            onClick={onOpenEstimator}
            className="w-full sm:w-auto px-7 py-4 rounded-xl text-sm sm:text-base font-semibold text-slate-200 bg-[#0B1120] hover:bg-[#131B31] border border-slate-700 hover:border-sky-400 transition-all flex items-center justify-center gap-2.5"
          >
            <Calculator className="w-5 h-5 text-sky-400" />
            <span>{isAr ? 'احجز استشارة / حاسبة التكلفة' : 'Book Consultation / Scope Tool'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
