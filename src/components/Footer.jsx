import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, ArrowUpRight } from 'lucide-react';

// 35mm Negative Film Reel Archival Images
// STRICT SELECTION: Only authenticated photographs featuring Dr. Ravi Shankar Rai with his face clearly visible.
// Excludes all chopped crops, generic towers, newsprint text clippings, and graphic quote cards.
import imgFounder from '../assets/Founder-1024x1024.png';
import img2000 from '../assets/media/2000.jpg';
import img2004 from '../assets/media/2004.jpg';
import img2009 from '../assets/media/2009.jpg';
import imgImage1 from '../assets/Image-1.jpg';
import imgAward2012 from '../assets/awards/2012.jpg';
import imgCEOBlue from '../assets/media/CEO.png';
import imgOfficeSuit from '../assets/media/2.jpeg';
import imgAward2018 from '../assets/awards/2018.jpg';
import imgAward2019_1 from '../assets/awards/2019-1.jpg';
import imgAward2019_2 from '../assets/awards/2019-2.jpg';
import imgAward2019_3 from '../assets/awards/2019-3.jpg';
import imgAward2019 from '../assets/awards/2019.jpg';
import imgRSR4 from '../assets/rsr4.png';
import imgRSR5 from '../assets/rsr5.png';
import imgAward2022 from '../assets/awards/2022.jpg';
import imgAward2023_2 from '../assets/awards/2023-2.jpg';
import imgAward2023 from '../assets/awards/2023.jpg';
import imgAward2024_1 from '../assets/awards/2024-1.jpg';
import imgAward2024 from '../assets/awards/2024.jpg';
import imgCEO from '../assets/CEO-MD-SavitriTelecomServices.jpg.webp';

const FILM_FRAMES = [
  { src: imgFounder, pos: 'object-center' },
  { src: img2000, pos: 'object-center' },
  { src: img2004, pos: 'object-center' },
  { src: img2009, pos: 'object-center' },
  { src: imgImage1, pos: 'object-center' },
  { src: imgAward2012, pos: 'object-center' },
  { src: imgCEOBlue, pos: 'object-top' },
  { src: imgOfficeSuit, pos: 'object-[center_65%]' },
  { src: imgAward2018, pos: 'object-center' },
  { src: imgAward2019_1, pos: 'object-center' },
  { src: imgAward2019_2, pos: 'object-center' },
  { src: imgAward2019_3, pos: 'object-center' },
  { src: imgAward2019, pos: 'object-center' },
  { src: imgRSR4, pos: 'object-center' },
  { src: imgRSR5, pos: 'object-center' },
  { src: imgAward2022, pos: 'object-center' },
  { src: imgAward2023_2, pos: 'object-center' },
  { src: imgAward2023, pos: 'object-center' },
  { src: imgAward2024_1, pos: 'object-center' },
  { src: imgAward2024, pos: 'object-center' },
  { src: imgCEO, pos: 'object-top' },
];

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// FOOTER — AWARD-WINNING TYPOGRAPHIC MINIMALISM
// Inspired by Linear, Eleos & Kosbiotic from footer.design/styles/typographic
// and the serene simplicity of Dr. Waiel Awwad ("The Story Continues").
//
// Key Design Tenets:
// 1. Velvet Midnight Emerald Canvas (#00120E) with archival film grain
// 2. Clean, unhurried upper stage:
//    - Left: "THE STORY CONTINUES", quote, Devanagari signature & inquiry link
//    - Center/Accent: Atmospheric portrait emerging smoothly from the shadows
//    - Right: Razor-thin 3-column architectural directory (Linear/Kosbiotic style)
// 3. The Monumental Architectural Wordmark:
//    - Sculptural, edge-to-edge "RAVI SHANKAR RAI" anchoring the entire site
// 4. Clean 1px baseline colophon & "Back to top ↑"
// ============================================================================

