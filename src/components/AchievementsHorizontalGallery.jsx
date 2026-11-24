import React, { useLayoutEffect, useRef, useState, useEffect, useId } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ExternalLink } from 'lucide-react';

// Real award images from the Ravi Shankar Rai PHP project (img/awards/)
import award2024 from '../assets/awards/2024.jpg';
import tradeflockAward from '../assets/Media-coverage-2.jpg';
import viaviSummit2024Stage from '../assets/media/2024.jpg';
import inspiringLeaders2022 from '../assets/media/1-STS-Best-Telecom-Technology-Solution-Providers-Inspiring-Leaders-Award-North-2022-Award-by-Economic-Times-1.jpg';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// ACHIEVEMENTS & AWARDS — MOKSHA-STYLE HORIZONTAL SCROLLING GALLERY
// Sourced directly from the official Ravi Shankar Rai PHP project archives.
//
// Key Design Principles:
// 1. Strictly 4 recent awards (NO repetition)
// 2. Left side: Fixed editorial block with large typography, narrative copy,
//    and "EXPLORE ALL 39 AWARDS" button
// 3. Left side accent: Calligraphic dotted curvy lines (inspired by the Literary
//    Flight Path quill trail, but pure dotted lines without the quill pen)
//    that dynamically write forward as you scroll through the 4 cards!
// 4. Right side: Elegant card containers with generous photography, meta headers,
//    and full-width underlined action links (Moksha layout)
// 5. Natural 1:1 scroll pacing: smoothly traverses through the 4 cards and unpins
//    promptly upon reaching the 4th card.
// ============================================================================

const awardsData = [
  {
    id: '01',
    number: '01',
    category: 'RECOGNITION',
    source: 'TRADEFLOCK',
    awardingBody: 'TradeFlock Leadership Magazine · 2026',
    image: tradeflockAward,
    tag: 'EXECUTIVE LEADERSHIP',
    title: 'India’s Most Influential Leaders 2026',
    citation: '“The Telecom Titan Who Measures Empire in Lives, Not Ledgers”',
    description:
      'Honouring executive vision, national optical infrastructure stewardship, and an unbroken 25-year zero-dismissal human capital covenant.',
    link: 'https://savitritelecom.com/ravi-shankar-rai-a-telecom-leader-driven-by-purpose-and-people/',
    linkText: 'THE CITATION',
  },
  {
    id: '02',
    number: '02',
    category: 'LEADERSHIP',
    source: 'ECONOMIC TIMES',
    awardingBody: 'The Economic Times · 2024',
    image: award2024,
    tag: 'ICT EXCELLENCE',
    title: 'STS — ET’s Business Leaders Award 2024',
    citation: '“In Information & Communications Technology (ICT) Segment”',
    description:
      'Conferred in New Delhi recognizing Savitri Telecom Services for nationwide optical infrastructure deployment and ethical enterprise governance.',
    link: '/leadership',
    linkText: 'THE CITATION',
  },
  {
    id: '03',
    number: '03',
    category: 'INNOVATION',
    source: 'VIAVI SOLUTIONS',
    awardingBody: 'Viavi Solutions Global · FY24',
    image: viaviSummit2024Stage,
    tag: 'OPTICAL EXCELLENCE',
    title: 'STS — Metro Business Award FY24',
    citation: '“Outstanding Fiber Optic Performance in Metro Backbones”',
    description:
      'Conferred on stage at the Viavi APS Partners Summit celebrating premier optical calibration and nationwide network test deployment across Tier-1 telcos.',
    link: '/leadership',
    linkText: 'THE CITATION',
  },
  {
    id: '04',
    number: '04',
    category: 'CIVIC HONORS',
    source: 'ECONOMIC TIMES',
    awardingBody: 'The Economic Times · 2022',
    image: inspiringLeaders2022,
    tag: 'LEADERSHIP EXCELLENCE',
    title: 'STS — Inspiring Leaders North 2022',
    citation: '“Best Telecom Technology Solution Provider”',
    description:
      'Conferred upon Dr. Ravi Shankar Rai and presented on stage by Sonam Kapoor, recognizing pioneering contributions to Indian telecom test solutions.',
    link: '/leadership',
    linkText: 'THE CITATION',
  },
];

