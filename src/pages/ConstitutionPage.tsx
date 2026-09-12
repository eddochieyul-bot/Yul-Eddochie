import React from 'react';
import { PageRoute } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { ConstitutionViewer } from '../components/ConstitutionViewer';

interface ConstitutionPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const ConstitutionPage: React.FC<ConstitutionPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 pb-16">
      <Breadcrumb
        items={[{ label: 'About AYLA', route: '/about' }, { label: 'The Constitution' }]}
        onNavigate={onNavigate}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <ConstitutionViewer />
      </div>
    </div>
  );
};
