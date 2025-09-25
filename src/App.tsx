import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TopNavigation } from './components/TopNavigation';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ReportIssue } from './components/ReportIssue';
import { MyReports } from './components/MyReports';
import { Leaderboard } from './components/Leaderboard';
import { RewardsEvents } from './components/RewardsEvents';
import { SOSPage } from './components/SOSPage';
import { Feedback } from './components/Feedback';
import { Toaster } from './components/ui/sonner';

type PageType = 'dashboard' | 'report-issue' | 'my-reports' | 'leaderboard' | 'rewards' | 'sos' | 'feedback';

// URL mapping for pages
const pageUrls: Record<PageType, string> = {
  'dashboard': '/dashboard',
  'report-issue': '/report-new-issue',
  'my-reports': '/track-my-reports',
  'leaderboard': '/community-leaderboard',
  'rewards': '/rewards-and-events',
  'sos': '/emergency-sos',
  'feedback': '/feedback-center'
};

const urlToPage: Record<string, PageType> = {
  '/dashboard': 'dashboard',
  '/report-new-issue': 'report-issue',
  '/track-my-reports': 'my-reports',
  '/community-leaderboard': 'leaderboard',
  '/rewards-and-events': 'rewards',
  '/emergency-sos': 'sos',
  '/feedback-center': 'feedback'
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  // Default to collapsed on mobile screens (<576px)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 576;
    }
    return false;
  });
  const [user] = useState({
    name: 'Priya Sharma',
    avatar: null,
    points: 1250,
    rank: 42
  });

  // Handle URL routing
  useEffect(() => {
    const updatePageFromUrl = () => {
      const path = window.location.pathname;
      const page = urlToPage[path] || 'dashboard';
      setCurrentPage(page);
    };

    // Update page on initial load
    updatePageFromUrl();

    // Listen for browser back/forward
    window.addEventListener('popstate', updatePageFromUrl);

    return () => {
      window.removeEventListener('popstate', updatePageFromUrl);
    };
  }, []);

  // Handle window resize for mobile sidebar behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 576) {
        setSidebarCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to navigate to different pages
  const navigateToPage = (page: PageType) => {
    const url = pageUrls[page];
    window.history.pushState({}, '', url);
    setCurrentPage(page);
  };

  const renderPage = () => {
    const pageVariants = {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 }
    };

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard key="dashboard" />;
      case 'report-issue':
        return <ReportIssue key="report-issue" />;
      case 'my-reports':
        return <MyReports key="my-reports" />;
      case 'leaderboard':
        return <Leaderboard key="leaderboard" />;
      case 'rewards':
        return <RewardsEvents key="rewards" />;
      case 'sos':
        return <SOSPage key="sos" />;
      case 'feedback':
        return <Feedback key="feedback" />;
      default:
        return <Dashboard key="dashboard" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">

      <TopNavigation
        user={user}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />

      <div className="flex pt-16">
        <Sidebar
          currentPage={currentPage}
          setCurrentPage={navigateToPage}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />

        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-0 sm-custom:ml-16' : 'ml-0 sm-custom:ml-64'
          } p-3 sm-custom:p-4 lg:p-6`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="container-fluid"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <Toaster position="top-right" />
    </div>
  );
}