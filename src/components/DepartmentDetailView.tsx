import React, { useState } from 'react';
import { ServiceItem, PortfolioProject, Language } from '../types';
import { portfolioProjects } from '../data/agencyData';
import {
    ArrowLeft,
    ArrowRight,
    X,
    Maximize2,
    CheckCircle2,
    Send,
    Building2,
    Briefcase,
    Layers,
} from 'lucide-react';

interface DepartmentDetailViewProps {
    service: ServiceItem;
    lang: Language;
    onClose: () => void;
    onStartEstimate: (serviceTitle: string) => void;
}

export const DepartmentDetailView: React.FC<DepartmentDetailViewProps> = ({
    service,
    lang,
    onClose,
    onStartEstimate,
}) => {
    const isAr = lang === 'ar';
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    // Filter projects associated with this department
    const relatedProjects = portfolioProjects.filter(
        (project) => project.serviceId === service.id
    );

    return (
        <div className="min-h-screen bg-[#070A14] text-slate-100 font-sans relative overflow-x-hidden">
            {/* Background radial effects */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#3477BC]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#322366]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

            {/* Hero Banner header */}
            <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden bg-slate-900 border-b border-slate-800">
                <img
                    src={service.image}
                    alt={isAr ? service.titleAr : service.title}
                    className="w-full h-full object-cover opacity-60 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A14] via-[#070A14]/70 to-transparent" />

                {/* Floating navbar for detials page */}
                <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-[#070A14]/80 to-transparent backdrop-blur-sm z-30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
                        {/* Back Button */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-[#0F1526]/80 hover:bg-[#151D33] border border-slate-700 hover:border-[#3477BC] transition-all cursor-pointer shadow-md"
                        >
                            {isAr ? <ArrowRight className="w-4 h-4 ml-1" /> : <ArrowLeft className="w-4 h-4 mr-1" />}
                            <span>{isAr ? 'العودة للرئيسية' : 'Back to Home'}</span>
                        </button>

                        {/* Quick Title */}
                        <span className="text-xs font-mono font-black text-sky-400 bg-sky-950/40 border border-sky-500/20 px-3.5 py-1 rounded-lg">
                            {service.number} — {isAr ? service.categoryAr : service.category}
                        </span>
                    </div>
                </div>

                {/* Headline Info Area */}
                <div className="absolute bottom-10 inset-x-0 z-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading text-white mb-4 ${isAr ? 'leading-[1.3] text-right' : 'tracking-tight leading-tight text-left'}`}>
                            {isAr ? service.titleAr : service.title}
                        </h1>
                        <p className="text-base sm:text-lg text-slate-200 max-w-3xl leading-relaxed">
                            {isAr ? service.shortDescAr : service.shortDesc}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Details Body */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left Column: Full Description and Related Works */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* Full Division Overview */}
                        <div className="bg-[#0B1120] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                            <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-slate-800 pb-3">
                                {isAr ? 'تفاصيل ونطاق حلول القسم' : 'Overview & Capabilities'}
                            </h2>
                            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                                {isAr ? service.fullDescAr : service.fullDesc}
                            </p>

                            {/* Service Deliverables List */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                {(isAr ? service.keyDeliverablesAr : service.keyDeliverables).map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#0F1526]/80 border border-slate-800 text-xs sm:text-sm text-slate-205"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RELATED PROJECTS FOR THIS DIVISION */}
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-4">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                                        {isAr ? 'أعمالنا ومعارض إنتاج هذا القسم' : 'Division Portfolio & Deliveries'}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                                        {isAr
                                            ? 'مجموعة من الأعمال الواقعية والصفقات المنفذة رسمياً في هذا التخصص لعملائنا.'
                                            : 'Showcase of actual work engineered and custom properties produced in this niche.'}
                                    </p>
                                </div>

                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/25 text-emerald-400 text-xs font-semibold">
                                    <span>{relatedProjects.length} {isAr ? 'أعمال منجزة حقيقية' : 'Official Deliveries'}</span>
                                </div>
                            </div>

                            {relatedProjects.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6sm sm:gap-8">
                                    {relatedProjects.map((project) => (
                                        <div
                                            key={project.id}
                                            onClick={() => setLightboxImage(project.image)}
                                            className="group bg-[#0B1120] hover:bg-[#0F172A] rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all duration-300 cursor-pointer shadow-md flex flex-col justify-between"
                                        >
                                            {/* Image Preview Container */}
                                            <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                                                <img
                                                    src={project.image}
                                                    alt={isAr ? project.titleAr : project.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-black/10 to-transparent" />

                                                {/* Hover Overlay Zoom Indicator */}
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <div className="w-12 h-12 rounded-full bg-[#3477BC]/95 flex items-center justify-center text-white shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                                                        <Maximize2 className="w-5 h-5" />
                                                    </div>
                                                </div>

                                                {/* Top Client Badge */}
                                                <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-black/60 border border-white/10 px-3 py-1 rounded-lg text-xs font-bold text-sky-305 backdrop-blur-md">
                                                    {isAr ? project.clientAr : project.client}
                                                </div>
                                            </div>

                                            {/* Info Body */}
                                            <div className="p-5 flex-1 flex flex-col justify-between">
                                                <div>
                                                    <div className="text-[11px] text-slate-400 flex items-center justify-between mb-2">
                                                        <span className="font-semibold text-sky-400">{isAr ? project.categoryAr : project.category}</span>
                                                        <span>{isAr ? project.industryAr : project.industry}</span>
                                                    </div>

                                                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                                                        {isAr ? project.titleAr : project.title}
                                                    </h3>

                                                    <p className="text-xs sm:text-sm text-slate-350 leading-relaxed line-clamp-3 mb-4">
                                                        {isAr ? project.shortDescAr : project.shortDesc}
                                                    </p>
                                                </div>

                                                {/* Result highlights */}
                                                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                                                    <span className="text-[11px] text-slate-400">
                                                        {isAr ? 'النتيجة المحققة:' : 'Achieved Metric:'}
                                                    </span>
                                                    <span className="text-xs font-black text-emerald-400 bg-emerald-950/50 border border-emerald-500/20 px-2 py-0.5 rounded">
                                                        {isAr ? project.resultMetric.labelAr : project.resultMetric.label}: {project.resultMetric.value}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16 bg-[#0B1120] border border-slate-800 rounded-3xl">
                                    <Briefcase className="w-12 h-12 text-slate-650 mx-auto mb-4" />
                                    <p className="text-base text-slate-400">
                                        {isAr ? 'جاري رفع صور ومشاريع العمل الرسمية لهذا القسم قريباً.' : 'Official commercial portfolio files are being uploaded shortly.'}
                                    </p>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Right Column: CTA Estimate form / Contact Prefill */}
                    <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">

                        {/* Business Impact Box */}
                        <div className="p-6 rounded-3xl bg-[#3477BC]/10 border border-[#3477BC]/25 text-sky-200 space-y-3">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-sky-400">
                                {isAr ? 'الأثر التجاري والقيمة المضافة' : 'Commercial Value & Impact'}
                            </h3>
                            <p className="text-xs sm:text-sm leading-relaxed">
                                {isAr ? service.businessImpactAr : service.businessImpact}
                            </p>
                        </div>

                        {/* HUGE CTA DEPARMENT ORDER BUTTON */}
                        <div className="bg-gradient-to-b from-[#0F1526] to-[#0A0D15] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-center shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#3477BC]/5 rounded-bl-full pointer-events-none" />

                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#3477BC] to-[#2559CC] flex items-center justify-center text-white mx-auto shadow-lg shadow-blue-900/10">
                                <Layers className="w-7 h-7" />
                            </div>

                            <div>
                                <h3 className="text-lg sm:text-xl font-black text-white">
                                    {isAr ? 'طلب تسعير ومواصفات' : 'Acquisition & Quote Query'}
                                </h3>
                                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                                    {isAr
                                        ? 'اطلب عرض أسعار تفصيلي لنطاق واحتياجات مشروعك في هذا القسم، للتجاوب معك في أقل من 24 ساعة.'
                                        : 'Submit specs to receive a detailed cost appraisal tailored exactly to your requirements in under 24 hours.'}
                                </p>
                            </div>

                            {/* HUGE BUTTON */}
                            <button
                                type="button"
                                onClick={() => onStartEstimate(isAr ? service.titleAr : service.title)}
                                className="w-full py-4.5 rounded-2xl text-sm sm:text-base font-black text-white bg-gradient-to-r from-[#3477BC] via-[#2559CC] to-[#322366] hover:brightness-110 shadow-[0_8px_30px_rgba(52,119,188,0.25)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer uppercase tracking-wide border-t border-white/10"
                            >
                                <span>{isAr ? 'طلب سعر الآن' : 'Request a Quote Now'}</span>
                                {isAr ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                            </button>
                        </div>

                    </div>

                </div>
            </div>

            {/* LIGHTBOX FOR ENLARGING PRODUCT/PROJECT PORTFOLIO IMAGES */}
            {lightboxImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-fade-in cursor-zoom-out"
                    onClick={() => setLightboxImage(null)}
                >
                    <div className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center select-none">
                        {/* Close Button */}
                        <button
                            type="button"
                            className="absolute -top-12 right-0 p-2 text-slate-400 hover:text-white rounded-full bg-slate-900 border border-slate-800 shadow-md cursor-pointer"
                            onClick={() => setLightboxImage(null)}
                            aria-label="Close image"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <img
                            src={lightboxImage}
                            alt="Enlarged gallery preview"
                            className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-slate-800"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
