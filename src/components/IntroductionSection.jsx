import React, { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, BookOpen, Building2, Sparkles, Feather } from 'lucide-react';
import portraitImg from '../assets/hero-bg.png';
import LiteraryFlightPath from './LiteraryFlightPath';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// AWWWARDS-TIER HOMEPAGE INTRODUCTION SECTION — DR. RAVI SHANKAR RAI
// Visual & Interactive Hierarchy:
// 1. Literary Flight Path: Wavy dashed curve + Calligraphic Quill gliding
//    across the top as the section opens
// 2. 3D Gyroscopic Archival Portrait: Tactile mouse parallax tilt & gold seal
// 3. Interactive Dual-Lens Switch: "The Industrial Titan" vs "The Literary Conscience"
// 4. "Proof of Empire" Verified Metrics Ribbon (1999, 15,000+, 25+ Yrs, 500+)
// 5. Sculpted Editorial Pull-Quote & Dual Magnetic Actions
// 6. Jean Rottner dynamic theme transition support (Ivory -> Deep Emerald)
// ============================================================================

export default function IntroductionSection({
  onNavigate,
  isCurtainReveal = false,
}) {
  const [activeLens, setActiveLens] = useState('titan'); // 'titan' | 'writer'
  const [flightProgress, setFlightProgress] = useState(0);
  const manualOverrideRef = useRef(false);
  const overrideTimerRef = useRef(null);
  
  const containerRef = useRef(null);
  const portraitFrameRef = useRef(null);
  const portraitCardRef = useRef(null);
  const sheenRef = useRef(null);
  const headlineRef = useRef(null);

  // Automatic perspective switch driven by calligraphic quill position
  // "when the quill moves more then half way make sure that it switches to 2nd point 'the literary concience'"
  const handleFlightProgress = (progress) => {
    setFlightProgress(progress);
    if (manualOverrideRef.current) return;

    if (progress >= 0.5) {
      setActiveLens('writer');
    } else {
      setActiveLens('titan');
    }
  };

  // Manual interactive switch (tabs, quill click, or track click)
  const handleManualTabSelect = (lens) => {
    setActiveLens(lens);
    manualOverrideRef.current = true;
    if (overrideTimerRef.current) clearTimeout(overrideTimerRef.current);
    overrideTimerRef.current = setTimeout(() => {
      manualOverrideRef.current = false;
    }, 3200);

    // Smoothly glide the literary quill to match the chosen perspective!
    if (typeof window !== 'undefined' && window.__setLiteraryFlightTarget) {
      const targetP = lens === 'writer' ? 0.85 : 0.18;
      window.__setLiteraryFlightTarget(targetP, 0.85);
    }
  };

  // 3D Mouse Parallax Tilt for Archival Portrait
  const handlePortraitMouseMove = (e) => {
    if (!portraitCardRef.current) return;
    const rect = portraitCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xNorm = (x / rect.width - 0.5) * 2; // -1 to 1
    const yNorm = (y / rect.height - 0.5) * 2;

    gsap.to(portraitCardRef.current, {
      rotateY: xNorm * 7.5,
      rotateX: -yNorm * 7.5,
      transformPerspective: 1000,
      ease: 'power1.out',
      duration: 0.4,
    });

    if (sheenRef.current) {
      gsap.to(sheenRef.current, {
        xPercent: xNorm * 35,
        yPercent: yNorm * 35,
        opacity: 0.35 + Math.abs(xNorm) * 0.25,
        duration: 0.4,
      });
    }
  };

  const handlePortraitMouseLeave = () => {
    if (!portraitCardRef.current) return;
    gsap.to(portraitCardRef.current, {
      rotateY: 0,
      rotateX: 0,
      ease: 'power2.out',
      duration: 0.8,
    });
    if (sheenRef.current) {
      gsap.to(sheenRef.current, {
        xPercent: 0,
        yPercent: 0,
        opacity: 0.2,
        duration: 0.8,
      });
    }
  };

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // When embedded inside the pinned hero curtain reveal, the parent timeline guides initial entrance
    if (isCurtainReveal) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Portrait card entrance
      tl.fromTo(
        portraitFrameRef.current,
        { y: 35, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' },
        0
      );

      // Headline track
      tl.fromTo(
        '.headline-reveal-track',
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.05, ease: 'power3.out' },
        0.1
      );

      // Staggered items
      tl.fromTo(
        '.intro-reveal-item',
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.08, ease: 'power3.out' },
        0.2
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isCurtainReveal]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative z-20 selection:bg-[#C6A36A] selection:text-[#FAF7F0] py-3.5 sm:py-4 lg:py-5 px-4 sm:px-8 lg:px-12 overflow-hidden font-sans min-h-screen flex flex-col justify-center bg-[#FAF7F0] text-[#003D32] shadow-[0_-25px_60px_rgba(0,35,29,0.18)]"
    >
      {/* Subtle Archival Paper Grain Texture */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-25" />

      {/* Luminous Ambient Studio Lighting */}
      <div className="absolute top-1/4 left-0 w-[42vw] h-[42vw] rounded-full blur-3xl pointer-events-none -ml-20 bg-[#F1E8D9]/60" />
      <div className="absolute bottom-10 right-0 w-[38vw] h-[38vw] rounded-full blur-3xl pointer-events-none -mr-20 bg-[#F1E8D9]/50" />

      {/* =================================================================== */}
      {/* 0. LITERARY FLIGHT PATH: Fine-line Quill in Burnt Terracotta (#C66A3D)*/}
      {/* Glides across the top of the section every time it opens           */}
      {/* =================================================================== */}
      <div className="w-full max-w-[1360px] mx-auto mb-1 sm:mb-2">
        <LiteraryFlightPath
          isPinnedHero={isCurtainReveal}
          labelLeft={activeLens === 'titan' ? "कलम से विचार तक" : "कलम और संवेदना का संकल्प"}
          labelRight={activeLens === 'titan' ? "THE INDUSTRIAL TITAN" : "THE LITERARY CONSCIENCE"}
          accentColor="#C6A36A"
          quillColor="#C66A3D"
          textColor="#003D32"
          activeLens={activeLens}
          onProgress={handleFlightProgress}
          onToggleLens={handleManualTabSelect}
        />
      </div>

      <div className="relative max-w-[1360px] mx-auto w-full">
        
        {/* =================================================================== */}
        {/* TWO-COLUMN EDITORIAL COMPOSITION                                    */}
        {/* LEFT: 3D Archival Framed Portrait with Gold Monogram Seal & Signature*/}
        {/* RIGHT: Typographic Drama, Dual-Lens Switch, Verified Metrics & CTA  */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-14 items-center">

          {/* =================================================================
              LEFT COLUMN: Interactive 3D Archival Portrait Card
              ================================================================= */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
            <div
              ref={portraitFrameRef}
              className="intro-portrait-frame relative w-full max-w-[275px] sm:max-w-[325px] md:max-w-[365px] lg:max-w-[395px] xl:max-w-[415px]"
              onMouseMove={handlePortraitMouseMove}
              onMouseLeave={handlePortraitMouseLeave}
            >
              {/* Offset Fine Gold Outline (Signature Editorial Archival Frame) */}
              <div className="absolute -top-2.5 -left-2.5 sm:-top-3 sm:-left-3 w-full h-full rounded-2xl border border-[#C6A36A]/45 pointer-events-none -z-0" />

              {/* Main Card with 3D Tilt Transform */}
              <div
                ref={portraitCardRef}
                className="relative z-10 rounded-2xl p-2 sm:p-2.5 border transition-all duration-500 will-change-transform bg-white/95 shadow-[0_20px_40px_rgba(0,40,30,0.1)] border-[#C6A36A]/25 hover:shadow-[0_30px_55px_rgba(0,40,30,0.16)]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Gold Heritage Seal / Monogram Stamp */}
                <div
                  className="absolute top-2.5 right-2.5 z-20 w-10 h-10 sm:w-10.5 sm:h-10.5 rounded-full border border-[#C6A36A]/60 bg-[#FAF7F0]/90 backdrop-blur-xs flex flex-col items-center justify-center pointer-events-none shadow-[0_2px_8px_rgba(198,163,106,0.25)] transition-all duration-300"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  {activeLens === 'titan' ? (
                    <>
                      <span className="font-playfair text-[8px] sm:text-[8.5px] tracking-[0.12em] uppercase text-[#003D32] font-bold">
                        SAVITRI
                      </span>
                      <span className="font-playfair text-[6.5px] sm:text-[7px] tracking-wider text-[#FF6B35] font-semibold">
                        1999
                      </span>
                      <div className="w-3.5 h-px bg-[#C6A36A]/50 mt-0.5" />
                    </>
                  ) : (
                    <>
                      <span className="font-playfair text-[7.5px] sm:text-[8px] tracking-[0.12em] uppercase text-[#003D32] font-bold">
                        MAATI
                      </span>
                      <span className="font-devanagari text-[7px] sm:text-[7.5px] tracking-wide text-[#FF6B35] font-semibold">
                        सम्मान
                      </span>
                      <div className="w-3.5 h-px bg-[#C6A36A]/50 mt-0.5" />
                    </>
                  )}
                </div>

                {/* Inner Archival Matting & Photograph */}
                <div
                  className="relative aspect-4/5 rounded-xl overflow-hidden border border-[#C6A36A]/15 flex items-end justify-center select-none"
                  style={{
                    background:
                      'radial-gradient(ellipse at 50% 30%, #FAF6EE 0%, #F0E6D2 70%, #E3D4BC 100%)',
                  }}
                >
                  {/* Subtle Studio Spotlight behind subject */}
                  <div
                    ref={sheenRef}
                    className="absolute inset-0 pointer-events-none opacity-20 transition-opacity duration-300"
                    style={{
                      background:
                        'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.95) 0%, rgba(255,246,230,0.3) 45%, transparent 70%)',
                    }}
                  />

                  {/* Cutout Portrait with subtle drop shadow */}
                  <img
                    src={portraitImg}
                    alt="Dr. Ravi Shankar Rai"
                    className="portrait-image-inner relative z-10 w-full h-[96%] object-contain object-bottom filter contrast-[1.02] brightness-[1.01] drop-shadow-[0_14px_28px_rgba(0,61,50,0.18)]"
                    loading="lazy"
                  />

                  {/* Soft Archival Matting Grounding */}
                  <div className="absolute inset-x-0 bottom-0 h-9 bg-gradient-to-t from-[#E5DAC6]/95 to-transparent pointer-events-none z-10" />
                </div>

                {/* Facsimile Calligraphic Signature & Monograph Tag */}
                <div className="mt-1.5 pt-1.5 border-t flex items-center justify-between border-[#003D32]/8 transition-all duration-300">
                  <div className="flex flex-col">
                    <span className="font-sans font-[600] text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-[#003D32]/80">
                      {activeLens === 'titan' ? 'DR. RAVI SHANKAR RAI' : 'KALUWA GHAZIPURI'}
                    </span>
                    <span className="font-devanagari text-[10.5px] sm:text-[11.5px] text-[#FF6B35] font-medium tracking-wide">
                      {activeLens === 'titan' ? 'उद्यम के शिल्पी' : 'कालुवा ग़ाज़ीपुरी'}
                    </span>
                  </div>

                  {/* Authentic Facsimile Signature Simulation */}
                  <div className="font-serif italic text-xs sm:text-[12.5px] tracking-wider text-[#C6A36A] font-light select-none">
                    {activeLens === 'titan' ? 'Ravi S. Rai ✍︎' : 'Kaluwa Ghazipuri ✍︎'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================================
              RIGHT COLUMN: Soft & Elegant Typography, Dual-Lens Switch & Content
              ================================================================= */}
          <div className="lg:col-span-7 flex flex-col space-y-2 sm:space-y-2.5 lg:space-y-3 pl-0 lg:pl-2 xl:pl-4">
            
            {/* 1. Staggered 3-Line Headline — Soft, Dignified Editorial Serif */}
            <div ref={headlineRef} className="overflow-hidden">
              <div className="intro-headline-track headline-reveal-track">
                <h2 className="font-playfair font-[600] text-[1.75rem] sm:text-[2.1rem] md:text-[2.4rem] lg:text-[2.7rem] xl:text-[2.95rem] tracking-[-0.018em] leading-[1.06] max-w-xl text-[#003D32]">
                  <span className="block font-[500]">Beyond the</span>
                  <span className="block mt-0.5 font-[600] transition-all duration-300">
                    {activeLens === 'titan' ? 'Business' : 'Written'}
                  </span>
                  <span className="block mt-0.5 font-serif font-normal italic tracking-normal text-[#C6A36A] lowercase text-[0.98em] transition-all duration-300">
                    {activeLens === 'titan' ? 'of building.' : 'conscience.'}
                  </span>
                </h2>
              </div>
            </div>

            {/* 2. Bilingual Cultural Anchor Badge */}
            <div className="intro-reveal-item flex items-center gap-2 pt-0 transition-all duration-300">
              <span className="font-devanagari font-[600] text-xs sm:text-[13px] text-[#003D32]">
                {activeLens === 'titan' ? 'एक व्यक्तित्व · दो संसार' : 'कलम और संवेदना का संकल्प'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] shadow-[0_0_6px_#FF6B35]" />
              <span className="font-sans font-[600] text-[10px] sm:text-[11px] tracking-[0.15em] text-[#C6A36A] uppercase">
                {activeLens === 'titan' ? '01 // THE INDUSTRIAL TITAN' : '02 // THE LITERARY CONSCIENCE'}
              </span>
            </div>

            {/* 3. Interactive Dual-Lens Switcher */}
            <div className="intro-reveal-item flex flex-wrap items-center gap-2.5 pt-0.5">
              <button
                type="button"
                onClick={() => handleManualTabSelect('titan')}
                className={`cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-sans font-[600] text-[10.5px] sm:text-[11.5px] tracking-[0.05em] uppercase transition-all duration-300 border ${
                  activeLens === 'titan'
                    ? 'bg-gradient-to-r from-[#DFBE83] via-[#C6A36A] to-[#B38D4E] text-[#00140F] border-[#C6A36A] shadow-xs scale-[1.02]'
                    : 'bg-transparent text-[#003D32]/65 border-[#003D32]/20 hover:border-[#003D32]/50 hover:bg-[#FAF7F0]'
                }`}
              >
                <Building2 className={`w-3.5 h-3.5 ${activeLens === 'titan' ? 'text-[#00140F]' : 'text-[#FF8A50]'}`} />
                <span>01 // THE INDUSTRIAL TITAN</span>
              </button>

              <button
                type="button"
                onClick={() => handleManualTabSelect('writer')}
                className={`cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-sans font-[600] text-[10.5px] sm:text-[11.5px] tracking-[0.05em] uppercase transition-all duration-300 border ${
                  activeLens === 'writer'
                    ? 'bg-gradient-to-r from-[#DFBE83] via-[#C6A36A] to-[#B38D4E] text-[#00140F] border-[#C6A36A] shadow-xs scale-[1.02]'
                    : 'bg-transparent text-[#003D32]/65 border-[#003D32]/20 hover:border-[#003D32]/50 hover:bg-[#FAF7F0]'
                }`}
              >
                <Feather className={`w-3.5 h-3.5 ${activeLens === 'writer' ? 'text-[#00140F]' : 'text-[#FF8A50]'}`} />
                <span>02 // THE LITERARY CONSCIENCE</span>
              </button>
            </div>

            {/* 4. Adaptive Narrative Paragraph (Switches with Dual-Lens) */}
            <div className="intro-reveal-item min-h-[48px] sm:min-h-[54px] transition-all duration-300">
              {activeLens === 'titan' ? (
                <p className="font-sans text-[13px] sm:text-[14px] lg:text-[15px] leading-[1.62] font-normal max-w-xl text-[#003D32]/85">
                  Founded in 1999 at Bhikaji Cama Place, New Delhi, Dr. Ravi Shankar Rai steered{' '}
                  <strong className="font-semibold text-[#003D32]">Savitri Group</strong>{' '}
                  into a national telecom titan with over{' '}
                  <span className="text-[#FF6B35] font-medium">15,000+ completed projects</span>, championing a landmark 25-year zero-dismissal philosophy where employees are honored as “Office Hosts.”
                </p>
              ) : (
                <p className="font-sans text-[13px] sm:text-[14px] lg:text-[15px] leading-[1.62] font-normal max-w-xl text-[#003D32]/85">
                  Under the celebrated pen name{' '}
                  <strong className="font-semibold text-[#003D32]">कालुवा ग़ाज़ीपुरी</strong>{' '}
                  (Kaluwa Ghazipuri), Dr. Rai writes with the raw fragrance of Purvanchal's soil (<em>माटी</em>). His sharp satirical essays, including{' '}
                  <span className="text-[#FF6B35] font-medium">"नई डिग्री"</span> (<em>A New Degree</em>), critique youth potential and social realities, earning him the prestigious <em>Maati Samman</em> at Gandhi Darshan, Rajghat.
                </p>
              )}
            </div>

            {/* 5. "Proof of Empire" Verified Metrics Ribbon */}
            <div className="intro-reveal-item py-1.5 sm:py-2 border-y max-w-xl grid grid-cols-2 sm:grid-cols-4 gap-2.5 select-none border-[#003D32]/12 transition-all duration-300">
              {activeLens === 'titan' ? (
                <>
                  <div>
                    <span className="block font-sans font-[700] text-[8.5px] sm:text-[9px] uppercase tracking-[0.14em] text-[#C6A36A]">
                      ESTABLISHED
                    </span>
                    <span className="font-playfair font-[600] text-xl sm:text-2xl lg:text-[1.55rem] leading-tight tracking-tight text-[#003D32]">
                      1999
                    </span>
                    <span className="block font-sans text-[9.5px] sm:text-[10px] text-[#003D32]/70">
                      New Delhi, IN
                    </span>
                  </div>

                  <div>
                    <span className="block font-sans font-[700] text-[8.5px] sm:text-[9px] uppercase tracking-[0.14em] text-[#C6A36A]">
                      INFRASTRUCTURE
                    </span>
                    <span className="font-playfair font-[600] text-xl sm:text-2xl lg:text-[1.55rem] leading-tight tracking-tight text-[#003D32]">
                      15,000+
                    </span>
                    <span className="block font-sans text-[9.5px] sm:text-[10px] text-[#003D32]/70">
                      Projects Delivered
                    </span>
                  </div>

                  <div>
                    <span className="block font-sans font-[700] text-[8.5px] sm:text-[9px] uppercase tracking-[0.14em] text-[#C6A36A]">
                      PEOPLE FIRST
                    </span>
                    <span className="font-playfair font-[600] text-xl sm:text-2xl lg:text-[1.55rem] leading-tight tracking-tight text-[#003D32]">
                      25+ Yrs
                    </span>
                    <span className="block font-sans text-[9.5px] sm:text-[10px] text-[#003D32]/70">
                      Zero Dismissals
                    </span>
                  </div>

                  <div>
                    <span className="block font-sans font-[700] text-[8.5px] sm:text-[9px] uppercase tracking-[0.14em] text-[#C6A36A]">
                      ENTREPRENEURSHIP
                    </span>
                    <span className="font-playfair font-[600] text-xl sm:text-2xl lg:text-[1.55rem] leading-tight tracking-tight text-[#003D32]">
                      500+
                    </span>
                    <span className="block font-sans text-[9.5px] sm:text-[10px] text-[#003D32]/70">
                      Leaders Mentored
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <span className="block font-sans font-[700] text-[8.5px] sm:text-[9px] uppercase tracking-[0.14em] text-[#C6A36A]">
                      LITERARY OEUVRE
                    </span>
                    <span className="font-devanagari font-[600] text-xl sm:text-2xl lg:text-[1.55rem] leading-tight tracking-tight text-[#003D32]">
                      कालुवा
                    </span>
                    <span className="block font-sans text-[9.5px] sm:text-[10px] text-[#003D32]/70">
                      ग़ाज़ीपुरी Pen Name
                    </span>
                  </div>

                  <div>
                    <span className="block font-sans font-[700] text-[8.5px] sm:text-[9px] uppercase tracking-[0.14em] text-[#C6A36A]">
                      COLLECTED WORKS
                    </span>
                    <span className="font-playfair font-[600] text-xl sm:text-2xl lg:text-[1.55rem] leading-tight tracking-tight text-[#003D32]">
                      4+ Vols
                    </span>
                    <span className="block font-sans text-[9.5px] sm:text-[10px] text-[#003D32]/70">
                      Verse & Satire
                    </span>
                  </div>

                  <div>
                    <span className="block font-sans font-[700] text-[8.5px] sm:text-[9px] uppercase tracking-[0.14em] text-[#C6A36A]">
                      SATIRICAL ESSAYS
                    </span>
                    <span className="font-playfair font-[600] text-xl sm:text-2xl lg:text-[1.55rem] leading-tight tracking-tight text-[#003D32]">
                      250+
                    </span>
                    <span className="block font-sans text-[9.5px] sm:text-[10px] text-[#003D32]/70">
                      National Features
                    </span>
                  </div>

                  <div>
                    <span className="block font-sans font-[700] text-[8.5px] sm:text-[9px] uppercase tracking-[0.14em] text-[#C6A36A]">
                      CULTURAL HONORS
                    </span>
                    <span className="font-devanagari font-[600] text-lg sm:text-xl lg:text-[1.35rem] leading-tight tracking-tight text-[#FF6B35]">
                      माटी सम्मान
                    </span>
                    <span className="block font-sans text-[9.5px] sm:text-[10px] text-[#003D32]/70">
                      Gandhi Darshan
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* 6. Sculpted Pull-Quote */}
            <div className="intro-reveal-item pt-0.5 max-w-xl transition-all duration-300">
              <blockquote className="relative pl-3 border-l-2 border-[#C6A36A] space-y-0.5">
                <p className="font-serif italic text-[12.5px] sm:text-[13px] lg:text-[14px] leading-snug text-[#003D32] transition-all duration-300">
                  {activeLens === 'titan'
                    ? `"What value do skills hold if they never translate into livelihood? An enterprise is measured in lives elevated, not ledgers."`
                    : `"साहित्य केवल शब्दों का विलास नहीं, आत्मा की पुकार है। उद्यम से हम देह का पोषण करते हैं, पर साहित्य से समाज की चेतना जागती है।"`}
                </p>
                <footer className="flex items-center gap-1.5 font-sans font-[600] text-[8.5px] sm:text-[9px] tracking-[0.12em] text-[#C6A36A] uppercase pt-0.5">
                  <span>{activeLens === 'titan' ? '— DR. RAVI SHANKAR RAI' : '— कालुवा ग़ाज़ीपुरी (DR. RAVI SHANKAR RAI)'}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                  <span className="text-[#FF8A50]">
                    {activeLens === 'titan' ? 'TRADEFLOCK FEATURE' : 'माटी सम्मान · संकलन एवं आलेख संग्रह'}
                  </span>
                </footer>
              </blockquote>
            </div>

            {/* 7. Distinctive Dual Action Row with Signature Vantara Emerald Interaction */}
            <div className="intro-reveal-item pt-2 flex flex-wrap items-center gap-4 sm:gap-5 transition-all duration-300">
              {activeLens === 'titan' ? (
                <>
                  <a
                    href="/about"
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        onNavigate('/about');
                      }
                    }}
                    className="btn-vantara-solid"
                  >
                    <span>Explore Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href="/literary-world"
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        onNavigate('/literary-world');
                      }
                    }}
                    className="btn-vantara"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#C6A36A]" />
                    <span>Read Literary Essays</span>
                  </a>
                </>
              ) : (
                <>
                  <a
                    href="/literary-world"
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        onNavigate('/literary-world');
                      }
                    }}
                    className="btn-vantara-solid"
                  >
                    <span>Explore Literary World</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href="/literary-world"
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        onNavigate('/literary-world');
                      }
                    }}
                    className="btn-vantara"
                  >
                    <Feather className="w-3.5 h-3.5 text-[#C6A36A]" />
                    <span>Read "नई डिग्री" & Satire</span>
                  </a>
                </>
              )}
            </div>

          </div>

        </div>

        {/* =================================================================== */}
        {/* CONNECTIVE SCROLL BRIDGE: INTRODUCTION -> DUAL MONOGRAPH            */}
        {/* Continuous visual thread guiding the user into the living manuscript*/}
        {/* =================================================================== */}
        <div className="pt-10 sm:pt-14 pb-2 flex flex-col items-center justify-center pointer-events-none select-none">
          <div className="flex flex-col items-center space-y-2.5">
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#C6A36A] font-semibold">
              CHAPTER II // THE DUAL MONOGRAPH
            </span>
            <div className="relative w-px h-12 bg-gradient-to-b from-[#C6A36A]/60 via-[#C6A36A]/30 to-transparent overflow-hidden">
              {/* Traveling light pulse down the thread */}
              <div className="w-full h-4 bg-[#C6A36A] animate-pulse" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
