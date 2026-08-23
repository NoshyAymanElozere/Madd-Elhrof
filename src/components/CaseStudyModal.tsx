import React from 'react';
import { PortfolioProject, Language } from '../types';
import {
  X,
  TrendingUp,
  Target,
  Sparkles,
  Award,
  CheckCircle2,
  Calendar,
  Clock,
  Building,
  Quote,
} from 'lucide-react';

interface CaseStudyModalProps {
  project: PortfolioProject | null;
  lang: Language;
  onClose: () => void;
  onRequestSimilarProject: (projectTitle: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  lang,
  onClose,
  onRequestSimilarProject,
}) => {
  if (!project) return null;

  const isAr = lang === 'ar';
  const { caseStudy } = project;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-5xl my-auto bg-[#0A0E1A] border border-[#3477BC]/40 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 transition-all shadow-md"
          aria-label="Close case study modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Header of Case Study */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#3477BC]/25 border border-[#3477BC]/50 text-sky-300">
              {isAr ? project.categoryAr : project.category}
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-sky-400" />
              {isAr ? caseStudy.industryAr : caseStudy.industry}
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              {caseStudy.duration}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black font-heading text-white mb-3">
            {isAr ? project.titleAr : project.title}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            {isAr ? caseStudy.summaryAr : caseStudy.summary}
          </p>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden mb-10 border border-slate-800 shadow-xl group">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
            <span className="text-xs font-bold text-slate-200 bg-[#080B14]/80 px-3 py-1.5 rounded-lg backdrop-blur-md border border-slate-700">
              Client: {isAr ? caseStudy.clientAr : caseStudy.client}
            </span>
            {(project.resultMetric || project.statsHighlight) && (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-lg backdrop-blur-md border border-emerald-700/50">
                {(project.resultMetric || project.statsHighlight)?.value}{' '}
                {isAr
                  ? (project.resultMetric || project.statsHighlight)?.labelAr
                  : (project.resultMetric || project.statsHighlight)?.label}
              </span>
            )}
          </div>
        </div>

        {/* Key Results Cards (Section 10 Requirement: Performance Statistics) */}
        <div className="mb-10">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>{isAr ? 'النتائج ومؤشرات الأداء المحققة' : 'Verified Performance & Impact'}</span>
          </h3>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {caseStudy.results.map((res, idx) => (
              <div
                key={idx}
                className="glass-panel p-5 rounded-2xl border border-[#3477BC]/30 relative overflow-hidden"
              >
                <div className="text-2xl sm:text-3xl font-black font-heading text-white brand-gradient-text mb-1">
                  {res.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-200 mb-1">
                  {isAr ? res.metricAr : res.metric}
                </div>
                <div className="text-[11px] text-slate-400">
                  {isAr ? res.sublabelAr : res.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Challenge, Strategy, Creative Solution 3-Column Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* 1. Challenge */}
          <div className="glass-panel p-6 rounded-2xl border border-red-500/20 bg-red-950/10">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm uppercase tracking-wider mb-3">
              <Target className="w-4 h-4" />
              <span>{isAr ? 'التحدي والمشكلة' : 'The Challenge'}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isAr ? caseStudy.challengeAr : caseStudy.challenge}
            </p>
          </div>

          {/* 2. Strategy */}
          <div className="glass-panel p-6 rounded-2xl border border-sky-500/20 bg-sky-950/10">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-sm uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4" />
              <span>{isAr ? 'الاستراتيجية التنافسية' : 'The Strategy'}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isAr ? caseStudy.strategyAr : caseStudy.strategy}
            </p>
          </div>

          {/* 3. Creative Solution */}
          <div className="glass-panel p-6 rounded-2xl border border-emerald-500/20 bg-emerald-950/10">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider mb-3">
              <Award className="w-4 h-4" />
              <span>{isAr ? 'الحل الإبداعي والتنفيذي' : 'The Creative Solution'}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isAr ? caseStudy.solutionAr : caseStudy.solution}
            </p>
          </div>
        </div>

        {/* Execution Steps */}
        <div className="mb-10">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
            {isAr ? 'خطوات التنفيذ والإنجاز' : 'Key Execution Milestones'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(isAr ? caseStudy.executionAr : caseStudy.execution).map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0F1526] border border-slate-800 text-xs sm:text-sm text-slate-300"
              >
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Comparison Chart / Visual Bars */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 mb-10">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-6 flex items-center justify-between">
            <span>{isAr ? 'منحنى مضاعفة النمو عبر الفترات' : 'Performance Trajectory vs Baseline'}</span>
            <span className="text-[11px] text-sky-400 font-semibold">{isAr ? 'مقارنة قياسية' : 'Indexed Growth'}</span>
          </h3>

          <div className="space-y-4">
            {caseStudy.chartData.map((data, idx) => {
              const maxVal = Math.max(...caseStudy.chartData.map((d) => d.performance));
              const perfWidth = Math.min((data.performance / maxVal) * 100, 100);
              const baseWidth = Math.min((data.baseline / maxVal) * 100, 100);

              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
                    <span>{data.period}</span>
                    <span className="text-sky-300 font-bold">
                      {data.performance.toLocaleString()} ({isAr ? 'أداء الحملة' : 'Midad Performance'})
                    </span>
                  </div>
                  {/* Visual Bar Comparison */}
                  <div className="relative w-full h-3.5 bg-slate-900 rounded-full overflow-hidden flex items-center">
                    {/* Baseline Bar */}
                    <div
                      style={{ width: `${baseWidth}%` }}
                      className="h-full bg-slate-700/60 rounded-full"
                    />
                    {/* Performance Bar Overlay */}
                    <div
                      style={{ width: `${perfWidth}%` }}
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#3477BC] via-[#2559CC] to-[#38bdf8] rounded-full shadow-sm"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Client Testimonial Quote */}
        {caseStudy.testimonialQuote && (
          <div className="glass-panel p-6 rounded-2xl border border-[#3477BC]/30 bg-gradient-to-r from-[#0F1526] to-[#131B31] mb-8 relative">
            <Quote className="w-8 h-8 text-[#3477BC]/30 absolute top-4 right-4" />
            <p className="text-sm sm:text-base italic text-slate-200 mb-4 relative z-10">
              "{caseStudy.testimonialQuote}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3477BC] to-[#2559CC] flex items-center justify-center text-white font-bold text-sm">
                {caseStudy.testimonialAuthor?.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-bold text-white">{caseStudy.testimonialAuthor}</div>
                <div className="text-xs text-slate-400">{caseStudy.testimonialRole}</div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Bottom Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/80 border border-slate-700"
          >
            {isAr ? 'إغلاق' : 'Close Case Study'}
          </button>

          <button
            type="button"
            onClick={() => {
              const title = isAr ? project.titleAr : project.title;
              onClose();
              onRequestSimilarProject(title);
            }}
            className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#3477BC] via-[#2559CC] to-[#322366] hover:from-[#38bdf8] hover:via-[#2559CC] shadow-lg transition-all"
          >
            {isAr ? 'طلب مشروع مماثل لنشاطك' : 'Request Similar Project for Your Brand'}
          </button>
        </div>
      </div>
    </div>
  );
};
