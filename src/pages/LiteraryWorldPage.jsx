import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Feather,
  HeartHandshake,
  Quote,
  ExternalLink,
  Award,
  FileText,
  Languages,
  X,
  Share2,
  CheckCircle2,
  Sparkles,
  Bookmark,
  Calendar,
  Clock,
  Maximize2,
  Paperclip,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LITERARY_ARTICLES, LITERARY_POEMS, NEWSPAPER_PUBLICATIONS } from '../data/literaryData';

// Real newspaper scans from official Ravi Shankar Rai publication archives
import news1 from '../assets/publications/news1.jpg';
import news2 from '../assets/publications/news2.jpg';
import news3 from '../assets/publications/news3.jpg';
import news4 from '../assets/publications/news4.jpg';
import news5 from '../assets/publications/news5.jpg';
import news6 from '../assets/publications/news6.jpg';
import news7 from '../assets/publications/news7.jpg';
import news8 from '../assets/publications/news8.jpg';
import poetBookImg from '../assets/media/nobg-poetbook.png';
import oldBookImg from '../assets/old-book-isolated.webp';

gsap.registerPlugin(ScrollTrigger);

const publicationImageMap = {
  'news1.jpg': news1,
  'news2.jpg': news2,
  'news3.jpg': news3,
  'news4.jpg': news4,
  'news5.jpg': news5,
  'news6.jpg': news6,
  'news7.jpg': news7,
  'news8.jpg': news8,
};

// Thumbnail helper for companion articles
const articleThumbnails = [news2, news3, news4, news5];

