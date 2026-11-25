import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MapPin,
  CheckCircle2,
  Award,
  ArrowRight,
  ExternalLink,
  Layers,
  ShieldCheck,
  TrendingUp,
  Users,
  BookOpen,
  Calendar,
  Building2,
  Sparkles,
  Quote,
  ChevronDown,
} from 'lucide-react';

import ArchivalPhotoMosaic from '../components/ArchivalPhotoMosaic';

// Authentic archival photographs and portraits of Dr. Ravi Shankar Rai
import founderImg from '../assets/CEO-MD-SavitriTelecomServices.jpg.webp';
import img1999 from '../assets/media/1999-1.jpg';
import img2000 from '../assets/media/2000.jpg';
import img2014 from '../assets/media/2014.jpg';
import img2015 from '../assets/media/2015.jpg';
import img2024 from '../assets/media/STS-ET-Business-Leaders-Award-2024.jpg';

gsap.registerPlugin(ScrollTrigger);
if (typeof window !== 'undefined') {
  window.ScrollTrigger = ScrollTrigger;
}

// Clean, backend-ready JSON schema for Dr. Rai's Life Journey (Vantara Editorial Format)
const journeyChapters = [
  {
    id: 'ch-01',
    chapter: 'CHAPTER 01',
    era: '1970s — 1990s',
    themeBg: '#0B3828', // Vantara Signature Forest Emerald
    statLabel: '1970s FORMATIVE ROOTS',
    statValue: 'Ghazipur',
    statSub: 'Purvanchal Soil',
    statAction: 'Read Roots',
    title: 'Where Purpose Begins: The Soil of Ghazipur',
    subtitle: 'Cultural Roots in Purvanchal & Early Convictions',
    location: 'Ghazipur, Purvanchal (Uttar Pradesh)',
    narrative:
      'Born and raised in Ghazipur, Dr. Ravi Shankar Rai developed an abiding respect for grassroots Indian life, agrarian resilience, and the quiet dignity of hard work. These formative years forged the foundational philosophy that would define his entire life: true enterprise is measured not by balance sheets, but by how many families find security, purpose, and self-reliance along the way.',
    highlight: 'Rooted in the cultural depth of Purvanchal and the sacred dignity of physical labor.',
    image: img1999,
    imageCaption: 'Archival Record: The foundational spirit of Ghazipur and rural northern India.',
  },
  {
    id: 'ch-02',
    chapter: 'CHAPTER 02',
    era: 'Late 1990s',
    themeBg: '#0B3828', // Vantara Signature Forest Emerald
    statLabel: 'THE RECKONING',
    statValue: '5 Youth',
    statSub: 'Skill vs Livelihood',
    statAction: 'The Catalyst',
    title: 'When Technical Skills Lack Livelihood',
    subtitle: 'A Personal Reckoning in India’s Emerging Telecom Sector',
    location: 'New Delhi & Northern Telecom Corridors',
    narrative:
      'While working in India’s emerging telecommunications sector, Dr. Rai encountered five educated young men from his home region who were sliding toward desperation due to a total lack of employment opportunities. He urged them to complete technical computer training, convinced it would secure their futures. Yet, even armed with certifications, they remained jobless. That was his awakening: technical skill without access to dignified employment is a hollow promise.',
    highlight: 'The decisive catalyst that sparked the founding mandate of Savitri Group.',
    image: img2000,
    imageCaption: 'Early optical test benches and field instrumentation training in New Delhi.',
  },
  {
    id: 'ch-03',
    chapter: 'CHAPTER 03',
    era: '1999',
    themeBg: '#382A22', // Vantara Warm Mocha Chestnut Brown
    statLabel: 'THE SACRED COVENANT',
    statValue: '25+ Yrs',
    statSub: 'Zero Dismissals',
    statAction: 'View Covenant',
    title: 'The Sacred Covenant: Founding Savitri',
    subtitle: 'The Sacred Covenant of Zero Dismissals',
    location: 'Bhikaji Cama Place, New Delhi',
    narrative:
      'In 1999, from a modest office at Ansal Chamber-II in Bhikaji Cama Place, Dr. Rai founded Savitri Telecom Services. Optical fiber was just emerging in India, and field technicians lacked reliable testing tools and repair support. From Day One, he instituted a permanent corporate covenant: no employee would ever be retrenched during economic downturns—a pledge that has remained unbroken for over twenty-five years.',
    highlight: 'An unbroken 25-year zero-dismissal record upheld through every industry crisis.',
    image: founderImg,
    imageCaption: 'Dr. Ravi Shankar Rai · Founder & Managing Director, Savitri Group.',
  },
  {
    id: 'ch-04',
    chapter: 'CHAPTER 04',
    era: '2004 — 2015',
    themeBg: '#382A22', // Vantara Warm Mocha Chestnut Brown
    statLabel: 'INFRASTRUCTURE SCALE',
    statValue: '15,000+',
    statSub: 'Telecom Projects',
    statAction: 'Pan-India',
    title: 'Building India’s Invisible Nervous System',
    subtitle: 'Pan-India Optical Networks & Precision NABL Laboratories',
    location: 'National Highway Corridors & Delhi-NCR Labs',
    narrative:
      'Savitri evolved from early equipment calibration into India’s foremost optical infrastructure partner. Executing over 15,000 projects nationwide, the group laid, tested, and maintained the optical corridors powering national railways, defense communications, and smart cities. To ensure national self-reliance, Dr. Rai established state-of-the-art domestic NABL calibration laboratories, slashing equipment turnaround from months abroad to days at home.',
    highlight: 'Over 15,000 completed national telecom links delivered with domestic technical depth.',
    image: img2014,
    imageCaption: 'Savitri’s prominent exhibition pavilion attracting delegations at Pragati Maidan.',
  },
  {
    id: 'ch-05',
    chapter: 'CHAPTER 05',
    era: '2015 — 2022',
    themeBg: '#0B3828', // Vantara Signature Forest Emerald
    statLabel: 'CIVIC & STATE HONORS',
    statValue: 'Maati Samman',
    statSub: 'Conferred at Rajghat',
    statAction: 'Literary Record',
    title: 'The Conscience of the Soil: Kaluwa Ghazipuri',
    subtitle: 'A Prolific Author & The Governor’s Civic Recognition',
    location: 'Rajghat, New Delhi & Conclaves',
    narrative:
      'Parallel to commanding an industrial conglomerate, Dr. Rai established an influential literary voice under the pen name Kaluwa Ghazipuri. His reflective writings on youth aspirations, the dignity of labor, and corporate conscience earned him the prestigious Maati Samman at Gandhi Darshan, Rajghat. In 2015, the Honorable Governor of Goa, Dr. Mridula Sinha, conferred upon Savitri the Company Award for Best Practices and Employment Generation.',
    highlight: 'Conferred the prestigious Maati Samman and the Governor’s Civic Award.',
    image: img2015,
    imageCaption: 'Conferred the Company Award for Best Practices by Governor Dr. Mridula Sinha.',
  },
  {
    id: 'ch-06',
    chapter: 'CHAPTER 06',
    era: '2024 — Present',
    themeBg: '#382A22', // Vantara Warm Mocha Chestnut Brown
    statLabel: 'HUMAN EMPIRE',
    statValue: '1,600+',
    statSub: 'Workforce Family',
    statAction: 'Living Legacy',
    title: '5G Leadership & The Human Empire',
    subtitle: 'Seeding 500+ Entrepreneurs & 1,600+ Workforce Family',
    location: 'The Economic Times Conclave, New Delhi',
    narrative:
      'Honored with the Economic Times ICT Business Leaders Award and featured by TradeFlock as an industrial titan who measures success in human lives, Dr. Rai’s enduring legacy is human: over 500 field engineers guided into independent business owners, and a workforce family of 1,600+ treated with equal honor as Office Hosts.',
    highlight: '500+ independent entrepreneurs seeded and 1,600+ livelihoods anchored in dignity.',
    image: img2024,
    imageCaption: 'Conferred the Economic Times Business Leaders Award in ICT Segment.',
  },
];

