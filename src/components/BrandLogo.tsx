import React from 'react';
import logoImg from '@/assets/logo.png';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'custom';
  showSubtitle?: boolean;
  isArabic?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  isArabic = false,
}) => {
  // Enlarge height presets since all typography text is removed
  const logoHeights = {
    sm: 'h-8 sm:h-10',
    md: 'h-13 sm:h-15 md:h-17',
    lg: 'h-24 sm:h-28 md:h-32',
  };

  const isCustom = size === 'custom';

  return (
    <div className={`flex items-center select-none ${className}`}>
      {/* Brand Logo Image Only. Aspect ratio is preserved. */}
      <img
        src={logoImg}
        alt={isArabic ? 'شعار مداد الحروف' : 'Midad Logo'}
        className={isCustom ? 'object-contain' : `${logoHeights[size as 'sm' | 'md' | 'lg']} w-auto object-contain`}
        style={isCustom ? { height: '100px', width: '150px' } : undefined}
      />
    </div>
  );
};
