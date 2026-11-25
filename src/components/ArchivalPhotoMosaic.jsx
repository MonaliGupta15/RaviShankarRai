import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  X,
  ZoomIn,
  Calendar,
  MapPin,
  Award,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// Authentic historical and archival photographs of Dr. Ravi Shankar Rai & Savitri Group
import founderPortrait from '../assets/CEO-MD-SavitriTelecomServices.jpg.webp';
import mediaCoverage from '../assets/Media-coverage-2.jpg';
import awardET2024 from '../assets/media/STS-ET-Business-Leaders-Award-2024.jpg';
import viaviAward from '../assets/media/STS-Metro-Business-Unit-Award-FY24-1.jpg';
import img1999 from '../assets/media/1999-1.jpg';
import img2000 from '../assets/media/2000.jpg';
import img2004 from '../assets/media/2004.jpg';
import img2007 from '../assets/media/2007.jpg';
import img2010 from '../assets/media/2010.jpg';
import img2012 from '../assets/media/2012.jpg';
import img2014 from '../assets/media/2014.jpg';
import img2015 from '../assets/media/2015.jpg';
import img2019 from '../assets/media/2019.jpg';
import img2020 from '../assets/media/2020.jpg';
import img2021 from '../assets/media/2021.jpg';
import uttarakhandAward from '../assets/media/Uttarakhand.jpg';
import rsrStage from '../assets/media/rsr1.png';
import rsrSpeech from '../assets/media/rsr4.png';
import bookCover from '../assets/old-book-isolated.webp';

// 4 Specific Authentic Photographs from Dr. Rai's Archives
import inspiringLeaders2022 from '../assets/media/1-STS-Best-Telecom-Technology-Solution-Providers-Inspiring-Leaders-Award-North-2022-Award-by-Economic-Times-1.jpg';
import viaviSummit2024 from '../assets/media/2024.jpg';
import bestMdf2019 from '../assets/media/BestMDF.png';
import convergence2017 from '../assets/media/convergence2017.png';