// Infinite Moving Optical Fiber Background Component (Ultra-lightweight, 0% CPU strain)
function OpticalFiberBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0">
      <svg
        className="w-full h-full opacity-35 mix-blend-screen transform-gpu"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="fiberGlowCyanGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5B3" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#C6A36A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00E5B3" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="fiberGlowGoldCyan" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C6A36A" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#00E5B3" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#C6A36A" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Ambient Optical Fiber Traces (Subtle Glass Cable Pathways) */}
        <path
          d="M -100 220 C 320 80, 680 440, 1540 180"
          stroke="#00E5B3"
          strokeWidth="1.2"
          strokeOpacity="0.2"
          fill="none"
        />
        <path
          d="M -100 420 C 420 620, 880 220, 1540 480"
          stroke="#C6A36A"
          strokeWidth="1.2"
          strokeOpacity="0.22"
          fill="none"
        />
        <path
          d="M -60 680 C 480 480, 920 780, 1540 620"
          stroke="#00E5B3"
          strokeWidth="1"
          strokeOpacity="0.16"
          fill="none"
        />
        <path
          d="M -100 100 C 580 320, 780 80, 1540 350"
          stroke="#C6A36A"
          strokeWidth="1.2"
          strokeOpacity="0.18"
          fill="none"
        />
        <path
          d="M -50 820 C 600 700, 1000 860, 1540 760"
          stroke="#00E5B3"
          strokeWidth="1"
          strokeOpacity="0.12"
          fill="none"
        />

        {/* Dynamic Glowing Optical Photons Moving Infinitely */}
        <path
          d="M -100 220 C 320 80, 680 440, 1540 180"
          stroke="url(#fiberGlowCyanGold)"
          strokeWidth="2.4"
          fill="none"
          strokeDasharray="90 320"
          className="animate-fiber-1"
        />
        <path
          d="M -100 420 C 420 620, 880 220, 1540 480"
          stroke="url(#fiberGlowGoldCyan)"
          strokeWidth="2.4"
          fill="none"
          strokeDasharray="120 400"
          className="animate-fiber-2"
        />
        <path
          d="M -60 680 C 480 480, 920 780, 1540 620"
          stroke="url(#fiberGlowCyanGold)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="80 300"
          className="animate-fiber-3"
        />
        <path
          d="M -100 100 C 580 320, 780 80, 1540 350"
          stroke="url(#fiberGlowGoldCyan)"
          strokeWidth="2.2"
          fill="none"
          strokeDasharray="110 380"
          className="animate-fiber-4"
        />

        {/* Optical Transmission Hub Nodes */}
        <circle cx="510" cy="270" r="3" fill="#00E5B3" className="animate-pulse" />
        <circle cx="890" cy="235" r="3.5" fill="#C6A36A" className="animate-pulse" />
        <circle cx="1180" cy="510" r="3" fill="#00E5B3" className="animate-pulse" />
        <circle cx="340" cy="550" r="2.5" fill="#C6A36A" className="animate-pulse" />
      </svg>
    </div>
  );
}

