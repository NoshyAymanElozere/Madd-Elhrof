import React, { useState } from 'react';
import { featuredCaseStudies } from '../data/agencyData';
import { Language, FeaturedCaseStudyItem } from '../types';
import {
  Target,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Building2,
  Layers,
} from 'lucide-react';

interface FeaturedCaseStudiesProps {
  lang: Language;
  onSelectProjectForEstimate: (projectName: string) => void;
}

export const FeaturedCaseStudies: React.FC<FeaturedCaseStudiesProps> = ({
  lang,
  onSelectProjectForEstimate,
}) => {
  const isAr = lang === 'ar';
  const [activeTab, setActiveTab] = useState<number>(0);

  const currentStudy = featuredCaseStudies[activeTab] || featuredCaseStudies[0];

  return (
    <section
      id="case-studies"
      className="relative py-20 lg:py-28 bg-[#060913] border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3477BC]/10 border border-[#3477BC]/25 text-sky-400 text-xs font-semibold mb-3 uppercase tracking-wider">
            <span>{isAr ? 'منهجية معتمدة ونتائج موثقة' : 'Verified Case Studies'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white mb-4">
            {isAr ? (
              <>
                دراسات حالة موثقة:{' '}
                <span className="brand-gradient-text">من التحدي إلى الريادة</span>
              </>
            ) : (
              <>
                DOCUMENTED CASE STUDIES:{' '}
                <span className="brand-gradient-text">FROM CHALLENGE TO SCALE</span>
              </>
            )}
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            {isAr
              ? 'نستعرض هنا تفاصيل منهجيتنا في معالجة التحديات التسويقية المعقدة وتحويلها إلى نمو استثنائي وعائد استثماري مرتفع لعملائنا.'
              : 'Detailed breakdowns of how our integrated strategy, creative execution, and technical rigor transformed commercial performance for industry leaders.'}
          </p>
        </div>

        {/* Tab Selector Buttons for the Case Studies */}
        <div className="flex flex-wrap gap-2.5 mb-8" data-aos="fade-up" data-aos-delay="100">
          {featuredCaseStudies.map((study, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={study.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${isActive
                    ? 'bg-gradient-to-r from-[#3477BC] to-[#2559CC] text-white shadow-md'
                    : 'bg-[#0B1120] text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700'
                  }`}
              >
                <Building2 className="w-3.5 h-3.5 text-sky-300" />
                <span>{isAr ? study.clientAr : study.client}</span>
              </button>
            );
          })}
        </div>

        {/* Active Detailed Case Study Card */}
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="bg-[#0B1120] border border-slate-800 rounded-3xl overflow-hidden shadow-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Side: Visual & High Impact Metrics */}
            <div className="lg:col-span-5 relative flex flex-col justify-between bg-slate-900 overflow-hidden min-h-[340px] lg:min-h-[460px]">
              <img
                src={currentStudy.image}
                alt={isAr ? currentStudy.titleAr : currentStudy.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/60 to-transparent" />

              {/* Top Meta */}
              <div className="relative z-10 p-6 flex items-center justify-between">
                <span className="text-xs font-bold text-sky-300 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                  {isAr ? currentStudy.industryAr : currentStudy.industry}
                </span>
                <span className="text-xs font-semibold text-slate-300 bg-black/60 px-2.5 py-1 rounded-lg">
                  {isAr ? currentStudy.serviceCategoryAr : currentStudy.serviceCategory}
                </span>
              </div>

              {/* Bottom 3 Metrics Overlay */}
              <div className="relative z-10 p-6">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                  {isAr ? 'مؤشرات الأداء المحققة:' : 'Key Performance Metrics:'}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {currentStudy.stats.map((m, idx) => (
                    <div
                      key={idx}
                      className="bg-black/80 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 text-center"
                    >
                      <div className="text-base sm:text-lg font-black text-emerald-400 font-mono">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-slate-300 font-medium leading-tight mt-0.5 line-clamp-2">
                        {isAr ? m.metricAr : m.metric}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Deep Structured Breakdown (Challenge, Solution, Result) */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              <div>
                <div className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-1">
                  {isAr ? currentStudy.clientAr : currentStudy.client}
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-6">
                  {isAr ? currentStudy.titleAr : currentStudy.title}
                </h3>

                {/* Structured Breakdown: Challenge -> Solution -> Result */}
                <div className="space-y-4">
                  {/* Challenge */}
                  <div className="p-4 rounded-xl bg-[#060913] border border-slate-800/80">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5">
                      <Target className="w-3.5 h-3.5" />
                      <span>{isAr ? 'التحدي التجاري (The Challenge)' : 'The Challenge'}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {isAr ? currentStudy.challengeAr : currentStudy.challenge}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="p-4 rounded-xl bg-[#060913] border border-slate-800/80">
                    <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider mb-1.5">
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>{isAr ? 'الحل والمنهجية المنفذة (The Solution)' : 'The Solution & Strategy'}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {isAr ? currentStudy.solutionAr : currentStudy.solution}
                    </p>
                  </div>

                  {/* Result */}
                  <div className="p-4 rounded-xl bg-[#060913] border border-slate-800/80">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isAr ? 'النتيجة والأثر المالي (The Result)' : 'The Commercial Result'}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {isAr ? currentStudy.resultAr : currentStudy.result}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Layers className="w-4 h-4 text-sky-400" />
                  <span>
                    {isAr
                      ? `المجال: ${currentStudy.serviceCategoryAr}`
                      : `Domain: ${currentStudy.serviceCategory}`}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onSelectProjectForEstimate(
                      isAr ? currentStudy.titleAr : currentStudy.title
                    )
                  }
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#3477BC] to-[#2559CC] hover:brightness-110 flex items-center gap-2 shadow-sm transition-all"
                >
                  <span>{isAr ? 'طلب دراسة مشروع مماثل' : 'Inquire Similar Scope'}</span>
                  {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
