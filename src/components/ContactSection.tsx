import React, { useState, useRef } from 'react';
import { Language, ContactFormData } from '../types';
import { agencyInfo } from '../data/agencyData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  UploadCloud,
  CheckCircle2,
  Paperclip,
  X,
  MessageSquare,
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    serviceRequired: 'Brand Strategy & Identity',
    budgetRange: '$10k - $25k',
    message: prefilledScope ? `Scope details from Estimator:\n${prefilledScope}\n\n` : '',
    timeline: '1-2 Months',
  });

  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const serviceOptions = [
    { value: 'Brand Strategy & Identity', label: 'Brand Strategy & Identity', labelAr: 'الهوية والعلامة التجارية' },
    { value: 'Performance Digital Marketing', label: 'Performance Digital Marketing', labelAr: 'التسويق الرقمي والأداء' },
    { value: 'Social Media Management', label: 'Social Media Management', labelAr: 'إدارة منصات التواصل والمحتوى' },
    { value: 'Content & Studio Production', label: 'Content & Studio Production', labelAr: 'صناعة المحتوى والإنتاج' },
    { value: 'Campaign & Advertising Strategy', label: 'Campaign & Advertising Strategy', labelAr: 'الإعلانات والحملات الإعلانية' },
    { value: 'Websites & Digital Platforms', label: 'Websites & Digital Platforms', labelAr: 'المواقع والتجارب الرقمية' },
    { value: 'Full-Service Partnership', label: 'Full-Service Retainer Partnership', labelAr: 'شراكة تسويقية وإعلانية متكاملة' },
  ];

  const budgetOptions = [
    { id: '$5k - $10k', label: '$5,000 – $10,000', labelAr: '٥,٠٠٠ – ١٠,٠٠٠ دولار' },
    { id: '$10k - $25k', label: '$10,000 – $25,000', labelAr: '١٠,٠٠٠ – ٢٥,٠٠٠ دولار' },
    { id: '$25k - $50k', label: '$25,000 – $50,000', labelAr: '٢٥,٠٠٠ – ٥٠,٠٠٠ دولار' },
    { id: '$50k+', label: '$50,000+', labelAr: '+٥٠,٠٠٠ دولار' },
  ];

  const timelineOptions = [
    { id: 'Immediate', label: 'Immediate (< 2 Weeks)', labelAr: 'فوري (خلال أسبوعين)' },
    { id: '1-2 Months', label: '1–2 Months', labelAr: 'شهر إلى شهرين' },
    { id: '3-6 Months', label: '3–6 Months', labelAr: '٣ إلى ٦ أشهر' },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files);
      setAttachedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFiles = Array.from(e.target.files);
      setAttachedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

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
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3477BC]/10 border border-[#3477BC]/25 text-sky-400 text-xs font-semibold mb-3 uppercase tracking-wider">
            <span>{isAr ? 'بدء مشروع جديد واستشارة' : 'Project Inquiry & RFP'}</span>
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
              ? 'يرجى تزويدنا ببيانات المشروع والاحتياجات التسويقية ليقوم فريقنا الاستشاري بدراسة طلبكم والتواصل معكم خلال 24 ساعة.'
              : 'Provide your project details and objectives. Our senior strategists will review your inquiry and schedule an initial consultation within 24 hours.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Direct Corporate Contacts & Office Locations */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Primary Head Office: Riyadh */}
              <div className="p-5 rounded-2xl bg-[#0B1120] border border-slate-800 shadow-sm">
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
          <div className="lg:col-span-7">
            <div className="bg-[#0B1120] border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl">
              {isSuccess ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {isAr ? 'تم استلام طلبك بنجاح' : 'Inquiry Successfully Received'}
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    {isAr
                      ? 'شكراً لتواصلك معنا. سيقوم أحد مستشارينا بدراسة المتطلبات والتواصل معك خلال 24 ساعة عمل.'
                      : 'Thank you for contacting us. A senior partner will review your inquiry and reach out within 24 business hours.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        company: '',
                        serviceRequired: 'Brand Strategy & Identity',
                        budgetRange: '$10k - $25k',
                        message: '',
                        timeline: '1-2 Months',
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700"
                  >
                    {isAr ? 'إرسال استفسار جديد' : 'Submit Another Request'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        {isAr ? 'الاسم الكامل *' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder={isAr ? 'محمد العبدالله' : 'John Doe'}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#060913] border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#3477BC]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        {isAr ? 'اسم الشركة / المؤسسة *' : 'Company / Entity *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder={isAr ? 'شركة الأعمال المتقدمة' : 'Acme Corporation'}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#060913] border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#3477BC]"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        {isAr ? 'البريد الإلكتروني للعمل *' : 'Corporate Email *'}
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

                  {/* Service Required */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {isAr ? 'الخدمة الأساسية المطلوبة *' : 'Primary Service Required *'}
                    </label>
                    <select
                      value={formData.serviceRequired}
                      onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060913] border border-slate-700 text-sm text-white focus:outline-none focus:border-[#3477BC]"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {isAr ? opt.labelAr : opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget Range Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      {isAr ? 'الميزانية التقديرية للمشروع' : 'Estimated Project Budget'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgetOptions.map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, budgetRange: b.id })}
                          className={`py-2 px-2 text-xs rounded-xl border text-center transition-all ${
                            formData.budgetRange === b.id
                              ? 'bg-[#3477BC] text-white border-[#3477BC] font-bold'
                              : 'bg-[#060913] text-slate-400 border-slate-700 hover:text-white'
                          }`}
                        >
                          {isAr ? b.labelAr : b.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Expected Timeline */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      {isAr ? 'الجدول الزمني المستهدف' : 'Target Timeline'}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {timelineOptions.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, timeline: t.id })}
                          className={`py-2 px-2 text-xs rounded-xl border text-center transition-all ${
                            formData.timeline === t.id
                              ? 'bg-[#2559CC] text-white border-[#2559CC] font-bold'
                              : 'bg-[#060913] text-slate-400 border-slate-700 hover:text-white'
                          }`}
                        >
                          {isAr ? t.labelAr : t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {isAr ? 'تفاصيل المشروع وأهدافه الرئيسية' : 'Project Scope & Objectives'}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        isAr
                          ? 'أخبرنا عن أهداف الحملة، الجمهور المستهدف، وأي تفاصيل خاصة...'
                          : 'Describe your objectives, current challenges, target audience, and key deliverables...'
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#060913] border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#3477BC]"
                    />
                  </div>

                  {/* Drag & Drop RFP File Upload */}
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border border-dashed rounded-xl p-3.5 text-center cursor-pointer transition-colors ${
                      dragActive ? 'border-sky-400 bg-[#3477BC]/10' : 'border-slate-700 bg-[#060913]/60 hover:border-slate-500'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                      <UploadCloud className="w-4 h-4 text-sky-400" />
                      <span>
                        {isAr
                          ? 'إرفاق ملف نطاق العمل / RFP (PDF, DOCX, ZIP)'
                          : 'Attach RFP / Brief document (PDF, DOCX, ZIP)'}
                      </span>
                    </div>
                  </div>

                  {/* Attached Files List */}
                  {attachedFiles.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {attachedFiles.map((file, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300"
                        >
                          <Paperclip className="w-3 h-3 text-sky-400" />
                          <span className="max-w-[150px] truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile(i);
                            }}
                            className="text-slate-400 hover:text-rose-400"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#3477BC] via-[#2559CC] to-[#322366] hover:brightness-110 shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>{isAr ? 'جاري إرسال الطلب...' : 'Submitting Request...'}</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{isAr ? 'إرسال طلب المشروع الآن' : 'Submit Project RFP'}</span>
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
