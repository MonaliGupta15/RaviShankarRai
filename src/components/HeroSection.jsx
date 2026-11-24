import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ceoMdPortrait from '../assets/CEO-MD-SavitriTelecomServices.jpg.webp';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// LIGHT LUXURY EDITORIAL PALETTE & TYPOGRAPHY
// - Deep Emerald: #003D32 (Primary left panel with natural tonal depth)
// - Soft Champagne Ivory: #F1E8D9 (Luminous, airy right panel)
// - Warm Ivory: #FAF7F0 (Typography on emerald)
// - Champagne Gold: #C6A36A (Refined metallic separators & details)
// ============================================================================

const UNIFIED_FONT_SIZE = 'text-[clamp(32px,7.4vw,106px)]';

// Architectural left-aligned stack with calibrated left margin
const LEFT_STACK_CONFIG = [
  {
    id: 'row-ravi',
    text: 'RAVI',
    containerClass: 'justify-start pl-[3vw] sm:pl-[3.8vw] lg:pl-[4.2vw]',
    fontClass: UNIFIED_FONT_SIZE,
  },
  {
    id: 'row-shankar',
    text: 'SHANKAR',
    containerClass: 'justify-start pl-[3vw] sm:pl-[3.8vw] lg:pl-[4.2vw]',
    fontClass: UNIFIED_FONT_SIZE,
  },
  {
    id: 'row-rai',
    text: 'RAI',
    containerClass: 'justify-start pl-[3vw] sm:pl-[3.8vw] lg:pl-[4.2vw]',
    fontClass: UNIFIED_FONT_SIZE,
  },
];

