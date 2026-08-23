import React, { useState } from 'react';
import { Language } from '../types';
import {
  X,
  Calculator,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Zap,
  Sliders,
  DollarSign,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProjectEstimatorModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
  onConfirmEstimate: (summary: string) => void;
  initialService?: string;
}

export const ProjectEstimatorModal: React.FC<ProjectEstimatorModalProps> = ({
  isOpen,
  lang,
  onClose,
  onConfirmEstimate,
  initialService,
}) => {
  if (!isOpen) return null;

  const isAr = lang === 'ar';

  const [selectedServices, setSelectedServices] = useState<string[]>(
    initialService ? [initialService] : ['Branding & Visual Identity']
  );
  const [scale, setScale] = useState<'startup' | 'growth' | 'enterprise'>('growth');
  const [timeline, setTimeline] = useState<'rush' | 'standard' | 'flexible'>('standard');
  const [include3D, setInclude3D] = useState(true);

  const availableServices = [
    { id: 'Branding & Visual Identity', label: 'Branding & Visual Identity', labelAr: 'الهوية البصرية والعلامة', base: 4500 },
    { id: '3D Web & Immersive Experience', label: '3D Web & Interactive WebGL', labelAr: 'مواقع 3D وتجارب تفاعلية', base: 6500 },
    { id: 'Social Media & Content Engine', label: 'Social Media & Content Growth', labelAr: 'إدارة السوشيال ميديا وصناعة المحتوى', base: 3500 },
    { id: 'Performance Advertising & ROAS', label: 'Performance Ads (Meta, Google, TikTok)', labelAr: 'الحملات الإعلانية الممولة وإدارة الميزانيات', base: 4000 },
    { id: 'Cinematic Video & CGI Production', label: 'Cinematic 3D Video & CGI Ads', labelAr: 'الإنتاج السينمائي وإعلانات 3D', base: 5500 },
    { id: 'Full-Funnel Digital Marketing', label: 'Full-Funnel SEO & Growth Marketing', labelAr: 'التسويق الرقمي الشامل والـ SEO', base: 3800 },
  ];

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  // Pricing calculation
  const calculateTotal = () => {
    let subtotal = 0;
    selectedServices.forEach((sId) => {
      const match = availableServices.find((s) => s.id === sId);
      if (match) subtotal += match.base;
    });

    const scaleMultiplier = scale === 'startup' ? 0.75 : scale === 'growth' ? 1.0 : 1.8;
    const timelineMultiplier = timeline === 'rush' ? 1.3 : timeline === 'standard' ? 1.0 : 0.9;
    const threeDAddon = include3D ? 1500 : 0;

    const finalEstimate = Math.round((subtotal * scaleMultiplier * timelineMultiplier + threeDAddon) / 100) * 100;
    const lowRange = Math.round(finalEstimate * 0.9);
    const highRange = Math.round(finalEstimate * 1.15);

    return {
      finalEstimate,
      lowRange,
      highRange,
    };
  };

  const { lowRange, highRange } = calculateTotal();

  const handleApply = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    const summary = `Estimated Scope: ${selectedServices.join(', ')} | Scale: ${scale} | Timeline: ${timeline} | Range: $${lowRange.toLocaleString()} - $${highRange.toLocaleString()}`;
    onConfirmEstimate(summary);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-4xl my-auto bg-[#0A0E1A] border border-[#3477BC]/40 rounded-3xl p-6 sm:p-10 shadow-2xl max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-full bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
          aria-label="Close estimator"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3477BC]/20 border border-[#3477BC]/40 text-sky-300 text-xs font-bold mb-3 uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>{isAr ? 'حاسبة ميزانية ونطاق العمل التفاعلية' : 'Interactive Project Scope Estimator'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black font-heading text-white mb-2">
            {isAr ? 'خصص مشروعك واحصل على تقدير فوري' : 'Configure Your Scope & Instant Budget Estimate'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {isAr
              ? 'حدد الخدمات والمستوى الزمني لمعرفة التكلفة التقديرية ونموذج المخرجات المتوقعة.'
              : 'Select your required capabilities and project scale to compute a transparent scope range.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Left Configuration Form */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Services Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                {isAr ? '1. اختر الخدمات المطلوبة (يمكنك اختيار أكثر من خدمة):' : '1. Select Required Capabilities:'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {availableServices.map((srv) => {
                  const isSelected = selectedServices.includes(srv.id);
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => toggleService(srv.id)}
                      className={`p-3 rounded-xl border text-left rtl:text-right text-xs font-semibold transition-all flex items-start justify-between gap-2 ${
                        isSelected
                          ? 'bg-[#131B31] border-sky-400 text-white shadow-sm'
                          : 'bg-[#080B14] border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span>{isAr ? srv.labelAr : srv.label}</span>
                      <CheckCircle2
                        className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                          isSelected ? 'text-sky-400' : 'text-slate-700'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Business Scale */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                {isAr ? '2. حجم المشروع ونطاق العمل:' : '2. Project / Business Scale:'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'startup', label: 'Startup / MVP', labelAr: 'ناشئ / MVP' },
                  { id: 'growth', label: 'Scale-Up / Growth', labelAr: 'نمو / متوسط' },
                  { id: 'enterprise', label: 'Enterprise / Market Leader', labelAr: 'مؤسسي / ريادي' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setScale(s.id as any)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                      scale === s.id
                        ? 'bg-[#3477BC] text-white border-sky-400 shadow-md'
                        : 'bg-[#080B14] border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {isAr ? s.labelAr : s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Timeline */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                {isAr ? '3. الجدول الزمني للتسليم:' : '3. Delivery Timeline:'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'rush', label: 'Express (2-3 Weeks)', labelAr: 'سريع (2-3 أسابيع)' },
                  { id: 'standard', label: 'Standard (4-6 Weeks)', labelAr: 'قياسي (4-6 أسابيع)' },
                  { id: 'flexible', label: 'Quarterly Retainer', labelAr: 'عقد ربع سنوي مستمر' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTimeline(t.id as any)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                      timeline === t.id
                        ? 'bg-[#3477BC] text-white border-sky-400 shadow-md'
                        : 'bg-[#080B14] border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {isAr ? t.labelAr : t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Include 3D WebGL Feature Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#080B14] border border-slate-800">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <div>
                  <div className="text-xs font-bold text-white">
                    {isAr ? 'تضمين عناصر 3D تفاعلية ومؤثرات سينمائية' : 'Include 3D WebGL & CGI Visualizations'}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {isAr ? 'يرفع معدل التفاعل والتحويل بنسبة تتجاوز 40%' : 'Boosts user immersion and prestige'}
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={include3D}
                onChange={(e) => setInclude3D(e.target.checked)}
                className="w-4 h-4 accent-[#3477BC] cursor-pointer"
              />
            </div>
          </div>

          {/* Right Live Computation Breakdown */}
          <div className="lg:col-span-5 flex flex-col justify-between glass-panel p-6 rounded-3xl border border-[#3477BC]/30 bg-[#0F1526]">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {isAr ? 'التقدير الاستثماري المتوقع' : 'Estimated Investment Range'}
                </span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/50">
                  {isAr ? 'شامل الاستشارات' : 'All-Inclusive'}
                </span>
              </div>

              {/* Big Price Range */}
              <div className="mb-6">
                <div className="text-3xl sm:text-4xl font-black font-heading text-white brand-gradient-text">
                  ${lowRange.toLocaleString()} – ${highRange.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {isAr
                    ? '* الميزانية النهائية تعتمد على تدقيق الأهداف الدقيقة في الجلسة الاستشارية الأولى.'
                    : '* Final investment tailored during strategic onboarding session.'}
                </div>
              </div>

              {/* What's Included */}
              <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-3">
                {isAr ? 'المخرجات المضمنة في هذا التقدير:' : 'Included Deliverables:'}
              </h4>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{selectedServices.length} {isAr ? 'خدمات أساسية متكاملة' : 'Selected Core Capabilities'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{isAr ? 'فريق قيادة مخصص ومدير حساب أول' : 'Senior Creative & Tech Lead'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{isAr ? 'لوحة تحليلات وتقارير أداء حية' : 'Real-Time ROI & Analytics Dashboard'}</span>
                </div>
                {include3D && (
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{isAr ? 'استوديو محاكاة وتصيير 3D' : 'Custom 3D WebGL Shaders & Assets'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Lock in Button */}
            <button
              type="button"
              onClick={handleApply}
              className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#3477BC] via-[#2559CC] to-[#322366] hover:from-[#38bdf8] hover:via-[#2559CC] shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>{isAr ? 'تثبيت هذا النطاق وبدء التواصل' : 'Apply Scope to Proposal Form'}</span>
              <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
