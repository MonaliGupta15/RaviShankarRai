import React, { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Feather } from 'lucide-react';
import oldBookIsolatedWebp from '../assets/old-book-isolated.webp';
import oldBookIsolatedPng from '../assets/old-book-isolated.png';
import LiteraryFlightPath from './LiteraryFlightPath';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// DUAL PERSPECTIVE MONOGRAPH — RAW & CINEMATIC ARCHIVAL CODEX
// Designed for Dr. Ravi Shankar Rai
// Core Materiality & Jean Rottner Color Transition:
// - Both Introduction and Monograph start on soft Ivory (#FAF7F0)
// - Seamless continuity: Zero abrupt color barrier when scrolling between sections
// - As the user scrolls into the upper half of the Monograph section (~48% viewport),
//   the entire canvas dynamically transitions to deep Midnight Emerald (#00140F)
// - Ambient reading lamp blooms, glowing champagne gold details illuminate, and typography inverts
// - Physical transparent vintage open book (background 100% removed)
// - Organic drop shadow wrapping directly around the physical book silhouette
// - Letterpress ink typography using mix-blend-multiply directly on aged parchment
// - STRICT PAGE BOUNDS: Left & Right pages contain all text inside margins
// ============================================================================

export default function DualPerspectiveMonograph({
  onNavigate,
  isThemeDark = false,
  setIsThemeDark,
}) {
  // 'split' (both pages) | 'builder' (left page focus) | 'writer' (right page focus)
  const [activeView, setActiveView] = useState('split');
  
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const bookContainerRef = useRef(null);
  const sheenRef = useRef(null);
  const headerRef = useRef(null);

  // 3D Mouse Parallax & Dynamic Light Sheen across the book
  const handleMouseMove = (e) => {
    if (!bookContainerRef.current) return;
    const rect = bookContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xNorm = (x / rect.width - 0.5) * 2; // -1 to 1
    const yNorm = (y / rect.height - 0.5) * 2;

    gsap.to(bookContainerRef.current, {
      rotateY: xNorm * 4.5,
      rotateX: -yNorm * 4.5,
      transformPerspective: 1400,
      ease: 'power1.out',
      duration: 0.5,
    });

    if (sheenRef.current) {
      gsap.to(sheenRef.current, {
        x: xNorm * 35,
        y: yNorm * 25,
        opacity: 0.2 + Math.abs(xNorm) * 0.12,
        duration: 0.4,
      });
    }
  };

  const handleMouseLeave = () => {
    if (!bookContainerRef.current) return;
    gsap.to(bookContainerRef.current, {
      rotateY: 0,
      rotateX: 0,
      ease: 'power2.out',
      duration: 0.9,
    });
    if (sheenRef.current) {
      gsap.to(sheenRef.current, {
        x: 0,
        y: 0,
        opacity: 0.12,
        duration: 0.9,
      });
    }
  };

  // Jean Rottner ScrollTrigger: Transition to green on entrance, and return to ivory when exiting to footer
  useLayoutEffect(() => {
    if (!sectionRef.current || !setIsThemeDark) return;

    // Check immediately on mount/refresh
    const checkScrollPosition = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const nextEl = document.getElementById('achievements-gallery') || document.getElementById('footer');
      if (nextEl) {
        const nextRect = nextEl.getBoundingClientRect();
        if (nextRect.top <= window.innerHeight * 0.15) {
          setIsThemeDark(false);
          return;
        }
      }
      if (rect.top <= window.innerHeight * 0.12) {
        setIsThemeDark(true);
      } else {
        setIsThemeDark(false);
      }
    };

    checkScrollPosition();

    // 1. Entrance Trigger (Introduction -> Monograph: Ivory -> Green)
    const stEnter = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 12%', // Fires when previous section has scrolled away with only ~12% left at top
      end: 'bottom top',
      onEnter: () => setIsThemeDark(true),
      onLeaveBack: () => setIsThemeDark(false),
      onEnterBack: () => setIsThemeDark(true),
    });

    // 2. Exit Trigger (Monograph -> Next Section / Footer: Green -> Ivory)
    let stExit = null;
    const nextEl = document.getElementById('achievements-gallery') || document.getElementById('footer');
    if (nextEl) {
      stExit = ScrollTrigger.create({
        trigger: nextEl,
        start: 'top 15%', // Fires when monograph has scrolled away with only ~15% left at top
        onEnter: () => setIsThemeDark(false),
        onLeaveBack: () => setIsThemeDark(true),
        onEnterBack: () => setIsThemeDark(false),
      });
    }

    return () => {
      stEnter.kill();
      if (stExit) stExit.kill();
    };
  }, [setIsThemeDark]);

  // Entrance animations for header and the Rising Manuscript
  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Archival Header fade and subtle lift
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2. THE RISING MANUSCRIPT: Dynamic 3D Book Elevation & Unfolding as you scroll
      if (bookContainerRef.current) {
        gsap.fromTo(
          bookContainerRef.current,
          {
            opacity: 0.35,
            y: 75,
            scale: 0.94,
            rotateX: 10,
            transformPerspective: 1200,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 92%',
              end: 'top 32%',
              scrub: 1.2,
            },
          }
        );
      }

      // 3. Staggered Ink Typography Absorption
      gsap.fromTo(
        '.ink-reveal',
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleNavigate = (path) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.pathname = path;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="monograph"
      className={`relative z-20 py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 overflow-hidden font-sans border-t transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isThemeDark
          ? 'bg-[#00140F] text-[#FAF7F0] border-[#C6A36A]/20 selection:bg-[#C6A36A] selection:text-[#00140F]'
          : 'bg-[#FAF7F0] text-[#003D32] border-transparent selection:bg-[#C6A36A] selection:text-[#FAF7F0]'
      }`}
    >
      {/* Background Library Grain Texture */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-25" />

      {/* Layer 1: Ambient Midnight Emerald Horizon (Blooms on Jean Rottner transition) */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isThemeDark ? 'opacity-45' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 40%, rgba(0, 52, 40, 0.5) 0%, transparent 75%)',
        }}
      />

      {/* Layer 2: Warm Archival Reading Lamp (Focusing directly on the book) */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[55vw] max-w-[950px] max-h-[680px] rounded-full pointer-events-none transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isThemeDark ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(212, 175, 115, 0.13) 0%, rgba(0, 42, 32, 0.35) 45%, transparent 75%)',
          filter: 'blur(95px)',
        }}
      />

      {/* Layer 3: Perimeter Vignette */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isThemeDark ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(0, 10, 8, 0.85) 100%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto space-y-6 sm:space-y-8">
        
        {/* =================================================================== */}
        {/* 0. LITERARY FLIGHT PATH: Burnt Terracotta Quill & Champagne Trail   */}
        {/* =================================================================== */}
        <div className="w-full">
          <LiteraryFlightPath
            triggerSelector="#monograph"
            labelLeft="कालुवा ग़ाज़ीपुरी · माटी"
            labelRight="FOLIO 02 // DUAL MONOGRAPH"
            accentColor="#C6A36A"
            quillColor="#C66A3D"
            textColor={isThemeDark ? '#FAF7F0' : '#003D32'}
          />
        </div>

        {/* =================================================================== */}
        {/* 1. ARCHIVAL FOLIO HEADER & INTERACTIVE PERSPECTIVE SWITCHER         */}
        {/* =================================================================== */}
        <div
          ref={headerRef}
          className={`flex flex-col md:flex-row md:items-end justify-between gap-4 pb-3 border-b transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isThemeDark ? 'border-[#C6A36A]/25' : 'border-[#C6A36A]/35'
          }`}
        >
          <div className="space-y-1 max-w-xl">
            <h2
              className={`font-playfair font-[600] text-2xl sm:text-3xl lg:text-[2.2rem] tracking-[-0.015em] leading-[1.12] transition-colors duration-700 ${
                isThemeDark ? 'text-[#FAF7F0]' : 'text-[#003D32]'
              }`}
            >
              The Architecture of Two Worlds
            </h2>
            <p
              className={`font-devanagari text-xs sm:text-sm font-normal tracking-wide transition-colors duration-700 ${
                isThemeDark ? 'text-[#FAF7F0]/75' : 'text-[#003D32]/75'
              }`}
            >
              उद्यम की दूरदृष्टि और अंतर्मन की कविता — एक ही व्यक्तित्व के दो समानांतर आयाम।
            </p>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 2. PHYSICAL VINTAGE OPEN-BOOK STAGE (TRANSPARENT CUTOUT CODEX)      */}
        {/* =================================================================== */}
        <div
          ref={stageRef}
          className="relative w-full max-w-5xl mx-auto flex items-center justify-center select-none py-2"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* 3D Parallax Book Chassis with Organic Silhouette Drop Shadow */}
          <div
            ref={bookContainerRef}
            className="relative w-full aspect-[577/418] max-w-[940px] transition-transform duration-200 will-change-transform"
            style={{
              transformStyle: 'preserve-3d',
              filter: isThemeDark
                ? 'drop-shadow(0 35px 55px rgba(0, 0, 0, 0.88)) drop-shadow(0 15px 25px rgba(0, 20, 15, 0.65))'
                : 'drop-shadow(0 24px 42px rgba(0, 35, 25, 0.22)) drop-shadow(0 10px 18px rgba(0, 20, 15, 0.12))',
              transition: 'filter 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* The Isolated Vintage Open Book (Background 100% Removed) */}
            <picture>
              <source srcSet={oldBookIsolatedWebp} type="image/webp" />
              <img
                src={oldBookIsolatedPng}
                alt="Vintage Hardcover Open Codex"
                className="w-full h-full object-contain pointer-events-none select-none filter contrast-[1.02] brightness-[0.99]"
                loading="eager"
              />
            </picture>

            {/* Subtle Specular Sheen across Parchment on Cursor Move */}
            <div
              ref={sheenRef}
              className="absolute inset-0 pointer-events-none opacity-15 mix-blend-screen transition-opacity duration-300 rounded-[10px]"
              style={{
                background:
                  'radial-gradient(circle at 50% 40%, rgba(255,248,230,0.85) 0%, rgba(255,235,190,0.2) 40%, transparent 70%)',
              }}
            />

            {/* Realistic Silk Ribbon Bookmark draped down the spine */}
            {activeView === 'split' && (
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-4 sm:w-4.5 h-28 sm:h-36 z-20 pointer-events-none hidden md:block"
                style={{
                  filter: 'drop-shadow(3px 8px 12px rgba(0, 0, 0, 0.65))',
                }}
              >
                <div
                  className="w-full h-full relative"
                  style={{
                    background:
                      'linear-gradient(160deg, #DFBE83 0%, #FFF2D6 28%, #C6A36A 55%, #9E7C45 85%, #6B4E1B 100%)',
                    clipPath:
                      'polygon(0 0, 100% 0, 100% 100%, 50% calc(100% - 10px), 0 100%)',
                  }}
                >
                  <div className="absolute inset-y-0 left-0.5 w-px bg-white/40" />
                  <div className="absolute inset-y-0 right-0.5 w-px bg-black/25" />
                </div>
              </div>
            )}

            {/* =============================================================== */}
            {/* OVERLAY: LEFT PAGE // THE INDUSTRIAL ARCHITECT (Deep Ink)       */}
            {/* Strict Parchment Safe Zone: Left ~7.5% to 47.5%, Top ~6.5% to 92% */}
            {/* =============================================================== */}
            {(activeView === 'split' || activeView === 'builder') && (
              <div
                className={`absolute top-[6.5%] bottom-[7.5%] flex flex-col justify-between z-10 transition-all duration-500 select-text overflow-hidden ${
                  activeView === 'builder'
                    ? 'left-[10%] right-[10%] max-w-xl mx-auto py-2'
                    : 'left-[7.5%] right-[53.5%] pl-2 pr-1 sm:pl-3.5 sm:pr-2.5 lg:pl-5 lg:pr-3.5'
                }`}
                style={{
                  color: '#152B22',
                  mixBlendMode: 'multiply',
                }}
              >
                {/* Top Folio Header */}
                <div className="ink-reveal flex items-center justify-between border-b border-[#152B22]/35 pb-1">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#152B22]" />
                    <span className="font-mono text-[clamp(7.5px,0.85vw,10.5px)] uppercase tracking-[0.16em] font-bold text-[#152B22]">
                      FOLIO I // INDUSTRIAL ARCHITECTURE
                    </span>
                  </div>
                  <span className="font-mono text-[clamp(7px,0.75vw,9px)] uppercase tracking-[0.14em] text-[#152B22]/70 font-semibold">
                    EST. 1999 · DELHI
                  </span>
                </div>

                {/* Stately Title & Manifesto */}
                <div className="ink-reveal space-y-1 sm:space-y-1.5 my-auto py-0.5">
                  <span className="font-mono text-[clamp(6.5px,0.7vw,8.5px)] uppercase tracking-[0.22em] text-[#152B22]/75 font-bold block">
                    TELECOM &amp; DEFENSE INFRASTRUCTURE
                  </span>

                  <h3 className="font-playfair font-bold text-[clamp(12px,1.45vw,19px)] text-[#152B22] leading-[1.12] tracking-tight">
                    Nervous System of a Sovereign Nation
                  </h3>

                  {/* Letterpress Callout Quote Block */}
                  <div className="border-l-2 border-[#152B22]/60 pl-2 sm:pl-2.5 py-0.5 my-1">
                    <p className="font-serif italic text-[clamp(8px,0.95vw,11.5px)] text-[#152B22] leading-[1.35]">
                      "What value do skills hold if they never translate into livelihood? Savitri was founded not on scale for its own sake, but on building dignified employment."
                    </p>
                    <span className="font-mono text-[clamp(6px,0.65vw,7.5px)] uppercase tracking-wider text-[#152B22]/70 font-bold block mt-0.5">
                      — DR. RAVI SHANKAR RAI · COVER STORY
                    </span>
                  </div>

                  {/* Tri-Metric Ribbon inside Left Page */}
                  <div className="grid grid-cols-3 gap-1 pt-1 border-t border-[#152B22]/25">
                    <div>
                      <span className="font-playfair font-bold text-[clamp(10.5px,1.25vw,16px)] text-[#152B22] block leading-none">
                        15,000+
                      </span>
                      <span className="font-mono text-[clamp(6px,0.65vw,7.5px)] uppercase tracking-wider text-[#152B22]/75 font-semibold">
                        PROJECTS
                      </span>
                    </div>
                    <div>
                      <span className="font-playfair font-bold text-[clamp(10.5px,1.25vw,16px)] text-[#152B22] block leading-none">
                        25+ Yrs
                      </span>
                      <span className="font-mono text-[clamp(6px,0.65vw,7.5px)] uppercase tracking-wider text-[#152B22]/75 font-semibold">
                        ZERO DISMISSAL
                      </span>
                    </div>
                    <div>
                      <span className="font-playfair font-bold text-[clamp(10.5px,1.25vw,16px)] text-[#152B22] block leading-none">
                        500+
                      </span>
                      <span className="font-mono text-[clamp(6px,0.65vw,7.5px)] uppercase tracking-wider text-[#152B22]/75 font-semibold">
                        LEADERS
                      </span>
                    </div>
                  </div>
                </div>

                {/* Left Page Footer */}
                <div className="ink-reveal flex items-center justify-between border-t border-[#152B22]/30 pt-1">
                  <span className="font-mono text-[clamp(6.5px,0.7vw,8.5px)] uppercase tracking-[0.14em] text-[#152B22]/65 font-semibold">
                    CORRIDOR: TELECOM · RAIL · DEFENSE
                  </span>
                  <button
                    type="button"
                    onClick={() => handleNavigate('/leadership')}
                    className="group inline-flex items-center gap-1 font-mono text-[clamp(7px,0.8vw,10px)] uppercase tracking-wider text-[#152B22] hover:text-[#00140F] font-bold transition-colors cursor-pointer"
                  >
                    <span>LEADERSHIP RETROSPECTIVE</span>
                    <ArrowRight className="w-2.5 h-2.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            )}

            {/* =============================================================== */}
            {/* OVERLAY: RIGHT PAGE // THE LITERARY CONSCIENCE (Terracotta Ink) */}
            {/* Strict Parchment Safe Zone: Left ~53.5% to 92.5%, Top ~6.5% to 92% */}
            {/* =============================================================== */}
            {(activeView === 'split' || activeView === 'writer') && (
              <div
                className={`absolute top-[6.5%] bottom-[7.5%] flex flex-col justify-between z-10 transition-all duration-500 select-text overflow-hidden ${
                  activeView === 'writer'
                    ? 'left-[10%] right-[10%] max-w-xl mx-auto py-2'
                    : 'left-[53.5%] right-[7.5%] pl-1 pr-2 sm:pl-2.5 sm:pr-3.5 lg:pl-3.5 lg:pr-5'
                }`}
                style={{
                  color: '#261C14',
                  mixBlendMode: 'multiply',
                }}
              >
                {/* Top Folio Header */}
                <div className="ink-reveal flex items-center justify-between border-b border-[#261C14]/35 pb-1">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <Feather className="w-2.5 h-2.5 text-[#8A2E12]" />
                    <span className="font-mono text-[clamp(7.5px,0.85vw,10.5px)] uppercase tracking-[0.16em] font-bold text-[#8A2E12]">
                      FOLIO II // LITERARY MANUSCRIPT
                    </span>
                  </div>
                  <span className="font-devanagari text-[clamp(8.5px,0.9vw,11.5px)] text-[#8A2E12] font-semibold">
                    कालुवा ग़ाज़ीपुरी · माटी
                  </span>
                </div>

                {/* Stately Title & Poem Manuscript */}
                <div className="ink-reveal space-y-1 sm:space-y-1.5 my-auto py-0.5">
                  <span className="font-mono text-[clamp(6.5px,0.7vw,8.5px)] uppercase tracking-[0.22em] text-[#8A2E12] font-bold block">
                    VOICE OF PURVANCHAL'S SOIL
                  </span>

                  <h3 className="font-playfair font-bold text-[clamp(12px,1.45vw,19px)] text-[#261C14] leading-[1.12] tracking-tight">
                    Words Born from Soil &amp; Conscience
                  </h3>

                  {/* Hand-Pressed Letterpress Poem Plate */}
                  <div className="pt-0.5">
                    <div className="p-1 sm:p-2 bg-[#8A2E12]/5 rounded-xs border border-[#8A2E12]/25 border-l-2 border-l-[#8A2E12] space-y-0.5">
                      <p className="font-devanagari font-semibold text-[clamp(9.5px,1.1vw,13.5px)] leading-snug text-[#261C14]">
                        "धूल से उपजे, गगन को छू भी लें तो क्या हुआ,
                        <br />
                        जड़ जो छूटी पेड़ से तो पत्ता-पत्ता बिखर गया।"
                      </p>
                      <div className="flex items-center justify-between pt-0.5 border-t border-[#261C14]/15">
                        <span className="font-devanagari text-[clamp(7.5px,0.8vw,9.5px)] text-[#8A2E12] font-bold">
                          — कविता: जड़ें और गगन
                        </span>
                        <span className="font-mono text-[clamp(6px,0.65vw,7.5px)] uppercase tracking-wider text-[#261C14]/60 font-semibold">
                          PURVANCHAL SOIL
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Prose Narrative & Signature */}
                  <p className="font-sans text-[clamp(8px,0.85vw,11.5px)] text-[#261C14]/90 leading-[1.4] line-clamp-3 pt-0.5">
                    Writing under the rooted pen name <strong className="font-devanagari font-bold text-[#8A2E12] not-italic">कालुवा ग़ाज़ीपुरी</strong>, Dr. Rai strips away corporate hierarchy to examine youth potential, social dignity, and rural conscience in essays like <em className="font-serif italic font-medium">"नई डिग्री"</em> (*A New Degree*).
                  </p>

                  <div className="flex items-center justify-between pt-0.5">
                    <span className="font-serif italic text-[clamp(9px,1.0vw,12.5px)] text-[#8A2E12] font-semibold">
                      Ravi S. Rai ✍︎
                    </span>
                    <span className="font-mono text-[clamp(6.5px,0.7vw,8px)] text-[#261C14]/60 font-medium">
                      MAATI SAMMAN · RAJGHAT
                    </span>
                  </div>
                </div>

                {/* Right Page Footer */}
                <div className="ink-reveal flex items-center justify-between border-t border-[#261C14]/30 pt-1">
                  <span className="font-mono text-[clamp(6.5px,0.7vw,8.5px)] uppercase tracking-[0.14em] text-[#261C14]/65 font-semibold">
                    GENRE: GHAZALS · NAZM · SATIRE
                  </span>
                  <button
                    type="button"
                    onClick={() => handleNavigate('/literary-world')}
                    className="group inline-flex items-center gap-1 font-mono text-[clamp(7px,0.8vw,10px)] uppercase tracking-wider text-[#8A2E12] hover:text-[#261C14] font-bold transition-colors cursor-pointer"
                  >
                    <span>READ LITERARY WORKS</span>
                    <ArrowRight className="w-2.5 h-2.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* =================================================================== */}
        {/* 3. ARCHITECTURAL HORIZON FOOTNOTE (Bridge of Two Worlds)           */}
        {/* =================================================================== */}
        <div
          className={`pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left font-mono text-[8.5px] uppercase tracking-[0.2em] border-t transition-colors duration-700 ${
            isThemeDark ? 'text-[#FAF7F0]/40 border-white/5' : 'text-[#003D32]/50 border-black/5'
          }`}
        >
          <span>CORPORATE ARTERIES OF A NATION</span>
          <span className="text-[#C6A36A]/75 font-semibold">ONE IDENTITY · TWO PARALLEL WORLDS</span>
          <span>LITERARY CONSCIENCE OF THE SOIL</span>
        </div>

        {/* =================================================================== */}
        {/* CONNECTIVE SCROLL BRIDGE: MONOGRAPH -> ACHIEVEMENTS GALLERY        */}
        {/* The golden calligraphic thread dips down toward the next chapter   */}
        {/* =================================================================== */}
        <div className="pt-8 sm:pt-12 flex flex-col items-center justify-center pointer-events-none select-none">
          <div className="flex flex-col items-center space-y-2.5">
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#C6A36A] font-semibold">
              CHAPTER III // THE RECOGNITION &amp; CITATIONS
            </span>
            <div className="relative w-px h-12 bg-gradient-to-b from-[#C6A36A]/60 via-[#C6A36A]/30 to-transparent overflow-hidden">
              <div className="w-full h-4 bg-[#C6A36A] animate-pulse" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
