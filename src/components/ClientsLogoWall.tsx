import React from 'react';
import { trustedClients } from '../data/agencyData';
import { Language } from '../types';
import { ShieldCheck } from 'lucide-react';

interface ClientsLogoWallProps {
  lang: Language;
}

export const ClientsLogoWall: React.FC<ClientsLogoWallProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  return (
    <section
      id="clients"
      className="py-20 bg-[#080B14] relative overflow-hidden border-t border-slate-900"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#3477BC]/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center" data-aos="fade-up">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#3477BC] bg-[#3477BC]/10 px-3 py-1 rounded-full border border-[#3477BC]/20 mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
          <span>{isAr ? 'نثق بهم ويثقون بنا' : 'TRUSTED BY LEADING ENTERPRISES & BRANDS'}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black font-heading text-white">
          {isAr ? 'عملاؤنا وشركاء النجاح' : 'Our Clients & Strategic Partners'}
        </h3>
      </div>

      {/* Modern Infinite Scrolling Marquee */}
      <div className="relative w-full overflow-hidden select-none py-2">
        {/* Sleek edge fading masks for seamless modern look */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#080B14] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#080B14] to-transparent z-10 pointer-events-none" />

        {/* Animated Marquee Flex Container */}
        <div className="animate-marquee-scroll hover:[animation-play-state:paused]">
          {/* Loop three times to guarantee continuous endless loop layout */}
          {[...trustedClients, ...trustedClients, ...trustedClients].map((client, idx) => (
            <div
              key={`${client.id}-${idx}`}
              className="flex-shrink-0 w-[160px] sm:w-[190px] group relative p-5 rounded-2xl bg-[#0B1120] hover:bg-[#0F172A] border border-slate-800/80 hover:border-[#3477BC]/40 transition-all duration-300 flex flex-col items-center justify-center text-center shadow-md hover:shadow-[#3477BC]/5"
            >
              {/* Top gradient highlight strip on hover */}
              <div className="absolute inset-x-6 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#3477BC]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Logo container */}
              <div className="w-24 h-20 overflow-hidden mb-4 bg-white rounded-xl flex items-center justify-center p-2 group-hover:shadow-[0_0_12px_#3477BC33] transition-shadow relative">
                <img
                  src={client.image}
                  alt={client.name}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = idx % 2 === 0 ? '/assets/discssion.jpg' : '/assets/group.jpg';
                  }}
                />
              </div>

              {/* Brand label */}
              {/* <div className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors tracking-wide leading-tight line-clamp-2">
                {isAr ? client.nameAr : client.name}
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
