import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  ShieldCheck,
  Cpu,
  Users,
  Award,
  ExternalLink,
  HeartHandshake,
  TrendingUp,
  Server,
  Zap,
  Wheat,
  Boxes,
  CheckCircle2,
  Calendar,
  Building2,
  MapPin,
  Sparkles,
  Quote,
  Briefcase,
  Layers,
  ZoomIn,
  X,
  Mic,
  Camera,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Real portraits and stage photos of Dr. Ravi Shankar Rai
import founderImg from '../assets/CEO-MD-SavitriTelecomServices.jpg.webp';
import rsrKeynote from '../assets/rsr3.png';
import rsrPanel1 from '../assets/rsr4.png';
import rsrPanel2 from '../assets/rsr5.png';
import rsrExpo1 from '../assets/Image-1.jpg';
import rsrExpo2 from '../assets/Image-2.jpg';

// Verified historical archival images from Dr. Rai's 25-year journey
import img1999 from '../assets/media/1999-1.jpg';
import img2000 from '../assets/media/2000.jpg';
import img2004 from '../assets/media/2004.jpg';
import img2005 from '../assets/media/2005.jpg';
import img2007 from '../assets/media/2007.jpg';
import img2009 from '../assets/media/2009.jpg';
import img2010 from '../assets/media/2010.jpg';
import img2012 from '../assets/media/2012.jpg';
import img2014 from '../assets/media/2014.jpg';
import img2015 from '../assets/media/2015.jpg';
import img2017 from '../assets/media/2017.jpg';
import img2019 from '../assets/media/2019.jpg';
import img2021 from '../assets/media/2021.jpg';
import img2022 from '../assets/media/2022.jpg';
import img2024 from '../assets/media/STS-ET-Business-Leaders-Award-2024.jpg';

// Verified Award & Partner Honors from the 25-Year Archive
import award2015 from '../assets/media/16-STS-Company-Award-for-Best-Practices-and-Employment-Generation-2015-Award-by-Honorable-Governor-of-Goa-Dr-Mridula-Sinha.jpg';
import awardViavi from '../assets/media/12-STS-APAC-BU-Award-In-Recognition-Of-Outstanding-Fiber-Optic-Business-–-Award-by-Viavi.jpg';
import awardET2022 from '../assets/media/1-STS-Best-Telecom-Technology-Solution-Providers-Inspiring-Leaders-Award-North-2022-Award-by-Economic-Times-1.jpg';
import awardJDSU from '../assets/media/17-STS-JDSU-Business-Unit-Award-FY14-In-Recognition-of-Outstanding-Fiber-Optic-Business-Award-by-JDSU.jpg';
import bestMdfImg from '../assets/media/BestMDF.png';
import convergence2017Img from '../assets/media/convergence2017.png';
import viavi2024Stage from '../assets/media/2024.jpg';

// Literary Quill Calligraphy
import quillPureImg from '../assets/quill-pure.png';

