import React from 'react';
import { AYLA_INFO, OFFICIAL_SOCIAL_CHANNELS } from '../data/organizationData';
import { Twitter, Instagram, Facebook, Linkedin, Youtube, Music2, ExternalLink } from 'lucide-react';

interface SocialLinksProps {
  variant?: 'header' | 'footer' | 'cards' | 'pills' | 'contact';
  className?: string;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ variant = 'pills', className = '' }) => {
  const getIcon = (id: string, sizeClass = 'w-4 h-4') => {
    switch (id) {
      case 'twitter':
        return <Twitter className={sizeClass} />;
      case 'instagram':
        return <Instagram className={sizeClass} />;
      case 'facebook':
        return <Facebook className={sizeClass} />;
      case 'linkedin':
        return <Linkedin className={sizeClass} />;
      case 'youtube':
        return <Youtube className={sizeClass} />;
      case 'tiktok':
        return <Music2 className={sizeClass} />;
      default:
        return <ExternalLink className={sizeClass} />;
    }
  };

  if (variant === 'header') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="hidden xl:inline text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
          Follow @ayla.africa:
        </span>
        <div className="flex items-center gap-1.5">
          {OFFICIAL_SOCIAL_CHANNELS.map((s) => (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
              title={`Follow AYLA on ${s.name} (${s.handle})`}
              aria-label={`Follow AYLA on ${s.name} (${s.handle})`}
            >
              {getIcon(s.id, 'w-3.5 h-3.5')}
            </a>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'cards') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
        {OFFICIAL_SOCIAL_CHANNELS.map((s) => (
          <a
            key={s.id}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-500 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-amber-400 group-hover:bg-amber-600 group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                  {getIcon(s.id, 'w-4 h-4')}
                </div>
                <div>
                  <h4 className="font-['Outfit'] font-bold text-sm text-slate-900 leading-tight">
                    {s.name}
                  </h4>
                  <span className="font-mono text-[11px] text-amber-700 font-bold block">
                    {s.handle}
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {s.description}
            </p>
          </a>
        ))}
      </div>
    );
  }

  if (variant === 'contact') {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {OFFICIAL_SOCIAL_CHANNELS.map((s) => (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white hover:bg-amber-50/80 border border-slate-200 hover:border-amber-400 transition-all flex items-center gap-2 group shadow-2xs"
              title={`Follow ${s.name} (${s.handle})`}
            >
              <div className="w-7 h-7 rounded-lg bg-slate-900 text-amber-400 group-hover:bg-amber-600 group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors">
                {getIcon(s.id, 'w-3.5 h-3.5')}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-bold text-slate-800 truncate leading-tight">
                  {s.shortName}
                </div>
                <div className="text-[10px] font-mono text-amber-700 font-semibold truncate leading-tight">
                  {s.handle}
                </div>
              </div>
              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-amber-700 flex-shrink-0" />
            </a>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`space-y-2.5 ${className}`}>
        <div className="flex flex-wrap items-center gap-2">
          {OFFICIAL_SOCIAL_CHANNELS.map((s) => (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-400 border border-slate-800 hover:border-amber-500/40 text-xs transition-colors inline-flex items-center gap-2 font-medium group"
              title={`Visit AYLA on ${s.name} (${s.handle})`}
            >
              <span className="text-amber-400 group-hover:scale-110 transition-transform">
                {getIcon(s.id, 'w-3.5 h-3.5')}
              </span>
              <span>{s.shortName}</span>
              <span className="text-amber-400/80 font-mono text-[10px]">
                {s.handle}
              </span>
            </a>
          ))}
        </div>
      </div>
    );
  }

  // Default pills
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {OFFICIAL_SOCIAL_CHANNELS.map((s) => (
        <a
          key={s.id}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-amber-900 border border-slate-200 hover:border-amber-300 text-xs font-medium transition-colors"
          title={`Follow AYLA on ${s.name} (${s.handle})`}
        >
          {getIcon(s.id, 'w-3.5 h-3.5 text-amber-700')}
          <span>{s.shortName}</span>
          <span className="font-mono text-[10px] text-slate-500 font-bold">{s.handle}</span>
        </a>
      ))}
    </div>
  );
};
