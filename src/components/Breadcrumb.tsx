import React from 'react';
import { PageRoute } from '../types';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  route?: PageRoute;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate: (route: PageRoute) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, onNavigate }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-6 bg-slate-100/90 border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-2 text-xs font-medium text-slate-500">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="flex items-center gap-1.5 text-slate-600 hover:text-amber-800 transition-colors cursor-pointer"
        >
          <Home className="w-3.5 h-3.5 text-amber-700" />
          <span>Home</span>
        </button>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
              {isLast || !item.route ? (
                <span className="text-slate-900 font-semibold truncate max-w-xs">{item.label}</span>
              ) : (
                <button
                  type="button"
                  onClick={() => item.route && onNavigate(item.route)}
                  className="text-slate-600 hover:text-amber-800 transition-colors cursor-pointer truncate max-w-xs"
                >
                  {item.label}
                </button>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
