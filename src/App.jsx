import React, { useState, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Views
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LeadershipPage from './pages/LeadershipPage';
import LiteraryWorldPage from './pages/LiteraryWorldPage';
import MediaRecognitionPage from './pages/MediaRecognitionPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  // Listen to browser popstate (Back/Forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Refresh ScrollTrigger and scroll position on page transition
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
    return () => clearTimeout(timer);
  }, [currentPath]);

  // Programmatic client navigation
  const navigate = (path) => {
    if (path === currentPath) {
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    window.__navigate = navigate;
    return () => {
      delete window.__navigate;
    };
  }, [navigate]);

  // Resolve current active page
  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/about':
        return <AboutPage onNavigate={navigate} />;
      case '/leadership':
        return <LeadershipPage onNavigate={navigate} />;
      case '/literary-world':
        return <LiteraryWorldPage onNavigate={navigate} />;
      case '/media-recognition':
        return <MediaRecognitionPage onNavigate={navigate} />;
      case '/contact':
        return <ContactPage onNavigate={navigate} />;
      case '/':
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#001713] text-[#FAF7F0] antialiased selection:bg-[#C6A36A] selection:text-[#003D32]">
      {/* Floating Top Navigation Dock */}
      <Navbar currentPath={currentPath} onNavigate={navigate} />

      <SmoothScroll>
        <main>
          {renderCurrentPage()}
        </main>

        {/* Global Architectural Footer */}
        <Footer onNavigate={navigate} currentPath={currentPath} />
      </SmoothScroll>
    </div>
  );
}
