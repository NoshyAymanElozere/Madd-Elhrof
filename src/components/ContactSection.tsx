import React, { useState } from 'react';
import { Language, ContactFormData } from '../types';
import { agencyInfo } from '../data/agencyData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building2,
} from 'lucide-react';

interface ContactSectionProps {
  lang: Language;
  prefilledScope?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  lang,
  prefilledScope = '',
}) => {
  const isAr = lang === 'ar';

  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: prefilledScope ? `Scope details from Estimator:\n${prefilledScope}\n\n` : '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <section
      id="contact"
      className="relative py-20 lg:py-28 bg-[#080B14] border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3477BC]/10 border border-[#3477BC]/25 text-sky-400 text-xs font-semibold mb-3 uppercase tracking-wider">
            <span>{isAr ? 'تواصل معنا واستشارة مجانية' : 'Contact Us & Free Consultation'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white mb-4">
            {isAr ? (
              <>
                تواصل معنا لبدء{' '}
                <span className="brand-gradient-text">مشروعك القادم</span>
              </>
            ) : (
              <>
                START A CONVERSATION WITH{' '}
                <span className="brand-gradient-text">OUR STRATEGY TEAM</span>
              </>
            )}
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            {isAr
              ? 'يرجى تزويدنا ببيانات الاستفسار لنقوم بدراسة طلبكم والتواصل معكم خلال 24 ساعة.'
              : 'Provide your contact details. Our team will review your inquiry and schedule an initial consultation within 24 hours.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Direct Corporate Contacts & Office Locations */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="lg:col-span-5 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              {/* Primary Head Office: Riyadh */}
              <div className="p-5 rounded-2xl bg-[#0B1120] border border-slate-800 shadow-sm animate-fade-in">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-[#3477BC]/15 border border-[#3477BC]/30 flex items-center justify-center text-sky-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {isAr ? 'المقر الرئيسي — الرياض' : 'Headquarters — Riyadh'}
                    </h3>
                    <div className="text-xs text-slate-400">
                      {isAr ? agencyInfo.offices[0].addressAr : agencyInfo.offices[0].address}
                    </div>
                  </div>
                </div>
              </div>

              {/* Regional Office: Dubai */}
              <div className="p-5 rounded-2xl bg-[#0B1120] border border-slate-800 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-[#3477BC]/15 border border-[#3477BC]/30 flex items-center justify-center text-sky-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {isAr ? 'المكتب الإقليمي — دبي' : 'Regional Office — Dubai'}
                    </h3>
                    <div className="text-xs text-slate-400">
                      {isAr ? agencyInfo.offices[1].addressAr : agencyInfo.offices[1].address}
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Google Map Card */}
              <div className="p-1 rounded-2xl bg-[#0B1120] border border-slate-800 shadow-sm overflow-hidden h-[240px] relative group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115915.22896503926!2d46.61460395796245!3d24.851941295989255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d48939b%3A0x600b5f10b784cf04!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa"
                  className="w-full h-full border-0 rounded-xl opacity-60 group-hover:opacity-85 transition-opacity duration-300"
                  style={{ filter: 'grayscale(1) invert(90%) contrast(1.1) brightness(0.95)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Agency Location Map"
                ></iframe>
                <div className="absolute bottom-3 right-3 rtl:right-auto rtl:left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-[10px] text-slate-350 pointer-events-none transition-opacity">
                  {isAr ? 'موقعنا الجغرافي' : 'Our Office Location'}
                </div>
              </div>

              {/* Direct Phone & WhatsApp */}
              <div className="p-5 rounded-2xl bg-[#0B1120] border border-slate-800 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {isAr ? 'الهاتف المباشر وواتساب' : 'Direct Phone & WhatsApp'}
                    </h3>
                    <div className="text-xs text-slate-300 font-mono mt-0.5">
                      {agencyInfo.contact.phone}
                    </div>
                  </div>
                </div>
              </div>

              {/* Official Email */}
              <div className="p-5 rounded-2xl bg-[#0B1120] border border-slate-800 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#3477BC]/15 border border-[#3477BC]/30 flex items-center justify-center text-sky-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {isAr ? 'البريد الإلكتروني الرسمي' : 'Official Inquiries Email'}
                    </h3>
                    <div className="text-xs text-slate-300 font-mono mt-0.5">
                      {agencyInfo.contact.email}
                    </div>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="p-5 rounded-2xl bg-[#0B1120] border border-slate-800 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {isAr ? 'ساعات العمل الرسمية' : 'Business Working Hours'}
                    </h3>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {isAr ? agencyInfo.contact.workingHoursAr : agencyInfo.contact.workingHours}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Structured Corporate Form */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="lg:col-span-7"
          >
            <div className="bg-[#0B1120] border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl">
              {isSuccess ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {isAr ? 'تم استلام رسالتك بنجاح' : 'Message Successfully Sent'}
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    {isAr
                      ? 'شكراً لتواصلك معنا. سيقوم أحد مستشارينا بالرد عليك خلال 24 ساعة عمل.'
                      : 'Thank you for reaching out. A strategy team partner will respond within 24 business hours.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        message: '',
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 cursor-pointer"
                  >
                    {isAr ? 'إرسال رسالة جديدة' : 'Send Another Message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* First & Last Name Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        {isAr ? 'الاسم الأول *' : 'First Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder={isAr ? 'محمد' : 'John'}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#060913] border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#3477BC]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        {isAr ? 'اسم العائلة *' : 'Last Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder={isAr ? 'العتيبي' : 'Doe'}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#060913] border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#3477BC]"
                      />
                    </div>
                  </div>

                  {/* Email & Phone Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        {isAr ? 'البريد الإلكتروني للعمل *' : 'Work Email *'}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#060913] border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#3477BC]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        {isAr ? 'رقم الهاتف / واتساب *' : 'Phone / WhatsApp *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+966 5X XXX XXXX"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#060913] border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#3477BC]"
                      />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {isAr ? 'تفاصيل الرسالة الاستفسارية *' : 'Message / Inquiry Details *'}
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        isAr
                          ? 'أخبرنا عن استفسارك أو أهداف مشروعك بالتفصيل هنا...'
                          : 'Describe your objectives, current challenges, or specific questions...'
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060913] border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#3477BC]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#3477BC] via-[#2559CC] to-[#322366] hover:brightness-110 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>{isAr ? 'جاري الإرسال...' : 'Sending...'}</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{isAr ? 'إرسال الرسالة الآن' : 'Send Message Now'}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
