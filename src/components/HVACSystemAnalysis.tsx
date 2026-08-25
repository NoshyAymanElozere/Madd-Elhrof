import React, { useState } from 'react';
import { Language } from '../types';
import {
    Database,
    ListChecks,
    Network,
    Monitor,
    Smartphone,
    CheckCircle2,
    FileText,
    UserCheck,
    ClipboardList,
    ShieldCheck,
    TrendingUp,
    ArrowRight,
    ArrowLeft,
    Server
} from 'lucide-react';

interface HVACSystemAnalysisProps {
    lang: Language;
    onSelectOption: (scopeSummary: string) => void;
}

type TabType = 'requirements' | 'workflows' | 'database';

export const HVACSystemAnalysis: React.FC<HVACSystemAnalysisProps> = ({
    lang,
    onSelectOption,
}) => {
    const isAr = lang === 'ar';
    const [activeTab, setActiveTab] = useState<TabType>('requirements');
    const [selectedSystemType, setSelectedSystemType] = useState<string | null>(null);

    const handleSystemTypeSelect = (type: 'desktop' | 'web') => {
        setSelectedSystemType(type);
        const scopeMsg = type === 'web'
            ? (isAr
                ? "نخطط لبناء نظام إدارة التكييف المتكامل كـ (موقع/تطبيق سحابي سري ومطور لخدمة الفنيين في الميدان)."
                : "We plan to build the HVAC ERP system as a (Cloud Web/Mobile App optimized for field technicians).")
            : (isAr
                ? "نخطط لبناء نظام إدارة التكييف المتكامل كـ (برنامج سطح مكتب قوي ومغلق للعمليات الداخلية)."
                : "We plan to build the HVAC ERP system as a (Robust Desktop Application for internal operations).");
        onSelectOption(scopeMsg);
    };

    // 1. Requirements Data
    const requirements = [
        {
            id: 'inv',
            title: 'إدارة المنتجات والمخزون',
            titleEn: 'Products & Inventory',
            desc: 'تسجيل بيانات التكييفات (البراند، القدرة بالحصان مثل 1.5/2.25/3، الموديل، النوع: بارد فقط/بارد ساخن، السعر)، وتتبع المخزون في المستودعات وتنبيهات عند انخفاض الكميات.',
            descEn: 'Record AC specs (Brand, capacity in HP: 1.5/2.25/3, model, type: cool only/heat & cool, price), and track warehouse stock with low inventory alerts.',
            icon: ClipboardList,
            color: 'border-blue-500/30 text-blue-400 bg-blue-950/15'
        },
        {
            id: 'crm',
            title: 'إدارة المبيعات والعملاء (CRM)',
            titleEn: 'Sales & Customer CRM',
            desc: 'تسجيل بيانات العملاء وعناوين التسليم. إنشاء أذونات البيع، الفواتير، وطرق الدفع (نقدي، تقسيط، بطاقات أئتمان).',
            descEn: 'Register customer profiles and delivery addresses. Generate sales permits, invoices, and support payment methods (Cash, Installments, Credit Cards).',
            icon: UserCheck,
            color: 'border-sky-500/30 text-sky-400 bg-sky-950/15'
        },
        {
            id: 'wo',
            title: 'إدارة الصيانة والتركيبات (Work Orders)',
            titleEn: 'Work Orders & Operations',
            desc: 'جدولة مواعيد التركيب والتوريد بناءً على المبيعات الجديدة. إدارة طلبات الصيانة (الدورية، الأعطال، الضمان). تعيين الفنيين أو فرق العمل الميدانية ومتابعة حالة الطلب (قيد التنفيذ، تم التركيب، معلق).',
            descEn: 'Schedule installation & delivery based on new orders. Manage service requests (Preventive, Breakdowns, Warranty), assign technicians/field teams and track status (In Progress, Installed, Pending).',
            icon: ListChecks,
            color: 'border-emerald-500/30 text-emerald-400 bg-emerald-950/15'
        },
        {
            id: 'warranty',
            title: 'إدارة الموردين والضمان',
            titleEn: 'Suppliers & Warranty Tracking',
            desc: 'تسجيل الشركات المصنعة وتواريخ الضمان لكل جهاز بناءً على السيريال نمبر (Serial Number).',
            descEn: 'Register manufacturers and track warranty dates for each unit using its Serial Number.',
            icon: ShieldCheck,
            color: 'border-purple-500/30 text-purple-400 bg-purple-950/15'
        },
        {
            id: 'reports',
            title: 'التقارير والتحليلات',
            titleEn: 'Reports & Business Intelligence',
            desc: 'تقارير المبيعات اليومية والشهرية، والأجهزة الأكثر مبيعاً. تقارير أداء الفنيين ومعدل إنجاز عمليات الصيانة والتركيب.',
            descEn: 'Daily & monthly sales reports, hot-selling products, technician performance metrics, and completed service/installation rates.',
            icon: TrendingUp,
            color: 'border-pink-500/30 text-pink-400 bg-pink-950/15'
        }
    ];

    // 2. Workflows Data
    const salesWorkflow = {
        title: 'دورة رحلة البيع والتركيب',
        titleEn: 'Sales & Installation Workflow',
        steps: [
            { actor: isAr ? 'العميل' : 'Customer', stepAr: 'يطلب شراء تكييف تحديداً بقدرة معينة.', stepEn: 'Requests to buy a specific AC with a certain capacity.' },
            { actor: isAr ? 'المبيعات' : 'Sales Desk', stepAr: 'مراجعة التوافر في المخزن ← إنشاء فاتورة ← اختيار موعد التركيب.', stepEn: 'Check availability in store → create invoice → choose installation date.' },
            { actor: isAr ? 'المخزن' : 'Warehouse', stepAr: 'خصم الجهاز من المخزون وتجهيزه للنقل.', stepEn: 'Deduct the unit from stock and prepare it for transit.' },
            { actor: isAr ? 'الفني' : 'Technician', stepAr: 'استلام أمر العمل ← التوجه للعميل والتركيب ← إغلاق الطلب وتفعيل الضمان على السيستم.', stepEn: 'Receive work order → go to customer and install → close order and activate warranty on system.' }
        ]
    };

    const maintenanceWorkflow = {
        title: 'دورة طلب الصيانة',
        titleEn: 'Maintenance Request Workflow',
        steps: [
            { actor: isAr ? 'العميل' : 'Customer', stepAr: 'تقديم بلاغ عطل أو طلب صيانه دورية.', stepEn: 'Submit a malfunction report or request routine maintenance.' },
            { actor: isAr ? 'الدعم الفني' : 'Helpdesk', stepAr: 'البحث برقم الهاتف أو السيريال نمبر للتحقق من الضمان ← إنشاء طلب صيانة ← إسناد الطلب للفني المختص.', stepEn: 'Search by phone number or serial number to verify warranty → create maintenance order → assign order to specialized technician.' }
        ]
    };

    // 3. Database Entities (Tables)
    const dbEntities = [
        {
            name: 'المنتجات (Products)',
            attributes: 'Product_ID, Brand, Capacity_HP, Price, Stock_Qty',
            arDesc: 'تفاصيل التكييفات ومخزون المستودع.'
        },
        {
            name: 'العملاء (Customers)',
            attributes: 'Customer_ID, Name, Phone, Address, Location_GPS',
            arDesc: 'دليل العملاء ومواقع التثبيت الجغرافية.'
        },
        {
            name: 'المبيعات (Orders)',
            attributes: 'Order_ID, Customer_ID, Order_Date, Total_Amount, Payment_Status',
            arDesc: 'السجلات المالية وحالات الفواتير والمدفوعات.'
        },
        {
            name: 'أوامر الشغل (Work Orders)',
            attributes: 'Task_ID, Order_ID, Technician_ID, Type (Install/Service), Status, Scheduled_Date',
            arDesc: 'جدول وتفاصيل التكليفات الميدانية للتركيب أو الصيانة.'
        },
        {
            name: 'الفنيين (Technicians)',
            attributes: 'Tech_ID, Name, Phone, Zone/Area, Availability',
            arDesc: 'سجل الفنيين والمناطق المغطاة بجدول الإتاحة.'
        }
    ];

    return (
        <section id="hvac-analysis" className="relative py-20 lg:py-28 bg-[#090D1A] border-t border-slate-800">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(52,119,188,0.08),transparent)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Title */}
                <div className="max-w-3xl mb-12" data-aos="fade-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3477BC]/10 border border-[#3477BC]/25 text-sky-400 text-xs font-semibold mb-3 uppercase tracking-wider">
                        <span>{isAr ? 'حالة دراسية تفاعلية' : 'Interactive Architecture Case Study'}</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white mb-4">
                        {isAr ? (
                            <>
                                تحليل نظام إدارة{' '}
                                <span className="brand-gradient-text">مبيعات وصيانة التكييف</span>
                            </>
                        ) : (
                            <>
                                HVAC SALES & SERVICE{' '}
                                <span className="brand-gradient-text">SYSTEM ANALYSIS</span>
                            </>
                        )}
                    </h2>

                    <p className="text-base text-slate-300 leading-relaxed">
                        {isAr
                            ? 'نموذج محاكاة هندسة البرمجيات وتحليل النظم ERP لشركات بيع وتركيب أجهزة التبريد والتكييف، من المبيعات وحتى إدارة الفنيين الميدانيين.'
                            : 'A comprehensive software engineering blueprint and ERP system analysis showcase for HVAC sales, installations, and field maintenance dispatch.'}
                    </p>
                </div>

                {/* Tab Buttons (Navigation) */}
                <div className="flex border-b border-slate-800 mb-8" data-aos="fade-up" data-aos-delay="100">
                    <button
                        onClick={() => setActiveTab('requirements')}
                        className={`pb-4 px-6 text-sm font-bold border-b-2 transition-all cursor-pointer ${activeTab === 'requirements'
                            ? 'border-[#3477BC] text-white'
                            : 'border-transparent text-slate-400 hover:text-slate-200'
                            }`}
                    >
                        <span className="flex items-center gap-2">
                            <ListChecks className="w-4 h-4" />
                            {isAr ? 'المتطلبات الوظيفية' : 'Functional Specs'}
                        </span>
                    </button>

                    <button
                        onClick={() => setActiveTab('workflows')}
                        className={`pb-4 px-6 text-sm font-bold border-b-2 transition-all cursor-pointer ${activeTab === 'workflows'
                            ? 'border-[#3477BC] text-white'
                            : 'border-transparent text-slate-400 hover:text-slate-200'
                            }`}
                    >
                        <span className="flex items-center gap-2">
                            <Network className="w-4 h-4" />
                            {isAr ? 'دورات العمل الأساسية' : 'Workflows'}
                        </span>
                    </button>

                    <button
                        onClick={() => setActiveTab('database')}
                        className={`pb-4 px-6 text-sm font-bold border-b-2 transition-all cursor-pointer ${activeTab === 'database'
                            ? 'border-[#3477BC] text-white'
                            : 'border-transparent text-slate-400 hover:text-slate-200'
                            }`}
                    >
                        <span className="flex items-center gap-2">
                            <Database className="w-4 h-4" />
                            {isAr ? 'كيانات قاعدة البيانات' : 'Database Schema'}
                        </span>
                    </button>
                </div>

                {/* Tab Contents */}
                <div className="min-h-[300px]" data-aos="fade-up" data-aos-delay="200">

                    {/* 1. Requirements Tab */}
                    {activeTab === 'requirements' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {requirements.map((req, idx) => {
                                const IconComponent = req.icon;
                                return (
                                    <div
                                        key={req.id}
                                        className="p-6 rounded-2xl bg-[#0B1120] border border-slate-800 hover:border-[#3477BC]/40 transition-all flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${req.color}`}>
                                                <IconComponent className="w-6 h-6" />
                                            </div>
                                            <h3 className="text-lg font-bold text-white mb-2">
                                                {isAr ? req.title : req.titleEn}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                                                {isAr ? req.desc : req.descEn}
                                            </p>
                                        </div>
                                        <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono">
                                            Req ID: {req.id.toUpperCase()}-0{idx + 1}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* 2. Workflows Tab */}
                    {activeTab === 'workflows' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {/* Sales Workflow */}
                            <div className="p-6 rounded-2xl bg-[#0B1120] border border-slate-800 space-y-6">
                                <h3 className="text-lg font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                                    {isAr ? salesWorkflow.title : salesWorkflow.titleEn}
                                </h3>
                                <div className="relative border-l-2 border-dashed border-slate-800 pl-6 rtl:pl-0 rtl:pr-6 rtl:border-l-0 rtl:border-r-2 space-y-6">
                                    {salesWorkflow.steps.map((st, i) => (
                                        <div key={i} className="relative">
                                            {/* Step bullet */}
                                            <span className="absolute -left-[31px] rtl:-right-[31px] top-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-[#3477BC] border-2 border-slate-900 text-[10px] font-bold text-white text-center font-mono">
                                                {i + 1}
                                            </span>
                                            <div className="text-xs font-bold text-sky-400 mb-1 uppercase tracking-wider">
                                                {st.actor}
                                            </div>
                                            <p className="text-xs sm:text-sm text-slate-300">
                                                {isAr ? st.stepAr : st.stepEn}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Maintenance Workflow */}
                            <div className="p-6 rounded-2xl bg-[#0B1120] border border-slate-800 space-y-6">
                                <h3 className="text-lg font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                    {isAr ? maintenanceWorkflow.title : maintenanceWorkflow.titleEn}
                                </h3>
                                <div className="relative border-l-2 border-dashed border-slate-800 pl-6 rtl:pl-0 rtl:pr-6 rtl:border-l-0 rtl:border-r-2 space-y-6">
                                    {maintenanceWorkflow.steps.map((st, i) => (
                                        <div key={i} className="relative">
                                            {/* Step bullet */}
                                            <span className="absolute -left-[31px] rtl:-right-[31px] top-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-[#10b981] border-2 border-slate-900 text-[10px] font-bold text-white text-center font-mono">
                                                {i + 1}
                                            </span>
                                            <div className="text-xs font-bold text-emerald-400 mb-1 uppercase tracking-wider">
                                                {st.actor}
                                            </div>
                                            <p className="text-xs sm:text-sm text-slate-300">
                                                {isAr ? st.stepAr : st.stepEn}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    )}

                    {/* 3. Database Tab */}
                    {activeTab === 'database' && (
                        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#0B1120]">
                            <table className="w-full text-left rtl:text-right border-collapse">
                                <thead>
                                    <tr className="bg-slate-900/60 border-b border-slate-800 text-xs text-slate-400 font-bold uppercase tracking-wider">
                                        <th className="py-4 px-6">{isAr ? 'اسم الكيان (Entity)' : 'Entity Name'}</th>
                                        <th className="py-4 px-6">{isAr ? 'الحقول الأساسية (Attributes)' : 'Primary Attributes'}</th>
                                        <th className="py-4 px-6">{isAr ? 'الوصف الوظيفي للمحتوى' : 'Functional Scope'}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                                    {dbEntities.map((ent, idx) => (
                                        <tr key={idx} className="hover:bg-slate-900/30 transition-colors">
                                            <td className="py-4 px-6 font-bold text-white flex items-center gap-2.5">
                                                <Server className="w-4 h-4 text-sky-400 flex-shrink-0" />
                                                <span>{ent.name}</span>
                                            </td>
                                            <td className="py-4 px-6 font-mono text-sky-300 text-xs max-w-[280px] break-words whitespace-pre-wrap">
                                                {ent.attributes}
                                            </td>
                                            <td className="py-4 px-6 text-slate-400">
                                                {isAr ? ent.arDesc : 'Schema validation attributes for relational database integrity.'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>

                {/* Interactive Poll / Call To Action Cards */}
                <div className="mt-16 bg-gradient-to-r from-[#0F162B] to-[#121B35] border border-[#3477BC]/35 rounded-3xl p-6 sm:p-10" data-aos="fade-up">
                    <div className="text-center max-w-2xl mx-auto mb-8">
                        <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
                            {isAr
                                ? 'هل تخطط لبناء هذا النظام لتشغيل شركتك؟'
                                : 'Planning to develop this custom system for your logistics?'}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300">
                            {isAr
                                ? 'أين تفضل تشغيل نظام الصيانة والمبيعات لتكييفات شركتك لتسريع وتسهيل حركة الفنيين ومعاينة المبيعات؟'
                                : 'Select the optimal operational platform to guide our system implementation planning:'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {/* Desktop App Card */}
                        <div
                            onClick={() => handleSystemTypeSelect('desktop')}
                            className={`p-6 rounded-2xl border-2 transition-all cursor-pointer text-center relative group flex flex-col justify-between ${selectedSystemType === 'desktop'
                                ? 'bg-blue-950/20 border-[#3477BC]'
                                : 'bg-[#0B1120]/80 border-slate-800 hover:border-slate-700 hover:bg-[#0B1120]'
                                }`}
                        >
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <Monitor className="w-6 h-6 text-slate-300" />
                                </div>
                                <h4 className="text-base font-bold text-white mb-2">
                                    {isAr ? 'برنامج سطح مكتب (Desktop App)' : 'Desktop Application'}
                                </h4>
                                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                                    {isAr
                                        ? 'مثالي لنقاط البيع المركزية والمخازن ذات الإدخال الكثيف للبيانات، سرعة استجابة فائقة، وقدرة على التشغيل التام بدون إنترنت.'
                                        : 'Highly optimized for central warehouses and POS hubs. Quick database transactions and robust offline capabilities.'}
                                </p>
                            </div>

                            <button
                                type="button"
                                className={`py-2.5 px-4 rounded-xl text-xs font-bold w-full transition-all cursor-pointer ${selectedSystemType === 'desktop'
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-slate-800 text-slate-300 hover:bg-[#3477BC] hover:text-white'
                                    }`}
                            >
                                {selectedSystemType === 'desktop'
                                    ? (isAr ? '✓ تم تحديد الخيار' : '✓ Option Selected')
                                    : (isAr ? 'تحديد الخيار والمتابعة' : 'Select Desktop Option')}
                            </button>
                        </div>

                        {/* Cloud Web/Mobile App Card */}
                        <div
                            onClick={() => handleSystemTypeSelect('web')}
                            className={`p-6 rounded-2xl border-2 transition-all cursor-pointer text-center relative group flex flex-col justify-between ${selectedSystemType === 'web'
                                ? 'bg-blue-950/20 border-[#3477BC]'
                                : 'bg-[#0B1120]/80 border-slate-800 hover:border-slate-700 hover:bg-[#0B1120]'
                                }`}
                        >
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-500 text-black text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full z-10">
                                {isAr ? 'خيار موصى به فنيّاً' : 'Highly Recommended'}
                            </div>

                            <div>
                                <div className="w-12 h-12 rounded-xl bg-blue-950/50 border border-blue-500/20 text-sky-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <Smartphone className="w-6 h-6" />
                                </div>
                                <h4 className="text-base font-bold text-white mb-2">
                                    {isAr ? 'موقع/تطبيق سحابي (Web/Mobile App)' : 'Web/Mobile Cloud Platform'}
                                </h4>
                                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                                    {isAr
                                        ? 'لخدمة الفنيين في الميدان لتعديل حالة المهام مباشرة بالـ GPS، وتأكيد الفواتير برقم التليفون، وتفعيل الضمان الفوري أمام العميل.'
                                        : 'Equip field technicians with real-time mobile CRM, GPS route matching, instant invoice SMS, and live digital warranty activation.'}
                                </p>
                            </div>

                            <button
                                type="button"
                                className={`py-2.5 px-4 rounded-xl text-xs font-bold w-full transition-all cursor-pointer ${selectedSystemType === 'web'
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-slate-800 text-slate-300 hover:bg-[#3477BC] hover:text-white'
                                    }`}
                            >
                                {selectedSystemType === 'web'
                                    ? (isAr ? '✓ تم تحديد الخيار' : '✓ Option Selected')
                                    : (isAr ? 'تحديد الخيار والمتابعة' : 'Select Cloud Option')}
                            </button>
                        </div>
                    </div>

                    {selectedSystemType && (
                        <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/25 px-4 py-2 rounded-full">
                                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                                <span>
                                    {isAr
                                        ? 'تم اختيار النظام المفضل! تم تجهيز التفاصيل لتضمينها في نموذج المبيعات بالأسفل...'
                                        : 'System preference logged! Prefilled scope is ready in the contact request below...'}
                                </span>
                            </span>
                        </div>
                    )}

                </div>

            </div>
        </section>
    );
};