export default function AboutPage({ onNavigate }) {
  const pageRef = useRef(null);
  const journeySectionRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [chapterProgress, setChapterProgress] = useState(0); // 0 to 1 scroll indicator
  const activeChapterRef = useRef(0);

  const cardRefs = useRef([]);
  const contentRefs = useRef([]);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  // Smooth, luxurious GSAP cross-fade between chapters
  const transitionToChapter = (nextIdx) => {
    if (nextIdx === activeChapterRef.current) return;
    if (nextIdx < 0 || nextIdx >= journeyChapters.length) return;

    const prevIdx = activeChapterRef.current;
    activeChapterRef.current = nextIdx;
    setActiveChapterIndex(nextIdx);

    const isForward = nextIdx > prevIdx;

    // Card animations with automatic overwrite to handle rapid scrubbing
    cardRefs.current.forEach((card, idx) => {
      if (!card) return;
      if (idx === nextIdx) {
        gsap.set(card, { zIndex: 10 });
        gsap.fromTo(
          card,
          { opacity: 0, scale: isForward ? 0.94 : 1.04, yPercent: isForward ? 12 : -12 },
          { opacity: 1, scale: 1, yPercent: 0, duration: 0.42, ease: 'power2.out', overwrite: 'auto' }
        );
      } else if (idx === prevIdx) {
        gsap.set(card, { zIndex: 5 });
        gsap.to(card, {
          opacity: 0,
          scale: isForward ? 1.04 : 0.94,
          yPercent: isForward ? -12 : 12,
          duration: 0.35,
          ease: 'power2.inOut',
          overwrite: 'auto',
        });
      } else {
        gsap.set(card, { opacity: 0, scale: 0.94, yPercent: 12, zIndex: 1 });
      }
    });

    // Narrative content animations
    contentRefs.current.forEach((content, idx) => {
      if (!content) return;
      if (idx === nextIdx) {
        gsap.fromTo(
          content,
          { opacity: 0, y: isForward ? 25 : -25, pointerEvents: 'none' },
          { opacity: 1, y: 0, duration: 0.38, pointerEvents: 'auto', ease: 'power2.out', overwrite: 'auto' }
        );
      } else if (idx === prevIdx) {
        gsap.to(content, {
          opacity: 0,
          y: isForward ? -25 : 25,
          duration: 0.28,
          pointerEvents: 'none',
          ease: 'power2.in',
          overwrite: 'auto',
        });
      } else {
        gsap.set(content, { opacity: 0, y: 25, pointerEvents: 'none' });
      }
    });

    // Dynamic background color morph between Forest Green & Mocha Brown
    if (journeySectionRef.current && journeyChapters[nextIdx]?.themeBg) {
      gsap.to(journeySectionRef.current, {
        backgroundColor: journeyChapters[nextIdx].themeBg,
        duration: 0.48,
        ease: 'power1.inOut',
        overwrite: 'auto',
      });
    }
  };

  // Programmatic jump to a specific chapter (used by buttons, dots, keyboard, swipe)
  const goToChapter = (targetIdx) => {
    if (targetIdx < 0 || targetIdx >= journeyChapters.length) return;
    const st = scrollTriggerRef.current;
    if (st) {
      const progressRatio = (targetIdx + 0.15) / journeyChapters.length;
      const targetScroll = st.start + progressRatio * (st.end - st.start);
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.scrollTo(targetScroll, { duration: 0.75 });
      } else {
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    } else {
      transitionToChapter(targetIdx);
    }
  };

  const handleNextClick = () => {
    if (activeChapterRef.current < journeyChapters.length - 1) {
      goToChapter(activeChapterRef.current + 1);
    } else {
      const st = scrollTriggerRef.current;
      const mosaic = document.getElementById('achievements-gallery');
      const targetY = mosaic ? mosaic.offsetTop : (st ? st.end + 60 : null);
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.scrollTo(mosaic || targetY, { duration: 1.0 });
      } else if (mosaic) {
        mosaic.scrollIntoView({ behavior: 'smooth' });
      } else if (targetY !== null) {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    }
  };

  const handlePrevClick = () => {
    if (activeChapterRef.current > 0) {
      goToChapter(activeChapterRef.current - 1);
    } else {
      const st = scrollTriggerRef.current;
      const targetY = st ? Math.max(0, st.start - 60) : 0;
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.scrollTo(targetY, { duration: 1.0 });
      } else {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      const section = journeySectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top <= 120 && rect.bottom >= 120;
      if (!inView) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextClick();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Horizontal touch swipe handling for mobile / tablet cards
  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e) => {
    if (!e.changedTouches || !e.changedTouches[0]) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
      if (deltaX < 0) {
        handleNextClick();
      } else {
        handlePrevClick();
      }
    }
  };

  // Robust GSAP ScrollTrigger Section Pinning
  // Works flawlessly on desktop, small laptop, tablet, and mobile touch
  useLayoutEffect(() => {
    const section = journeySectionRef.current;
    if (!section) return;

    const cards = cardRefs.current;
    const contents = contentRefs.current;

    // Initial state setup for cards and contents
    cards.forEach((card, idx) => {
      if (!card) return;
      if (idx === 0) {
        gsap.set(card, { opacity: 1, scale: 1, yPercent: 0, zIndex: 10 });
      } else {
        gsap.set(card, { opacity: 0, scale: 0.94, yPercent: 12, zIndex: 1 });
      }
    });

    contents.forEach((content, idx) => {
      if (!content) return;
      if (idx === 0) {
        gsap.set(content, { opacity: 1, y: 0, pointerEvents: 'auto' });
      } else {
        gsap.set(content, { opacity: 0, y: 25, pointerEvents: 'none' });
      }
    });

    if (journeyChapters[0]?.themeBg) {
      gsap.set(section, { backgroundColor: journeyChapters[0].themeBg });
    }

    const totalChapters = journeyChapters.length;
    // Calibrated pinned scroll length for ~3 seconds of smooth scrolling per chapter
    const pinDistance = Math.max(2600, window.innerHeight * 3.8);

    const st = ScrollTrigger.create({
      id: 'about-journey-pin',
      trigger: section,
      start: 'top top',
      end: () => `+=${pinDistance}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress; // 0.0 to 1.0
        const rawChapter = p * (totalChapters - 0.001);
        const targetIdx = Math.min(totalChapters - 1, Math.max(0, Math.floor(rawChapter)));
        const localProg = rawChapter - targetIdx; // 0.0 to 1.0 within active chapter

        setChapterProgress(Math.max(0, Math.min(1, localProg)));

        if (targetIdx !== activeChapterRef.current) {
          transitionToChapter(targetIdx);
        }
      },
    });

    scrollTriggerRef.current = st;

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      if (st) st.kill();
    };
  }, []);

  return (
    <div
      ref={pageRef}
      className="bg-[#FAF7F0] text-[#003D32] selection:bg-[#C6A36A] selection:text-[#FAF7F0] font-sans min-h-screen"
    >
      {/* =================================================================== */}
      {/* 1. CONCISE EXECUTIVE BRIEF AT THE TOP (LIGHT & WARM AESTHETIC)       */}
      {/* =================================================================== */}
      <section className="pt-28 pb-16 sm:pb-20 px-5 sm:px-8 lg:px-14">
        <div className="max-w-[1400px] mx-auto space-y-12 sm:space-y-16">
          
          {/* Main Editorial Page Header: Left-to-Right Full Width */}
          <div className="space-y-3 pb-8 border-b border-[#C6A36A]/20">
            <span className="font-mono text-xs tracking-[0.28em] uppercase text-[#C6A36A] block font-bold">
              ABOUT DR. RAVI SHANKAR RAI // 1999–PRESENT
            </span>
            <h1 className="font-serif font-normal text-[clamp(38px,6vw,84px)] leading-[0.95] tracking-[-0.02em] uppercase text-[#003D32]">
              The Making of a Vision
            </h1>
            <p className="font-serif italic text-lg sm:text-xl lg:text-2xl text-[#C66A3D] font-normal pt-1">
              A Life in Enterprise, Literature &amp; Purpose
            </p>
          </div>

          {/* Hero Banner: Headline & Concise Lead */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Portrait & Core Stats */}
            <div className="lg:col-span-5 space-y-6">
              <div className="w-full max-w-sm sm:max-w-md mx-auto lg:mx-0">
                <div className="relative bg-white rounded-2xl p-3 shadow-lg border border-[#C6A36A]/30 overflow-hidden">
                  <div className="relative overflow-hidden aspect-[4/5] rounded-xl bg-gradient-to-b from-[#FAF7F0] via-[#F4EFE6] to-[#E8DEC8] flex items-center justify-center">
                    <img
                      src={founderImg}
                      alt="Dr. Ravi Shankar Rai"
                      className="w-full h-full object-cover object-top filter contrast-[1.02] brightness-[1.01]"
                    />
                  </div>
                </div>
              </div>

              {/* 4 Quick Stat Pills */}
              <div className="grid grid-cols-2 gap-3 max-w-sm sm:max-w-md mx-auto lg:mx-0">
                <div className="p-3.5 rounded-xl bg-white border border-[#C6A36A]/30 shadow-xs">
                  <span className="font-serif font-bold text-2xl text-[#003D32] block leading-none font-numeric">
                    1999
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#C6A36A] font-bold block mt-1">
                    Founded Savitri
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-[#C6A36A]/30 shadow-xs">
                  <span className="font-serif font-bold text-2xl text-[#C66A3D] block leading-none font-numeric">
                    25+ Yrs
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#C66A3D] font-bold block mt-1">
                    Zero Dismissals
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-[#C6A36A]/30 shadow-xs">
                  <span className="font-serif font-bold text-2xl text-[#003D32] block leading-none font-numeric">
                    15,000+
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#C6A36A] font-bold block mt-1">
                    Telecom Projects
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-[#C6A36A]/30 shadow-xs">
                  <span className="font-serif font-bold text-2xl text-[#003D32] block leading-none font-numeric">
                    1,600+
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#003D32]/70 font-bold block mt-1">
                    Workforce Family
                  </span>
                </div>
              </div>
            </div>

            {/* Narrative Executive Brief */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="font-mono text-xs tracking-[0.28em] uppercase text-[#C6A36A] mb-3 block font-bold">
                  EXECUTIVE PROFILE &amp; PHILOSOPHY
                </span>
                <h2 className="font-serif font-normal text-2xl sm:text-3xl lg:text-[2.1rem] leading-[1.15] tracking-tight uppercase text-[#003D32]">
                  Responsibility in Enterprise · Conscience in Letters
                </h2>
              </div>

              <p className="font-serif italic text-lg sm:text-xl text-[#003D32]/90 leading-snug">
                &ldquo;Our ambition has never been to be the loudest or largest company in the room; it has always been to grow with responsibility and purpose.&rdquo;
              </p>

              <div className="space-y-4 text-base sm:text-lg text-[#003D32]/85 leading-relaxed font-light">
                <p>
                  Dr. Ravi Shankar Rai is the Founder and Managing Director of Savitri Group, an industrial pioneer who established nationwide optical fiber test and measurement infrastructure in India. Over twenty-five years of corporate stewardship, he transformed Savitri from a modest office in New Delhi into a national technology conglomerate executing over 15,000 mission-critical telecom and defense infrastructure projects.
                </p>
                <p>
                  Yet his proudest executive metric is human: in a quarter-century of corporate operations, Savitri has upheld an unbroken zero-dismissal record, never retrenching an employee during market downturns, and mentoring over 500 field engineers into independent business owners.
                </p>
                <p>
                  Parallel to his industrial stewardship, Dr. Rai maintains an influential literary voice under the pen name <strong className="font-semibold text-[#003D32]">Kaluwa Ghazipuri</strong>, writing reflective essays and poetry on youth aspirations and cultural conscience. For his enduring service, he was honored with the prestigious <em>Maati Samman</em> at Rajghat and the <em>Economic Times ICT Business Leaders Award</em>.
                </p>
              </div>

              {/* Scroll Down Prompt */}
              <div className="pt-2 flex items-center gap-3 font-mono text-xs text-[#C6A36A] uppercase tracking-wider font-semibold">
                <span>Scroll Down into the Dark Cinematic Journey</span>
                <ChevronDown className="w-4 h-4 text-[#C66A3D] animate-bounce" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =================================================================== */}
      {/* 2. THE STEPPED CONTROLLED BIOGRAPHICAL JOURNEY (VANTARA FORMAT)     */}
      {/* =================================================================== */}
      <section
        id="biographical-journey"
        ref={journeySectionRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          backgroundColor: journeyChapters[0].themeBg,
        }}
        className="relative w-full h-screen h-[100dvh] overflow-hidden text-[#FAF8F5] select-none flex flex-col justify-between pt-12 sm:pt-14 lg:pt-16 pb-3 sm:pb-4 lg:pb-5 px-4 sm:px-8 lg:px-12 xl:px-16"
      >
        {/* Infinite Moving Optical Fiber Background (Lightweight) */}
        <OpticalFiberBackground />

        {/* Top Minimalist Folio Header */}
        <div className="relative z-10 max-w-[1400px] w-full mx-auto flex items-center justify-between pb-2.5 sm:pb-4 border-b border-white/15">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-2 h-2 rounded-full bg-[#00E5B3] animate-pulse" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#FAF8F5]/80 font-bold truncate max-w-[200px] sm:max-w-none">
              RAVI SHANKAR RAI // BIOGRAPHICAL ARCHIVE
            </span>
          </div>

          {/* Interactive Chapter Indicator with Live Scroll Reading Progress */}
          <div className="flex flex-col items-end gap-1 sm:gap-1.5 shrink-0">
            <div className="flex items-center gap-2 sm:gap-3 bg-black/40 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-white/20 backdrop-blur-md">
              <div className="flex items-center gap-1 sm:gap-1.5">
                {journeyChapters.map((ch, cIdx) => (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => goToChapter(cIdx)}
                    className={`h-1.5 sm:h-2 rounded-full transition-all cursor-pointer ${
                      activeChapterIndex === cIdx
                        ? 'w-5 sm:w-7 bg-[#FAF8F5]'
                        : 'w-1.5 sm:w-2 bg-white/25 hover:bg-white/60'
                    }`}
                    title={`Jump to ${ch.chapter}`}
                  />
                ))}
              </div>
              <span className="font-mono text-[11px] sm:text-xs text-[#FAF8F5] font-semibold pl-1.5 sm:pl-2 border-l border-white/20">
                0{activeChapterIndex + 1} / 06
              </span>
            </div>

            {/* Glowing Golden Scroll Progress Line */}
            <div className="w-20 sm:w-28 h-1 bg-white/15 rounded-full overflow-hidden mr-1">
              <div
                className="h-full bg-gradient-to-r from-[#00E5B3] via-[#C6A36A] to-[#FAF8F5] transition-all duration-75 ease-out rounded-full shadow-[0_0_8px_rgba(0,229,179,0.6)]"
                style={{ width: `${Math.max(chapterProgress > 0 ? 8 : 0, chapterProgress * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main Stage: Left Image Card vs Right Editorial Narrative (Clean Vantara Format) */}
        <div className="relative z-10 max-w-[1400px] w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-14 items-center my-auto">
          
          {/* LEFT COLUMN: Clean Vantara Image Card with Docked Stat Pill */}
          <div className="md:col-span-5 lg:col-span-6 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[340px] sm:max-w-[390px] md:max-w-[360px] lg:max-w-[430px] xl:max-w-[480px] h-[195px] sm:h-[240px] md:h-[340px] lg:h-[390px] xl:h-[450px] rounded-2xl sm:rounded-[28px] lg:rounded-[34px] overflow-hidden shadow-2xl shadow-black/70 border border-white/15 bg-black/40">
              {journeyChapters.map((ch, idx) => (
                <div
                  key={ch.id}
                  ref={(el) => (cardRefs.current[idx] = el)}
                  className="journey-stack-card absolute inset-0 overflow-hidden will-change-transform"
                >
                  {/* Full-bleed Archival Photograph */}
                  <img
                    src={ch.image}
                    alt={ch.title}
                    className="w-full h-full object-cover filter contrast-[1.03] brightness-[0.98]"
                  />
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Era Floating Pill */}
                  <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-20">
                    <span className="font-mono text-[9.5px] sm:text-xs tracking-wider px-2 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-black/60 backdrop-blur-md text-[#FAF8F5] border border-white/20 font-semibold shadow-sm">
                      {ch.era}
                    </span>
                  </div>

                  {/* Vantara Signature Bottom-Left Stat Pill */}
                  <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-auto z-20 bg-[#FAF7F0] text-[#003D32] rounded-xl sm:rounded-2xl p-2 sm:p-3.5 lg:p-4.5 shadow-2xl border border-black/10 min-w-0 sm:min-w-[200px] md:min-w-[210px] max-w-[270px]">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                      <div className="w-3.5 sm:w-5 h-0.5 bg-[#C6A36A]" />
                      <span className="font-mono text-[8px] sm:text-[9.5px] uppercase tracking-[0.16em] text-[#003D32]/70 font-bold block truncate">
                        {ch.statLabel}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between gap-2 sm:gap-3 mt-0.5">
                      <span className="font-serif font-bold text-lg sm:text-2xl lg:text-[28px] text-[#003D32] tracking-tight leading-none font-numeric">
                        {ch.statValue}
                      </span>
                      <button
                        type="button"
                        onClick={handleNextClick}
                        className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#003D32]/10 hover:bg-[#003D32]/20 text-[#003D32] border border-[#003D32]/15 shrink-0 transition-colors cursor-pointer"
                      >
                        <span>{ch.statAction}</span>
                        <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                    </div>
                    <div className="hidden sm:block mt-1.5 pt-1 border-t border-[#003D32]/10 font-mono text-[10px] sm:text-[11px] text-[#003D32]/75 font-medium truncate">
                      {ch.statSub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Clean Vantara Editorial Narrative */}
          <div className="md:col-span-7 lg:col-span-6 relative h-[195px] sm:h-[240px] md:h-[340px] lg:h-[390px] xl:h-[450px] flex items-center">
            {journeyChapters.map((ch, idx) => (
              <div
                key={ch.id}
                ref={(el) => (contentRefs.current[idx] = el)}
                className="journey-stack-content absolute inset-0 flex flex-col justify-center space-y-2 sm:space-y-3.5 lg:space-y-4.5 will-change-transform"
              >
                {/* Chapter Era & Number */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-white/10 border border-white/20 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#FAF8F5]/90 font-semibold backdrop-blur-md">
                    {ch.chapter} // {ch.era}
                  </span>
                </div>

                {/* Headline */}
                <h2 className="font-serif font-normal text-xl sm:text-2xl md:text-2xl lg:text-[34px] xl:text-[40px] text-[#FAF8F5] tracking-tight leading-[1.14]">
                  {ch.title}
                </h2>

                {/* Narrative */}
                <p className="font-sans text-xs sm:text-sm lg:text-[15px] xl:text-[16px] text-[#FAF8F5]/85 leading-relaxed font-light max-w-xl line-clamp-3 sm:line-clamp-4 md:line-clamp-none">
                  {ch.narrative}
                </p>

                {/* Vantara Pill CTA Button */}
                <div className="pt-0.5 sm:pt-1.5 flex items-center gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={handleNextClick}
                    className="inline-flex items-center gap-2 px-5 sm:px-7 py-2 sm:py-2.5 lg:py-3 rounded-full border border-white/35 hover:border-white text-[#FAF8F5] hover:bg-[#FAF8F5] hover:text-[#0B3828] font-mono text-[10.5px] sm:text-xs uppercase tracking-wider font-semibold transition-all group cursor-pointer backdrop-blur-sm shadow-md"
                  >
                    <span>{idx === journeyChapters.length - 1 ? 'Explore Recognition ↓' : 'Next Chapter'}</span>
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {idx > 0 && (
                    <button
                      type="button"
                      onClick={handlePrevClick}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-white/60 hover:text-white font-mono text-[10.5px] sm:text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer"
                    >
                      ← Previous
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Minimalist Folio Stamp with Nav Controls */}
        <div className="relative z-10 max-w-[1400px] w-full mx-auto flex items-center justify-between gap-4 pt-2 sm:pt-3 border-t border-white/15 font-mono text-[10px] sm:text-[11px] text-[#FAF8F5]/50 uppercase tracking-widest">
          <span className="truncate">Dr. Ravi Shankar Rai · The Making of a Vision</span>
          <div className="flex items-center gap-3 sm:gap-4 text-[#FAF8F5]/70 shrink-0">
            <span className="hidden lg:inline text-[#FAF8F5]/50">Use Scroll / Arrows To Step</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevClick}
                disabled={activeChapterIndex === 0}
                className="p-1 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                title="Previous Chapter"
              >
                ←
              </button>
              <span className="text-[#FAF8F5] font-bold">0{activeChapterIndex + 1} / 06</span>
              <button
                type="button"
                onClick={handleNextClick}
                className="p-1 rounded-full hover:bg-white/10 cursor-pointer transition-colors"
                title="Next Chapter"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 3. VANTARA SIGNATURE ARCHIVAL PHOTO MOSAIC COLLAGE                  */}
      {/* =================================================================== */}
      <ArchivalPhotoMosaic onNavigate={onNavigate} />

    </div>
  );
}
