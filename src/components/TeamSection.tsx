import React from 'react';
import { teamMembers } from '../data/agencyData';
import { Language } from '../types';
import {
  Users,
  Linkedin,
  Twitter,
} from 'lucide-react';

interface TeamSectionProps {
  lang: Language;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  return (
    <section
      id="team"
      className="relative py-20 lg:py-28 bg-[#080B14] border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3477BC]/10 border border-[#3477BC]/25 text-sky-400 text-xs font-semibold mb-3 uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>{isAr ? 'فريق القيادة والاستراتيجية' : 'Executive Leadership'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white mb-4">
            {isAr ? (
              <>
                قادة الفكر والإبداع{' '}
                <span className="brand-gradient-text">وراء نجاح عملائنا</span>
              </>
            ) : (
              <>
                STRATEGIC MINDS &{' '}
                <span className="brand-gradient-text">CREATIVE DIRECTORS</span>
              </>
            )}
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            {isAr
              ? 'يضم فريقنا نخبة من المتخصصين في الاستراتيجيات الإعلانية، بناء الهوية، وإدارة الحملات الرقمية الكبرى.'
              : 'Our senior partners bring deep industry expertise in brand architecture, performance media, and growth advisory.'}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-[#0B1120] border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col group shadow-sm"
            >
              {/* Photo */}
              <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-80" />
              </div>

              {/* Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                    {isAr ? member.nameAr : member.name}
                  </h3>
                  <p className="text-xs font-semibold text-sky-400 mb-2">
                    {isAr ? member.roleAr : member.role}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {isAr ? member.bioAr : member.bio}
                  </p>
                </div>

                {/* Social Links */}
                <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-[#3477BC] transition-colors"
                      aria-label="LinkedIn profile"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-[#3477BC] transition-colors"
                      aria-label="Twitter profile"
                    >
                      <Twitter className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400 font-bold">
                    MIDAD
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
