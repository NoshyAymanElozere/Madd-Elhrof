import React, { useState } from 'react';
import { portfolioProjects } from '../data/agencyData';
import { PortfolioProject, Language } from '../types';
import { CaseStudyModal } from './CaseStudyModal';
import {
  ArrowUpRight,
  TrendingUp,
  Briefcase,
  Layers,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

interface PortfolioSectionProps {
  lang: Language;
  onRequestProject: (projectTitle: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  lang,
  onRequestProject,
}) => {
  const isAr = lang === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCaseStudy, setActiveCaseStudy] = useState<PortfolioProject | null>(null);

  const categories = [
    { id: 'All', label: 'All Work', labelAr: 'الكل' },
    { id: 'Branding', label: 'Branding', labelAr: 'الهوية والعلامة' },
    { id: 'Digital Marketing', label: 'Digital Marketing', labelAr: 'التسويق الرقمي' },
    { id: 'Social Media', label: 'Social Media', labelAr: 'منصات التواصل' },
    { id: 'Websites', label: 'Websites', labelAr: 'المواقع والتجارب الرقمية' },
    { id: 'Advertising', label: 'Advertising', labelAr: 'الحملات والإعلانات' },
    { id: 'Content Creation', label: 'Production', labelAr: 'صناعة المحتوى والإنتاج' },
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="portfolio"
      className="relative py-20 lg:py-28 bg-[#080B14] border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3477BC]/10 border border-[#3477BC]/25 text-sky-400 text-xs font-semibold mb-3 uppercase tracking-wider">
              <span>{isAr ? 'أعمال موثقة تصنع الفارق' : 'Selected Commercial Portfolio'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white">
              {isAr ? (
                <>
                  أعمال تصنع{' '}
                  <span className="brand-gradient-text">فرقاً حقيقياً لعملائنا</span>
                </>
              ) : (
                <>
                  SELECTED WORK THAT{' '}
                  <span className="brand-gradient-text">DRIVES REAL IMPACT</span>
                </>
              )}
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-300 max-w-md">
            {isAr
              ? 'مجموعة مختارة من المشاريع والحملات التي أدارتها الوكالة لتحقيق نمو استثنائي وتعزيز الحضور السوقي.'
              : 'A curated showcase of strategic campaigns, high-converting platforms, and brand transformations engineered for market leaders.'}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-[#3477BC] to-[#2559CC] text-white shadow-sm font-bold'
                  : 'bg-[#0B1120] text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {isAr ? cat.labelAr : cat.label}
            </button>
          ))}
        </div>

        {/* 6-8 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveCaseStudy(project)}
              className="group bg-[#0B1120] hover:bg-[#0F172A] rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all duration-300 flex flex-col cursor-pointer shadow-md"
            >
              {/* Image Container */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={isAr ? project.titleAr : project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-black/20 to-transparent" />

                {/* Top Category Badge */}
                <div className="absolute top-3.5 left-3.5 rtl:left-auto rtl:right-3.5 z-10">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-300 bg-black/75 px-3 py-1 rounded-lg border border-white/10 backdrop-blur-md">
                    {isAr ? project.categoryAr : project.category}
                  </span>
                </div>

                {/* Top Quick Open Button */}
                <div className="absolute top-3.5 right-3.5 rtl:right-auto rtl:left-3.5 z-10 w-8 h-8 rounded-lg bg-black/75 border border-white/15 flex items-center justify-center text-slate-300 group-hover:text-white group-hover:bg-[#3477BC] transition-colors">
                  <ArrowUpRight className={`w-4 h-4 ${isAr ? 'rotate-90' : ''}`} />
                </div>

                {/* Bottom Metric Pill */}
                {(project.resultMetric || project.statsHighlight) && (
                  <div className="absolute bottom-3.5 left-3.5 rtl:left-auto rtl:right-3.5 z-10 flex items-center gap-1.5 bg-[#060913]/90 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-3 py-1 rounded-lg backdrop-blur-md">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{(project.resultMetric || project.statsHighlight)?.value}</span>
                    <span className="text-[11px] font-normal text-slate-300">
                      {isAr
                        ? (project.resultMetric || project.statsHighlight)?.labelAr
                        : (project.resultMetric || project.statsHighlight)?.label}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Meta & Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                    <span className="font-semibold text-sky-400">
                      {isAr ? project.clientAr : project.client}
                    </span>
                    <span>{isAr ? project.industryAr : project.industry}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                    {isAr ? project.titleAr : project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2 mb-4">
                    {isAr
                      ? (project.shortDescAr || project.descriptionAr)
                      : (project.shortDesc || project.description)}
                  </p>
                </div>

                {/* Bottom Button */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="font-semibold text-sky-400 flex items-center gap-1 group-hover:underline">
                    <span>{isAr ? 'عرض دراسة الحالة كاملة' : 'View Full Case Study'}</span>
                    {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </span>
                  <span className="text-slate-400 text-[11px] font-mono">
                    {project.year || project.caseStudy?.year}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      {activeCaseStudy && (
        <CaseStudyModal
          caseStudy={activeCaseStudy}
          lang={lang}
          onClose={() => setActiveCaseStudy(null)}
          onRequestProject={(title) => {
            setActiveCaseStudy(null);
            onRequestProject(title);
          }}
        />
      )}
    </section>
  );
};
