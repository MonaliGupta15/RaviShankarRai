import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowRight,
  Award,
  Search,
  ExternalLink,
  Star,
  Calendar,
  X,
  ZoomIn,
  Newspaper,
  Mic,
  Bookmark,
  Filter,
  Sparkles,
} from 'lucide-react';
import { ALL_AWARDS } from '../data/awardsData';
import { MEDIA_COVERAGES, ACCOLADES } from '../data/mediaData';

// Public discourses & speeches
const KEYNOTE_ITEMS = [
  {
    id: 'keynote-01',
    type: 'EXECUTIVE COVER FEATURE',
    title: 'India’s Most Influential Leaders 2026',
    forum: 'TradeFlock Leadership Magazine',
    year: '2026',
    desc: 'An in-depth conversation exploring 25+ years of Savitri Telecom Services, the zero-dismissal philosophy, mentoring 500+ entrepreneurs, and measuring corporate success in human lives.',
    link: 'https://savitritelecom.com/ravi-shankar-rai-a-telecom-leader-driven-by-purpose-and-people/',
  },
  {
    id: 'keynote-02',
    type: 'PUBLIC ESSAY & SATIRE',
    title: '"A New Degree" — Commentary on NEET Youth Statistics',
    forum: 'Medium Publications & National Digital Media',
    year: '2026',
    desc: 'Biting satirical analysis of credentialism and youth potential, critiquing education systems that generate degrees without translating into sustainable livelihood.',
    link: 'https://medium.com/@ravishankarrai_33718/a-new-degree-0f7c07941490',
  },
  {
    id: 'keynote-03',
    type: 'INDUSTRY KEYNOTE',
    title: 'National Optical Fiber & 5G Infrastructure Conclave',
    forum: 'Telecommunication Leaders Forum, New Delhi',
    year: '2024',
    desc: 'Keynote remarks on standardizing optical calibration procedures across nationwide high-speed telecom corridors and scaling domestic workforce skilling.',
  },
  {
    id: 'keynote-04',
    type: 'LITERARY & CULTURAL ADDRESS',
    title: 'Soil, Conscience & The Hindi Essay Tradition',
    forum: 'Purvanchal Cultural Mahotsav · Gandhi Darshan, Rajghat',
    year: '2023–2024',
    desc: 'Readings and reflections under the pen name Kaluwa Ghazipuri, exploring the moral duty of successful industrialists to remain anchored to their cultural soil.',
  },
];

