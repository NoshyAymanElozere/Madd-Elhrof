import React from 'react';
import { Hero3DCanvas } from './3d/Hero3DCanvas';
import { Language } from '../types';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Layers,
  Award,
  TrendingUp,
} from 'lucide-react';

interface HeroProps {
  lang: Language;
  onOpenEstimator: () => void;
  onExploreWork: () => void;
  onStartProject: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onOpenEstimator,
  onExploreWork,
  onStartProject,
}) => {
  const isAr = lang === 'ar';

  return (
    <section
      id="hero"
      className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-radial-gradient bg-grid-pattern"
    >
      {/* Ambient Lighting Gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#3477BC]/12 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[#322366]/20 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Short Credibility Badge */}
            <div
              id="hero-badge"
              data-aos="fade-up"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F1526] border border-[#3477BC]/30 text-sky-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>
                {isAr
                  ? 'وكالة متكاملة للدعاية والتسويق الرقمي'
                  : 'Integrated Advertising & Digital Marketing Agency'}
              </span>
            </div>

            {/* Main Headline */}
            <h1
              id="hero-headline"
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-[1.12] text-white mb-6"
            >
              {isAr ? (
                <>
                  نحوّل الأفكار إلى{' '}
                  <span className="brand-gradient-text block sm:inline">
                    نتائج تصنع الفرق
                  </span>
                </>
              ) : (
                <>
                  TRANSFORMING IDEAS INTO{' '}
                  <span className="brand-gradient-text block">
                    MEASURABLE RESULTS
                  </span>
                </>
              )}
            </h1>

            {/* Supporting Text */}
            <p
              id="hero-subtext"
              data-aos="fade-up"
              data-aos-delay="200"
              className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8 font-normal"
            >
              {isAr
                ? 'نقدّم حلولاً متكاملة في الإعلان والتسويق الرقمي وبناء الهوية البصرية وصناعة المحتوى، لمساعدة العلامات التجارية على النمو والوصول إلى جمهورها بفعالية وبأعلى معايير الإتقان.'
                : 'We deliver integrated solutions across advertising, performance digital marketing, brand identity, and commercial content production, helping ambitious brands scale their market share with precision.'}
            </p>

            {/* CTAs */}
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <button
                type="button"
                id="hero-cta-primary"
                onClick={onStartProject}
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-[#3477BC] via-[#2559CC] to-[#322366] hover:brightness-110 shadow-[0_10px_30px_rgba(52,119,188,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3"
              >
                <span>{isAr ? 'ابدأ مشروعك' : 'Start Your Project'}</span>
                {isAr ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
              </button>

              <button
                type="button"
                id="hero-cta-secondary"
                onClick={onExploreWork}
                className="w-full sm:w-auto px-7 py-4 rounded-xl text-sm sm:text-base font-semibold text-slate-200 bg-[#0F1526] hover:bg-[#151D33] border border-slate-700 hover:border-[#3477BC] shadow-sm transition-all flex items-center justify-center gap-2.5"
              >
                <Layers className="w-5 h-5 text-sky-400" />
                <span>{isAr ? 'استكشف أعمالنا' : 'Explore Portfolio'}</span>
              </button>
            </div>
          </div>

          {/* Right Visual Column (Subtle 3D Art Direction & Editorial Agency Teaser) */}
          <div
            data-aos="zoom-in"
            data-aos-delay="200"
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Visual Canvas Container */}
            <div className="relative w-full max-w-[480px] aspect-square rounded-3xl bg-gradient-to-b from-[#0F1526]/80 to-[#080B14]/90 border border-slate-800 p-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center">
              {/* Subtle Ambient Radial Backlight */}
              <div className="absolute inset-0 bg-radial-gradient opacity-60 pointer-events-none" />

              {/* 3D Titanium & Sapphire Precision Sculpture */}
              <div className="w-full h-full">
                <Hero3DCanvas />
              </div>

              {/* Floating Corporate Credibility Badge (Bottom Corner) */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 bg-[#0B1120]/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-3.5 flex items-center justify-between shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#3477BC]/20 border border-[#3477BC]/40 flex items-center justify-center text-sky-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">
                      {isAr ? 'شريك نمو معتمد' : 'Verified Growth Partner'}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {isAr ? 'استراتيجية، إبداع، وأداء' : 'Strategy • Creative • Performance'}
                    </div>
                  </div>
                </div>

                <div className="text-right rtl:text-left">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                    <TrendingUp className="w-3 h-3" />
                    <span>+120 {isAr ? 'مشروع' : 'Projects'}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