export default function Footer({ onNavigate, currentPath }) {
  const footerRef = useRef(null);
  const filmReelRef = useRef(null);
  const filmTrackRef = useRef(null);
  const marqueeTweenRef = useRef(null);
  const upperStageRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Continuous Autonomous Kinetic Film Reel + Scroll Velocity Response
      if (filmTrackRef.current) {
        const marquee = gsap.to(filmTrackRef.current, {
          xPercent: -50,
          ease: 'none',
          duration: 52,
          repeat: -1,
        });
        marqueeTweenRef.current = marquee;

        let easeBackTimer = null;
        ScrollTrigger.create({
          trigger: footerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            if (marquee.paused()) return;
            const v = Math.abs(self.getVelocity());
            if (v > 40) {
              const boost = Math.min(v / 200, 2.5);
              gsap.to(marquee, {
                timeScale: 1 + boost,
                duration: 0.15,
                overwrite: 'auto',
              });

              if (easeBackTimer) clearTimeout(easeBackTimer);
              easeBackTimer = setTimeout(() => {
                if (!marquee.paused()) {
                  gsap.to(marquee, {
                    timeScale: 1,
                    duration: 1.2,
                    ease: 'power2.out',
                    overwrite: 'auto',
                  });
                }
              }, 120);
            }
          },
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, [currentPath]);

  const handleReelMouseEnter = () => {
    if (marqueeTweenRef.current) {
      marqueeTweenRef.current.pause();
    }
  };

  const handleReelMouseLeave = () => {
    if (marqueeTweenRef.current) {
      marqueeTweenRef.current.play();
    }
  };

  const handleLinkClick = (e, path) => {
    if (path.startsWith('http') || path.startsWith('mailto')) {
      return;
    }
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.pathname = path;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="relative z-20 overflow-hidden font-sans bg-[#00120E] text-[#FAF7F0] selection:bg-[#C6A36A] selection:text-[#00120E] border-t border-[#FAF7F0]/10 isolate"
    >
      {/* Archival Film Grain */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-20" />

      {/* Atmospheric Soft Light Radiance */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[75vw] max-w-[1000px] h-[340px] pointer-events-none blur-[100px] opacity-25 transform-gpu"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(198, 163, 106, 0.22) 0%, rgba(0, 68, 54, 0.16) 50%, transparent 80%)',
        }}
      />

      <div className="relative z-10 max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12">
        
        {/* =================================================================== */}
        {/* UPPER STAGE: ELEOS / LINEAR ARCHITECTURAL BALANCE                   */}
        {/* =================================================================== */}
        <div ref={upperStageRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-end">
          
          {/* LEFT: THE STORY CONTINUES & MANIFESTO (col-span-7) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="space-y-3">
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-[#C6A36A] font-bold block">
                — THE STORY CONTINUES
              </span>

              <h2 className="font-playfair text-3xl sm:text-4xl lg:text-[2.85rem] font-bold tracking-tight text-[#FAF7F0] leading-[1.12]">
                Built through vision.{' '}
                <span className="block font-serif font-normal italic text-[#C6A36A] mt-1">
                  expressed through words.
                </span>
              </h2>
            </div>

            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-3 text-base sm:text-lg">
                <span className="font-devanagari font-bold text-[#FAF7F0] tracking-wide">
                  रवि शंकर राय
                </span>
                <span className="text-[#C6A36A] text-xs">·</span>
                <span className="font-devanagari font-medium text-[#C6A36A] text-sm">
                  उद्यम की गति, विचारों का ठहराव।
                </span>
              </div>

              <p className="font-sans text-xs sm:text-[13px] text-[#FAF7F0]/70 leading-relaxed font-light max-w-xl">
                “Enterprise builds the physical arteries of a nation, but literature guards its conscience. Progress without introspection is merely velocity without direction.”
              </p>
            </div>

            {/* Direct Inquiries & Dialogue CTA */}
            <div className="pt-2">
              <a
                href="mailto:contact@ravishankarrai.com"
                className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#C6A36A]/35 bg-[#C6A36A]/10 hover:bg-[#C6A36A] text-[#FAF7F0] hover:text-[#00120E] transition-all duration-300 font-mono text-xs uppercase tracking-[0.2em] font-bold"
              >
                <span>INQUIRIES &amp; STEWARDSHIP</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

          </div>

          {/* RIGHT: KOSBIOTIC / LINEAR 3-COLUMN ARCHITECTURAL DIRECTORY (col-span-5) */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-6 text-left border-t lg:border-t-0 border-[#FAF7F0]/10 pt-8 lg:pt-0">
            
            {/* COLUMN 1: ARCHIVE */}
            <div className="space-y-3">
              <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[#C6A36A] font-bold">
                01 // ARCHIVE
              </div>
              <ul className="space-y-2 font-sans text-xs text-[#FAF7F0]/65">
                <li>
                  <button
                    onClick={(e) => handleLinkClick(e, '/')}
                    className="hover:text-[#FAF7F0] transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => handleLinkClick(e, '/about')}
                    className="hover:text-[#FAF7F0] transition-colors cursor-pointer"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => handleLinkClick(e, '/leadership')}
                    className="hover:text-[#FAF7F0] transition-colors cursor-pointer"
                  >
                    Leadership
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => handleLinkClick(e, '/literary-world')}
                    className="hover:text-[#FAF7F0] transition-colors cursor-pointer"
                  >
                    Literature
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => handleLinkClick(e, '/media-recognition')}
                    className="hover:text-[#FAF7F0] transition-colors cursor-pointer"
                  >
                    Recognition
                  </button>
                </li>
              </ul>
            </div>

            {/* COLUMN 2: ENTERPRISE */}
            <div className="space-y-3">
              <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[#C6A36A] font-bold">
                02 // ENTERPRISE
              </div>
              <ul className="space-y-2 font-sans text-xs text-[#FAF7F0]/65">
                <li>
                  <a
                    href="https://savitritelecom.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[#FAF7F0] transition-colors"
                  >
                    <span>Savitri Telecom</span>
                    <ArrowUpRight className="w-2.5 h-2.5 text-[#C6A36A]" />
                  </a>
                </li>
                <li>
                  <button
                    onClick={(e) => handleLinkClick(e, '/leadership')}
                    className="hover:text-[#FAF7F0] transition-colors cursor-pointer"
                  >
                    Zero Dismissals
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => handleLinkClick(e, '/leadership')}
                    className="hover:text-[#FAF7F0] transition-colors cursor-pointer"
                  >
                    Optical Infra
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => handleLinkClick(e, '/about')}
                    className="hover:text-[#FAF7F0] transition-colors cursor-pointer"
                  >
                    Workforce Ethics
                  </button>
                </li>
              </ul>
            </div>

            {/* COLUMN 3: DIALOGUE */}
            <div className="space-y-3 col-span-2 sm:col-span-1">
              <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[#C6A36A] font-bold">
                03 // DIALOGUE
              </div>
              <ul className="space-y-2 font-sans text-xs text-[#FAF7F0]/65">
                <li>
                  <button
                    onClick={(e) => handleLinkClick(e, '/contact')}
                    className="hover:text-[#FAF7F0] transition-colors cursor-pointer"
                  >
                    Office of CMD
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => handleLinkClick(e, '/literary-world')}
                    className="hover:text-[#FAF7F0] transition-colors cursor-pointer"
                  >
                    Maati Samman
                  </button>
                </li>
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[#FAF7F0] transition-colors"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-2.5 h-2.5 text-[#C6A36A]" />
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* =================================================================== */}
        {/* NEGATIVE FILM REEL — PURE IMAGES ONLY (ZERO TEXT)                   */}
        {/* Infinite 35mm documentary celluloid moving seamlessly to the left  */}
        {/* Interactive: Hover pauses movement; hovered image enlarges in place*/}
        {/* =================================================================== */}
        <div
          ref={filmReelRef}
          onMouseEnter={handleReelMouseEnter}
          onMouseLeave={handleReelMouseLeave}
          className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden select-none my-6 sm:my-10 py-7 sm:py-9 bg-[#050A08] border-y border-[#C6A36A]/20 shadow-[0_4px_30px_rgba(0,0,0,0.85)] pointer-events-auto cursor-pointer"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          }}
        >
          {/* Infinite Continuous Film Track */}
          <div
            ref={filmTrackRef}
            className="flex items-center whitespace-nowrap will-change-transform"
          >
            {[...FILM_FRAMES, ...FILM_FRAMES].map((frame, idx) => (
              <div
                key={idx}
                className="group relative flex items-center shrink-0 z-10 hover:z-50"
              >
                {/* 35mm Cell Frame - Expands in Place on Hover */}
                <div className="w-28 sm:w-32 md:w-36 flex flex-col bg-[#080E0C] border-y border-white/10 shrink-0 transition-all duration-300 ease-out origin-center cursor-pointer group-hover:scale-[1.52] group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.95),0_0_24px_rgba(198,163,106,0.35)] group-hover:border-[#C6A36A]/90 rounded-[2px]">
                  
                  {/* Top Sprocket Perforations */}
                  <div className="h-3 sm:h-3.5 bg-[#030605] border-b border-white/10 px-2 flex items-center justify-between group-hover:border-[#C6A36A]/40 transition-colors">
                    <span className="w-2 h-1.5 bg-[#00120E] rounded-[1px] border border-white/20 shadow-inner group-hover:border-[#C6A36A]/50 transition-colors" />
                    <span className="w-2 h-1.5 bg-[#00120E] rounded-[1px] border border-white/20 shadow-inner group-hover:border-[#C6A36A]/50 transition-colors" />
                    <span className="w-2 h-1.5 bg-[#00120E] rounded-[1px] border border-white/20 shadow-inner group-hover:border-[#C6A36A]/50 transition-colors" />
                    <span className="w-2 h-1.5 bg-[#00120E] rounded-[1px] border border-white/20 shadow-inner group-hover:border-[#C6A36A]/50 transition-colors" />
                  </div>

                  {/* Negative Film Exposure Frame (Pure Image Only) */}
                  <div className="p-1 sm:p-1.5 bg-[#060B09]">
                    <div className="relative aspect-[4/3] sm:aspect-[3/2] w-full h-[70px] sm:h-[80px] md:h-[86px] overflow-hidden rounded-[2px] bg-black border border-white/10 group-hover:border-[#C6A36A]/60 transition-colors">
                      <img
                        src={frame.src}
                        alt=""
                        className={`w-full h-full object-cover ${frame.pos || 'object-center'} filter contrast-[1.08] brightness-[0.95] saturate-[0.9] group-hover:filter-none group-hover:brightness-105 group-hover:contrast-105 transition-all duration-300`}
                        loading="lazy"
                      />
                      {/* Subtle negative edge shading */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none group-hover:opacity-0 transition-opacity duration-300" />
                    </div>
                  </div>

                  {/* Bottom Sprocket Perforations */}
                  <div className="h-3 sm:h-3.5 bg-[#030605] border-t border-white/10 px-2 flex items-center justify-between group-hover:border-[#C6A36A]/40 transition-colors">
                    <span className="w-2 h-1.5 bg-[#00120E] rounded-[1px] border border-white/20 shadow-inner group-hover:border-[#C6A36A]/50 transition-colors" />
                    <span className="w-2 h-1.5 bg-[#00120E] rounded-[1px] border border-white/20 shadow-inner group-hover:border-[#C6A36A]/50 transition-colors" />
                    <span className="w-2 h-1.5 bg-[#00120E] rounded-[1px] border border-white/20 shadow-inner group-hover:border-[#C6A36A]/50 transition-colors" />
                    <span className="w-2 h-1.5 bg-[#00120E] rounded-[1px] border border-white/20 shadow-inner group-hover:border-[#C6A36A]/50 transition-colors" />
                  </div>

                </div>

                {/* Vertical Celluloid Frame Separator */}
                <div className="w-2 sm:w-2.5 h-full self-stretch bg-[#020403] border-x border-white/5 shrink-0 flex items-center justify-center">
                  <span className="w-px h-5 bg-white/10" />
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* =================================================================== */}
        {/* BASELINE COLOPHON & BACK TO TOP (MATCHING DR. WAIEL AWWAD)          */}
        {/* =================================================================== */}
        <div className="mt-8 pt-5 border-t border-[#FAF7F0]/15 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#FAF7F0]/40 relative z-20 text-center md:text-left">
          <span>
            © {new Date().getFullYear()} Dr. Ravi Shankar Rai. All Rights Reserved. Designed and Developed by{' '}
            <a
              href="https://indicorpit.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C6A36A] transition-colors normal-case underline"
            >
              IndiCorp IT Solutions Pvt. Ltd.
            </a>
          </span>

          <span className="text-[#C6A36A]/70">
            उद्यम · साहित्य · चेतना
          </span>

          <button
            type="button"
            onClick={scrollToTop}
            className="text-[#FAF7F0]/60 hover:text-[#C6A36A] transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>Back to top ↑</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