export default function AchievementsHorizontalGallery({ onNavigate }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const rightContainerRef = useRef(null);
  const leftColRef = useRef(null);

  // Dual-Axis Corner Dotted Curvy Lines Refs (Simultaneous Horizontal & Vertical Scroll Drawing)
  const hClipRectRef = useRef(null);
  const vClipRectRef = useRef(null);
  const pathHRef = useRef(null);
  const pathVRef = useRef(null);
  const dotHTipRef = useRef(null);
  const dotVTipRef = useRef(null);
  const uniqueId = useId().replace(/:/g, '_');

  // Airy Calligraphic Bracket Geometry: Generous breathing clearance away from text
  const cornerX = 12;
  const cornerY = 12;
  const maxTextWidth = 240;   // Gracefully spans top of headline with generous clearance
  const maxTextHeight = 160;  // Gracefully wafts down left margin without crowding letters

  // 1. Single Ultra-Fine Fluid Horizontal Wave (Floats ~32px above "— THE RECOGNITION")
  // Natural sinusoidal crest & trough like silk ribbon in champagne gold
  const pathH1D = `M ${cornerX},${cornerY} C ${cornerX + 35},${cornerY - 7} ${cornerX + 75},${cornerY + 8} ${cornerX + 115},${cornerY} C ${cornerX + 155},${cornerY - 7} ${cornerX + 195},${cornerY + 7} ${maxTextWidth},${cornerY}`;

  // 2. Single Ultra-Fine Fluid Vertical Wave (Floats ~28px to the left of "Four" and "milestones")
  // Natural sinusoidal sway down the margin
  const pathV1D = `M ${cornerX},${cornerY} C ${cornerX - 7},${cornerY + 35} ${cornerX + 7},${cornerY + 70} ${cornerX},${cornerY + 105} C ${cornerX - 6},${cornerY + 125} ${cornerX + 6},${cornerY + 142} ${cornerX},${maxTextHeight}`;

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      const rightContainer = rightContainerRef.current;
      if (!track || !section || !rightContainer) return;

      const getScrollDistance = () => {
        // Calculate exact horizontal delta so card 4 rests comfortably in view
        const distance = track.scrollWidth - rightContainer.clientWidth + 60;
        return Math.max(distance, 350);
      };

      // Connected spatial entrance as section approaches viewport
      gsap.fromTo(
        [leftColRef.current, track],
        { y: 35, opacity: 0.6 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 88%',
            end: 'top 15%',
            scrub: 1,
          },
        }
      );

      // 1:1 Scroll Pacing + SIMULTANEOUS Dual-Axis Corner Curve Drawing
      gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          id: 'awards-horizontal-st',
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.round(getScrollDistance() * 1.05)}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = Math.max(0, Math.min(1, self.progress));

            // A. Reveal Horizontal Curve (Left to Right across text top)
            if (hClipRectRef.current) {
              hClipRectRef.current.setAttribute('width', Math.max(0, p * (maxTextWidth + 15)));
            }

            // B. Reveal Vertical Curve (Top-Left to Bottom-Left along text margin)
            if (vClipRectRef.current) {
              vClipRectRef.current.setAttribute('height', Math.max(0, p * (maxTextHeight + 15)));
            }

            // C. Glide Horizontal Luminous Tip Dot
            if (pathHRef.current && dotHTipRef.current) {
              const totalLenH = pathHRef.current.getTotalLength();
              if (totalLenH > 0) {
                const ptH = pathHRef.current.getPointAtLength(p * totalLenH);
                dotHTipRef.current.setAttribute('cx', ptH.x);
                dotHTipRef.current.setAttribute('cy', ptH.y);
                dotHTipRef.current.setAttribute('opacity', p <= 0.015 ? '0' : '1');
              }
            }

            // D. Glide Vertical Luminous Tip Dot
            if (pathVRef.current && dotVTipRef.current) {
              const totalLenV = pathVRef.current.getTotalLength();
              if (totalLenV > 0) {
                const ptV = pathVRef.current.getPointAtLength(p * totalLenV);
                dotVTipRef.current.setAttribute('cx', ptV.x);
                dotVTipRef.current.setAttribute('cy', ptV.y);
                dotVTipRef.current.setAttribute('opacity', p <= 0.015 ? '0' : '1');
              }
            }
          },
        },
      });
    }, sectionRef);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  const handleLinkClick = (e, path) => {
    if (path.startsWith('http')) {
      return;
    }
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.pathname = path;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="achievements-gallery"
      className="relative bg-[#FBF8F1] text-[#003D32] min-h-screen flex items-center overflow-hidden border-t border-[#C6A36A]/30 selection:bg-[#C6A36A] selection:text-[#FBF8F1] font-sans"
    >
      {/* Archival Paper Grain */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-25" />

      {/* Atmospheric Soft Light Radiance (Vantara Warm Sand & Light) */}
      <div
        className="absolute top-1/4 left-10 w-[45vw] h-[60%] pointer-events-none blur-[150px] opacity-35"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(229, 214, 195, 0.7) 0%, rgba(198, 163, 106, 0.2) 60%, transparent 80%)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1680px] mx-auto px-6 sm:px-12 lg:px-16 py-8 sm:py-12 flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
        
        {/* =================================================================== */}
        {/* LEFT COLUMN: MOKSHA-STYLE EDITORIAL ANCHOR + CORNER CURVY LINES     */}
        {/* =================================================================== */}
        <div
          ref={leftColRef}
          className="relative w-full lg:w-[360px] xl:w-[410px] shrink-0 z-20 text-left pt-12 sm:pt-14 pl-10 sm:pl-12"
        >
          {/* ================================================================= */}
          {/* DUAL-AXIS CORNER CURVY LINES (SIMULTANEOUS HORIZONTAL & VERTICAL)  */}
          {/* Starts at top-left corner and draws across text & down margin      */}
          {/* ================================================================= */}
          <svg
            className="absolute top-0 left-0 w-[300px] h-[210px] overflow-visible select-none pointer-events-none z-10"
            viewBox="0 0 300 210"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Horizontal Branch Dynamic ClipPath (Left to Right) */}
              <clipPath id={`corner_h_clip_${uniqueId}`}>
                <rect
                  ref={hClipRectRef}
                  x="0"
                  y="-15"
                  width="0"
                  height="50"
                />
              </clipPath>

              {/* Vertical Branch Dynamic ClipPath (Top-Left to Bottom-Left) */}
              <clipPath id={`corner_v_clip_${uniqueId}`}>
                <rect
                  ref={vClipRectRef}
                  x="-15"
                  y="0"
                  width="50"
                  height="0"
                />
              </clipPath>

              {/* Warm Champagne Gold Glow Filter */}
              <filter id={`corner_gold_glow_${uniqueId}`} x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="0" dy="1" stdDeviation="2.2" floodColor="#C6A36A" floodOpacity="0.45" />
              </filter>
            </defs>

            {/* 0. CORNER ANCHOR NODE (Refined celestial gold star origin) */}
            <circle
              cx={cornerX}
              cy={cornerY}
              r="2.5"
              fill="#C6A36A"
              filter={`url(#corner_gold_glow_${uniqueId})`}
            />
            <circle
              cx={cornerX}
              cy={cornerY}
              r="5.5"
              stroke="#C6A36A"
              strokeWidth="0.8"
              strokeOpacity="0.35"
              fill="none"
            />

            {/* 1. GHOST REFERENCE TRACKS (Ultra-subtle 8% warm gold guide lines) */}
            <path
              d={pathH1D}
              stroke="#C6A36A"
              strokeWidth="0.9"
              strokeDasharray="2, 8"
              strokeOpacity="0.10"
              fill="none"
            />
            <path
              d={pathV1D}
              stroke="#C6A36A"
              strokeWidth="0.9"
              strokeDasharray="2, 8"
              strokeOpacity="0.10"
              fill="none"
            />

            {/* 2. ACTIVE HORIZONTAL BRANCH: Single Pure Champagne Gold Wave */}
            <path
              ref={pathHRef}
              d={pathH1D}
              stroke="#C6A36A"
              strokeWidth="1.4"
              strokeDasharray="5, 7"
              strokeLinecap="round"
              fill="none"
              filter={`url(#corner_gold_glow_${uniqueId})`}
              clipPath={`url(#corner_h_clip_${uniqueId})`}
            />

            {/* 3. ACTIVE VERTICAL BRANCH: Single Pure Champagne Gold Wave */}
            <path
              ref={pathVRef}
              d={pathV1D}
              stroke="#C6A36A"
              strokeWidth="1.4"
              strokeDasharray="5, 7"
              strokeLinecap="round"
              fill="none"
              filter={`url(#corner_gold_glow_${uniqueId})`}
              clipPath={`url(#corner_v_clip_${uniqueId})`}
            />

            {/* 4. LUMINOUS TIP DOTS (Gliding at the leading edges of both curves) */}
            <circle
              ref={dotHTipRef}
              cx={cornerX}
              cy={cornerY}
              r="2.6"
              fill="#C6A36A"
              opacity="0"
              filter={`url(#corner_gold_glow_${uniqueId})`}
            />
            <circle
              ref={dotVTipRef}
              cx={cornerX}
              cy={cornerY}
              r="2.6"
              fill="#C6A36A"
              opacity="0"
              filter={`url(#corner_gold_glow_${uniqueId})`}
            />
          </svg>

          {/* Editorial Content Nested Inside Corner Flourish */}
          <div className="space-y-5 sm:space-y-6">
            
            {/* Header Title */}
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#C6A36A] font-bold block">
                — THE RECOGNITION
              </span>

              <h2 className="font-playfair font-bold text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[3.85rem] text-[#003D32] tracking-tight leading-[1.08]">
                Four milestones of{' '}
                <span className="font-serif italic font-normal text-[#C6A36A] block">
                  excellence.
                </span>
              </h2>
            </div>

            {/* Narrative Body */}
            <p className="font-sans text-xs sm:text-[13.5px] text-[#003D32]/75 leading-relaxed font-light max-w-sm">
              Not a catalog. A quarter-century testament. Conferred across two and a half decades of ethical enterprise, nationwide optical test infrastructure, and steadfast social stewardship.
            </p>

            <div className="space-y-4 pt-1">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#003D32]/50">
                <span>— SCROLL TO MOVE THROUGH</span>
              </div>

              {/* TAB: EXPLORE ALL 39 AWARDS */}
              <div>
                <button
                  type="button"
                  onClick={(e) => handleLinkClick(e, '/media-recognition')}
                  className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#003D32] text-[#FBF8F1] hover:bg-[#C6A36A] hover:text-[#001713] transition-all duration-300 font-mono text-xs uppercase tracking-wider font-bold shadow-md cursor-pointer"
                >
                  <span>EXPLORE ALL 39 AWARDS</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* =================================================================== */}
        {/* RIGHT COLUMN: 4 MOKSHA CARDS IN VANTARA WARM SAND PALETTE (#E5D6C3) */}
        {/* =================================================================== */}
        <div
          ref={rightContainerRef}
          className="w-full flex-1 overflow-hidden relative"
        >
          <div
            ref={trackRef}
            className="flex flex-nowrap items-stretch gap-6 sm:gap-8 will-change-transform pl-1 lg:pl-4 py-2"
          >
            {awardsData.map((item) => (
              <div
                key={item.id}
                className="w-[330px] sm:w-[390px] lg:w-[440px] shrink-0 p-5 sm:p-6 rounded-2xl bg-[#E5D6C3] border border-[#FAF7F1]/60 shadow-[0_12px_36px_rgba(0,61,50,0.06)] group hover:border-[#C6A36A]/70 hover:shadow-[0_20px_45px_rgba(0,61,50,0.12)] transition-all duration-500 flex flex-col justify-between text-left"
              >
                <div className="space-y-4">
                  
                  {/* Top Meta Header: 01 — Recognition | Source */}
                  <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#003D32]/75 pb-2.5 border-b border-[#003D32]/15">
                    <span>{item.number} — {item.category}</span>
                    <span className="text-[#003D32] font-bold">{item.source}</span>
                  </div>

                  {/* High-Resolution Photographic Award Frame */}
                  <div className="relative w-full h-[210px] sm:h-[235px] rounded-xl overflow-hidden bg-[#FBF8F1] border border-[#003D32]/15 shadow-sm">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 filter contrast-[1.03]"
                    />
                    {/* Subtle Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                    {/* Overlay Awarding Body */}
                    <div className="absolute bottom-2.5 left-3.5 right-3.5">
                      <span className="font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-wider text-[#FAF7F0] font-semibold block drop-shadow-sm">
                        {item.awardingBody}
                      </span>
                    </div>
                  </div>

                  {/* Category Kicker */}
                  <div className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-[#003D32]/85 font-bold pt-0.5">
                    {item.tag}
                  </div>

                  {/* Title & Citation */}
                  <div className="space-y-1.5">
                    <h3 className="font-playfair font-bold text-xl sm:text-[22px] text-[#003D32] leading-snug group-hover:text-[#8C6D37] transition-colors">
                      {item.title}
                    </h3>

                    <p className="font-serif italic text-xs text-[#8C6D37] font-semibold leading-relaxed">
                      {item.citation}
                    </p>

                    <p className="font-sans text-xs text-[#003D32]/80 leading-relaxed line-clamp-2 pt-0.5 font-normal">
                      {item.description}
                    </p>
                  </div>

                </div>

                {/* Bottom Action Link with Clean Horizontal Rule (Moksha signature) */}
                <div className="pt-4 mt-4 border-t border-[#003D32]/20">
                  {item.link.startsWith('http') ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-widest text-[#003D32] group-hover:text-[#8C6D37] font-bold transition-all"
                    >
                      <span>{item.linkText}</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  ) : (
                    <button
                      onClick={(e) => handleLinkClick(e, item.link)}
                      className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-widest text-[#003D32] group-hover:text-[#8C6D37] font-bold transition-all cursor-pointer"
                    >
                      <span>{item.linkText}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
