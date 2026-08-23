import React, { useState } from 'react';
import { blogPosts } from '../data/agencyData';
import { BlogPost, Language } from '../types';
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  X,
} from 'lucide-react';

interface BlogSectionProps {
  lang: Language;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section
      id="blog"
      className="relative py-20 lg:py-28 bg-[#070A14] border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3477BC]/10 border border-[#3477BC]/25 text-sky-400 text-xs font-semibold mb-3 uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isAr ? 'الرؤى والتحليلات الاستراتيجية' : 'Insights & Briefings'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white mb-4">
            {isAr ? (
              <>
                مقالات وتحليلات{' '}
                <span className="brand-gradient-text">في نمو العلامات والتسويق</span>
              </>
            ) : (
              <>
                MARKET INSIGHTS &{' '}
                <span className="brand-gradient-text">GROWTH PERSPECTIVES</span>
              </>
            )}
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            {isAr
              ? 'مقالات دورية يكتبها قادة فريقنا حول أحدث اتجاهات بناء العلامات واستراتيجيات الاستحواذ على العملاء.'
              : 'Actionable perspectives from our senior directors on brand strategy, media buying, and executive marketing operations.'}
          </p>
        </div>

        {/* Blog Posts Grid (At most 4 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {blogPosts.slice(0, 4).map((post, idx) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="bg-[#0B1120] border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col cursor-pointer group shadow-sm"
            >
              {/* Featured Image */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-60" />

                <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 z-10">
                  <span className="text-[10px] font-bold text-sky-300 bg-black/80 px-2.5 py-1 rounded-md border border-sky-500/30">
                    {isAr ? post.categoryAr : post.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2 font-mono">
                    <Calendar className="w-3 h-3 text-sky-400" />
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{isAr ? post.readTimeAr : post.readTime}</span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-sky-300 transition-colors line-clamp-2">
                    {isAr ? post.titleAr : post.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4">
                    {isAr ? post.excerptAr : post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-semibold text-sky-400 group-hover:underline flex items-center gap-1">
                    <span>{isAr ? 'قراءة التحليل' : 'Read Briefing'}</span>
                    {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for viewing the full article */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-2xl bg-[#0B1120] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-xs text-sky-400 font-bold mb-2">
                {isAr ? selectedPost.categoryAr : selectedPost.category}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                {isAr ? selectedPost.titleAr : selectedPost.title}
              </h3>

              <div className="h-56 rounded-2xl overflow-hidden mb-6 border border-slate-800">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {isAr ? selectedPost.excerptAr : selectedPost.excerpt}
              </p>

              <p className="text-xs text-slate-400 leading-relaxed">
                {isAr
                  ? 'يتطلب النجاح الإعلاني في الأسواق المعاصرة بناء تماسك كامل بين هوية العلامة، وسرعة المنصات الرقمية، ودقة استهداف الفئات الشرائية الأكثر قيمة. عند توحيد هذه الركائز، تتحول الميزانيات الإعلانية من مجرد تكاليف إلى أصول استثمارية تضاعف القيمة المؤسسية للشركة.'
                  : 'Sustained commercial growth requires seamless integration between strategic brand positioning and high-velocity performance marketing. When these pillars operate in harmony, marketing spend transforms from an operational cost into a compounding asset.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
