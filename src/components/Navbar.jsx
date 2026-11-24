import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

// ============================================================================
// NAVIGATION STRUCTURE (As specified in user brief & reference)
// 1. Home: Hero, brief introduction, highlights and featured content
// 2. About: His background, life story and entrepreneurial journey
// 3. Leadership: Business philosophy, leadership approach and professional impact
// 4. Literary World: Kaluwa Ghazipuri, Hindi poetry, articles, essays and writings
// 5. Media & Recognition: Interviews, press features, awards and public appearances
// 6. Contact: Contact details, professional enquiries and social links
// ============================================================================

const NAV_ITEMS = [
  {
    id: 'home',
    path: '/',
    label: 'Home',
    desc: 'Hero, brief introduction, highlights and featured content',
    side: 'left',
  },
  {
    id: 'about',
    path: '/about',
    label: 'About',
    desc: 'His background, life story and entrepreneurial journey',
    side: 'left',
  },
  {
    id: 'leadership',
    path: '/leadership',
    label: 'Leadership',
    desc: 'Business philosophy, leadership approach and professional impact',
    side: 'left',
  },
  {
    id: 'literary-world',
    path: '/literary-world',
    label: 'Literary World',
    desc: 'Kaluwa Ghazipuri, Hindi poetry, articles, essays and writings',
    side: 'right',
  },
  {
    id: 'media-recognition',
    path: '/media-recognition',
    label: 'Media & Recognition',
    desc: 'Interviews, press features, awards and public appearances',
    side: 'right',
  },
  {
    id: 'contact',
    path: '/contact',
    label: 'Contact',
    desc: 'Contact details, professional enquiries and social links',
    side: 'right',
  },
];

