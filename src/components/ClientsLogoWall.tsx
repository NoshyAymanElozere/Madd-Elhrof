import React from 'react';
import { trustedClients } from '../data/agencyData';
import { Language } from '../types';
import { Building2, ShieldCheck } from 'lucide-react';

interface ClientsLogoWallProps {
  lang: Language;
}

export const ClientsLogoWall: React.FC<ClientsLogoWallProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  return (
    <section
      id="clients"
      className="py-14 bg-[#080B14] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center" data-aos="fade-up">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
          <span>{isAr ? 'نثق بهم ويثقون بنا' : 'TRUSTED BY LEADING ENTERPRISES & BRANDS'}</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          {isAr ? 'عملاؤنا وشركاء النجاح' : 'Our Clients & Strategic Partners'}
        </h3>
      </div>

      {/* Clean Grayscale Corporate Partner Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 items-center">
          {trustedClients.map((client, idx) => (
            <div
              key={client.id}
              data-aos="fade-up"
              data-aos-delay={idx * 50}
              className="group p-4 rounded-xl bg-[#0B1120] border border-slate-800/80 hover:border-slate-700 hover:bg-[#0F172A] transition-all duration-200 flex flex-col items-center justify-center text-center shadow-sm"
            >
              {/* Clean Geometric Monogram */}
              <div className="w-9 h-9 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-[#3477BC] transition-all duration-200 mb-2">
                <span className="font-bold text-xs font-mono">
                  {client.name.substring(0, 2)}
                </span>
              </div>

              <div className="text-[11px] font-bold text-slate-300 group-hover:text-white transition-colors tracking-tight line-clamp-1">
                {client.name}
              </div>
              <div className="text-[9px] text-slate-400 group-hover:text-sky-300 transition-colors mt-0.5">
                {isAr ? client.industryAr : client.industry}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
