import React, { useState, useEffect } from 'react';
import { testimonialsData } from '../data/agencyData';
import { Language } from '../types';
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Building2,
} from 'lucide-react';

interface TestimonialsSectionProps {
  lang: Language;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonialsData[currentIndex] || testimonialsData[0];

  return (
    <section
      id="testimonials"
      className="relative py-20 lg:py-28 bg-[#080B14] border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3477BC]/10 border border-[#3477BC]/25 text-sky-400 text-xs font-semibold mb-3 uppercase tracking-wider">
            <span>{isAr ? 'آراء شركاء النجاح' : 'Executive Endorsements'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white mb-4">
            {isAr ? (
              <>
                ماذا يقول قادة الأعمال{' '}
                <span className="brand-gradient-text">عن تجربة الشراكة معنا؟</span>
              </>
            ) : (
              <>
                WHAT BUSINESS LEADERS{' '}
                <span className="brand-gradient-text">SAY ABOUT OUR PARTNERSHIP</span>
              </>
            )}
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            {isAr
              ? 'شهادات حقيقية من مدراء تنفيذيين ومسؤولي تسويق شاركونا رحلة النمو وتحقيق الأهداف الاستراتيجية.'
              : 'Direct feedback from corporate executives and marketing leaders who partnered with us to scale brand value and commercial performance.'}
          </p>
        </div>

        {/* Testimonial Feature Card */}
        <div className="max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          <div className="bg-[#0B1120] border border-slate-800 rounded-3xl p-7 sm:p-10 relative shadow-xl">
            <Quote className="w-14 h-14 text-slate-800 absolute top-6 right-6 rtl:right-auto rtl:left-6 pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
              {/* Executive Portrait */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#1E293B] hover:border-[#3477BC] flex-shrink-0 shadow-lg bg-slate-900 transition-colors duration-300">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-full h-full object-cover rounded-full"
                  loading="lazy"
                />
              </div>

              <div>
                <div className="flex items-center gap-1 mb-1.5">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <h3 className="text-xl font-bold text-white">
                  {isAr ? current.nameAr : current.name}
                </h3>

                <p className="text-xs sm:text-sm text-sky-400 font-medium">
                  {isAr ? current.positionAr : current.position} —{' '}
                  <span className="text-slate-300">
                    {isAr ? current.companyAr : current.company}
                  </span>
                </p>
              </div>
            </div>

            {/* Testimonial Quote Text */}
            <blockquote className="text-base sm:text-lg text-slate-200 leading-relaxed mb-6 font-normal">
              "{isAr ? current.quoteAr : current.quote}"
            </blockquote>

            {/* Verified Result Strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>
                  {isAr ? 'النتيجة الموثقة:' : 'Verified Result:'}{' '}
                  <strong>{isAr ? current.verifiedResultAr : current.verifiedResult}</strong>
                </span>
              </div>

              <div className="text-xs text-slate-400">
                <span>{isAr ? 'مجال المشروع:' : 'Scope:'} </span>
                <span className="text-sky-300 font-semibold">
                  {isAr ? current.projectCategoryAr : current.projectCategory}
                </span>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${currentIndex === idx
                    ? 'w-8 bg-[#3477BC]'
                    : 'w-2 bg-slate-700 hover:bg-slate-500'
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                className="p-2.5 rounded-xl bg-[#0B1120] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="p-2.5 rounded-xl bg-[#0B1120] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