// The 5-Column Vantara Signature Mosaic Layout (12 authentic historical photographs)
const mosaicColumns = [
  // COLUMN 1 (3 images: Portrait + Founding Office + Early Workshop)
  [
    {
      id: 'col1-1',
      src: founderPortrait,
      alt: 'Dr. Ravi Shankar Rai — Executive Stewardship',
      title: 'Dr. Ravi Shankar Rai',
      category: 'LEADERSHIP',
      year: '1999 — Present',
      caption: 'Founder & Managing Director, Savitri Group. Industrial pioneer and author.',
      aspect: 'aspect-[3/4.2]',
    },
    {
      id: 'col1-2',
      src: img1999,
      alt: 'Founding Savitri Telecom in Bhikaji Cama Place',
      title: 'The Founding Era',
      category: 'HISTORICAL ARCHIVE',
      year: '1999',
      caption: 'Modest beginnings at Ansal Chamber-II in Bhikaji Cama Place, New Delhi.',
      aspect: 'aspect-[4/3.2]',
    },
    {
      id: 'col1-3',
      src: img2004,
      alt: 'Optical Fiber Splicing & Measurement Workshop',
      title: 'Field Engineering Benchmarks',
      category: 'INFRASTRUCTURE',
      year: '2004',
      caption: 'Establishing domestic optical fiber testing standards across North India.',
      aspect: 'aspect-[4/3.6]',
    },
  ],

  // COLUMN 2 (3 images: CII National Keynote Address + Make in India Pavilion + 5G Corridors)
  [
    {
      id: 'col2-1',
      src: convergence2017,
      alt: 'Dr. Rai Keynote Address at CII National Conclave',
      title: 'CII National Conclave',
      category: 'KEYNOTE DISCOURSE',
      year: '2017',
      caption: 'Dr. Rai addressing the CII Conclave on "Security & Privacy in the Digital World - A Digital India Mission".',
      aspect: 'aspect-[4/3.1]',
    },
    {
      id: 'col2-2',
      src: img2014,
      alt: 'Make in India Exhibition Pavilion at Pragati Maidan',
      title: 'Make in India Milestone',
      category: 'DOMESTIC DEPTH',
      year: '2014',
      caption: 'Savitri’s state-of-the-art optical pavilion attracting international trade delegations.',
      aspect: 'aspect-[4/3.8]',
    },
    {
      id: 'col2-3',
      src: img2021,
      alt: 'Maintaining unbroken optical infrastructure operations along national corridors',
      title: '5G Optical Corridors',
      category: 'CRITICAL INFRASTRUCTURE',
      year: '2021',
      caption: 'Frontline optical engineering teams deploying continuous fiber backhaul and testing along highway corridors.',
      aspect: 'aspect-[3/4.2]',
    },
  ],

  // COLUMN 3 (4 images: ET Inspiring Leaders + ET Business Leaders + Times Achievers + 15,000+ Projects)
  [
    {
      id: 'col3-1',
      src: inspiringLeaders2022,
      alt: 'ET Inspiring Leaders North 2022 Award Ceremony with Sonam Kapoor',
      title: 'ET Inspiring Leaders North 2022',
      category: 'CIVIC HONORS',
      year: '2022',
      caption: 'Conferred by The Economic Times, presented on stage by Sonam Kapoor honoring ethical enterprise and ICT leadership.',
      aspect: 'aspect-[16/10.8]',
    },
    {
      id: 'col3-2',
      src: awardET2024,
      alt: 'Conferred The Economic Times ICT Business Leaders Award',
      title: 'ET Business Leaders Award',
      category: 'ICT EXCELLENCE',
      year: '2024',
      caption: 'Conferred in New Delhi honoring leadership in nationwide optical network infrastructure.',
      aspect: 'aspect-[16/10]',
    },
    {
      id: 'col3-3',
      src: uttarakhandAward,
      alt: 'Times Achievers Award Uttarakhand conferred upon Dr. Ravi Shankar Rai',
      title: 'Times Achievers Award',
      category: 'STATE RECOGNITION',
      year: '2023',
      caption: 'Conferred by The Times of India recognizing innovative leadership and technological advancement in telecommunications.',
      aspect: 'aspect-[16/10.5]',
    },
    {
      id: 'col3-4',
      src: img2010,
      alt: 'Connecting 15,000+ national telecom links and railway optical networks',
      title: 'Connecting 15,000+ Projects',
      category: 'PAN-INDIA SCALE',
      year: '2010',
      caption: 'Optical highway testing and precision calibration crews powering national defense, railway, and telecom links.',
      aspect: 'aspect-[4/3.4]',
    },
  ],

  // COLUMN 4 (3 images: Best MDF Winner + Governor Award + TradeFlock Magazine)
  [
    {
      id: 'col4-1',
      src: bestMdf2019,
      alt: 'Best MDF Programme Usage Winner FY19 with Viavi delegation',
      title: 'Best MDF Programme Winner',
      category: 'PARTNER HONORS',
      year: 'FY19',
      caption: 'Presented by Viavi Solutions celebrating premier market development and optical testing adoption with delegation.',
      aspect: 'aspect-[4/3]',
    },
    {
      id: 'col4-2',
      src: img2015,
      alt: 'Honored by Governor Dr. Mridula Sinha with Best Practices Award',
      title: 'Governor’s Civic Recognition',
      category: 'STATE HONORS',
      year: '2015',
      caption: 'Conferred the Company Award for Best Practices and Employment Generation by Governor of Goa.',
      aspect: 'aspect-[4/3.3]',
    },
    {
      id: 'col4-3',
      src: mediaCoverage,
      alt: 'TradeFlock Feature: The Telecom Titan Who Measures Empire in Lives',
      title: 'The Telecom Titan Feature',
      category: 'TRADEFLOCK',
      year: '2026',
      caption: 'Featured as an industry titan anchoring business success in human capital dignity.',
      aspect: 'aspect-[3/4.2]',
    },
  ],

  // COLUMN 5 (3 images: Viavi APS Summit Stage Photo + Global Technology Delegations + National Address)
  [
    {
      id: 'col5-1',
      src: viaviSummit2024,
      alt: 'Viavi APS Partners Summit 2024 Metro Business Unit Award ceremony',
      title: 'Viavi APS Partners Summit 2024',
      category: 'GLOBAL PARTNERS',
      year: '2024',
      caption: 'Conferred the Metro Business Unit Award FY24 on stage at the Viavi APS Partners Summit 2024.',
      aspect: 'aspect-[4/3.4]',
    },
    {
      id: 'col5-2',
      src: rsrSpeech,
      alt: 'Dr. Rai with Telecom Dignitaries & Global Test Partners',
      title: 'Global Technology Delegations',
      category: 'CONCLAVES',
      year: '2022',
      caption: 'Forging international test & measurement partnerships with Viavi, 3M, and Spirent.',
      aspect: 'aspect-[3/4.6]',
    },
    {
      id: 'col5-3',
      src: rsrStage,
      alt: 'Dr. Rai Addressing National Telecom Leaders',
      title: 'National Telecom Address',
      category: 'NATIONAL SUMMIT',
      year: '2016',
      caption: 'Delivering keynote on national telecommunication self-reliance, domestic optical testing, and high-speed network corridors.',
      aspect: 'aspect-[4/3.4]',
    },
  ],
];