export default function LiteraryWorldPage({ onNavigate }) {
  // Global reading language: 'hi' (Hindi default for Kaluwa Ghazipuri) | 'en' (English)
  const [lang, setLang] = useState('hi');

  // Category Tab: 'all' | 'articles' | 'press' | 'poetry'
  const [activeTab, setActiveTab] = useState('all');

  // Active Reader Modal state (for articles or poems)
  const [activeModalItem, setActiveModalItem] = useState(null);

  // Active Exhibition Lightbox Index for high-res newspaper scans (0 to 7)
  const [activeScanIndex, setActiveScanIndex] = useState(null);

  // Lightbox Zoom Scale: 1 = fit, 1.4, 1.8, 2.2 = close reading
  const [zoomScale, setZoomScale] = useState(1);

  // Per-poem localized language override tracking
  const [poemLangOverrides, setPoemLangOverrides] = useState({});

  // GSAP animation container refs
  const pageContainerRef = useRef(null);
  const headingRef = useRef(null);
  const bracketWrapperRef = useRef(null);
  const leftBracketRef = useRef(null);
  const rightBracketRef = useRef(null);
  const innerBadgeRef = useRef(null);
  const featuredCardRef = useRef(null);
  const articlesListRef = useRef(null);
  const contentTransitionRef = useRef(null);
  const floatingBookRef = useRef(null);
  const scanStageRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Keyboard navigation for the Archival Newspaper Lightbox
  useEffect(() => {
    if (activeScanIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveScanIndex(null);
        setZoomScale(1);
      } else if (e.key === 'ArrowRight') {
        setActiveScanIndex((prev) => (prev + 1) % NEWSPAPER_PUBLICATIONS.length);
        setZoomScale(1);
      } else if (e.key === 'ArrowLeft') {
        setActiveScanIndex((prev) => (prev - 1 + NEWSPAPER_PUBLICATIONS.length) % NEWSPAPER_PUBLICATIONS.length);
        setZoomScale(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeScanIndex]);

  // GSAP ScrollTrigger reveals and ambient floating effects
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 0. Exact Waiel Awwad Scroll-Linked Bracket Expansion: ( कालुवा ग़ाज़ीपुरी )
      if (bracketWrapperRef.current && innerBadgeRef.current && leftBracketRef.current && rightBracketRef.current) {
        const wrapper = bracketWrapperRef.current;
        const badge = innerBadgeRef.current;
        const leftBracket = leftBracketRef.current;
        const rightBracket = rightBracketRef.current;
        const textSpan = badge.querySelector('span');

        // Measure natural rendered width of the text with generous headroom
        gsap.set(wrapper, { width: 'auto', opacity: 1 });
        gsap.set(badge, { width: 'auto', opacity: 1, padding: 0 });
        const textWidth = textSpan ? Math.ceil(textSpan.getBoundingClientRect().width) : badge.scrollWidth;
        const badgeTargetWidth = textWidth + 18;

        const leftBracketWidth = Math.ceil(leftBracket.getBoundingClientRect().width) || 16;
        const rightBracketWidth = Math.ceil(rightBracket.getBoundingClientRect().width) || 16;
        const closedBracketWidth = leftBracketWidth + rightBracketWidth + 4;
        const openWrapperWidth = leftBracketWidth + badgeTargetWidth + rightBracketWidth + 8;

        // Set initial state at scroll = 0: ONLY "BEYOND THE WRITTEN WORD" is shown
        gsap.set(wrapper, { width: 0, opacity: 0, overflow: 'hidden' });
        gsap.set(badge, { width: 0, opacity: 0, overflow: 'hidden', padding: 0 });
        gsap.set([leftBracket, rightBracket], { color: '#C6A36A' });

        // Scroll-linked scrub timeline over the first 140px of scroll
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: pageContainerRef.current,
            start: 'top top',
            end: '+=140',
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });

        // Stage 1 (0 to 25% of scroll): Closed brackets () appear
        scrollTl.to(wrapper, {
          width: closedBracketWidth,
          opacity: 1,
          duration: 0.25,
          ease: 'none',
        }, 0);

        // Stage 2 (25% to 100% of scroll): Brackets slide open and badge blooms
        scrollTl
          .to(wrapper, {
            width: openWrapperWidth,
            duration: 0.75,
            ease: 'none',
          }, 0.25)
          .to(badge, {
            width: badgeTargetWidth,
            opacity: 1,
            duration: 0.75,
            ease: 'none',
          }, 0.25)
          .fromTo(textSpan || badge, {
            scale: 0.85,
            opacity: 0,
          }, {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'none',
          }, 0.3)
          .to([leftBracket, rightBracket], {
            color: '#D4AF37',
            duration: 0.4,
            ease: 'none',
          }, 0.4)
          .set([wrapper, badge], { overflow: 'visible' }, 1.0);
      }

      // 1. Stagger reveal for the Vantara companion article rows
      if (articlesListRef.current) {
        gsap.fromTo(
          '.vantara-article-row',
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: articlesListRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      // 2. Reveal for featured card
      if (featuredCardRef.current) {
        gsap.fromTo(
          featuredCardRef.current,
          { y: 40, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: featuredCardRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      // 3. Stagger reveal for newspaper clippings
      gsap.fromTo(
        '.press-grid-item',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.press-grid-container',
            start: 'top 85%',
          },
        }
      );

      // 4. Stagger reveal for manuscript poem leaves
      gsap.fromTo(
        '.manuscript-poem-card',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.manuscript-grid-container',
            start: 'top 85%',
          },
        }
      );

      // 5. Floating ambient levitation for poet book illustration
      if (floatingBookRef.current) {
        gsap.to(floatingBookRef.current, {
          y: -12,
          rotation: 1.8,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }, pageContainerRef);

    return () => ctx.revert();
  }, [activeTab, lang]);

  // Smooth 3D page-flip / cross-fade transition when toggling language
  useEffect(() => {
    if (contentTransitionRef.current) {
      gsap.fromTo(
        contentTransitionRef.current,
        { opacity: 0.25, y: 8, filter: 'blur(3px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.45,
          ease: 'power2.out',
        }
      );
    }
  }, [lang]);

  // 3D Perspective Mouse Tilt for the Featured Vantara Card
  const handleFeaturedMouseMove = (e) => {
    const card = featuredCardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: x * 6,
      rotateX: -y * 6,
      duration: 0.4,
      ease: 'power1.out',
      transformPerspective: 1000,
    });
  };

  const handleFeaturedMouseLeave = () => {
    if (!featuredCardRef.current) return;
    gsap.to(featuredCardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  const togglePoemLang = (poemId) => {
    setPoemLangOverrides((prev) => {
      const current = prev[poemId] || lang;
      return { ...prev, [poemId]: current === 'hi' ? 'en' : 'hi' };
    });
  };

  const leadArticle = LITERARY_ARTICLES.find((a) => a.featured) || LITERARY_ARTICLES[0];
  const companionArticles = LITERARY_ARTICLES.filter((a) => !a.featured);

  // Active Publication for Exhibition Lightbox
  const currentScanPub = activeScanIndex !== null ? NEWSPAPER_PUBLICATIONS[activeScanIndex] : null;
  const currentScanImg = currentScanPub ? publicationImageMap[currentScanPub.imageName] : null;

  return (
    <div
      ref={pageContainerRef}
      className="min-h-screen bg-[#FAF7F0] text-[#003D32] pt-28 pb-24 px-5 sm:px-8 lg:px-14 selection:bg-[#C6A36A] selection:text-[#FAF7F0] font-sans relative overflow-x-hidden"
    >
      {/* Background Archival Paper Grain & Warm Atmospheric Ambient Glow */}
      <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" />
      <div className="absolute top-10 left-10 w-[40vw] h-[40vw] rounded-full bg-[#F1E8D9]/70 blur-3xl pointer-events-none" />
      <div className="absolute top-[30%] right-0 w-[35vw] h-[35vw] rounded-full bg-[#E8DCB8]/40 blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto space-y-10 sm:space-y-12 relative z-10">

        {/* =================================================================== */}
        {/* 1. EDITORIAL HEADER (UNIFIED WITH ABOUT, LEADERSHIP & MEDIA PAGES) */}
        {/* =================================================================== */}
        <div className="border-b border-[#C6A36A]/25 pb-8 space-y-3">
          <span className="font-mono text-xs tracking-[0.28em] uppercase text-[#C6A36A] block font-bold">
            LITERARY OEUVRE // कालुवा ग़ाज़ीपुरी
          </span>

          {/* Monumental Editorial Headline with Expanding ( कालुवा ग़ाज़ीपुरी ) Effect */}
          <div ref={headingRef} className="pt-1 sm:pt-2 pb-1">
            <h1 className="font-serif font-normal text-[clamp(28px,4.8vw,74px)] leading-[1.05] tracking-[-0.02em] uppercase text-[#003D32] whitespace-nowrap flex items-center select-none w-full max-w-full overflow-visible">
              <span className="shrink-0 mr-2 sm:mr-3.5">Beyond the</span>

              {/* Dynamic Gold Parenthesis Insignia: Width 0 on load, expands on scroll */}
              <span
                ref={bracketWrapperRef}
                className="inline-flex items-center align-middle overflow-hidden will-change-[width,opacity] shrink-0 py-1"
                style={{ width: 0, opacity: 0 }}
              >
                {/* Left Bracket */}
                <span
                  ref={leftBracketRef}
                  className="text-[#D4AF37] font-serif font-light text-[1.15em] leading-none inline-block select-none drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]"
                >
                  (
                </span>

                {/* Inner Expanding Golden Badge: Kaluwa Ghazipuri with full vertical headroom */}
                <span
                  ref={innerBadgeRef}
                  className="inline-flex items-center justify-center overflow-hidden will-change-[width,opacity,transform] shrink-0 py-1"
                  style={{ width: 0, opacity: 0 }}
                >
                  <span
                    className={`font-semibold text-[0.72em] sm:text-[0.76em] text-[#C6A36A] tracking-normal whitespace-nowrap px-2.5 sm:px-3.5 py-1 leading-normal inline-block select-none drop-shadow-[0_1px_8px_rgba(198,163,106,0.35)] ${
                      lang === 'hi' ? 'font-devanagari normal-case' : 'font-serif normal-case'
                    }`}
                  >
                    {lang === 'hi' ? 'कालुवा ग़ाज़ीपुरी' : 'Kaluwa Ghazipuri'}
                  </span>
                </span>

                {/* Right Bracket */}
                <span
                  ref={rightBracketRef}
                  className="text-[#D4AF37] font-serif font-light text-[1.15em] leading-none inline-block select-none drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]"
                >
                  )
                </span>
              </span>

              <span className="shrink-0 ml-2 sm:mr-3.5">Written Word</span>
            </h1>
          </div>

          <p className="max-w-[70ch] text-[#003D32]/75 text-[15px] lg:text-[17px] leading-[1.75] font-light pt-1">
            {lang === 'hi'
              ? 'डॉ. रवि शंकर राय (कालुवा ग़ाज़ीपुरी) के वैचारिक निबंधों, तीखे सामाजिक व्यंग्य और मर्मस्पर्शी रचनाओं का प्रामाणिक संग्रह — जहाँ आधुनिक गति पर विमर्श और माटी की चेतना जीवंत होती है।'
              : 'The collected essays, sharp social satire, and reflective verse of Dr. Ravi Shankar Rai — writing under the pen name कालुवा ग़ाज़ीपुरी to chronicle rural life, human labor, and the unspoken truths of modern India.'}
          </p>
        </div>

        {/* =================================================================== */}
        {/* 2. CATEGORY NAVIGATION BAR WITH BILINGUAL SWITCHER                   */}
        {/* =================================================================== */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#003D32]/10">
          
          {/* Left: Category Navigation Pills with Vantara Emerald Styling */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
            <button
              onClick={() => setActiveTab('all')}
              className={`font-mono text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all cursor-pointer border shrink-0 ${
                activeTab === 'all'
                  ? 'bg-[#003D32] text-[#FAF7F0] font-bold border-[#003D32] shadow-sm'
                  : 'bg-white text-[#003D32]/75 border-[#C6A36A]/30 hover:border-[#003D32] hover:bg-[#003D32]/5'
              }`}
            >
              {lang === 'hi' ? 'संपूर्ण रचनाएं (All Works)' : 'All Works'}
            </button>

            <button
              onClick={() => setActiveTab('articles')}
              className={`font-mono text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all cursor-pointer border shrink-0 ${
                activeTab === 'articles'
                  ? 'bg-[#003D32] text-[#FAF7F0] font-bold border-[#003D32] shadow-sm'
                  : 'bg-white text-[#003D32]/75 border-[#C6A36A]/30 hover:border-[#003D32] hover:bg-[#003D32]/5'
              }`}
            >
              {lang === 'hi' ? 'वैचारिक निबंध (Essays & Satire)' : 'Essays & Satire'}
            </button>

            <button
              onClick={() => setActiveTab('press')}
              className={`font-mono text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all cursor-pointer border shrink-0 ${
                activeTab === 'press'
                  ? 'bg-[#003D32] text-[#FAF7F0] font-bold border-[#003D32] shadow-sm'
                  : 'bg-white text-[#003D32]/75 border-[#C6A36A]/30 hover:border-[#003D32] hover:bg-[#003D32]/5'
              }`}
            >
              {lang === 'hi' ? 'समाचार पत्र स्तम्भ (Press Clippings)' : 'Press Clippings'}
            </button>

            <button
              onClick={() => setActiveTab('poetry')}
              className={`font-mono text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all cursor-pointer border shrink-0 ${
                activeTab === 'poetry'
                  ? 'bg-[#003D32] text-[#FAF7F0] font-bold border-[#003D32] shadow-sm'
                  : 'bg-white text-[#003D32]/75 border-[#C6A36A]/30 hover:border-[#003D32] hover:bg-[#003D32]/5'
              }`}
            >
              {lang === 'hi' ? 'काव्य धारा (Poetry Manuscript)' : 'Poetry Manuscript'}
            </button>
          </div>

          {/* Right: Bilingual Reading Preference Switcher */}
          <div className="flex items-center gap-2.5 shrink-0 ml-auto">
            <span className="font-mono text-xs uppercase tracking-wider text-[#003D32]/60 hidden md:inline">
              Language:
            </span>
            <div className="inline-flex p-1 rounded-full bg-white border border-[#C6A36A]/40 shadow-xs">
              <button
                onClick={() => setLang('hi')}
                className={`px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                  lang === 'hi'
                    ? 'bg-[#003D32] text-[#FAF7F0] font-bold shadow-sm'
                    : 'text-[#003D32]/70 hover:text-[#003D32]'
                }`}
              >
                <span className="font-devanagari text-sm font-semibold">हिन्दी</span>
                <span className="text-[10px] opacity-75">HI</span>
              </button>

              <button
                onClick={() => setLang('en')}
                className={`px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                  lang === 'en'
                    ? 'bg-[#003D32] text-[#FAF7F0] font-bold shadow-sm'
                    : 'text-[#003D32]/70 hover:text-[#003D32]'
                }`}
              >
                <span>English</span>
                <span className="text-[10px] opacity-75">EN</span>
              </button>
            </div>
          </div>

        </div>

        {/* Dynamic Transition Wrapper for Smooth Bilingual Page-Flip Effect */}
        <div ref={contentTransitionRef} className="space-y-10 sm:space-y-14">

          {/* ===================================================================
              SECTION 1: THE VANTARA-STYLE EDITORIAL MAGAZINE SPREAD
              Left: Companion Editorial List with Thumbnails & Vantara Circle Arrow
              Right: Featured Lead Story Card with Pull-Quote & Emerald Button
              =================================================================== */}
          {(activeTab === 'all' || activeTab === 'articles') && (
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-2 border-b border-[#003D32]/10">
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#C66A3D] font-bold block mb-1">
                    EDITORIAL SPREAD · निबंध एवं सामाजिक विमर्श
                  </span>
                  <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#003D32] tracking-tight">
                    {lang === 'hi' ? 'वैचारिक आलेख एवं तीखा व्यंग्य' : 'Essays & Philosophical Satire'}
                  </h2>
                </div>
                <span className="font-mono text-xs text-[#003D32]/60 uppercase tracking-widest hidden sm:inline">
                  MAGAZINE FOLIO // ISSUE 2026
                </span>
              </div>

              {/* Exact Vantara Layout: Companion List (Left) + Featured Card (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* LEFT: Companion Articles Stack with Clean Editorial Spacing (Zero Excess Gaps) */}
                <div ref={articlesListRef} className="lg:col-span-7 flex flex-col justify-start gap-4">
                  {companionArticles.map((article, idx) => {
                    const thumb = articleThumbnails[idx % articleThumbnails.length];
                    return (
                      <div
                        key={article.id}
                        onClick={() => setActiveModalItem(article)}
                        className="vantara-article-row group relative p-5 sm:p-6 rounded-2xl bg-white border border-[#C6A36A]/25 hover:border-[#003D32] hover:shadow-[0_12px_32px_rgba(0,61,50,0.1)] transition-all duration-300 flex items-center justify-between gap-5 cursor-pointer"
                      >
                        {/* Rounded Thumbnail on Left */}
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-stone-200 bg-stone-100">
                          <img
                            src={thumb}
                            alt={article.title[lang]}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Middle Content: Category Tag, Bold Title, Excerpt */}
                        <div className="flex-1 min-w-0 space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#C66A3D] font-bold">
                              {article.category[lang]}
                            </span>
                            <span className="text-stone-300">·</span>
                            <span className="font-mono text-[10.5px] text-[#003D32]/50">
                              {article.readTime}
                            </span>
                          </div>

                          <h4 className="font-serif font-bold text-lg sm:text-xl text-[#003D32] group-hover:text-[#002B24] leading-snug line-clamp-2">
                            {article.title[lang]}
                          </h4>

                          <p className="font-sans text-xs sm:text-[13px] text-[#003D32]/75 font-light line-clamp-2 leading-relaxed">
                            {article.excerpt[lang]}
                          </p>
                        </div>

                        {/* Right: Signature Vantara Circular Action Button with Diagonal Arrow */}
                        <div className="shrink-0 pl-1">
                          <div className="btn-vantara-circle">
                            <ArrowUpRight className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* RIGHT: Featured Lead Story Card (Modeled after Vantara's General Articles Card) */}
                <div
                  ref={featuredCardRef}
                  onMouseMove={handleFeaturedMouseMove}
                  onMouseLeave={handleFeaturedMouseLeave}
                  className="lg:col-span-5 relative bg-gradient-to-br from-[#FFFDF9] via-[#FAF6ED] to-[#F3ECE0] rounded-2xl border-2 border-[#C6A36A]/40 outline outline-1 outline-offset-4 outline-[#C6A36A]/20 shadow-[0_20px_50px_rgba(40,25,10,0.1)] p-8 sm:p-10 flex flex-col justify-between overflow-hidden group"
                >
                  {/* Subtle Under-Layer Parchment Shadow */}
                  <div className="absolute -inset-1 bg-[#EFE7D5] rounded-2xl -rotate-[0.6deg] -z-10 opacity-70 pointer-events-none" />

                  {/* Brass Corner Pin / Clip */}
                  <div className="absolute top-4 left-6 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F0] border border-[#C6A36A]/40 text-[#003D32] text-[10px] font-mono uppercase tracking-wider font-bold shadow-xs">
                    <Bookmark className="w-3.5 h-3.5 text-[#C66A3D]" />
                    <span>GENERAL ARTICLES</span>
                  </div>

                  {/* Circular Calligraphic Ink Stamp Seal */}
                  <div className="absolute top-4 right-5 w-18 h-18 rounded-full border-2 border-dashed border-[#C66A3D]/40 text-[#C66A3D] flex flex-col items-center justify-center -rotate-12 select-none pointer-events-none opacity-80 group-hover:rotate-0 transition-transform duration-500">
                    <span className="font-devanagari text-[9px] font-bold">कालुवा</span>
                    <span className="font-mono text-[7px] uppercase tracking-widest">मुहर</span>
                    <span className="font-devanagari text-[9px] font-bold">ग़ाज़ीपुरी</span>
                  </div>

                  {/* Lead Content Box */}
                  <div className="space-y-6 pt-7 relative z-10">
                    <div className="flex items-center justify-between text-xs font-mono text-[#003D32]/65">
                      <span className="font-bold text-[#FF6B35] uppercase tracking-wider">
                        {leadArticle.category[lang]}
                      </span>
                      <span>{leadArticle.date}</span>
                    </div>

                    {/* Vantara-style Pull Quote Headline in Serif */}
                    <div className="space-y-3">
                      <Quote className="w-8 h-8 text-[#C6A36A]/40" />
                      <h3 className="font-serif italic font-medium text-2xl sm:text-3xl text-[#003D32] leading-snug">
                        {leadArticle.leadQuote[lang]}
                      </h3>
                      <span className="font-mono text-xs uppercase tracking-wider text-[#C66A3D] font-bold block">
                        — कालुवा ग़ाज़ीपुरी ({leadArticle.title[lang]})
                      </span>
                    </div>

                    {/* Inset Excerpt */}
                    <p className="font-sans text-xs sm:text-sm text-[#003D32]/80 leading-relaxed font-light">
                      {leadArticle.excerpt[lang]}
                    </p>

                    {/* Authentic Print Scan Preview Inset - Opens Exhibition Lightbox */}
                    <div
                      onClick={() => {
                        setActiveScanIndex(0);
                        setZoomScale(1);
                      }}
                      className="p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-[#C6A36A]/30 flex items-center gap-3.5 cursor-pointer hover:border-[#003D32] transition-colors group/inset shadow-xs"
                    >
                      <img
                        src={news1}
                        alt="Scan Preview"
                        className="w-14 h-14 rounded-lg object-cover group-hover/inset:scale-105 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="font-mono text-[10px] uppercase text-[#FF6B35] font-bold block">
                          AUTHENTIC PRINT SCAN · EXHIBIT 01
                        </span>
                        <span className="font-serif text-xs text-[#003D32] font-semibold truncate block">
                          Examine in Archival Exhibition Viewer ↗
                        </span>
                      </div>
                      <Eye className="w-4 h-4 text-[#C6A36A]" />
                    </div>
                  </div>

                  {/* Bottom Vantara Action Buttons */}
                  <div className="pt-6 mt-8 border-t border-[#003D32]/10 flex flex-wrap items-center justify-between gap-3 relative z-10">
                    <a
                      href={leadArticle.link}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-vantara-solid"
                    >
                      <span>View Article</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>

                    <button
                      onClick={() => setActiveModalItem(leadArticle)}
                      className="btn-vantara"
                    >
                      <span>Open Full Folio</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ===================================================================
              EDITORIAL PHILOSOPHY RIBBON
              Authentic literary motto of Dr. Rai connecting modern essays & archival press
              =================================================================== */}
          {(activeTab === 'all' || activeTab === 'articles') && (
            <div className="relative my-2 sm:my-3 p-6 sm:p-9 rounded-2xl bg-gradient-to-r from-[#F6F0E4]/90 via-[#FFFDF9] to-[#F6F0E4]/90 border border-[#C6A36A]/35 shadow-[0_8px_28px_rgba(40,25,10,0.04)] overflow-hidden">
              {/* Background Archival Paper Grain */}
              <div className="absolute inset-0 bg-grain opacity-25 pointer-events-none" />

              <div className="max-w-4xl mx-auto text-center space-y-3 relative z-10">
                <div className="flex items-center justify-center gap-3 text-[#C6A36A]">
                  <span className="w-10 sm:w-16 h-px bg-gradient-to-r from-transparent to-[#C6A36A]/60" />
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#C66A3D] font-bold">
                    LITERARY CONSCIENCE · साहित्यिक चेतना
                  </span>
                  <span className="w-10 sm:w-16 h-px bg-gradient-to-l from-transparent to-[#C6A36A]/60" />
                </div>

                <blockquote className="font-serif italic text-xl sm:text-2xl md:text-[25px] text-[#003D32] leading-relaxed font-medium">
                  {lang === 'hi'
                    ? '“जहाँ तकनीक मौन हो जाती है, वहाँ शब्द समाज की धड़कन बनते हैं।”'
                    : '“Where technology falls silent, words become the heartbeat of society.”'}
                </blockquote>

                <div className="pt-1 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-[13px] font-mono text-[#003D32]/75">
                  <span className="font-devanagari font-bold text-[#003D32]">
                    — डॉ. रवि शंकर राय
                  </span>
                  <span className="text-[#C6A36A]">·</span>
                  <span className="font-devanagari text-[#C66A3D] font-bold">
                    कालुवा ग़ाज़ीपुरी
                  </span>
                  <span className="text-[#C6A36A] hidden sm:inline">·</span>
                  <span className="text-[11px] uppercase tracking-wider text-[#003D32]/60 hidden sm:inline">
                    माटी सम्मान से अलंकृत
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================
              SECTION 2: AUTHENTIC NEWSPAPER CLIPPINGS & PRESS ARCHIVE GALLERY
              Clicking any clipping opens the Museum Exhibition Suite Lightbox
              =================================================================== */}
          {(activeTab === 'all' || activeTab === 'press') && (
            <div className="space-y-8 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#C6A36A]/25">
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#C6A36A] font-bold block mb-1">
                    मुद्रित समाचार स्तम्भ · ORIGINAL PRINT EDITIONS
                  </span>
                  <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#003D32] tracking-tight">
                    {lang === 'hi' ? 'समाचार पत्रों में प्रकाशित आलेख' : 'Scanned Newspaper Print Clippings'}
                  </h2>
                </div>
                <span className="font-mono text-xs text-[#003D32]/60 uppercase tracking-widest">
                  DAINIK JAGRAN · RASHTRIYA PRESS ARCHIVES
                </span>
              </div>

              {/* Grid of Real Newspaper Print Folios */}
              <div className="press-grid-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {NEWSPAPER_PUBLICATIONS.map((pub, idx) => {
                  const scanImg = publicationImageMap[pub.imageName];
                  return (
                    <div
                      key={pub.id}
                      onClick={() => {
                        setActiveScanIndex(idx);
                        setZoomScale(1);
                      }}
                      className="press-grid-item p-4 bg-[#FFFDF9] rounded-xl border border-[#C6A36A]/30 shadow-[0_8px_24px_rgba(40,25,10,0.06)] hover:border-[#003D32] hover:shadow-[0_12px_32px_rgba(40,25,10,0.12)] transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
                    >
                      {/* Newspaper Clipping Image Frame with Museum Passe-Partout Inset */}
                      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[#F5EFE4] border border-[#C6A36A]/25 p-1.5 shadow-inner">
                        <div className="w-full h-full overflow-hidden rounded-sm relative">
                          <img
                            src={scanImg}
                            alt={pub.title[lang]}
                            className="w-full h-full object-cover object-top filter contrast-[1.03] group-hover:scale-108 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-[#003D32]/10 group-hover:bg-transparent transition-colors" />
                        </div>
                        
                        <div className="absolute bottom-3 right-3 p-2 rounded-full bg-white/95 text-[#003D32] shadow-md group-hover:scale-110 transition-transform flex items-center justify-center">
                          <Eye className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#FF6B35]">
                          <span className="font-bold">EXHIBIT 0{idx + 1}</span>
                          <span className="text-[#C6A36A] font-semibold">{pub.date}</span>
                        </div>

                        <h4 className="font-serif font-bold text-base text-[#003D32] leading-snug group-hover:text-[#8C6D37] transition-colors line-clamp-2">
                          {pub.title[lang]}
                        </h4>

                        <p className="font-sans text-xs text-[#003D32]/70 leading-relaxed font-light line-clamp-2">
                          {pub.desc[lang]}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#003D32]/10 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#003D32]/60">
                        <span className="truncate max-w-[140px]">{pub.publication}</span>
                        <span className="font-bold text-[#C66A3D] group-hover:text-[#003D32] transition-colors flex items-center gap-1">
                          <span>Inspect</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===================================================================
              SECTION 3: THE POET'S MANUSCRIPT LEAVES (POETRY ON RULED PAPER)
              =================================================================== */}
          {(activeTab === 'all' || activeTab === 'poetry') && (
            <div className="space-y-8 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#C6A36A]/25">
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#C6A36A] font-bold block mb-1">
                    काव्य धारा · SELECTED VERSE BY KALUWA GHAZIPURI
                  </span>
                  <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#003D32] tracking-tight">
                    {lang === 'hi' ? 'माटी और मन की कविताएं' : 'Poems of the Soil & Soul'}
                  </h2>
                </div>
                <span className="font-mono text-xs text-[#003D32]/60 uppercase tracking-widest">
                  MAATI SAMMAN CONFERRAL ARCHIVE
                </span>
              </div>

              {/* Grid of Tactile Ruled Manuscript Paper Cards */}
              <div className="manuscript-grid-container grid grid-cols-1 md:grid-cols-2 gap-8">
                {LITERARY_POEMS.map((poem) => {
                  const effectiveLang = poemLangOverrides[poem.id] || lang;
                  const verses = poem.verses[effectiveLang] || poem.verses.hi;

                  return (
                    <div
                      key={poem.id}
                      className="manuscript-poem-card relative p-8 sm:p-10 rounded-2xl bg-[#FFFDF9] border-2 border-[#C6A36A]/35 shadow-[0_15px_40px_rgba(40,25,10,0.08)] hover:shadow-[0_20px_48px_rgba(40,25,10,0.12)] transition-all flex flex-col justify-between space-y-6 group overflow-hidden"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(198,163,106,0.12) 32px)',
                      }}
                    >
                      {/* Top Paper Header with Left Red Margin Rule */}
                      <div className="absolute top-0 inset-x-8 h-1.5 bg-gradient-to-r from-[#C6A36A]/20 via-[#C66A3D]/40 to-[#C6A36A]/20" />
                      <div className="absolute top-6 bottom-6 left-6 w-0.5 bg-[#C66A3D]/25 pointer-events-none" />

                      <div className="space-y-5 pl-4 sm:pl-6">
                        {/* Card Header & Inline Lang Switch */}
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#FF6B35] font-bold">
                            {poem.theme[lang]}
                          </span>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => togglePoemLang(poem.id)}
                              className="px-3.5 py-1.5 rounded-full bg-[#FAF7F0] border border-[#C6A36A]/40 font-mono text-[10px] uppercase text-[#003D32] hover:bg-[#003D32] hover:text-[#FAF7F0] transition-colors cursor-pointer shadow-2xs font-semibold"
                            >
                              {effectiveLang === 'hi' ? 'Switch to English' : 'हिन्दी मूल'}
                            </button>
                            <Quote className="w-4 h-4 text-[#C6A36A]/40" />
                          </div>
                        </div>

                        {/* Poem Title */}
                        <div>
                          <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#003D32]">
                            {poem.title[effectiveLang]}
                          </h3>
                          <span className="font-mono text-xs text-[#C6A36A] font-semibold block mt-1">
                            {poem.meter} · {poem.year}
                          </span>
                        </div>

                        {/* Stanza Block */}
                        <div className="space-y-3 py-2">
                          {verses.map((line, idx) => (
                            <p
                              key={idx}
                              className={`leading-[2rem] text-[#003D32]/95 ${
                                effectiveLang === 'hi'
                                  ? 'font-devanagari font-[500] text-base sm:text-lg'
                                  : 'font-serif italic text-base sm:text-lg'
                              }`}
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer Note & Vantara Style Action */}
                      <div className="pt-4 border-t border-dashed border-[#C6A36A]/30 flex items-center justify-between pl-4 sm:pl-6">
                        <span className="font-mono text-[10.5px] tracking-wider text-[#003D32]/60 uppercase">
                          {poem.annotation[lang]}
                        </span>
                        <button
                          onClick={() => setActiveModalItem(poem)}
                          className="font-mono text-[11px] uppercase tracking-wider text-[#C66A3D] hover:text-[#003D32] font-bold transition-colors cursor-pointer"
                        >
                          Examine Folio →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===================================================================
              SECTION 4: WRITER'S STUDY CENTERPIECE & AUTHOR DIALOGUE
              With Floating Harmonic Levitation
              =================================================================== */}
          <div className="p-8 sm:p-12 rounded-2xl bg-[#FFFDF9] border-2 border-[#C6A36A]/40 shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="font-mono text-xs uppercase tracking-[0.26em] text-[#C66A3D] font-bold block">
                  THE WRITER'S ATELIER // कालुवा ग़ाज़ीपुरी
                </span>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#003D32]">
                  "The machine constructs the arteries of a nation, but only words can guard its moral soul."
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#003D32]/80 leading-relaxed font-light">
                  Dr. Rai’s literature rejects urban isolation to remain permanently rooted in Purvanchal. Through poetry, satirical commentary, and essays on labor, he gives voice to those who build India quietly from the shadows.
                </p>
              </div>

              <div className="lg:col-span-4 flex justify-center">
                <img
                  ref={floatingBookRef}
                  src={poetBookImg}
                  alt="Poet's Books and Quill"
                  className="w-48 sm:w-56 h-auto object-contain filter drop-shadow-xl"
                />
              </div>
            </div>
          </div>

          {/* ===================================================================
              SECTION 5: OFFICIAL LITERARY COMMUNITY CHANNELS
              =================================================================== */}
          <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[#002B23] to-[#001D17] text-[#FAF7F0] shadow-2xl border border-[#C6A36A]/35">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B35]" />
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C6A36A] font-semibold">
                    OFFICIAL LITERARY COMMUNITY
                  </span>
                </div>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl tracking-tight text-[#FAF7F0]">
                  Connect with Kaluwa Ghazipuri’s Literary World
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#FAF7F0]/80 leading-relaxed font-light">
                  Follow Dr. Rai’s ongoing socio-political essays, poems, and cultural reflections shared directly with over thousands of readers on his official Facebook and Medium platforms.
                </p>
              </div>
              
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <a
                  href="https://www.facebook.com/p/Kaluwa-Ghazipuri-%E0%A4%95%E0%A4%B2%E0%A5%81%E0%A4%B5%E0%A4%BE-%E0%A4%97%E0%A4%BE%E0%A4%9C%E0%A5%80%E0%A4%AA%E0%A5%81%E0%A4%B0%E0%A5%80-100063883987696/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-[#C6A36A] text-[#001713] font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#FAF7F0] transition-colors shadow-md"
                >
                  <span>Follow on Facebook</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://medium.com/@ravishankarrai_33718"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full border border-white/20 text-[#FAF7F0] font-mono text-xs uppercase tracking-wider font-semibold hover:border-white transition-colors"
                >
                  <span>Read on Medium</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ===================================================================
          TACTILE PAPER READER LIGHTBOX MODAL (MANUSCRIPT FOLIO VIEW)
          =================================================================== */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 bg-[#001713]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-2xl border-2 border-[#C6A36A]/50 shadow-2xl p-6 sm:p-10 text-[#003D32] my-8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(198,163,106,0.1) 32px)',
            }}
          >
            {/* Top Deckle Edge Ribbon */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#C6A36A]/40 via-[#C66A3D] to-[#C6A36A]/40" />

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#003D32]/10 pb-4">
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#C66A3D] font-bold">
                MANUSCRIPT FOLIO · कालुवा ग़ाज़ीपुरी
              </span>
              <button
                onClick={() => setActiveModalItem(null)}
                className="w-8 h-8 rounded-full bg-[#FAF7F0] border border-[#C6A36A]/40 flex items-center justify-center text-[#003D32] hover:bg-[#003D32] hover:text-[#FAF7F0] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="py-6 space-y-6">
              <div>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#003D32]">
                  {activeModalItem.title[lang]}
                </h3>
                {activeModalItem.subtitle && (
                  <p className="font-sans text-xs sm:text-sm text-[#C66A3D] font-medium mt-1">
                    {activeModalItem.subtitle[lang]}
                  </p>
                )}
              </div>

              {/* If Poem */}
              {activeModalItem.verses && (
                <div className="p-6 rounded-xl bg-[#FAF7F0]/90 border border-[#C6A36A]/30 space-y-3">
                  {(activeModalItem.verses[lang] || activeModalItem.verses.hi).map((line, idx) => (
                    <p
                      key={idx}
                      className={`leading-[2rem] text-[#003D32] ${
                        lang === 'hi'
                          ? 'font-devanagari font-[500] text-base sm:text-lg'
                          : 'font-serif italic text-base sm:text-lg'
                      }`}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              )}

              {/* If Article */}
              {activeModalItem.leadQuote && (
                <div className="p-5 rounded-lg bg-[#FAF6ED] border-l-4 border-[#C6A36A] shadow-inner">
                  <p className="font-serif italic text-sm sm:text-base text-[#003D32]">
                    {activeModalItem.leadQuote[lang]}
                  </p>
                </div>
              )}

              {activeModalItem.excerpt && (
                <p className="font-sans text-sm sm:text-[15px] text-[#003D32]/85 leading-relaxed font-light">
                  {activeModalItem.excerpt[lang]}
                </p>
              )}
            </div>

            {/* Modal Footer with Vantara Button */}
            <div className="pt-4 border-t border-[#003D32]/10 flex items-center justify-between">
              <span className="font-mono text-xs text-[#003D32]/60">
                {activeModalItem.date || 'Archival Edition'}
              </span>

              {activeModalItem.link && (
                <a
                  href={activeModalItem.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-vantara-solid"
                >
                  <span>Open Full Publication</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          MUSEUM ARCHIVAL EXHIBITION SUITE (HIGH-RES LIGHTBOX VIEWER)
          Complete with Two-Column Curatorial Dossier, Zoom / Pan & Filmstrip
          =================================================================== */}
      {currentScanPub && (
        <div
          className="fixed inset-0 z-50 bg-[#001410]/95 backdrop-blur-2xl flex flex-col justify-between p-3 sm:p-5 lg:p-6 overflow-hidden animate-in fade-in duration-300"
          onClick={() => {
            setActiveScanIndex(null);
            setZoomScale(1);
          }}
        >
          {/* Top Archival Toolbar Ribbon */}
          <div
            className="w-full flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#C6A36A]/25 z-20 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: Metadata Badge & Title */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="px-3 py-1 rounded-full bg-[#C6A36A]/15 border border-[#C6A36A]/40 text-[#C6A36A] font-mono text-[11px] uppercase tracking-widest font-bold shrink-0">
                EXHIBIT 0{activeScanIndex + 1} / 0{NEWSPAPER_PUBLICATIONS.length}
              </div>
              <div className="truncate">
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#FAF7F0] truncate">
                  {currentScanPub.title[lang]}
                </h3>
                <span className="font-mono text-[11px] text-[#FAF7F0]/60 hidden sm:inline">
                  {currentScanPub.publication} · {currentScanPub.date} · {currentScanPub.tag}
                </span>
              </div>
            </div>

            {/* Center: Interactive Magnification Controls Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00221B]/90 border border-[#C6A36A]/35 text-[#FAF7F0] shadow-lg">
              <button
                onClick={() => setZoomScale((z) => Math.max(z - 0.3, 0.75))}
                title="Zoom Out"
                className="p-1 rounded-full hover:bg-white/10 text-[#FAF7F0]/80 hover:text-[#FAF7F0] transition-colors cursor-pointer"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <span className="font-mono text-xs font-semibold px-2 text-[#C6A36A]">
                {Math.round(zoomScale * 100)}%
              </span>

              <button
                onClick={() => setZoomScale((z) => Math.min(z + 0.3, 2.5))}
                title="Zoom In"
                className="p-1 rounded-full hover:bg-white/10 text-[#FAF7F0]/80 hover:text-[#FAF7F0] transition-colors cursor-pointer"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <div className="w-px h-3.5 bg-white/20 mx-1" />

              <button
                onClick={() => setZoomScale(1)}
                title="Reset to Fit View"
                className="p-1 rounded-full hover:bg-white/10 text-[#FAF7F0]/80 hover:text-[#FAF7F0] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right: Prev / Next Navigation & Close Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveScanIndex((prev) => (prev - 1 + NEWSPAPER_PUBLICATIONS.length) % NEWSPAPER_PUBLICATIONS.length);
                  setZoomScale(1);
                }}
                className="p-2 rounded-full bg-[#00221B] border border-[#C6A36A]/30 text-[#FAF7F0] hover:bg-[#003D32] hover:border-[#003D32] transition-colors cursor-pointer"
                title="Previous Clipping (Left Arrow)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setActiveScanIndex((prev) => (prev + 1) % NEWSPAPER_PUBLICATIONS.length);
                  setZoomScale(1);
                }}
                className="p-2 rounded-full bg-[#00221B] border border-[#C6A36A]/30 text-[#FAF7F0] hover:bg-[#003D32] hover:border-[#003D32] transition-colors cursor-pointer"
                title="Next Clipping (Right Arrow)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setActiveScanIndex(null);
                  setZoomScale(1);
                }}
                className="p-2 rounded-full bg-white/10 border border-white/20 text-[#FAF7F0] hover:bg-[#003D32] hover:text-[#FAF7F0] hover:border-[#003D32] transition-all cursor-pointer ml-2"
                title="Close Lightbox (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Middle Body: Grand Two-Column Exhibition Hall */}
          <div
            className="flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-5 py-4 overflow-hidden min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Visual Document Canvas (Left: 7-8 columns) */}
            <div
              ref={scanStageRef}
              className="lg:col-span-8 h-full rounded-2xl bg-[#121B18]/60 border border-[#C6A36A]/25 p-3 sm:p-5 flex items-center justify-center relative overflow-hidden shadow-2xl backdrop-blur-md"
            >
              {/* Museum Passe-Partout Matting Frame */}
              <div className="relative w-full h-full max-h-[75vh] flex items-center justify-center rounded-xl bg-[#FAF6EE] p-4 sm:p-6 border-2 border-[#C6A36A]/45 outline outline-1 outline-offset-4 outline-[#C6A36A]/20 shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-auto scrollbar-thin">
                
                {/* Brass Corner Archival Pins */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1 text-[9px] font-mono text-[#C66A3D] font-bold select-none pointer-events-none">
                  <Bookmark className="w-3.5 h-3.5 text-[#C6A36A]" />
                  <span>ORIGINAL PRESS ARCHIVE</span>
                </div>

                <div className="absolute top-2.5 right-2.5 text-[9px] font-mono text-[#003D32]/60 uppercase tracking-widest select-none pointer-events-none">
                  ROTARY PRESS SCAN
                </div>

                {/* The Newspaper Scan with Smooth Scaling */}
                <div
                  className="transition-transform duration-200 ease-out flex items-center justify-center my-auto"
                  style={{
                    transform: `scale(${zoomScale})`,
                    transformOrigin: 'top center',
                  }}
                >
                  <img
                    src={currentScanImg}
                    alt={currentScanPub.title[lang]}
                    className="max-h-[66vh] w-auto object-contain rounded-md filter contrast-[1.04] shadow-[0_15px_35px_rgba(0,0,0,0.2)] select-none"
                    draggable={false}
                  />
                </div>
              </div>
            </div>

            {/* Curator's Dossier & Transcript Sidebar (Right: 4 columns) */}
            <div className="lg:col-span-4 h-full flex flex-col justify-between overflow-y-auto p-6 sm:p-7 rounded-2xl bg-[#FFFDF9] border border-[#C6A36A]/40 shadow-2xl text-[#003D32] space-y-5">
              
              <div className="space-y-5">
                {/* Curator Seal Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#003D32]/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF6B35]" />
                    <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#C66A3D] font-bold">
                      CURATORIAL DOSSIER
                    </span>
                  </div>

                  <span className="font-mono text-xs font-semibold text-[#003D32]/60">
                    {currentScanPub.date}
                  </span>
                </div>

                {/* Title & Masthead */}
                <div>
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-[#C6A36A] font-bold block mb-1">
                    {currentScanPub.publication} · {currentScanPub.tag}
                  </span>
                  <h4 className="font-serif font-bold text-xl sm:text-2xl text-[#003D32] leading-tight">
                    {currentScanPub.title[lang]}
                  </h4>
                </div>

                {/* Memorable Lead Quote on Parchment */}
                <div className="p-4 rounded-xl bg-[#FAF6ED] border-l-4 border-[#C6A36A] shadow-inner space-y-1.5 relative">
                  <Quote className="w-5 h-5 text-[#C6A36A]/40 absolute top-2 right-2 pointer-events-none" />
                  <p className="font-serif italic text-sm sm:text-base text-[#003D32] leading-snug">
                    {currentScanPub.leadQuote[lang]}
                  </p>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#C66A3D] font-bold block">
                    — कालुवा ग़ाज़ीपुरी
                  </span>
                </div>

                {/* Curator's Critical Transcript Notes */}
                <div className="space-y-2">
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-[#003D32]/60 font-semibold block">
                    EDITORIAL TRANSCRIPT &amp; SYNOPSIS:
                  </span>
                  <p className="font-sans text-xs sm:text-[13px] text-[#003D32]/85 leading-relaxed font-light">
                    {currentScanPub.curatorNotes[lang]}
                  </p>
                </div>

                {/* Key Thematic Tags */}
                <div className="space-y-1.5 pt-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#003D32]/50 block">
                    ARCHIVAL THEMES:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentScanPub.keyThemes.map((theme, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full bg-[#FAF7F0] border border-[#C6A36A]/35 text-[10px] font-mono font-medium text-[#003D32]"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Footer Actions */}
              <div className="pt-4 border-t border-[#003D32]/10 space-y-2.5 shrink-0">
                <a
                  href={currentScanImg}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-vantara-solid w-full"
                >
                  <span>Open Full-Res Scan File</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={() => {
                    setActiveScanIndex((prev) => (prev + 1) % NEWSPAPER_PUBLICATIONS.length);
                    setZoomScale(1);
                  }}
                  className="btn-vantara w-full"
                >
                  <span>Examine Next Exhibit →</span>
                </button>
              </div>

            </div>
          </div>

          {/* Bottom Filmstrip Carousel Scrubber Bar */}
          <div
            className="w-full pt-2 border-t border-[#C6A36A]/20 flex items-center gap-3 overflow-x-auto pb-1 shrink-0 z-20 scrollbar-none"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#C6A36A] font-bold shrink-0 hidden sm:inline pl-1">
              ALL EXHIBITS:
            </span>

            {NEWSPAPER_PUBLICATIONS.map((pub, idx) => {
              const isSelected = activeScanIndex === idx;
              const thumb = publicationImageMap[pub.imageName];
              return (
                <button
                  key={pub.id}
                  onClick={() => {
                    setActiveScanIndex(idx);
                    setZoomScale(1);
                  }}
                  className={`group relative flex items-center gap-2 p-1.5 rounded-xl border transition-all duration-300 cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-[#003D32] border-[#C6A36A] shadow-[0_0_15px_rgba(198,163,106,0.4)] scale-105'
                      : 'bg-[#00221B]/80 border-white/10 hover:border-[#C6A36A]/50 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="w-9 h-11 rounded overflow-hidden bg-stone-100 shrink-0">
                    <img src={thumb} alt={pub.title[lang]} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left pr-2 hidden md:block max-w-[130px]">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#FF6B35] font-bold block">
                      EXHIBIT 0{idx + 1}
                    </span>
                    <span className="font-serif text-xs text-[#FAF7F0] truncate block">
                      {pub.title[lang]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}
