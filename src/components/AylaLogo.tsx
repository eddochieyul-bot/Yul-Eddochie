import React from 'react';

interface AylaLogoProps {
  className?: string;
  variant?: 'full' | 'horizontal' | 'mark' | 'white' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showMotto?: boolean;
  showEmblemOnly?: boolean;
}

export const AylaLogo: React.FC<AylaLogoProps> = ({
  className = '',
  variant = 'horizontal',
  size = 'md',
  showMotto = true,
  showEmblemOnly = false,
}) => {
  const sizeMap = {
    sm: { mark: 'w-9 h-9', text: 'text-sm', sub: 'text-[10px]' },
    md: { mark: 'w-12 h-12', text: 'text-base', sub: 'text-xs' },
    lg: { mark: 'w-16 h-16', text: 'text-xl', sub: 'text-xs' },
    xl: { mark: 'w-24 h-24', text: 'text-2xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  // Official AYLA Emblem Medallion
  const MarkIcon = () => (
    <div className={`relative flex-shrink-0 ${currentSize.mark} aspect-square`}>
      <img
        src="/ayla-official-logo.jpg"
        onError={(e) => {
          // Fallback to vector SVG if image file is not found
          e.currentTarget.onerror = null;
          e.currentTarget.src = '/ayla-logo.svg';
        }}
        alt="Africa's Young Leaders Association Official Emblem"
        className="w-full h-full object-contain rounded-full drop-shadow-md ring-1 ring-amber-500/30"
        loading="eager"
      />
    </div>
  );

  if (variant === 'mark' || showEmblemOnly) {
    return <MarkIcon />;
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <div className="w-24 h-24 mb-3">
          <img
            src="/ayla-official-logo.jpg"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/ayla-logo.svg';
            }}
            alt="AYLA Official Logo"
            className="w-full h-full object-contain rounded-full drop-shadow-lg ring-2 ring-amber-500/40"
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="font-['Outfit'] font-extrabold text-slate-900 tracking-wide text-lg sm:text-xl">
            AFRICA'S YOUNG LEADERS ASSOCIATION
          </span>
          <span className="font-['Outfit'] font-bold text-amber-700 tracking-widest text-xs uppercase mt-0.5">
            A.Y.L.A ORGANIZATION
          </span>
          {showMotto && (
            <span className="text-slate-600 font-medium text-xs mt-1 italic tracking-wider">
              "Young Minds. Bold Vision. United Africa."
            </span>
          )}
        </div>
      </div>
    );
  }

  const isLightOrWhite = variant === 'white' || variant === 'light';

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <MarkIcon />
      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className={`font-['Outfit'] font-extrabold tracking-tight ${currentSize.text} ${
              isLightOrWhite ? 'text-white' : 'text-slate-900'
            }`}
          >
            AFRICA'S YOUNG LEADERS ASSOCIATION
          </span>
          <span className="bg-amber-600/15 border border-amber-600/30 text-amber-600 dark:text-amber-400 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase">
            A.Y.L.A
          </span>
        </div>
        {showMotto && (
          <span
            className={`font-medium tracking-wide ${currentSize.sub} ${
              isLightOrWhite ? 'text-amber-400' : 'text-amber-700'
            } italic`}
          >
            Young Minds. Bold Vision. United Africa.
          </span>
        )}
      </div>
    </div>
  );
};