// Flattened list of all photos for linear sequential browsing
const allPhotos = mosaicColumns.flat();

export default function ArchivalPhotoMosaic({ onNavigate }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);

  const currentIndex = selectedPhoto
    ? allPhotos.findIndex((p) => p.id === selectedPhoto.id)
    : 0;

  const handleNextPhoto = (e) => {
    if (e) e.stopPropagation();
    if (!selectedPhoto) return;
    const currentIdx = allPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const nextIdx = (currentIdx + 1) % allPhotos.length;
    setSelectedPhoto(allPhotos[nextIdx]);
  };

  const handlePrevPhoto = (e) => {
    if (e) e.stopPropagation();
    if (!selectedPhoto) return;
    const currentIdx = allPhotos.findIndex((p) => p.id === selectedPhoto.id);
    const prevIdx = (currentIdx - 1 + allPhotos.length) % allPhotos.length;
    setSelectedPhoto(allPhotos[prevIdx]);
  };

  // Keyboard navigation when modal is open
  useEffect(() => {
    if (!selectedPhoto) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextPhoto();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevPhoto();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setSelectedPhoto(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  // Touch swipe support on mobile/tablet
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
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      if (deltaX < 0) {
        handleNextPhoto();
      } else {
        handlePrevPhoto();
      }
    }
  };

  const handleExploreAll = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('/media-recognition');
    } else {
      window.location.pathname = '/media-recognition';
    }
  };

  return (
    <section
      id="achievements-gallery"
      data-section="archival-moments-gallery"
      className="relative bg-[#FAF7F0] text-[#003D32] py-20 sm:py-28 px-4 sm:px-8 lg:px-12 selection:bg-[#C6A36A] selection:text-[#FAF7F0] overflow-hidden border-t border-[#C6A36A]/20"
    >
      {/* Archival Paper Texture Radiance */}
      <div
        className="absolute top-0 right-1/4 w-[50vw] h-[400px] pointer-events-none blur-[160px] opacity-25"
        style={{
          background:
            'radial-gradient(circle, rgba(198, 163, 106, 0.4) 0%, rgba(244, 239, 230, 0) 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1720px] mx-auto space-y-12 sm:space-y-16">
        
        {/* ================================================================= */}
        {/* SECTION HEADER: VANTARA EDITORIAL TYPOGRAPHY                      */}
        {/* ================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#C6A36A]/25">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C6A36A] font-bold">
                ARCHIVAL RETROSPECTIVE // 1999 — 2026
              </span>
              <div className="w-8 h-px bg-[#C6A36A]/50" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#003D32]/60 hidden sm:inline">
                A QUARTER-CENTURY IN FOCUS
              </span>
            </div>
            <h2 className="font-serif font-normal text-3xl sm:text-4xl lg:text-5xl text-[#003D32] tracking-tight leading-[1.08]">
              Moments of Purpose, Leadership &amp; Human Dignity.
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#003D32]/75 leading-relaxed font-light">
              From early optical test benches in Bhikaji Cama Place to nationwide infrastructure rollouts, literary milestones, and state citations.
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={handleExploreAll}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#003D32] hover:bg-[#002B23] text-[#FAF7F0] font-mono text-xs uppercase tracking-wider font-semibold transition-all group cursor-pointer shadow-md hover:shadow-lg"
            >
              <span>Explore All 39 Honors &amp; Awards</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* THE 5-COLUMN VANTARA SIGNATURE MASONRY COLLAGE                     */}
        {/* ================================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5 items-start">
          {mosaicColumns.map((col, colIdx) => (
            <div key={`col-${colIdx}`} className="flex flex-col gap-3.5 sm:gap-4 lg:gap-5">
              {col.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedPhoto(item)}
                  className={`group relative w-full ${item.aspect} rounded-2xl sm:rounded-[26px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer bg-[#001D17]/5 border border-[#C6A36A]/20`}
                >
                  {/* Photo with subtle zoom on hover */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-full object-cover filter contrast-[1.02] brightness-[0.98] group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  />

                  {/* Gentle gradient vignette overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Top-Right Category Pill (Subtle on hover) */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#FAF8F5] border border-white/20 font-semibold">
                      {item.category}
                    </span>
                  </div>

                  {/* Bottom Metadata Info Card (Reveals on hover) */}
                  <div className="absolute bottom-0 inset-x-0 p-4 text-[#FAF8F5] translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#C6A36A] font-semibold mb-1">
                      <span>{item.year}</span>
                      <span className="flex items-center gap-1 text-white/80">
                        <ZoomIn className="w-3 h-3" />
                        <span>View</span>
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-white leading-tight line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="font-sans text-[11px] text-white/75 line-clamp-2 mt-0.5 font-light">
                      {item.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>

      {/* =================================================================== */}
      {/* LIGHTBOX MODAL FOR FULL-SIZE ARCHIVE VIEW                           */}
      {/* Interactive: Next/Prev buttons, Keyboard Arrows, Touch Swipe, Live # */}
      {/* =================================================================== */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#FAF7F0] text-[#003D32] rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col md:flex-row max-h-[92vh]"
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer shadow-md"
              aria-label="Close dialog"
              title="Close (Escape)"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo View Stage with Interactive Floating Chevrons */}
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative md:w-3/5 bg-black flex items-center justify-center overflow-hidden max-h-[48vh] md:max-h-none select-none group/photo"
            >
              <img
                key={selectedPhoto.id}
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="w-full h-full object-contain max-h-[80vh] transition-all duration-300"
              />

              {/* Floating Previous Photo Button on Image */}
              <button
                type="button"
                onClick={handlePrevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-[#003D32] border border-white/25 text-white backdrop-blur-md transition-all duration-200 cursor-pointer hover:scale-110 shadow-xl group"
                aria-label="Previous photo"
                title="Previous Photo (Left Arrow)"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>

              {/* Floating Next Photo Button on Image */}
              <button
                type="button"
                onClick={handleNextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-[#003D32] border border-white/25 text-white backdrop-blur-md transition-all duration-200 cursor-pointer hover:scale-110 shadow-xl group"
                aria-label="Next photo"
                title="Next Photo (Right Arrow)"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Live Photo Index Badge on Image */}
              <div className="absolute bottom-3 left-3 z-10 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-[11px] font-mono text-white/90 font-semibold shadow-md">
                {String(currentIndex + 1).padStart(2, '0')} / {String(allPhotos.length).padStart(2, '0')}
              </div>
            </div>

            {/* Contextual Description & Controls */}
            <div className="md:w-2/5 p-5 sm:p-7 lg:p-8 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-3.5 sm:space-y-4">
                <div className="flex items-center justify-between pr-10">
                  <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-[#003D32]/10 text-[#003D32] font-bold">
                    {selectedPhoto.category}
                  </span>
                  <span className="font-mono text-xs text-[#C6A36A] font-bold">
                    {selectedPhoto.year}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#003D32] leading-snug">
                  {selectedPhoto.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#003D32]/80 leading-relaxed font-light">
                  {selectedPhoto.caption}
                </p>

                <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-[#C6A36A]/30 text-xs font-mono text-[#003D32]/70 space-y-1 shadow-xs">
                  <div className="font-semibold text-[#003D32]">Archival Reference:</div>
                  <div>Savitri Corporate Archive · Record {selectedPhoto.id}</div>
                </div>

                {/* Primary Next / Previous Navigation Suite */}
                <div className="pt-2 flex items-center justify-between gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={handlePrevPhoto}
                    className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-white hover:bg-[#FAF7F0] border border-[#003D32]/25 text-[#003D32] text-xs font-mono font-semibold transition-all cursor-pointer shadow-xs hover:shadow-sm"
                    title="Previous Photo (Left Arrow)"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>

                  <span className="font-mono text-xs font-bold text-[#C6A36A] shrink-0">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(allPhotos.length).padStart(2, '0')}
                  </span>

                  <button
                    type="button"
                    onClick={handleNextPhoto}
                    className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-[#003D32] hover:bg-[#002B23] text-[#FAF7F0] text-xs font-mono font-semibold transition-all cursor-pointer shadow-sm hover:shadow-md"
                    title="Next Photo (Right Arrow)"
                  >
                    <span>Next Photo</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Bottom Colophon and Awards Link */}
              <div className="pt-4 sm:pt-5 border-t border-[#C6A36A]/20 flex items-center justify-between mt-4">
                <span className="font-mono text-[10.5px] text-[#003D32]/50 uppercase tracking-wider truncate max-w-[140px] sm:max-w-none">
                  Dr. Ravi Shankar Rai
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPhoto(null);
                    handleExploreAll({ preventDefault: () => {} });
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#003D32] hover:text-[#C6A36A] transition-colors cursor-pointer shrink-0"
                >
                  <span>Explore Awards</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