// Interactive Principle Card with 3D Tilt, Specular Light Reflection & Photo Reveal
function InteractivePrincipleCard({ val, onInspect }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const IconComponent = val.icon;

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5.5;
    const rotateY = ((x - centerX) / centerX) * 5.5;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1200,
      scale: 1.015,
      duration: 0.25,
      ease: 'power2.out',
    });

    if (glowRef.current) {
      glowRef.current.style.opacity = '1';
      glowRef.current.style.background = `radial-gradient(500px circle at ${x}px ${y}px, rgba(198, 163, 106, 0.18), transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power3.out',
    });
    if (glowRef.current) {
      glowRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="principle-card group relative rounded-2xl bg-white border border-[#C6A36A]/30 shadow-sm overflow-hidden flex flex-col justify-between hover:border-[#C6A36A] hover:shadow-2xl hover:shadow-[#C6A36A]/15 transition-all duration-300 transform-gpu will-change-transform"
    >
      {/* Specular golden light follower */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300"
      />

      <div className="space-y-4 p-6 sm:p-7 relative z-20">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#C6A36A]/20 pb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#C66A3D] tracking-wider">
              PRINCIPLE {val.number}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A36A] animate-pulse" />
          </div>
          <div className="w-9 h-9 rounded-full bg-[#FAF7F0] border border-[#C6A36A]/35 flex items-center justify-center text-[#003D32] group-hover:bg-[#003D32] group-hover:text-[#FAF7F0] group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xs">
            <IconComponent className="w-4 h-4 transition-colors" />
          </div>
        </div>

        <span className="font-mono text-[10px] uppercase tracking-wider text-[#C6A36A] font-bold block">
          {val.category}
        </span>

        <h3 className="font-serif font-bold text-2xl text-[#003D32] leading-snug group-hover:text-[#002B23] transition-colors">
          {val.title}
        </h3>

        {/* Photographic Evidence with Hover Reveal */}
        <div
          className="relative overflow-hidden aspect-[16/9] rounded-xl border border-[#C6A36A]/25 bg-[#F4EFE6] cursor-pointer group/img shadow-inner"
          onClick={() => onInspect(val.image, val.imageCaption)}
        >
          <img
            src={val.image}
            alt={val.title}
            className="principle-card-img w-full h-full object-cover group-hover/img:scale-108 transition-transform duration-700 ease-out filter contrast-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white font-mono text-xs gap-1.5 backdrop-blur-[1px]">
            <span className="px-3.5 py-1.5 rounded-full bg-[#003D32]/90 border border-[#C6A36A] text-[#FAF7F0] flex items-center gap-2 shadow-lg transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
              <ZoomIn className="w-3.5 h-3.5 text-[#C6A36A]" /> View Archival Evidence
            </span>
          </div>
          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/50 backdrop-blur-sm text-[10px] font-mono text-[#FAF7F0]/90 uppercase tracking-widest pointer-events-none">
            Documented Archive
          </div>
        </div>

        <p className="font-mono text-[11px] text-[#003D32]/65 tracking-wider uppercase">
          {val.imageCaption}
        </p>

        <p className="font-sans text-xs sm:text-sm text-[#003D32]/85 leading-relaxed font-light pt-1">
          {val.detail}
        </p>
      </div>

      {/* Pull Quote footer */}
      <div className="p-4 sm:p-5 bg-[#FAF7F0] border-t border-[#C6A36A]/25 border-l-4 border-l-[#C6A36A] relative z-20 group-hover:bg-[#F5F0E6] transition-colors duration-300">
        <p className="font-serif italic text-xs sm:text-sm text-[#003D32] leading-relaxed">
          {val.quote}
        </p>
      </div>
    </div>
  );
}

export default function LeadershipPage({ onNavigate }) {
  const [lightboxImage, setLightboxImage] = useState(null);

  // Animation Refs
  const pageRef = useRef(null);
  const heroCardRef = useRef(null);
  const portraitRef = useRef(null);
  const headlineRef = useRef(null);
  const narrativeRef = useRef(null);
  const quoteRef = useRef(null);
  const statsRef = useRef(null);
  const principlesRef = useRef(null);

  // Direct DOM Refs for 60fps counter animation
  const countProjectsRef = useRef(null);
  const countYearsRef = useRef(null);
  const countEntrepreneursRef = useRef(null);
  const countWorkforceRef = useRef(null);

  const headlineWords = 'A Leader Driven by Purpose and People'.split(' ');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Keyboard escape to close lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // GSAP Entrance, Typing & Counter Animations (Plays smoothly on mount)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Portrait gliding in from left
      if (portraitRef.current) {
        gsap.from(portraitRef.current, {
          x: -90,
          opacity: 0,
          scale: 0.96,
          duration: 1.1,
          ease: 'power3.out',
        });
      }

      // 2. Headline typing letter by letter, then revealing narrative, action cards, and quote
      const tl = gsap.timeline({ delay: 0.1 });

      tl.from('.hero-headline-char', {
        opacity: 0,
        y: 8,
        duration: 0.04,
        stagger: 0.025,
        ease: 'power1.out',
      })
      .from(narrativeRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.1')
      .from('.action-image-card', {
        y: 25,
        opacity: 0,
        scale: 0.92,
        duration: 0.5,
        stagger: 0.12,
        ease: 'back.out(1.4)',
      }, '-=0.25')
      .from(quoteRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.2');

      // 3. Numbers counter animation on viewport entry (triggered by ScrollTrigger)
      if (statsRef.current) {
        const counterTarget = { projects: 0, years: 0, entrepreneurs: 0, workforce: 0 };
        gsap.fromTo(
          counterTarget,
          { projects: 0, years: 0, entrepreneurs: 0, workforce: 0 },
          {
            projects: 15000,
            years: 25,
            entrepreneurs: 500,
            workforce: 1600,
            duration: 2.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              toggleActions: 'restart none none none',
            },
            onStart: () => {
              if (countProjectsRef.current) countProjectsRef.current.innerText = '0+';
              if (countYearsRef.current) countYearsRef.current.innerText = '0+ Yrs';
              if (countEntrepreneursRef.current) countEntrepreneursRef.current.innerText = '0+';
              if (countWorkforceRef.current) countWorkforceRef.current.innerText = '0+';
            },
            onUpdate: () => {
              if (countProjectsRef.current) {
                countProjectsRef.current.innerText = Math.round(counterTarget.projects).toLocaleString() + '+';
              }
              if (countYearsRef.current) {
                countYearsRef.current.innerText = Math.round(counterTarget.years) + '+ Yrs';
              }
              if (countEntrepreneursRef.current) {
                countEntrepreneursRef.current.innerText = Math.round(counterTarget.entrepreneurs).toLocaleString() + '+';
              }
              if (countWorkforceRef.current) {
                countWorkforceRef.current.innerText = Math.round(counterTarget.workforce).toLocaleString() + '+';
              }
            },
          }
        );

        // Stagger entrance of the 4 stat boxes on viewport entry
        gsap.from(statsRef.current.querySelectorAll('.stat-box'), {
          y: 20,
          opacity: 0.5,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            toggleActions: 'restart none none none',
          },
        });
      }

      // 4. Principles section cards animation on viewport entry
      if (principlesRef.current) {
        const cards = principlesRef.current.querySelectorAll('.principle-card');
        gsap.fromTo(
          cards,
          {
            y: 70,
            opacity: 0,
            scale: 0.96,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.95,
            stagger: 0.16,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: principlesRef.current,
              start: 'top 85%',
              toggleActions: 'restart none none none',
            },
          }
        );

        const imgs = principlesRef.current.querySelectorAll('.principle-card-img');
        gsap.fromTo(
          imgs,
          {
            scale: 1.15,
          },
          {
            scale: 1,
            duration: 1.3,
            stagger: 0.16,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: principlesRef.current,
              start: 'top 85%',
              toggleActions: 'restart none none none',
            },
          }
        );
      }

      // 5. Business Verticals cards animation on viewport entry
      const verticalsContainer = document.querySelector('.verticals-grid');
      if (verticalsContainer) {
        gsap.fromTo(
          verticalsContainer.querySelectorAll('.vertical-card'),
          {
            y: 50,
            opacity: 0,
            scale: 0.96,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: verticalsContainer,
              start: 'top 85%',
              toggleActions: 'restart none none none',
            },
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // 1. Photographic Evidence & Core Leadership Values
  const leadershipValues = [
    {
      id: 'val-01',
      number: '01',
      title: 'The 25-Year Zero-Dismissal Record',
      category: 'PROTECTION OF FAMILY LIVELIHOODS',
      icon: HeartHandshake,
      image: img2021,
      imageCaption: 'The 1,600+ Savitri family team together in corporate colors — protected through all cycles.',
      summary:
        'In more than 25 years of corporate operations, Savitri has never laid off an employee due to market contractions, telecom policy shifts, or economic recessions.',
      detail:
        'The Indian telecommunications sector has undergone multiple severe shocks: the 2001 dot-com fallout, the 2008 global financial crisis, the 2012 regulatory spectrum cancellations, and the 2020 pandemic lockdowns. While industry competitors carried out mass retrenchments, Dr. Rai absorbed market shocks through executive adjustments. When an employee struggled, the company retrained and repositioned them—grounded in the conviction that terminating an employee impacts an entire family household.',
      quote: '“Business decisions taken at the top ripple into family kitchens. When storms arrive, leadership must absorb the blow.”',
    },
    {
      id: 'val-02',
      number: '02',
      title: 'Human Dignity Above Hierarchy ("Office Hosts")',
      category: 'EQUALITY IN WORKPLACE CULTURE',
      icon: Users,
      image: img2015,
      imageCaption: '2015: Honored for Outstanding Employment Generation by Honorable Governor of Goa Dr. Mridula Sinha.',
      summary:
        'Abolishing dismissive corporate labels, support and facility staff at Savitri are respectfully titled "Office Hosts" and treated as equal partners in company progress.',
      detail:
        'Dr. Rai noticed early in his career how traditional corporate offices relegated support, housekeeping, and pantry personnel to the margins. At Savitri, he mandated the designation "Office Host." Office Hosts share the same cafeteria spaces, attend milestone celebrations, and are accorded the same human courtesy as chief engineers and directors. True leadership is measured by how a company treats the person who serves the morning tea.',
      quote: '“There is no small work in building a nation. Every technician and host carries equal dignity under our roof.”',
    },
    {
      id: 'val-03',
      number: '03',
      title: 'Mentoring 500+ Independent Entrepreneurs',
      category: 'DISTRIBUTED ECONOMIC EMPOWERMENT',
      icon: TrendingUp,
      image: img2007,
      imageCaption: 'Field engineering crew with fiber equipment — trained and incubated into independent contracting firms.',
      summary:
        'Rather than hoarding every subcontract internally, Dr. Rai helped more than 500 field engineers, supervisors, and technicians launch their own independent businesses.',
      detail:
        'Beginning in 1999, Dr. Rai made it an annual personal commitment to guide and seed at least ten promising technicians and regional partners. Savitri assisted them with initial business registration, provided calibrated test gear on flexible credit terms, and awarded their first commercial work orders. Today, these 500+ independent enterprises operate across Uttar Pradesh, Bihar, Delhi-NCR, Maharashtra, and other states, employing thousands more locally.',
      quote: '“Real enterprise does not monopolize opportunity. It distributes the tools of ownership so others can build their own companies.”',
    },
    {
      id: 'val-04',
      number: '04',
      title: 'Indigenous Engineering & NABL Precision',
      category: 'DOMESTIC TECHNICAL DEPTH',
      icon: Cpu,
      image: rsrExpo2,
      imageCaption: 'Dr. Rai reviewing high-precision optical test instrumentation and domestic calibration standards.',
      summary:
        'Pioneering domestic optical calibration and repair facilities in New Delhi, reducing India’s dependence on overseas labs and expediting national network rollouts.',
      detail:
        'During the initial phases of optical fiber deployment in India, damaged fusion splicers, OTDRs, and optical spectrum analyzers had to be shipped to Germany or Japan for routine servicing—causing months of costly network delays. Dr. Rai invested in high-precision, NABL-standard calibration and repair laboratories right in Delhi-NCR, providing rapid turnaround for national telecom operators and defense communication links.',
      quote: '“Self-reliance is not rhetoric; it is having the precision laboratories at home so your national network never halts.”',
    },
  ];

  // 2. Verified Savitri Group Business Verticals with Field Evidence
  const businessVerticals = [
    {
      id: 'vert-telecom',
      title: 'Optical & Telecom Test Solutions',
      entity: 'Savitri Telecom Services (STS)',
      badge: 'Seed Enterprise · Est. 1999',
      icon: Cpu,
      image: rsrExpo1,
      imageCaption: 'Dr. Rai demonstrating optical test and measurement instrumentation at an international telecom expo.',
      summary:
        'Nationwide distribution, integration, and lifecycle support of optical fiber test & measurement instrumentation, active/passive components, and 5G backhaul solutions.',
      highlights: [
        'Strategic partners: Viavi Solutions (formerly JDSU), 3M, Spirent, and Fujikura',
        'OTDRs, optical spectrum analyzers, fusion splicers, and fiber power meters',
        'Turnkey FTTH/PON, Optical Ground Wire (OPGW), and RF testing for telcos',
      ],
      link: 'https://savitritelecom.com',
      linkText: 'Visit Savitri Telecom',
    },
    {
      id: 'vert-infratel',
      title: 'Managed Fiber Services & Infratel',
      entity: 'Savitri Telecom Infratel Ltd. (STIL)',
      badge: 'Turnkey Execution · Est. 2004',
      icon: Building2,
      image: img2022,
      imageCaption: 'STIL field teams executing high-precision underground fiber trenching and cable laying along national corridors.',
      summary:
        'Comprehensive infrastructure execution encompassing optical cable laying, trenching, HDD, and 24/7 Operations & Maintenance (O&M) across state corridors and railways.',
      highlights: [
        'Over 15,000+ completed fiber and telecom infrastructure assignments',
        'Pan-India presence with regional service stations in major states',
        'Long-haul optical backbone maintenance for public and private telcos',
      ],
      link: 'https://savitri.group/business/',
      linkText: 'Explore STIL Operations',
    },
    {
      id: 'vert-calibration',
      title: 'Manufacturing & NABL Calibration Labs',
      entity: 'Precision Engineering Division',
      badge: 'National Testing Standards',
      icon: ShieldCheck,
      image: img2000,
      imageCaption: 'Optical test and measurement systems calibrated under rigorous NABL standards at Delhi-NCR labs.',
      summary:
        'State-of-the-art domestic manufacturing of optical assemblies and certified NABL-standard laboratories for precision calibration and instrument servicing.',
      highlights: [
        'Certified calibration for field OTDRs, power meters, and spectral testers',
        'Drastically reduces turnaround time compared to sending instruments overseas',
        'In-house fabrication of optical patch cords, pigtails, and distribution boxes',
      ],
      link: 'https://savitritelecom.com',
      linkText: 'View Calibration Capabilities',
    },
    {
      id: 'vert-cloud',
      title: 'Enterprise Cloud, IT & Cybersecurity',
      entity: 'Advanced Technology Division',
      badge: 'Digital Defense & Systems',
      icon: Server,
      image: rsrPanel1,
      imageCaption: 'Dr. Rai deliberating on critical communications infrastructure, cyber defense, and national data networks.',
      summary:
        'Holistic enterprise digital architecture: Software-Defined Networking (SDN), secure private cloud deployments, vulnerability testing, and defense-grade communications.',
      highlights: [
        'Network vulnerability assessments and digital perimeter hardening',
        'Data center infrastructure management and software-defined switching',
        'Secure communication links for enterprise and government agencies',
      ],
      link: 'https://savitri.group/business/',
      linkText: 'Explore IT Infrastructure',
    },
    {
      id: 'vert-storage',
      title: 'Industrial Storage & Logistics Handling',
      entity: 'Commercial Storage Solutions',
      badge: 'Supply Chain Infrastructure',
      icon: Boxes,
      image: img2004,
      imageCaption: 'Engineered material handling and mobile infrastructure supporting rapid enterprise deployment.',
      summary:
        'Engineered heavy-duty racking, industrial warehousing storage, and automated material handling systems supporting high-volume commercial logistics hubs.',
      highlights: [
        'Customized industrial pallet racking, mezzanine systems, and cantilever racks',
        'High-density storage engineering for third-party logistics (3PL) and retail hubs',
        'Designed for rigorous structural safety and material efficiency',
      ],
      link: 'https://savitri.group/business/',
      linkText: 'Explore Storage Solutions',
    },
    {
      id: 'vert-agro',
      title: 'Agro-Industries & Modern Rice Milling',
      entity: 'Savitri Ashirvaad Agro',
      badge: 'Rural Agrarian Empowerment',
      icon: Wheat,
      image: img2005,
      imageCaption: 'Deeply anchored in rural regional empowerment, bridging technology with India’s agricultural heartlands.',
      summary:
        'Deeply anchored in regional farming communities; high-capacity modern paddy processing, parboiled rice milling, and food grain supply under trusted consumer labels.',
      highlights: [
        'State-of-the-art automated paddy cleaning, parboiling, and milling facilities',
        'Direct procurement supporting local agricultural households in eastern India',
        'Produces trusted household staples including the Savitri Ashirvaad label',
      ],
      link: 'https://savitri.group/business/',
      linkText: 'Explore Agro Division',
    },
  ];


  return (
    <div ref={pageRef} className="min-h-screen bg-[#FAF7F0] text-[#003D32] pt-28 pb-24 px-5 sm:px-8 lg:px-14 selection:bg-[#C6A36A] selection:text-[#FAF7F0] font-sans">
      <div className="max-w-[1400px] mx-auto space-y-16 sm:space-y-20">

        {/* =================================================================== */}
        {/* 1. EDITORIAL HEADER                                                 */}
        {/* =================================================================== */}
        <div id="leadership-folio" className="border-b border-[#C6A36A]/25 pb-8">
          <span className="font-mono text-xs tracking-[0.28em] uppercase text-[#C6A36A] mb-3 block font-bold">
            STEWARDSHIP &amp; ENTERPRISE // SAVITRI GROUP
          </span>
          <h1 className="font-serif font-normal text-[clamp(38px,6vw,84px)] leading-[0.95] tracking-[-0.02em] uppercase text-[#003D32]">
            Leadership &amp; Governance
          </h1>
          <p className="max-w-[70ch] text-[#003D32]/75 text-[15px] lg:text-[17px] leading-[1.75] mt-4 font-light">
            Dr. Ravi Shankar Rai’s twenty-five-year stewardship of Savitri Group — building critical optical
            telecom infrastructure across India, anchored by human dignity, ground-level mentorship, and an
            unbroken zero-retrenchment record.
          </p>
        </div>

        {/* =================================================================== */}
        {/* 1.5 THE QUILL STATEMENT: DR. RAI'S PHILOSOPHICAL LEADERSHIP CREED   */}
        {/* =================================================================== */}
        <div className="relative rounded-2xl bg-[#F7F2E7]/80 border border-[#C6A36A]/40 p-6 sm:p-8 lg:p-10 shadow-sm overflow-hidden">
          {/* Subtle archival watermark / grain */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#C6A36A]/10 to-transparent pointer-events-none rounded-full blur-2xl" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
            <div className="space-y-3.5 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#C66A3D] animate-pulse" />
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#C66A3D] font-bold">
                  THE FOUNDER’S MORAL COVENANT // TRADEFLOCK EDITORIAL CREED
                </span>
              </div>
              <blockquote className="space-y-2.5">
                <p className="font-serif italic text-xl sm:text-2xl lg:text-[27px] text-[#003D32] leading-[1.32] tracking-tight">
                  “What value do skills hold if they never translate into livelihood? An enterprise is measured in lives elevated, not ledgers. Every business decision carries a human cost that extends far beyond the boardroom.”
                </p>
                <footer className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2 font-mono text-[11px] sm:text-xs text-[#003D32]/70 uppercase tracking-wider">
                  <span className="font-bold text-[#003D32]">— DR. RAVI SHANKAR RAI</span>
                  <span className="w-1 h-1 rounded-full bg-[#C6A36A]" />
                  <span className="text-[#C6A36A]">FOUNDER &amp; MD, SAVITRI GROUP</span>
                  <span className="w-1 h-1 rounded-full bg-[#C6A36A]" />
                  <span className="font-devanagari tracking-normal text-xs text-[#C66A3D] font-medium">
                    कालुवा ग़ाज़ीपुरी
                  </span>
                </footer>
              </blockquote>
            </div>

            {/* Visual Calligraphic Quill Badge */}
            <div className="flex flex-row lg:flex-col items-center justify-center p-4 sm:p-5 rounded-xl bg-white/70 border border-[#C6A36A]/30 shadow-sm min-w-[210px] text-center gap-3 lg:gap-2">
              <img
                src={quillPureImg}
                alt="Literary Quill"
                className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow"
              />
              <div className="text-left lg:text-center">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-[#C66A3D] font-bold block">
                  PENCILLED WITH PURPOSE
                </span>
                <span className="font-serif italic text-xs text-[#003D32]/80 block mt-0.5">
                  25 Years · Zero Dismissals
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 2. GRAND EXECUTIVE SHOWCASE: DR. RAI IN ACTION (HERO SPREAD)        */}
        {/* =================================================================== */}
        <div
          ref={heroCardRef}
          className="p-6 sm:p-10 rounded-2xl bg-white border border-[#C6A36A]/35 shadow-sm space-y-8 overflow-hidden relative"
        >
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Primary Portrait with Gold Frame (Glides in smoothly from left) */}
            <div ref={portraitRef} className="lg:col-span-5 space-y-3 will-change-transform">
              <div
                className="relative overflow-hidden aspect-[4/5] rounded-xl border-2 border-[#C6A36A]/40 bg-[#F4EFE6] shadow-md group cursor-pointer"
                onClick={() => setLightboxImage({ src: founderImg, caption: 'Dr. Ravi Shankar Rai · Founder & Managing Director, Savitri Group' })}
              >
                <img
                  src={founderImg}
                  alt="Dr. Ravi Shankar Rai"
                  className="w-full h-full object-cover object-top filter contrast-[1.03] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003D32]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <span className="font-mono text-xs text-[#FAF7F0] flex items-center gap-2">
                    <ZoomIn className="w-4 h-4 text-[#C6A36A]" /> Click to Inspect High-Res
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between font-mono text-[11px] text-[#003D32]/70 tracking-wider uppercase pt-1">
                <span className="font-semibold text-[#003D32]">DR. RAVI SHANKAR RAI</span>
                <span className="text-[#C6A36A]">FOUNDER &amp; MD · EST. 1999</span>
              </div>
            </div>

            {/* Narrative & Stage Action Photos */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#C6A36A] font-bold block mb-2">
                  EXECUTIVE PROFILE &amp; INDUSTRIAL ETHIC
                </span>
                
                {/* Headline typing letter-by-letter */}
                <h2
                  ref={headlineRef}
                  className="font-serif font-bold text-3xl sm:text-4xl text-[#003D32] tracking-tight leading-tight flex flex-wrap gap-x-2 sm:gap-x-2.5"
                >
                  {headlineWords.map((word, wIdx) => (
                    <span key={wIdx} className="inline-block whitespace-nowrap">
                      {word.split('').map((char, cIdx) => (
                        <span
                          key={cIdx}
                          className="hero-headline-char inline-block will-change-transform"
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                  ))}
                </h2>
              </div>

              {/* Narrative reveals smoothly once headline finishes */}
              <p
                ref={narrativeRef}
                className="font-sans text-sm sm:text-base text-[#003D32]/85 leading-relaxed font-light will-change-transform"
              >
                When Dr. Ravi Shankar Rai established Savitri Telecom Services in 1999 from a modest office at Bhikaji Cama Place in New Delhi,
                optical fiber was just emerging in India. Rather than acting as a conventional trading entity, Dr. Rai built hands-on technical
                depth: domestic calibration laboratories, international technology partnerships with Viavi Solutions, 3M, and Spirent, and a nationwide
                skilling engine that turned thousands of rural youths into certified optical engineers.
              </p>

              {/* Action Photos Row: Keynote & Conference Panels (Zoom on Hover & Stagger Entrance) */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div
                  className="action-image-card space-y-1.5 cursor-pointer group will-change-transform"
                  onClick={() => setLightboxImage({ src: rsrKeynote, caption: 'Dr. Ravi Shankar Rai delivering the keynote address on optical telecom self-reliance.' })}
                >
                  <div className="relative overflow-hidden aspect-[4/3] rounded-lg border border-[#C6A36A]/30 group-hover:border-[#C6A36A] group-hover:shadow-lg bg-[#F4EFE6] shadow-sm transition-all duration-300">
                    <img
                      src={rsrKeynote}
                      alt="Keynote Address"
                      className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div className="absolute top-1.5 right-1.5 p-1 rounded bg-black/40 group-hover:bg-[#003D32] text-[#FAF7F0] transition-colors duration-300">
                      <Mic className="w-3 h-3 text-[#C6A36A]" />
                    </div>
                  </div>
                  <span className="font-mono text-[10px] uppercase text-[#003D32]/75 group-hover:text-[#003D32] tracking-wider block font-medium transition-colors">
                    Keynote Address
                  </span>
                </div>

                <div
                  className="action-image-card space-y-1.5 cursor-pointer group will-change-transform"
                  onClick={() => setLightboxImage({ src: rsrPanel2, caption: 'Dr. Rai deliberating on national ICT infrastructure on the executive panel.' })}
                >
                  <div className="relative overflow-hidden aspect-[4/3] rounded-lg border border-[#C6A36A]/30 group-hover:border-[#C6A36A] group-hover:shadow-lg bg-[#F4EFE6] shadow-sm transition-all duration-300">
                    <img
                      src={rsrPanel2}
                      alt="Executive Panel"
                      className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div className="absolute top-1.5 right-1.5 p-1 rounded bg-black/40 group-hover:bg-[#003D32] text-[#FAF7F0] transition-colors duration-300">
                      <Users className="w-3 h-3 text-[#C6A36A]" />
                    </div>
                  </div>
                  <span className="font-mono text-[10px] uppercase text-[#003D32]/75 group-hover:text-[#003D32] tracking-wider block font-medium transition-colors">
                    Industry Panel
                  </span>
                </div>

                <div
                  className="action-image-card space-y-1.5 cursor-pointer group will-change-transform"
                  onClick={() => setLightboxImage({ src: rsrExpo1, caption: 'Dr. Rai on the exhibition floor demonstrating optical measurement instrumentation.' })}
                >
                  <div className="relative overflow-hidden aspect-[4/3] rounded-lg border border-[#C6A36A]/30 group-hover:border-[#C6A36A] group-hover:shadow-lg bg-[#F4EFE6] shadow-sm transition-all duration-300">
                    <img
                      src={rsrExpo1}
                      alt="Technology Demonstration"
                      className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div className="absolute top-1.5 right-1.5 p-1 rounded bg-black/40 group-hover:bg-[#003D32] text-[#FAF7F0] transition-colors duration-300">
                      <Cpu className="w-3 h-3 text-[#C6A36A]" />
                    </div>
                  </div>
                  <span className="font-mono text-[10px] uppercase text-[#003D32]/75 group-hover:text-[#003D32] tracking-wider block font-medium transition-colors">
                    Tech Showcase
                  </span>
                </div>
              </div>

              {/* Quote Card (Reveals smoothly) */}
              <div
                ref={quoteRef}
                className="p-5 rounded-xl bg-[#FAF7F0] border-l-4 border-[#C6A36A] space-y-2 will-change-transform"
              >
                <p className="font-serif italic text-base sm:text-lg text-[#003D32] leading-snug">
                  &ldquo;Our ambition has never been to be the loudest or largest company in the room; it has always been to grow with responsibility and purpose.
                  An enterprise endures when the people who build it find security, dignity, and a future for their families.&rdquo;
                </p>
                <div className="flex items-center justify-between font-mono text-xs text-[#003D32]/70 uppercase tracking-wider pt-1">
                  <span>— Dr. Ravi Shankar Rai</span>
                  <a
                    href="https://savitritelecom.com/ravi-shankar-rai-a-telecom-leader-driven-by-purpose-and-people/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#003D32] hover:text-[#C6A36A] font-semibold transition-colors"
                  >
                    <span>Read TradeFlock Feature</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Key Facts Strip — Sticks to the viewport while scrolling through the executive showcase */}
          <div
            ref={statsRef}
            className="sticky bottom-4 z-20 grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-5 rounded-xl bg-white/95 backdrop-blur-md border-2 border-[#C6A36A]/40 shadow-xl transition-all"
          >
            <div className="stat-box p-3 sm:p-4 rounded-lg bg-[#FAF7F0] border border-[#C6A36A]/25">
              <span
                ref={countProjectsRef}
                className="font-serif font-bold text-3xl sm:text-4xl text-[#003D32] block leading-none font-numeric"
              >
                15,000+
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#C6A36A] font-bold block mt-1.5">
                Completed Projects
              </span>
              <span className="font-sans text-xs text-[#003D32]/70 font-light block mt-0.5">
                Pan-India optical, 5G backhaul &amp; managed links
              </span>
            </div>

            <div className="stat-box p-3 sm:p-4 rounded-lg bg-[#FAF7F0] border border-[#C6A36A]/25">
              <span
                ref={countYearsRef}
                className="font-serif font-bold text-3xl sm:text-4xl text-[#C66A3D] block leading-none font-numeric"
              >
                25+ Yrs
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#C66A3D] font-bold block mt-1.5">
                Zero Dismissals
              </span>
              <span className="font-sans text-xs text-[#003D32]/70 font-light block mt-0.5">
                Never retrenched an employee during downturns
              </span>
            </div>

            <div className="stat-box p-3 sm:p-4 rounded-lg bg-[#FAF7F0] border border-[#C6A36A]/25">
              <span
                ref={countEntrepreneursRef}
                className="font-serif font-bold text-3xl sm:text-4xl text-[#003D32] block leading-none font-numeric"
              >
                500+
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#C6A36A] font-bold block mt-1.5">
                Seeded Entrepreneurs
              </span>
              <span className="font-sans text-xs text-[#003D32]/70 font-light block mt-0.5">
                Field technicians guided into business owners
              </span>
            </div>

            <div className="stat-box p-3 sm:p-4 rounded-lg bg-[#FAF7F0] border border-[#C6A36A]/25">
              <span
                ref={countWorkforceRef}
                className="font-serif font-bold text-3xl sm:text-4xl text-[#003D32] block leading-none font-numeric"
              >
                1,600+
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#003D32] font-bold block mt-1.5">
                Workforce Family
              </span>
              <span className="font-sans text-xs text-[#003D32]/70 font-light block mt-0.5">
                Treated with equal honor as "Office Hosts"
              </span>
            </div>
          </div>

        </div>

        {/* =================================================================== */}
        {/* 3. THE FOUR FOUNDATIONAL VALUES (WITH PHOTOGRAPHIC EVIDENCE)        */}
        {/* =================================================================== */}
        <div className="space-y-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#C6A36A] font-bold block mb-2">
              FOUNDATIONAL ETHICS &amp; GOVERNANCE
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#003D32] tracking-tight">
              Four Uncompromising Principles of Leadership
            </h2>
            <p className="font-sans text-sm text-[#003D32]/75 max-w-3xl leading-relaxed font-light mt-1">
              Every principle is backed by a documented track record across twenty-five years of corporate operations.
            </p>
          </div>

          <div ref={principlesRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leadershipValues.map((val) => (
              <InteractivePrincipleCard
                key={val.id}
                val={val}
                onInspect={(src, caption) => setLightboxImage({ src, caption })}
              />
            ))}
          </div>
        </div>

        {/* =================================================================== */}
        {/* 4. THE SIX BUSINESS VERTICALS OF SAVITRI GROUP                      */}
        {/* =================================================================== */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#C6A36A] font-bold block mb-2">
                CORPORATE ECOSYSTEM &amp; INFRASTRUCTURE
              </span>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#003D32] tracking-tight">
                The Six Operating Verticals of Savitri Group
              </h2>
              <p className="font-sans text-sm text-[#003D32]/75 max-w-3xl leading-relaxed font-light mt-1">
                From pioneering optical test instruments in 1999 to nationwide 5G infrastructure, domestic manufacturing, and agro-industries.
              </p>
            </div>

            <a
              href="https://savitri.group/business/"
              target="_blank"
              rel="noreferrer"
              className="btn-vantara shrink-0"
            >
              <span>Visit Savitri Group Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="verticals-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {businessVerticals.map((vert) => {
              const IconComponent = vert.icon;
              return (
                <div
                  key={vert.id}
                  className="vertical-card group rounded-2xl bg-white border border-[#C6A36A]/30 shadow-sm overflow-hidden flex flex-col justify-between hover:border-[#C6A36A] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div className="p-6 space-y-4">
                    
                    {/* Header badge & icon */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-lg bg-[#FAF7F0] border border-[#C6A36A]/30 flex items-center justify-center text-[#003D32]">
                        <IconComponent className="w-5 h-5 text-[#003D32]" />
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#C6A36A]/15 text-[#003D32] font-semibold border border-[#C6A36A]/30">
                        {vert.badge}
                      </span>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#C6A36A] font-bold block mb-1">
                        {vert.entity}
                      </span>
                      <h3 className="font-serif font-bold text-xl text-[#003D32] leading-snug">
                        {vert.title}
                      </h3>
                    </div>

                    {/* Operational Photo */}
                    <div
                      className="relative overflow-hidden aspect-[16/10] rounded-lg border border-[#C6A36A]/25 bg-[#F4EFE6] cursor-pointer group"
                      onClick={() => setLightboxImage({ src: vert.image, caption: vert.imageCaption })}
                    >
                      <img
                        src={vert.image}
                        alt={vert.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-[1.02]"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white font-mono text-[11px] gap-1">
                        <ZoomIn className="w-3.5 h-3.5 text-[#C6A36A]" /> View Field Photo
                      </div>
                    </div>
                    <p className="font-mono text-[10px] text-[#003D32]/65 tracking-wider uppercase">
                      {vert.imageCaption}
                    </p>

                    <p className="font-sans text-xs text-[#003D32]/80 leading-relaxed font-light">
                      {vert.summary}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 pt-2 border-t border-[#C6A36A]/20">
                      {vert.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[#003D32]/85 font-light">
                          <CheckCircle2 className="w-3 h-3 text-[#C6A36A] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-[#FAF7F0] border-t border-[#C6A36A]/20">
                    <a
                      href={vert.link}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-vantara w-full"
                    >
                      <span>{vert.linkText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =================================================================== */}
        {/* 5. CLOSING PHILOSOPHY & COVENANT RIBBON (LIGHT & PRESTIGIOUS)        */}
        {/* =================================================================== */}
        <div className="p-8 sm:p-12 rounded-2xl bg-white border-2 border-[#C6A36A]/40 shadow-md space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C66A3D]" />
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#C6A36A] font-bold">
              THE ENDURING COVENANT
            </span>
          </div>

          <blockquote className="font-serif italic text-2xl sm:text-3xl text-[#003D32] leading-snug max-w-4xl">
            &ldquo;उद्यम से राष्ट्र निर्माण, कौशल से आत्मसम्मान — A company’s true worth is not reflected in its valuation,
            but in the stability it provides to its households and the independent leaders it brings into being.&rdquo;
          </blockquote>

          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#C6A36A]/20">
            <div className="space-y-0.5">
              <span className="font-mono text-xs text-[#003D32] font-bold block uppercase tracking-wider">
                Dr. Ravi Shankar Rai
              </span>
              <span className="font-sans text-xs text-[#003D32]/70 font-light block">
                Chairman &amp; Managing Director · Savitri Group of Companies
              </span>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://savitritelecom.com"
                target="_blank"
                rel="noreferrer"
                className="btn-vantara"
              >
                <span>Savitri Telecom</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://savitri.group/business/"
                target="_blank"
                rel="noreferrer"
                className="btn-vantara"
              >
                <span>Group Business</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* =================================================================== */}
      {/* 7. HIGH-RESOLUTION ARCHIVAL LIGHTBOX MODAL                          */}
      {/* =================================================================== */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl p-4 sm:p-6 shadow-2xl border border-[#C6A36A]/40 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#FAF7F0] text-[#003D32] hover:bg-[#C6A36A] hover:text-[#FAF7F0] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] overflow-hidden rounded-xl border border-[#C6A36A]/30 bg-[#F4EFE6] flex items-center justify-center">
              <img
                src={lightboxImage.src}
                alt="Enlarged Archival Photo"
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <p className="font-mono text-xs sm:text-sm text-[#003D32]/85 text-center px-4 tracking-wide">
              {lightboxImage.caption}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