export default function Navbar({ currentPath = '/', onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Auto-hide navbar smoothly when moving down the screen, reveal when moving up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 70) {
        setNavVisible(false);
      } else if (currentScrollY < lastScrollY.current || currentScrollY <= 40) {
        setNavVisible(true);
      }

      lastScrollY.current = currentScrollY;
      setScrolled(currentScrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(item.path);
    } else {
      const element = document.getElementById(item.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isItemActive = (item) => {
    if (currentPath === '/' && item.path === '/') return true;
    if (item.path !== '/' && currentPath.startsWith(item.path)) return true;
    return false;
  };

  const leftNavItems = NAV_ITEMS.filter((item) => item.side === 'left');
  const rightNavItems = NAV_ITEMS.filter((item) => item.side === 'right');

  return (
    <>
      {/* =====================================================================
          DESKTOP & TABLET FLOATING DOCK (Styled after Dr. Waiel Awwad layout)
          Flush to top-0, centered, rounded-b-2xl, frosted glass, centered name
          ===================================================================== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${navVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
        `}
      >
        
        {/* Desktop Container (Hidden on small screens, visible on lg) */}
        <nav
          aria-label="Primary Navigation"
          className={`pointer-events-auto hidden lg:flex items-center justify-between transition-all duration-300 ease-out
            bg-[#00221B]/90 backdrop-blur-md
            border-b border-x border-[#C6A36A]/25
            rounded-b-[22px]
            pl-8 pr-10 py-3 xl:pl-10 xl:pr-12 xl:py-3.5
            shadow-[0_12px_36px_rgba(0,0,0,0.35)]
            ${scrolled ? 'py-2.5 bg-[#001D17]/95 shadow-black/50' : 'py-3 xl:py-3.5'}
          `}
        >
          {/* LEFT 3 ITEMS: Home, About, Leadership */}
          <div className="flex items-center space-x-5 xl:space-x-6.5">
            {leftNavItems.map((item) => {
              const isActive = isItemActive(item);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`group relative text-[12px] xl:text-[12.5px] tracking-[0.025em] font-medium transition-colors duration-200 py-1 cursor-pointer
                    ${isActive ? 'text-[#FAF7F0] font-semibold' : 'text-[#FAF7F0]/70 hover:text-[#C6A36A]'}
                  `}
                >
                  <span>{item.label}</span>

                  {/* Golden active underline indicator (matching Dr. Waiel Awwad aesthetic) */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#C6A36A] transition-all duration-300 rounded-full
                      ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-50'}
                    `}
                  />
                </button>
              );
            })}
          </div>

          {/* CENTER: Personal Brand Title */}
          <div className="px-5 xl:px-7 flex items-center justify-center">
            <button
              onClick={() => handleNavClick({ path: '/', id: 'home' })}
              className="group flex items-center cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
            >
              <span className="font-sans font-bold text-xs lg:text-[13px] uppercase tracking-[0.22em] text-[#FAF7F0] group-hover:text-[#C6A36A] transition-colors whitespace-nowrap">
                DR. RAVI SHANKAR RAI
              </span>
            </button>
          </div>

          {/* RIGHT 3 ITEMS: Literary World, Media & Recognition, Contact */}
          <div className="flex items-center space-x-5 xl:space-x-6.5">
            {rightNavItems.map((item) => {
              const isActive = isItemActive(item);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`group relative text-[12px] xl:text-[12.5px] tracking-[0.025em] font-medium transition-colors duration-200 py-1 cursor-pointer whitespace-nowrap
                    ${isActive ? 'text-[#FAF7F0] font-semibold' : 'text-[#FAF7F0]/70 hover:text-[#C6A36A]'}
                  `}
                >
                  <span>{item.label}</span>

                  {/* Golden active underline indicator */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#C6A36A] transition-all duration-300 rounded-full
                      ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-50'}
                    `}
                  />
                </button>
              );
            })}
          </div>
        </nav>

        {/* MOBILE / TABLET COMPACT TOP BAR (< lg) */}
        <div
          className={`pointer-events-auto flex lg:hidden items-center justify-between w-full max-w-lg
            bg-[#00221B]/95 backdrop-blur-md
            border-b border-x border-[#C6A36A]/25
            rounded-b-[14px]
            px-4 py-2
            shadow-xl shadow-black/40
          `}
        >
          <button
            onClick={() => handleNavClick({ path: '/', id: 'home' })}
            className="text-left cursor-pointer"
          >
            <span className="font-sans font-bold text-[11px] uppercase tracking-[0.2em] text-[#FAF7F0] block">
              DR. RAVI SHANKAR RAI
            </span>
            <span className="font-mono text-[8px] tracking-[0.14em] text-[#C6A36A] uppercase block">
              CEO & MD · SAVITRI GROUP
            </span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="w-7 h-7 rounded-full bg-[#FAF7F0]/5 border border-[#C6A36A]/40 flex items-center justify-center text-[#FAF7F0] hover:text-[#C6A36A] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
          </button>
        </div>

      </header>

      {/* =====================================================================
          MOBILE LUXURY EDITORIAL DRAWER MODAL
          Displays all 6 navigation items with their descriptions from brief
          ===================================================================== */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#001713]/95 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-10 pt-24 animate-in fade-in duration-300 lg:hidden overflow-y-auto"
        >
          {/* Archival Tag */}
          <div className="flex items-center justify-between border-b border-[#C6A36A]/20 pb-4">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#C6A36A]">
              [ PORTFOLIO NAVIGATION ]
            </span>
            <span className="font-mono text-[10px] tracking-[0.18em] text-[#FAF7F0]/50 uppercase">
              NEW DELHI, IN
            </span>
          </div>

          {/* List of Navigation Items with Full Explanations */}
          <div className="flex flex-col space-y-5 my-8">
            {NAV_ITEMS.map((item, idx) => {
              const isActive = isItemActive(item);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className="text-left group flex items-start justify-between py-2 border-b border-white/5 transition-colors cursor-pointer"
                >
                  <div className="pr-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] text-[#C6A36A] font-semibold">
                        0{idx + 1}
                      </span>
                      <span
                        className={`font-serif font-semibold text-2xl uppercase tracking-tight transition-colors
                          ${isActive ? 'text-[#C6A36A]' : 'text-[#FAF7F0] group-hover:text-[#C6A36A]'}
                        `}
                      >
                        {item.label}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-[#FAF7F0]/65 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>

                  <div className="w-7 h-7 rounded-full border border-white/10 group-hover:border-[#C6A36A] flex items-center justify-center text-[#FAF7F0]/50 group-hover:text-[#C6A36A] transition-colors shrink-0 mt-1">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mobile Footer Meta */}
          <div className="pt-4 border-t border-[#C6A36A]/20 flex items-center justify-between text-[11px] font-mono text-[#FAF7F0]/60">
            <span>SAVITRI TELECOM SERVICES</span>
            <span className="text-[#C6A36A]">EST. 1999</span>
          </div>
        </div>
      )}
    </>
  );
}
