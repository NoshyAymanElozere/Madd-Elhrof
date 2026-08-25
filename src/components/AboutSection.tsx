import React, { useState } from 'react';
import { agencyAbout } from '../data/agencyData';
import { Language } from '../types';
import {
  Target,
  Eye,
  ShieldCheck,
  Award,
  CheckCircle2,
  Users,
  Compass,
  Building2,
} from 'lucide-react';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [activeTab, setActiveTab] = useState<'overview' | 'mission' | 'vision'>('overview');

  return (
    <section
      id="about"
      className="relative py-20 lg:py-28 bg-[#070A14] border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3477BC]/10 border border-[#3477BC]/25 text-sky-400 text-xs font-semibold mb-3 uppercase tracking-wider">
            <span>{isAr ? 'عن الوكالة ورؤيتنا' : 'About Our Agency'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white mb-4">
            {isAr ? (
              <>
                خبرة إبداعية يقودها{' '}
                <span className="brand-gradient-text">فهم حقيقي للسوق</span>
              </>
            ) : (
              <>
                CREATIVE EXPERTISE DRIVEN BY{' '}
                <span className="brand-gradient-text">DEEP MARKET UNDERSTANDING</span>
              </>
            )}
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            {isAr ? agencyAbout.descriptionAr : agencyAbout.description}
          </p>
        </div>

        {/* 2-Column Corporate Grid: Realistic Photography Studio Showcase + Strategic Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left Column: Realistic Editorial Team & Studio Photos Grid */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="lg:col-span-6 grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden h-52 sm:h-64 bg-slate-900 border border-slate-800 shadow-md">
                <img
                  src="/assets/team3.jpg"
                  alt="Agency Strategy Team"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 text-[11px] font-bold text-white bg-black/60 px-2.5 py-1 rounded-md">
                  {isAr ? 'فريق التخطيط والاستراتيجية' : 'Strategy & Planning Team'}
                </span>
              </div>

              <div className="relative rounded-2xl overflow-hidden h-40 sm:h-48 bg-slate-900 border border-slate-800 shadow-md">
                <img
                  src="/assets/watermarked_img_17097879265899348156.jpg"
                  alt="Boardroom Client Presentation"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 text-[11px] font-bold text-white bg-black/60 px-2.5 py-1 rounded-md">
                  {isAr ? 'عروض المشاريع والشراكات' : 'Client Partnerships'}
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="relative rounded-2xl overflow-hidden h-40 sm:h-48 bg-slate-900 border border-slate-800 shadow-md">
                <img
                  src="/assets/watermarked_img_436015550541693840.jpg"
                  alt="Creative Design & Production Studio"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 text-[11px] font-bold text-white bg-black/60 px-2.5 py-1 rounded-md">
                  {isAr ? 'استوديو الإنتاج وصناعة المحتوى' : 'Production Studio'}
                </span>
              </div>

              <div className="relative rounded-2xl overflow-hidden h-52 sm:h-64 bg-slate-900 border border-slate-800 shadow-md">
                <img
                  src="/assets/watermarked_img_11964298785670367284.jpg"
                  alt="Analytics & Performance Lab"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 text-[11px] font-bold text-white bg-black/60 px-2.5 py-1 rounded-md">
                  {isAr ? 'مختبر تحليل البيانات والأداء' : 'Data & Growth Lab'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Mission, Vision, and Operational Philosophy */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="lg:col-span-6 flex flex-col justify-between space-y-6"
          >
            {/* Interactive Tab Switcher */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#0B1120] border border-slate-800 max-w-md">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${activeTab === 'overview'
                  ? 'bg-gradient-to-r from-[#3477BC] to-[#2559CC] text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
                  }`}
              >
                <Compass className="w-4 h-4" />
                <span>{isAr ? 'من نحن' : 'Who We Are'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('mission')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${activeTab === 'mission'
                  ? 'bg-gradient-to-r from-[#3477BC] to-[#2559CC] text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
                  }`}
              >
                <Target className="w-4 h-4" />
                <span>{isAr ? 'رسالتنا' : 'Mission'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('vision')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${activeTab === 'vision'
                  ? 'bg-gradient-to-r from-[#3477BC] to-[#2559CC] text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
                  }`}
              >
                <Eye className="w-4 h-4" />
                <span>{isAr ? 'رؤيتنا' : 'Vision'}</span>
              </button>
            </div>

            {/* Tab Content Panels */}
            <div className="bg-[#0B1120] border border-slate-800 rounded-2xl p-6 sm:p-8">
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">
                    {isAr ? 'نبذة عن وكالة مداد الحروف' : 'About MIDAD Agency'}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {isAr
                      ? 'تأسست وكالتنا لتكون الشريك الاستراتيجي الموثوق في تقديم الحلول المتكاملة للدعاية والإعلان، وبناء الهويات البصرية المتميزة، وصناعة الصناديق وحلول التغليف المخصصة. نلتزم بأعلى معايير الإتقان والجودة لتلبية احتياجات السوق السعودي والإقليمي.'
                      : 'Our agency was established to be the trusted strategic partner in delivering integrated solutions for advertising, premium brand identity architecture, custom box manufacturing, and packaging solutions. We commit to the highest benchmarks of quality and precision to serve Saudi and regional markets.'}
                  </p>
                  <div className="pt-2 flex flex-col gap-2.5">
                    <div className="flex items-center gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{isAr ? 'حلول تغليف ومطبوعات متكاملة داخل مقر الوكالة' : 'In-house branding, printing, and custom box production'}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{isAr ? 'تقارير أداء دورية وشفافة 100%' : '100% transparent and weekly performance reporting'}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{isAr ? 'التزام حازم بالمواعيد والمعايير المؤسسية' : 'Strict corporate timelines and delivery benchmarks'}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'mission' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">
                    {isAr ? 'رسالتنا للمؤسسات والشركات' : 'Our Corporate Mission'}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {isAr ? agencyAbout.missionAr : agencyAbout.mission}
                  </p>
                  <div className="p-4 rounded-xl bg-[#3477BC]/10 border border-[#3477BC]/25 text-xs text-sky-200">
                    {isAr
                      ? 'تمكين المؤسسات والشركات الطموحة من تحقيق أهدافها التسويقية بأعلى درجات الابتكار والفعالية.'
                      : 'Empowering ambitious brands to achieve high-velocity commercial growth through data-backed creative excellence.'}
                  </div>
                </div>
              )}

              {activeTab === 'vision' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">
                    {isAr ? 'رؤيتنا للمستقبل الرقمي' : 'Our Long-Term Vision'}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {isAr ? agencyAbout.visionAr : agencyAbout.vision}
                  </p>
                  <div className="p-4 rounded-xl bg-[#322366]/20 border border-[#3477BC]/25 text-xs text-indigo-200">
                    {isAr
                      ? 'أن نكون الشريك الإعلاني والاستراتيجي الأول الأكثر ثقة للشركات الكبرى في المنطقة.'
                      : 'To be the most trusted strategic growth and advertising partner for regional enterprise leaders.'}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Stats Footnote */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#0B1120] border border-slate-800">
                <div className="text-2xl font-black text-white font-mono">+8</div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {isAr ? 'سنوات من الخبرة المؤسسية' : 'Years Market Experience'}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0B1120] border border-slate-800">
                <div className="text-2xl font-black text-white font-mono">100%</div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {isAr ? 'فريق عمل محترف ومتفرغ' : 'Dedicated In-House Talent'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