// Reusable typographic stack component to feed dual-clipped color layers
function TypographicStack({ textColor }) {
  let globalCharIndex = 0;
  return (
    <div className="absolute inset-0 flex flex-col justify-center pointer-events-none">
      <div className="w-full flex flex-col space-y-[1.1vh] sm:space-y-[1.4vh] lg:space-y-[1.8vh]">
        {LEFT_STACK_CONFIG.map((row) => {
          const chars = row.text.split('');
          return (
            <div
              key={row.id}
              className={`w-full flex items-center max-w-none ${row.containerClass}`}
            >
              <div className="inline-flex items-center">
                <h1
                  className={`font-hero-syne font-[800] uppercase tracking-[-0.035em] flex items-center leading-[0.88] select-none ${textColor} ${row.fontClass}`}
                  style={{ textRendering: 'optimizeLegibility' }}
                >
                  {chars.map((char, charIdx) => {
                    const curIndex = globalCharIndex++;
                    return (
                      <span
                        key={`${row.id}-${charIdx}`}
                        className="letter-mask inline-block overflow-hidden h-[0.88em] leading-[0.88] align-top"
                        style={{
                          verticalAlign: 'top',
                          WebkitMaskImage:
                            'linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)',
                          maskImage:
                            'linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)',
                        }}
                      >
                        <span
                          className="letter-track flex flex-col will-change-transform"
                          data-char-idx={curIndex}
                        >
                          {/* 2 stacked character layers for single rotation */}
                          <span className="block h-[0.88em] leading-[0.88] select-none">
                            {char}
                          </span>
                          <span className="block h-[0.88em] leading-[0.88] select-none">
                            {char}
                          </span>
                        </span>
                      </span>
                    );
                  })}
                </h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Lower Middle Dual-Tone Kinetic Watermark (Straddling Green & White Seam)
function LowerMiddleKineticWatermark({ textColor }) {
  return (
    <div className="absolute inset-x-0 bottom-[13.5vh] sm:bottom-[15.5vh] flex flex-col items-center justify-center pointer-events-none select-none z-10">
      <div className="relative w-full max-w-[94vw] h-20 sm:h-28 flex items-center justify-center overflow-hidden">
        
        {/* Dimension 1: ARCHITECT */}
        <div className="hero-split-word hero-split-architect absolute inset-0 flex items-center justify-center will-change-transform opacity-0">
          <span
            className={`font-sans font-[800] text-[clamp(28px,5.8vw,86px)] uppercase tracking-[0.24em] select-none whitespace-nowrap opacity-25 ${textColor} blur-[0.3px]`}
          >
            ARCHITECT
          </span>
        </div>

        {/* Dimension 2: POET */}
        <div className="hero-split-word hero-split-poet absolute inset-0 flex items-center justify-center will-change-transform opacity-0">
          <span
            className={`font-serif italic font-[500] text-[clamp(38px,7.6vw,114px)] tracking-wider select-none whitespace-nowrap opacity-30 ${textColor} blur-[0.3px]`}
          >
            poet
          </span>
        </div>

        {/* Dimension 3: WRITER */}
        <div className="hero-split-word hero-split-writer absolute inset-0 flex items-center justify-center will-change-transform opacity-0">
          <span
            className={`font-serif italic font-[500] text-[clamp(38px,7.6vw,114px)] tracking-wider select-none whitespace-nowrap opacity-28 ${textColor} blur-[0.3px]`}
          >
            writer
          </span>
        </div>

        {/* Dimension 4: PHILOSOPHER */}
        <div className="hero-split-word hero-split-philosopher absolute inset-0 flex items-center justify-center will-change-transform opacity-0">
          <span
            className={`font-sans font-[700] text-[clamp(24px,4.8vw,72px)] uppercase tracking-[0.26em] select-none whitespace-nowrap opacity-28 ${textColor} blur-[0.3px]`}
          >
            PHILOSOPHER
          </span>
        </div>

        {/* Dimension 5: SOCIAL REFORMER */}
        <div className="hero-split-word hero-split-reformer absolute inset-0 flex items-center justify-center will-change-transform opacity-0">
          <span
            className={`font-sans font-[700] text-[clamp(20px,4.0vw,60px)] uppercase tracking-[0.24em] select-none whitespace-nowrap opacity-28 ${textColor} blur-[0.3px]`}
          >
            SOCIAL REFORMER
          </span>
        </div>

      </div>
    </div>
  );
}

export default function HeroSection({ onNavigate, children }) {
  const containerRef = useRef(null);
  const viewportRef = useRef(null);
  const indicatorBarRef = useRef(null);
  const seamPulseRef = useRef(null);
  const seamContainerRef = useRef(null);
  const timelineRef = useRef(null);

  const scrollToPhase = (progress) => {
    if (!timelineRef.current || !timelineRef.current.scrollTrigger) return;
    const st = timelineRef.current.scrollTrigger;
    const targetScroll = st.start + progress * (st.end - st.start);
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  useLayoutEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) return;

    let handleMouseMove = null;

    const ctx = gsap.context(() => {
      // 14 total characters: RAVI (4) + SHANKAR (7) + RAI (3)
      const totalChars = 14;

      // Master Scroll Runway: hero effects + hold + curtain split reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=500%',
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      });

      timelineRef.current = tl;

      // 1. Sequential cascading letter roll (Foreground, Deliberate & Smooth)
      const letterDuration = 0.55;
      const step = 0.16;
      const rollDuration = (totalChars - 1) * step + letterDuration; // ~2.63s
      const settledHoldDuration = 1.0; // generous buffer so hero stays fully displayed
      const totalHeroDuration = rollDuration + settledHoldDuration; // ~3.63s

      for (let i = 0; i < totalChars; i++) {
        const charElements = containerRef.current.querySelectorAll(
          `[data-char-idx="${i}"]`
        );
        tl.to(
          charElements,
          {
            yPercent: -50,
            duration: letterDuration,
            ease: 'power2.inOut',
          },
          i * step
        );
      }

      // 2. Vertical Progress Bar Tracker
      if (indicatorBarRef.current) {
        tl.to(
          indicatorBarRef.current,
          {
            scaleY: 1,
            duration: totalHeroDuration,
            ease: 'none',
          },
          0
        );
      }

      // 3. Cinematic Portrait Slow Push-in (Ken Burns Depth)
      tl.to(
        '.hero-portrait-img',
        {
          scale: 1.055,
          yPercent: -2.2,
          duration: totalHeroDuration,
          ease: 'sine.out',
        },
        0
      );

      // 4. Shifting Studio Ambient Light on Right Ivory Panel
      tl.to(
        '.hero-ambient-light',
        {
          xPercent: 30,
          opacity: 0.55,
          scale: 1.2,
          duration: totalHeroDuration,
          ease: 'none',
        },
        0
      );

      // 5. Center Split Seam Traveling Volumetric Optical Fiber Light Pulse
      if (seamPulseRef.current) {
        tl.fromTo(
          seamPulseRef.current,
          { top: '2%', opacity: 0.35, scale: 0.92 },
          { top: '95%', opacity: 1, scale: 1.12, duration: totalHeroDuration, ease: 'none' },
          0
        );
      }

      // 6. Background Radiance Shifts (Emerald Depth & Subtle Amber Warmth)
      tl.to(
        '.hero-emerald-aura',
        {
          scale: 1.25,
          opacity: 0.65,
          xPercent: 12,
          yPercent: -12,
          duration: totalHeroDuration,
          ease: 'none',
        },
        0
      );

      tl.to(
        '.hero-amber-aura',
        {
          scale: 1.2,
          opacity: 0.35,
          xPercent: -6,
          yPercent: -8,
          duration: totalHeroDuration,
          ease: 'none',
        },
        0
      );

      // 7. Lower Middle Dual-Tone Kinetic Watermark (Crisp, Single-Word Presence, Zero Overlap)
      // Dimension 1: ARCHITECT (Hidden at load, emerges the moment scrolling begins, then cleanly fades out before POET arrives)
      tl.fromTo(
        '.hero-split-architect',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
        0.05
      );
      tl.to(
        '.hero-split-architect',
        { opacity: 0, y: -14, duration: 0.2, ease: 'power2.in' },
        0.55
      );

      // Dimension 2: POET (Clean entrance, holds, cleanly fades out before WRITER arrives)
      tl.fromTo(
        '.hero-split-poet',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
        0.80
      );
      tl.to(
        '.hero-split-poet',
        { opacity: 0, y: -14, duration: 0.2, ease: 'power2.in' },
        1.30
      );

      // Dimension 3: WRITER (Clean entrance, holds, cleanly fades out before PHILOSOPHER arrives)
      tl.fromTo(
        '.hero-split-writer',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
        1.55
      );
      tl.to(
        '.hero-split-writer',
        { opacity: 0, y: -14, duration: 0.2, ease: 'power2.in' },
        2.05
      );

      // Dimension 4: PHILOSOPHER (Clean entrance, holds, cleanly fades out before SOCIAL REFORMER arrives)
      tl.fromTo(
        '.hero-split-philosopher',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
        2.30
      );
      tl.to(
        '.hero-split-philosopher',
        { opacity: 0, y: -14, duration: 0.2, ease: 'power2.in' },
        2.80
      );

      // Dimension 5: SOCIAL REFORMER (Clean entrance, stays settled with the hero composition)
      tl.fromTo(
        '.hero-split-reformer',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
        3.05
      );

      // 8. Cultural Crest Gentle Parallax Upward Drift
      tl.to(
        '.hero-cultural-crest',
        { yPercent: -12, opacity: 0.95, duration: totalHeroDuration, ease: 'none' },
        0
      );

      // 9. Role Indicators: Subtle Amber-Orange Glow Activation Sequence (Synced with reveals)
      const chipActiveStyle = {
        color: '#FFE2D1',
        backgroundColor: 'rgba(255, 107, 53, 0.16)',
        borderColor: 'rgba(255, 107, 53, 0.75)',
        boxShadow: '0 0 16px rgba(255, 87, 34, 0.32)',
        duration: 0.45,
        ease: 'power2.out',
      };

      tl.to('.hero-role-poet', chipActiveStyle, 0.80);
      tl.to('.hero-role-writer', chipActiveStyle, 1.55);
      tl.to('.hero-role-philosopher', chipActiveStyle, 2.30);
      tl.to('.hero-role-reformer', chipActiveStyle, 3.05);

      // 10. Dynamic Tagline Timeline Shift
      tl.to('.hero-tagline-track', { yPercent: -25, duration: 0.3, ease: 'power2.out' }, 0.80);
      tl.to('.hero-tagline-track', { yPercent: -50, duration: 0.3, ease: 'power2.out' }, 1.55);
      tl.to('.hero-tagline-track', { yPercent: -75, duration: 0.3, ease: 'power2.out' }, 2.30);

      // 11. Phase Counter Stage Shift
      tl.to('.hero-phase-track', { yPercent: -25, duration: 0.3, ease: 'power2.out' }, 0.80);
      tl.to('.hero-phase-track', { yPercent: -50, duration: 0.3, ease: 'power2.out' }, 1.55);
      tl.to('.hero-phase-track', { yPercent: -75, duration: 0.3, ease: 'power2.out' }, 2.30);

      // 12. Generous Settled Hold Period (Hero stays fully displayed and admired)
      tl.to({}, { duration: settledHoldDuration }, rollDuration);

      // 13. THE CENTER CURTAIN SPLIT REVEAL TIMELINE
      // As requested: After all hero effects complete, the page splits from the exact middle.
      // The green left half moves left, the ivory right half moves right,
      // and the introduction page comes into view underneath revealing itself.
      const curtainStartTime = totalHeroDuration;
      const curtainDuration = 1.35;

      // A. Center seam dissolves / unlatches
      if (seamContainerRef.current) {
        tl.to(
          seamContainerRef.current,
          {
            opacity: 0,
            scaleY: 0.3,
            duration: 0.25,
            ease: 'power2.in',
          },
          curtainStartTime
        );
      }

      // B. Green Left Half glides completely to the left
      tl.to(
        ['.hero-split-left-bg', '.hero-layer-left-typography', '.hero-footer-left'],
        {
          xPercent: -101,
          duration: curtainDuration,
          ease: 'power3.inOut',
        },
        curtainStartTime + 0.05
      );

      // C. Ivory Right Half (with Dr. Rai's portrait) glides completely to the right
      tl.to(
        ['.hero-split-right-bg', '.hero-layer-right-typography', '.hero-footer-right'],
        {
          xPercent: 101,
          duration: curtainDuration,
          ease: 'power3.inOut',
        },
        curtainStartTime + 0.05
      );

      // D. Underneath Introduction Section scales into place from center
      tl.fromTo(
        '.hero-intro-reveal-stage',
        { scale: 0.95, opacity: 0.2 },
        {
          scale: 1,
          opacity: 1,
          duration: curtainDuration,
          ease: 'power3.out',
        },
        curtainStartTime + 0.08
      );

      // D2. Literary Flight Path: Bidirectional quill writes forward / un-writes backward with scroll
      const flightProxy = { val: 0 };
      tl.to(
        flightProxy,
        {
          val: 1,
          duration: curtainDuration * 1.2,
          ease: 'none',
          onUpdate: () => {
            if (typeof window !== 'undefined' && window.__updateCurtainFlight) {
              window.__updateCurtainFlight(flightProxy.val);
            }
          },
        },
        curtainStartTime + 0.12
      );

      // E. Internal Introduction content cascade (Headline, Portrait, Story, CTA)
      tl.fromTo(
        '.intro-portrait-frame',
        { y: 35, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.85, ease: 'power3.out' },
        curtainStartTime + 0.35
      );

      tl.fromTo(
        '.intro-headline-track',
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.85, ease: 'power3.out' },
        curtainStartTime + 0.4
      );

      tl.fromTo(
        '.intro-reveal-item',
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: 'power3.out' },
        curtainStartTime + 0.5
      );

      // F. Make hero elements pointer-events-none after curtains part so Introduction is clickable
      tl.set(
        [
          '.hero-split-left-bg',
          '.hero-layer-left-typography',
          '.hero-footer-left',
          '.hero-split-right-bg',
          '.hero-layer-right-typography',
          '.hero-footer-right',
        ],
        { pointerEvents: 'none', visibility: 'hidden' },
        curtainStartTime + curtainDuration
      );

      // G. Settled hold after curtains clear
      tl.to({}, { duration: 0.8 }, curtainStartTime + curtainDuration);

      // 14. Subtle Desktop Mouse Gyroscopic Parallax (3-5px micro-depth, preserves design layout)
      handleMouseMove = (e) => {
        const { innerWidth, innerHeight } = window;
        const xNorm = (e.clientX / innerWidth - 0.5) * 2;
        const yNorm = (e.clientY / innerHeight - 0.5) * 2;
        gsap.to('.hero-portrait-img', {
          x: xNorm * 5,
          y: yNorm * 3.5,
          duration: 1.4,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        gsap.to('.hero-cultural-crest', {
          x: xNorm * -3.5,
          y: yNorm * -2.5,
          duration: 1.4,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        gsap.to('.hero-amber-aura', {
          x: xNorm * 6,
          y: yNorm * 4,
          duration: 1.6,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });

    }, containerRef);

    return () => {
      if (handleMouseMove) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#001713] overflow-x-hidden">
      <section
        ref={viewportRef}
        className="relative w-full min-h-screen overflow-hidden select-none"
      >
        {/* ============================================================== */}
        {/* UNDERNEATH LAYER: Introduction Section Revealed From Center    */}
        {/* ============================================================== */}
        <div className="hero-intro-reveal-stage absolute inset-0 z-10 w-full h-full overflow-y-auto will-change-transform pointer-events-auto">
          {children}
        </div>

        {/* ============================================================== */}
        {/* 0. 35MM CINEMATIC FILM GRAIN OVERLAY & PERIPHERAL VIGNETTE     */}
        {/* ============================================================== */}
        <div className="hero-35mm-grain animate-grain z-25 pointer-events-none" />

        {/* Mastershot Peripheral Vignette (Focuses gaze inwards) */}
        <div
          className="absolute inset-0 pointer-events-none z-25"
          style={{
            background:
              'radial-gradient(ellipse 115% 105% at 50% 50%, transparent 58%, rgba(0, 18, 14, 0.4) 100%)',
          }}
        />

        {/* ============================================================== */}
        {/* 1. DUAL-SPLIT BACKGROUND COMPOSITION (50/50 Screen)            */}
        {/* Left: Deep Emerald (#003D32) | Right: Soft Champagne Ivory (#F1E8D9) */}
        {/* ============================================================== */}
        <div className="absolute inset-0 flex flex-row w-full h-full z-20 pointer-events-none">
          
          {/* ------------------------------------------------------------ */}
          {/* Left Panel: Deep Emerald with Devanagari & Background Depth   */}
          {/* ------------------------------------------------------------ */}
          <div
            className="hero-split-left-bg w-[50%] h-full relative overflow-hidden will-change-transform shadow-[16px_0_40px_rgba(0,0,0,0.65)] pointer-events-auto"
            style={{
              background:
                'radial-gradient(ellipse 95% 85% at 28% 40%, #005242 0%, #003D32 45%, #00221A 100%)',
            }}
          >
            {/* Luminous Shifting Gemstone Emerald Radiance */}
            <div
              className="hero-emerald-aura absolute inset-0 pointer-events-none opacity-45 will-change-transform z-0"
              style={{
                background:
                  'radial-gradient(circle 520px at 32% 38%, rgba(0, 150, 120, 0.32) 0%, rgba(0, 61, 50, 0.08) 55%, transparent 75%)',
              }}
            />

            {/* Subtle Sunset Amber Radiance Footlight (Awwwards warm undertone) */}
            <div
              className="hero-amber-aura absolute inset-0 pointer-events-none opacity-20 will-change-transform z-0"
              style={{
                background:
                  'radial-gradient(circle 480px at 40% 70%, rgba(255, 107, 53, 0.15) 0%, rgba(217, 83, 30, 0.04) 50%, transparent 75%)',
              }}
            />

            {/* A. Cultural Identity Crest (Permanent Heritage Anchor at Top) */}
            <div className="hero-cultural-crest absolute top-[9.5%] sm:top-[11.5%] inset-x-0 flex flex-col items-center text-center space-y-1 sm:space-y-1.5 pointer-events-none select-none z-10 will-change-transform">
              {/* 1. रवि शंकर राय (Heritage Hindi Title) */}
              <span className="font-devanagari font-[700] text-[clamp(24px,3.9vw,60px)] text-center leading-[0.95] text-[#FAF7F0] opacity-35 tracking-normal block whitespace-nowrap drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)]">
                रवि शंकर राय
              </span>

              {/* 2. कालुवा ग़ाज़ीपुरी (Cultural Pen Name in Sacred Saffron Vermilion) */}
              <span className="font-devanagari font-[600] text-[clamp(17px,2.9vw,45px)] text-center leading-[0.95] text-[#FF8A50] opacity-55 tracking-wide block whitespace-nowrap drop-shadow-[0_2px_14px_rgba(255,107,53,0.3)]">
                कालुवा ग़ाज़ीपुरी
              </span>

              {/* Fine Metallic Saffron-Gold Hairline */}
              <div className="w-20 sm:w-28 h-px bg-gradient-to-r from-transparent via-[#FF6B35]/65 to-transparent mt-1 shadow-[0_0_8px_rgba(255,107,53,0.35)]" />
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* Right Panel: Soft Champagne Ivory (#F1E8D9) with Portrait     */}
          {/* (Visually Dominant on Right)                                 */}
          {/* ------------------------------------------------------------ */}
          <div
            className="hero-split-right-bg w-[50%] h-full relative overflow-hidden will-change-transform shadow-[-16px_0_40px_rgba(0,0,0,0.65)] pointer-events-auto"
            style={{ backgroundColor: '#F1E8D9' }}
          >
            {/* Understated Top-Right Archival Monograph (Preserves Clean Design) */}
            <div className="absolute top-6 sm:top-8 right-6 sm:right-10 lg:right-[4.2vw] hidden sm:flex items-center gap-2 pointer-events-none select-none z-10">
              <span className="w-1 h-1 rounded-full bg-[#FF6B35]" />
              <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#003D32]/50 font-medium">
                SAVITRI // MONOGRAPH 1999
              </span>
            </div>

            {/* White-Suit Portrait with Ken Burns Subtle Scale & Parallax */}
            <img
              src={ceoMdPortrait}
              alt="Dr. Ravi Shankar Rai"
              className="hero-portrait-img w-full h-full object-cover object-[72%_12%] select-none mix-blend-multiply filter contrast-[1.02] brightness-[1.02] will-change-transform"
              draggable={false}
            />

            {/* Moving Champagne Highlight */}
            <div
              className="hero-ambient-light absolute inset-0 pointer-events-none will-change-transform"
              style={{
                background:
                  'radial-gradient(ellipse 65% 55% at 65% 25%, rgba(255, 255, 255, 0.45) 0%, rgba(198, 163, 106, 0.12) 45%, transparent 75%)',
              }}
            />
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. CENTER VERTICAL SPLIT LINE & OPTICAL SEAM PULSE             */}
        {/* ============================================================== */}
        <div
          ref={seamContainerRef}
          className="absolute left-[50%] top-0 bottom-0 w-px z-30 pointer-events-none will-change-transform -translate-x-1/2"
          style={{
            background:
              'linear-gradient(180deg, rgba(198, 163, 106, 0.12) 0%, rgba(198, 163, 106, 0.5) 30%, rgba(255, 246, 224, 0.7) 50%, rgba(198, 163, 106, 0.5) 70%, rgba(198, 163, 106, 0.12) 100%)',
            boxShadow: '0 0 10px rgba(198, 163, 106, 0.35)',
          }}
        >
          {/* Subtle Precision Tick Notches along Seam */}
          <div className="absolute top-[22%] -translate-x-1/2 left-1/2 w-2 h-px bg-[#C6A36A]/40" />
          <div className="absolute top-[48%] -translate-x-1/2 left-1/2 w-3 h-px bg-[#FF6B35]/60 shadow-[0_0_4px_#FF6B35]" />
          <div className="absolute top-[72%] -translate-x-1/2 left-1/2 w-2 h-px bg-[#C6A36A]/40" />

          {/* Vertical Optical Pulse traveling down the seam with Amber-Orange Ember Core */}
          <div
            ref={seamPulseRef}
            className="absolute left-1/2 -translate-x-1/2 -top-10 w-1 sm:w-1.5 h-16 sm:h-20 rounded-full pointer-events-none will-change-transform"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, #FF6B35 25%, #FFF7ED 50%, #FF6B35 75%, transparent 100%)',
              boxShadow:
                '0 0 8px 1px rgba(255, 247, 237, 0.95), 0 0 16px 2.5px rgba(255, 107, 53, 0.8), 0 0 28px 4px rgba(255, 87, 34, 0.35)',
            }}
          />
        </div>

        {/* ============================================================== */}
        {/* 3. CLIPPED DUAL-LAYER TYPOGRAPHY (Oversized Architectural)     */}
        {/* Left 50%: Warm Ivory (#FAF7F0) on Deep Emerald                 */}
        {/* Right 50%: Deep Emerald (#003D32) on Soft Champagne Ivory      */}
        {/* ============================================================== */}

        {/* Layer A: Left Half Clip (Warm Ivory #FAF7F0) */}
        <div
          className="hero-layer-left-typography absolute inset-0 z-20 pointer-events-none select-none will-change-transform"
          style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}
        >
          <TypographicStack textColor="text-[#FAF7F0]" />
          <LowerMiddleKineticWatermark textColor="text-[#FAF7F0]" />
        </div>

        {/* Layer B: Right Half Clip (Deep Emerald #003D32) */}
        <div
          className="hero-layer-right-typography absolute inset-0 z-20 pointer-events-none select-none will-change-transform"
          style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}
        >
          <TypographicStack textColor="text-[#003D32]" />
          <LowerMiddleKineticWatermark textColor="text-[#003D32]" />
        </div>

        {/* ============================================================== */}
        {/* 4. BOTTOM BAR: Refined Role Chips & Subtle Phase Counter       */}
        {/* ============================================================== */}
        <footer className="absolute bottom-6 sm:bottom-8 inset-x-6 sm:inset-x-10 lg:inset-x-[4.2vw] z-30 flex flex-row items-end justify-between gap-4 pointer-events-auto select-none">
          
          {/* Left: Dynamic Editorial Tagline & Refined 4-Role Chips */}
          <div className="hero-footer-left space-y-2 max-w-lg z-30 select-none will-change-transform">
            
            {/* Dynamic Kinetic Tagline Track (IBM Plex Mono) */}
            <div className="flex items-center gap-2.5 overflow-hidden h-5">
              {/* Live Status Beacon (Awwwards-style Electric Orange Pulse) */}
              <div className="relative flex items-center justify-center w-2 h-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5722] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF6B35] shadow-[0_0_8px_#FF5722]" />
              </div>
              <div className="relative h-5 overflow-hidden">
                <div className="hero-tagline-track flex flex-col will-change-transform">
                  <span className="h-5 flex items-center font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#C6A36A] font-medium whitespace-nowrap">
                    01 // THE INDUSTRIAL ARCHITECT · 1999
                  </span>
                  <span className="h-5 flex items-center font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#FF8A50] font-medium whitespace-nowrap">
                    02 // THE POET &amp; WRITER · कालुवा ग़ाज़ीपुरी
                  </span>
                  <span className="h-5 flex items-center font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#C6A36A] font-medium whitespace-nowrap">
                    03 // PHILOSOPHER &amp; REFORMER
                  </span>
                  <span className="h-5 flex items-center font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#FF8A50] font-medium whitespace-nowrap">
                    04 // ONE IDENTITY · TWO WORLDS
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Refined Role Chips: Thin Gold Borders, Understated Inactive, Subtle Fill Active, Interactive Click Navigation */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <button
                type="button"
                onClick={() => scrollToPhase(0.28)}
                className="hero-role-chip hero-role-poet cursor-pointer font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] px-2.5 sm:px-3 py-0.5 rounded-full border border-[#C6A36A]/20 text-[#FAF7F0]/45 bg-transparent backdrop-blur-xs transition-all duration-500 hover:border-[#FF6B35]/60 hover:text-[#FFE2D1]"
              >
                POET
              </button>
              <button
                type="button"
                onClick={() => scrollToPhase(0.48)}
                className="hero-role-chip hero-role-writer cursor-pointer font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] px-2.5 sm:px-3 py-0.5 rounded-full border border-[#C6A36A]/20 text-[#FAF7F0]/45 bg-transparent backdrop-blur-xs transition-all duration-500 hover:border-[#FF6B35]/60 hover:text-[#FFE2D1]"
              >
                WRITER
              </button>
              <button
                type="button"
                onClick={() => scrollToPhase(0.69)}
                className="hero-role-chip hero-role-philosopher cursor-pointer font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] px-2.5 sm:px-3 py-0.5 rounded-full border border-[#C6A36A]/20 text-[#FAF7F0]/45 bg-transparent backdrop-blur-xs transition-all duration-500 hover:border-[#FF6B35]/60 hover:text-[#FFE2D1]"
              >
                PHILOSOPHER
              </button>
              <button
                type="button"
                onClick={() => scrollToPhase(0.90)}
                className="hero-role-chip hero-role-reformer cursor-pointer font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] px-2.5 sm:px-3 py-0.5 rounded-full border border-[#C6A36A]/20 text-[#FAF7F0]/45 bg-transparent backdrop-blur-xs transition-all duration-500 hover:border-[#FF6B35]/60 hover:text-[#FFE2D1]"
              >
                SOCIAL REFORMER
              </button>
            </div>

          </div>

          {/* Right: Subdued Phase Counter & Precision Progress Bar */}
          <div className="hero-footer-right flex flex-col items-end gap-1.5 mr-2 sm:mr-4 select-none pointer-events-auto will-change-transform">
            <div className="flex items-center gap-2 overflow-hidden h-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] shadow-[0_0_6px_#FF6B35] shrink-0" />
              <div className="relative h-4 overflow-hidden">
                <div className="hero-phase-track flex flex-col will-change-transform">
                  <span className="h-4 flex items-center font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-[#003D32]/85 font-medium whitespace-nowrap">
                    PHASE 01 / ARCHITECT
                  </span>
                  <span className="h-4 flex items-center font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-[#003D32]/85 font-medium whitespace-nowrap">
                    PHASE 02 / POET &amp; WRITER
                  </span>
                  <span className="h-4 flex items-center font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-[#003D32]/85 font-medium whitespace-nowrap">
                    PHASE 03 / PHILOSOPHER
                  </span>
                  <span className="h-4 flex items-center font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-[#003D32]/85 font-medium whitespace-nowrap">
                    PHASE 04 / TWO WORLDS
                  </span>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.26em] text-[#003D32]/65 font-medium">
                SCROLL
              </span>

              {/* Progress Track Line with High-Visibility Amber Glow Bar */}
              <div className="w-px h-7 bg-[#003D32]/20 relative overflow-hidden">
                <div
                  ref={indicatorBarRef}
                  className="absolute top-0 left-0 w-full h-full origin-top scale-y-0 will-change-transform"
                  style={{
                    background: 'linear-gradient(180deg, #FF8A50 0%, #FF5722 100%)',
                    boxShadow: '0 0 8px rgba(255, 87, 34, 0.75)',
                  }}
                />
              </div>
            </div>
          </div>

        </footer>

      </section>
    </div>
  );
}