export default function MediaRecognitionPage({ onNavigate }) {
  // Separate sections tab system (styled like Dr. Waiel Awwad visual gallery)
  const [activeTab, setActiveTab] = useState('awards'); // 'awards' | 'press' | 'keynotes' | 'accolades'
  const [selectedYear, setSelectedYear] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxItem, setLightboxItem] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Keyboard shortcut to close lightbox modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Unique years for awards filter
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(ALL_AWARDS.map((a) => a.year))).filter(Boolean);
    return years.sort((a, b) => parseInt(b) - parseInt(a));
  }, []);

  // Filtered awards based on search & year
  const filteredAwards = useMemo(() => {
    return ALL_AWARDS.filter((award) => {
      const matchesYear = selectedYear === 'all' || award.year === selectedYear;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesYear;

      const inTitle = award.title?.toLowerCase().includes(q);
      const inBy = award.awardBy?.toLowerCase().includes(q);
      const inDesc = award.description?.toLowerCase().includes(q);
      const inYear = award.year?.includes(q);
      const inCat = award.category?.toLowerCase().includes(q);

      return matchesYear && (inTitle || inBy || inDesc || inYear || inCat);
    });
  }, [selectedYear, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#003D32] pt-28 pb-24 px-5 sm:px-8 lg:px-14 selection:bg-[#C6A36A] selection:text-[#FAF7F0] font-sans">
      <div className="max-w-[1400px] mx-auto space-y-10 sm:space-y-12">

        {/* =================================================================== */}
        {/* 1. CLEAN EDITORIAL HEADER (MATCHING DR. WAIEL AWWAD ARCHIVE STYLE)  */}
        {/* =================================================================== */}
        <div className="border-b border-[#C6A36A]/25 pb-8">
          <span className="font-mono text-xs tracking-[0.28em] uppercase text-[#C6A36A] mb-3 block font-bold">
            ARCHIVE // PUBLIC RECORD &amp; CITATIONS
          </span>
          <h1 className="font-serif font-normal text-[clamp(38px,6vw,84px)] leading-[0.95] tracking-[-0.02em] uppercase text-[#003D32]">
            Media &amp; Recognition
          </h1>
          <p className="max-w-[62ch] text-[#003D32]/75 text-[15px] lg:text-[16px] leading-[1.75] mt-4 font-light">
            A curated documentary archive capturing two and a half decades of conferred industry honors,
            executive cover stories, national press coverage, and cultural recognitions celebrating Dr. Ravi Shankar Rai.
          </p>
        </div>

        {/* =================================================================== */}
        {/* 2. DEDICATED SECTION SELECTORS (LIKE WAIEL AWWAD VISUAL GALLERY)    */}
        {/* Each tab is a self-contained, clean section without stacked headers */}
        {/* =================================================================== */}
        <div className="flex flex-wrap items-center justify-start gap-3 sm:gap-4 border-b border-[#003D32]/10 pb-6">
          <button
            type="button"
            onClick={() => setActiveTab('awards')}
            className={`font-mono text-xs tracking-[0.16em] uppercase px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer flex items-center gap-2 ${
              activeTab === 'awards'
                ? 'bg-[#003D32] text-[#FAF7F0] shadow-sm font-semibold'
                : 'bg-white/80 text-[#003D32]/70 hover:bg-white hover:text-[#003D32] border border-[#C6A36A]/30'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-[#C6A36A]" />
            <span>Industry Awards ({ALL_AWARDS.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('press')}
            className={`font-mono text-xs tracking-[0.16em] uppercase px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer flex items-center gap-2 ${
              activeTab === 'press'
                ? 'bg-[#003D32] text-[#FAF7F0] shadow-sm font-semibold'
                : 'bg-white/80 text-[#003D32]/70 hover:bg-white hover:text-[#003D32] border border-[#C6A36A]/30'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5 text-[#C6A36A]" />
            <span>Press &amp; Articles ({MEDIA_COVERAGES.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('keynotes')}
            className={`font-mono text-xs tracking-[0.16em] uppercase px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer flex items-center gap-2 ${
              activeTab === 'keynotes'
                ? 'bg-[#003D32] text-[#FAF7F0] shadow-sm font-semibold'
                : 'bg-white/80 text-[#003D32]/70 hover:bg-white hover:text-[#003D32] border border-[#C6A36A]/30'
            }`}
          >
            <Mic className="w-3.5 h-3.5 text-[#C6A36A]" />
            <span>Keynotes &amp; Essays ({KEYNOTE_ITEMS.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('accolades')}
            className={`font-mono text-xs tracking-[0.16em] uppercase px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer flex items-center gap-2 ${
              activeTab === 'accolades'
                ? 'bg-[#003D32] text-[#FAF7F0] shadow-sm font-semibold'
                : 'bg-white/80 text-[#003D32]/70 hover:bg-white hover:text-[#003D32] border border-[#C6A36A]/30'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-[#C6A36A]" />
            <span>Partner Accolades ({ACCOLADES.length})</span>
          </button>
        </div>

        {/* =================================================================== */}
        {/* 3. SECTION A: THE 39 VERIFIED AWARDS GALLERY                        */}
        {/* =================================================================== */}
        {activeTab === 'awards' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Filter Sub-bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/70 p-3 sm:p-4 rounded-2xl border border-[#C6A36A]/25">
              {/* Year Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                <span className="font-mono text-[10px] tracking-wider uppercase text-[#C6A36A] font-bold mr-1 flex items-center gap-1 shrink-0">
                  <Filter className="w-3 h-3" />
                  ERA:
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedYear('all')}
                  className={`px-3 py-1 rounded-full font-mono text-[11px] uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
                    selectedYear === 'all'
                      ? 'bg-[#003D32] text-[#FAF7F0] font-bold shadow-xs'
                      : 'bg-white text-[#003D32]/70 hover:text-[#003D32] border border-[#C6A36A]/20'
                  }`}
                >
                  All ({ALL_AWARDS.length})
                </button>
                {availableYears.map((yr) => {
                  const count = ALL_AWARDS.filter((a) => a.year === yr).length;
                  return (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setSelectedYear(yr)}
                      className={`px-3 py-1 rounded-full font-mono text-[11px] uppercase tracking-wider shrink-0 transition-all cursor-pointer ${
                        selectedYear === yr
                          ? 'bg-[#003D32] text-[#FAF7F0] font-bold shadow-xs'
                          : 'bg-white text-[#003D32]/70 hover:text-[#003D32] border border-[#C6A36A]/20'
                      }`}
                    >
                      {yr} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Quick Search */}
              <div className="relative w-full sm:w-72 shrink-0">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#C6A36A]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search partner or award..."
                  className="w-full pl-9 pr-4 py-1.5 rounded-full bg-white border border-[#C6A36A]/35 text-xs font-sans text-[#003D32] placeholder:text-[#003D32]/45 focus:outline-hidden focus:border-[#003D32]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#003D32]/50 hover:text-[#003D32]"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Awards Grid (Waiel Awwad Style Card Structure) */}
            {filteredAwards.length === 0 ? (
              <div className="p-16 text-center bg-white rounded-2xl border border-[#C6A36A]/20 space-y-2">
                <Award className="w-8 h-8 mx-auto text-[#C6A36A]" />
                <p className="font-serif text-2xl text-[#003D32]">No awards match your criteria.</p>
                <p className="font-sans text-xs text-[#003D32]/60">Try searching another keyword or resetting the year.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredAwards.map((award) => (
                  <div
                    key={award.id}
                    onClick={() => setLightboxItem(award)}
                    className="group bg-white rounded-[20px] p-5 border border-black/[0.06] shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(0,61,50,0.12)] hover:border-[#C6A36A]/60 flex flex-col justify-between text-left cursor-pointer"
                  >
                    <div>
                      {/* Photo Container with subtle zoom */}
                      <div className="relative aspect-video w-full overflow-hidden rounded-[14px] bg-[#FAF7F0] border border-black/[0.05] mb-4">
                        {award.resolvedImage ? (
                          <img
                            src={award.resolvedImage}
                            alt={award.title}
                            className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500 filter contrast-[1.02]"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#C6A36A]">
                            <Award className="w-8 h-8 opacity-40" />
                          </div>
                        )}
                        <div className="absolute top-2.5 left-2.5">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#003D32]/90 backdrop-blur-xs text-[#FAF7F0] font-mono text-[9px] uppercase tracking-wider font-bold">
                            {award.year || 'CITATION'}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-[#003D32] font-mono text-[10px] uppercase tracking-wider font-bold shadow-md">
                            <ZoomIn className="w-3.5 h-3.5" />
                            <span>Inspect Trophy</span>
                          </span>
                        </div>
                      </div>

                      {/* Awarding Body Tag */}
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#C6A36A] font-bold block mb-1">
                        {award.awardBy}
                      </span>

                      {/* Title */}
                      <h3 className="font-serif font-bold text-lg text-[#003D32] leading-snug group-hover:text-[#8C6D37] transition-colors line-clamp-2">
                        {award.title}
                      </h3>

                      {award.description && (
                        <p className="font-sans text-xs text-[#003D32]/70 leading-relaxed line-clamp-2 mt-2 font-light">
                          {award.description}
                        </p>
                      )}
                    </div>

                    {/* Bottom Action Rule */}
                    <div className="pt-3 mt-4 border-t border-[#003D32]/10 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#003D32]/80 group-hover:text-[#003D32] font-semibold">
                      <span>VERIFIED CITATION</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =================================================================== */}
        {/* 4. SECTION B: PRESS & MEDIA ARTICLES (NO DUPLICATES)                */}
        {/* =================================================================== */}
        {activeTab === 'press' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {MEDIA_COVERAGES.map((item) => (
                <div
                  key={item.id}
                  onClick={() =>
                    setLightboxItem({
                      title: item.title,
                      year: item.year,
                      awardBy: item.publisher,
                      resolvedImage: item.resolvedImage,
                      description: `${item.headline} — ${item.description}`,
                    })
                  }
                  className="group bg-white rounded-[20px] p-5 border border-black/[0.06] shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(0,61,50,0.12)] hover:border-[#C6A36A]/60 flex flex-col justify-between text-left cursor-pointer"
                >
                  <div>
                    {/* Media Image Frame */}
                    <div className="relative aspect-video w-full overflow-hidden rounded-[14px] bg-[#FAF7F0] border border-black/[0.05] mb-4">
                      {item.resolvedImage ? (
                        <img
                          src={item.resolvedImage}
                          alt={item.title}
                          className="w-full h-full object-cover object-top group-hover:scale-106 transition-transform duration-500 filter contrast-[1.02]"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#C6A36A]">
                          <Newspaper className="w-8 h-8 opacity-40" />
                        </div>
                      )}
                      <div className="absolute top-2.5 left-2.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#003D32]/90 backdrop-blur-xs text-[#FAF7F0] font-mono text-[9px] uppercase tracking-wider font-bold">
                          {item.year}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-[#003D32] font-mono text-[10px] uppercase tracking-wider font-bold shadow-md">
                          <ZoomIn className="w-3.5 h-3.5" />
                          <span>View Press Clipping</span>
                        </span>
                      </div>
                    </div>

                    {/* Category & Publisher */}
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider mb-1">
                      <span className="text-[#FF6B35] font-bold">{item.category}</span>
                      <span className="text-[#C6A36A] font-semibold">{item.publisher}</span>
                    </div>

                    <h3 className="font-serif font-bold text-lg text-[#003D32] leading-snug group-hover:text-[#8C6D37] transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="font-sans text-xs text-[#003D32]/70 leading-relaxed line-clamp-3 mt-2 font-light">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-4 border-t border-[#003D32]/10 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#003D32]/80 group-hover:text-[#003D32] font-semibold">
                    <span>{item.link ? 'READ PUBLICATION' : 'VIEW DOCUMENT'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* 5. SECTION C: KEYNOTES & PUBLIC ESSAYS                              */}
        {/* =================================================================== */}
        {activeTab === 'keynotes' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {KEYNOTE_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-[20px] p-6 sm:p-7 border border-black/[0.06] shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(0,61,50,0.1)] transition-all duration-300 flex flex-col justify-between space-y-4 text-left"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF6B35] uppercase font-bold">
                        {item.type}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-[#003D32]/60">
                        <Calendar className="w-3.5 h-3.5 text-[#C6A36A]" />
                        <span>{item.year}</span>
                      </div>
                    </div>

                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#003D32] leading-snug">
                      {item.title}
                    </h3>

                    <p className="font-mono text-xs text-[#C6A36A] font-semibold">
                      {item.forum}
                    </p>

                    <p className="font-sans text-xs sm:text-[13.5px] text-[#003D32]/75 leading-relaxed pt-2 border-t border-[#003D32]/5 font-light">
                      {item.desc}
                    </p>
                  </div>

                  {item.link ? (
                    <div className="pt-2 border-t border-[#003D32]/10">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[#003D32] hover:text-[#C6A36A] font-bold transition-colors"
                      >
                        <span>Read Full Text</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-[#003D32]/10 font-mono text-[10.5px] uppercase tracking-wider text-[#003D32]/50">
                      <span>Delivered in New Delhi</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* 6. SECTION D: PARTNER ACCOLADES & EXHIBIT PLAQUES (NO DUPLICATES)   */}
        {/* =================================================================== */}
        {activeTab === 'accolades' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ACCOLADES.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() =>
                    setLightboxItem({
                      title: item.title,
                      year: item.year,
                      awardBy: item.subtitle,
                      resolvedImage: item.resolvedImage,
                      description: item.description,
                    })
                  }
                  className="group bg-white rounded-[20px] p-5 border border-black/[0.06] shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(0,61,50,0.12)] transition-all duration-300 flex flex-col justify-between text-left cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-[#FAF7F0] border border-[#003D32]/10">
                      {item.resolvedImage ? (
                        <img
                          src={item.resolvedImage}
                          alt={item.title}
                          className="w-full h-full object-contain p-2 group-hover:scale-106 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#C6A36A]">
                          <Award className="w-8 h-8 opacity-40" />
                        </div>
                      )}
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#FF6B35] font-bold block">
                      {item.category}
                    </span>
                    <h4 className="font-serif font-bold text-base text-[#003D32] leading-snug group-hover:text-[#8C6D37] transition-colors">
                      {item.title}
                    </h4>
                    <p className="font-sans text-[11.5px] text-[#003D32]/70 leading-relaxed font-light line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#003D32]/10 flex items-center justify-between text-[#003D32] font-mono text-[9.5px] uppercase tracking-wider font-bold">
                    <span>VIEW PLAQUE</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ===================================================================== */}
      {/* 8. HIGH-DEFINITION LIGHTBOX MODAL                                     */}
      {/* ===================================================================== */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-in fade-in duration-200"
          onClick={() => setLightboxItem(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#001D17] text-[#FAF7F0] border border-[#C6A36A]/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 text-[#FAF7F0] hover:text-[#C6A36A] hover:bg-black/90 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left: High-Res Image View */}
            <div className="w-full md:w-1/2 bg-black flex items-center justify-center p-4 sm:p-6 overflow-hidden">
              {lightboxItem.resolvedImage ? (
                <img
                  src={lightboxItem.resolvedImage}
                  alt={lightboxItem.title}
                  className="max-h-[60vh] md:max-h-[75vh] w-auto max-w-full object-contain filter contrast-[1.02]"
                />
              ) : (
                <div className="p-12 text-[#C6A36A]/50">
                  <Award className="w-16 h-16 mx-auto" />
                </div>
              )}
            </div>

            {/* Right: Detailed Archival Meta */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-4 text-left overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#C6A36A]/20 border border-[#C6A36A]/40 text-[#C6A36A] font-mono text-[10px] uppercase tracking-wider font-bold">
                    {lightboxItem.year || 'VERIFIED HONOUR'}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#FAF7F0]/60">
                    ARCHIVAL CITATION
                  </span>
                </div>

                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#FAF7F0] leading-snug">
                  {lightboxItem.title}
                </h3>

                <p className="font-mono text-xs text-[#C6A36A] font-semibold border-b border-white/10 pb-3">
                  CONFERRED BY: {lightboxItem.awardBy || 'Industry Citation'}
                </p>

                {lightboxItem.description && (
                  <p className="font-sans text-xs sm:text-sm text-[#FAF7F0]/80 leading-relaxed font-light">
                    {lightboxItem.description}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] tracking-wider uppercase text-[#FAF7F0]/50">
                <span>SAVITRI TELECOM HERITAGE</span>
                <span>NEW DELHI HQ</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
