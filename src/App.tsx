import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { MemberPortalModal } from './components/MemberPortalModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPages } from './pages/AboutPages';
import { ConstitutionPage } from './pages/ConstitutionPage';
import { LeadershipPage } from './pages/LeadershipPage';
import { GovernancePage } from './pages/GovernancePage';
import { ProgrammesPages } from './pages/ProgrammesPages';
import { MembershipPages } from './pages/MembershipPages';
import { ChaptersPages } from './pages/ChaptersPages';
import { PartnershipsPage } from './pages/PartnershipsPage';
import { NewsEventsPages } from './pages/NewsEventsPages';
import { GalleryPage } from './pages/GalleryPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ContactPage } from './pages/ContactPage';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { AdminDashboard } from './components/admin/AdminDashboard';

export default function App() {
  // Initialize route from window.location.hash or fallback to '/'
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() => {
    const hash = window.location.hash.replace(/^#/, '');
    if (hash && hash.startsWith('/')) {
      return hash as PageRoute;
    }
    return '/';
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);

  // Sync route changes with browser history and scroll to top
  const handleNavigate = (route: PageRoute) => {
    setCurrentRoute(route);
    window.location.hash = route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen for hashchange events (e.g. browser back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash && hash.startsWith('/')) {
        setCurrentRoute(hash as PageRoute);
      } else {
        setCurrentRoute('/');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Global keyboard shortcut for search (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Route Dispatcher
  const renderCurrentPage = () => {
    // 1. Homepage
    if (currentRoute === '/') {
      return <HomePage onNavigate={handleNavigate} onOpenPortal={() => setIsPortalOpen(true)} />;
    }

    // 2. About & Foundations
    if (currentRoute === '/about' || currentRoute === '/vision-mission' || currentRoute === '/objectives') {
      return <AboutPages currentRoute={currentRoute} onNavigate={handleNavigate} />;
    }

    // 3. Constitution (Supreme Law)
    if (currentRoute === '/constitution') {
      return <ConstitutionPage onNavigate={handleNavigate} />;
    }

    // 4. Leadership (Executive Council)
    if (currentRoute === '/leadership') {
      return <LeadershipPage onNavigate={handleNavigate} />;
    }

    // 5. Governance Architecture & Committees
    if (currentRoute === '/governance') {
      return <GovernancePage onNavigate={handleNavigate} />;
    }

    // 6. Programmes (All + Specific Cohorts)
    if (currentRoute === '/programmes' || currentRoute.startsWith('/programmes/')) {
      return <ProgrammesPages currentRoute={currentRoute} onNavigate={handleNavigate} />;
    }

    // 7. Membership (Why Join, Categories & Registration Form)
    if (currentRoute === '/membership' || currentRoute === '/membership/categories' || currentRoute === '/membership/register') {
      return (
        <MembershipPages
          currentRoute={currentRoute}
          onNavigate={handleNavigate}
          onOpenPortal={() => setIsPortalOpen(true)}
        />
      );
    }

    // 8. Regional Chapters & Focal Hubs
    if (currentRoute === '/chapters' || currentRoute.startsWith('/chapters/')) {
      return <ChaptersPages currentRoute={currentRoute} onNavigate={handleNavigate} />;
    }

    // 9. Partnerships & Alliances
    if (currentRoute === '/partnerships') {
      return <PartnershipsPage onNavigate={handleNavigate} />;
    }

    // 10. News & Events
    if (currentRoute === '/news' || currentRoute === '/events') {
      return <NewsEventsPages currentRoute={currentRoute} onNavigate={handleNavigate} />;
    }

    // 11. Media Gallery
    if (currentRoute === '/gallery') {
      return <GalleryPage onNavigate={handleNavigate} />;
    }

    // 12. Resources & Publications Repository
    if (currentRoute === '/resources') {
      return <ResourcesPage onNavigate={handleNavigate} />;
    }

    // 13. Secretariat Contact
    if (currentRoute === '/contact') {
      return <ContactPage onNavigate={handleNavigate} />;
    }

    // 14. Admin CMS Portal (Direct route)
    if (currentRoute === '/admin') {
      return <AdminDashboard onBackToPublicSite={() => handleNavigate('/')} />;
    }

    // Fallback: Default to Home
    return <HomePage onNavigate={handleNavigate} onOpenPortal={() => setIsPortalOpen(true)} />;
  };

  // If currently accessing the Admin CMS dashboard, render it full-screen without public header/footer
  if (currentRoute === '/admin') {
    return (
      <AdminAuthProvider>
        <AdminDashboard onBackToPublicSite={() => handleNavigate('/')} />
      </AdminAuthProvider>
    );
  }

  return (
    <AdminAuthProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-['Plus_Jakarta_Sans'] selection:bg-amber-500 selection:text-white">
        {/* Institutional Header & Navigation */}
        <Header
          currentRoute={currentRoute}
          onNavigate={handleNavigate}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenPortal={() => setIsPortalOpen(true)}
        />

        {/* Main Dynamic View Content */}
        <main className="flex-1">
          {renderCurrentPage()}
        </main>

        {/* Large Institutional Footer */}
        <Footer onNavigate={handleNavigate} />

        {/* Global Interactive Modals */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onNavigate={handleNavigate}
        />

        <MemberPortalModal
          isOpen={isPortalOpen}
          onClose={() => setIsPortalOpen(false)}
          onNavigateToRegister={() => handleNavigate('/membership/register')}
        />
      </div>
    </AdminAuthProvider>
  );
}
