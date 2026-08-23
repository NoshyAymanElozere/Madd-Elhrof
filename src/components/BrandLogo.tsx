import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  isArabic?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  isArabic = false,
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none group cursor-pointer ${className}`}>
      {/* 3D Geometric Brand Box & Pen Emblem */}
      <div className={`relative ${iconSizes[size]} flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_4px_12px_rgba(52,119,188,0.4)]"
        >
          <defs>
            <linearGradient id="boxGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3477BC" />
              <stop offset="100%" stopColor="#2559CC" />
            </linearGradient>
            <linearGradient id="boxGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2559CC" />
              <stop offset="100%" stopColor="#322366" />
            </linearGradient>
            <linearGradient id="penGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#3477BC" />
              <stop offset="100%" stopColor="#2559CC" />
            </linearGradient>
          </defs>

          {/* Isometric Box Base */}
          <path
            d="M60 85L20 62V82L60 105L100 82V62L60 85Z"
            fill="url(#boxGrad2)"
          />
          <path
            d="M60 85L100 62L85 45L45 68L60 85Z"
            fill="url(#boxGrad1)"
            opacity="0.9"
          />

          {/* Open Geometric Folding Wings / Monolith */}
          <path
            d="M20 62L20 28L60 12L60 38L32 50L32 68L20 62Z"
            fill="url(#boxGrad1)"
          />
          <path
            d="M60 12L100 28V62L88 68V50L60 38V12Z"
            fill="url(#boxGrad2)"
          />

          {/* Elegant Calligraphic Pen Nib Inside Box */}
          <path
            d="M60 26L48 56L60 74L72 56L60 26Z"
            fill="url(#penGrad)"
          />
          <circle cx="60" cy="52" r="2.5" fill="#FFFFFF" />
          <line x1="60" y1="54" x2="60" y2="74" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-black tracking-tight text-white font-heading ${textSizes[size]}`}>
            {isArabic ? 'مداد الحروف' : 'MIDAD'}
          </span>
          <span className="text-[#38bdf8] font-bold tracking-widest text-xs px-1.5 py-0.5 rounded bg-[#3477bc]/20 border border-[#3477bc]/40">
            AGENCY
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[10px] sm:text-[11px] font-medium tracking-wider text-slate-400 uppercase mt-0.5">
            {isArabic ? 'وكالة للدعاية والإعلان والحلول الرقمية' : 'Advertising & Digital Experience'}
          </span>
        )}
      </div>
    </div>
  );
};
