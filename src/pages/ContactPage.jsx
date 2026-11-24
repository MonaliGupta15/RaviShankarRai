import React, { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  Send,
  CheckCircle2,
  Globe,
  Building2,
  BookOpen,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Languages,
} from 'lucide-react';
import portraitCutout from '../assets/portrait-cutout.png';
import ceoPortrait from '../assets/CEO-MD-SavitriTelecomServices.jpg.webp';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// CONTACT & EXECUTIVE ENGAGEMENT PAGE — DR. RAVI SHANKAR RAI
// Sourced from:
// 1. Authentic PHP Project (RaviShankarRai-8):
//    - ravishankarrai@gmail.com
//    - Newsletter subscription system
//    - Official links to RaviShankarRai.com & Savitri Group
// 2. Savitri Telecom Services (savitritelecom.com):
//    - Corporate HQ: 203/205 Ansal Chamber-II, Bhikaji Cama Place, New Delhi 110066
//    - Board Lines: +91-11-26103358, +91-11-26700500, +91-9212605204
//    - Inquiries: reachus@savitritelecom.com, cmd@savitritelecom.com
// 3. Dr. Waiel Awwad Project (Dr_Waiel_Awwad_FE):
//    - Minimal luxury layout, country code selector, masked GSAP headline reveal,
//      staggered form fields, and sticky executive directory cards.
// ============================================================================

const COUNTRY_CODES = [
  { code: '+91', iso: 'IN', name: 'India' },
  { code: '+1', iso: 'US', name: 'United States' },
  { code: '+44', iso: 'GB', name: 'United Kingdom' },
  { code: '+971', iso: 'AE', name: 'UAE' },
  { code: '+65', iso: 'SG', name: 'Singapore' },
  { code: '+61', iso: 'AU', name: 'Australia' },
  { code: '+49', iso: 'DE', name: 'Germany' },
  { code: '+33', iso: 'FR', name: 'France' },
  { code: '+81', iso: 'JP', name: 'Japan' },
  { code: '+966', iso: 'SA', name: 'Saudi Arabia' },
  { code: '+974', iso: 'QA', name: 'Qatar' },
  { code: '+965', iso: 'KW', name: 'Kuwait' },
];

const ENGAGEMENT_DOMAINS = [
  'Executive & Strategic Telecom Advisory (Office of CMD)',
  'Savitri Optical Test & Measurement Infrastructure',
  'Keynote Address & Industrial Speaking Engagements',
  'Literary Dialogues & Kavi Sammelans (Kaluwa Ghazipuri)',
  'Workforce Skilling & CSR Alliances',
  'Press, Media & Publication Interviews',
  'Personal Correspondence',
];

const LANGUAGES = [
  'Hindi',
  'English',
  'Bilingual (Hindi & English)',
  'Bhojpuri / Regional Dialects',
];

export default function ContactPage({ onNavigate }) {
  const rootRef = useRef(null);
  const headingRef = useRef(null);
  const introRef = useRef(null);
  const formRef = useRef(null);
  const imageCardRef = useRef(null);
  const directoryRef = useRef(null);

  // Main Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+91',
    phone: '',
    domain: 'Executive & Strategic Telecom Advisory (Office of CMD)',
    topic: '',
    date: '',
    language: 'Hindi',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  // Newsletter State (from PHP project)
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Masked Headline Reveal
      const headingLines = headingRef.current?.querySelectorAll('.reveal-line-inner');
      if (headingLines && headingLines.length > 0) {
        gsap.fromTo(
          headingLines,
          { yPercent: 110 },
          { yPercent: 0, duration: 1.05, ease: 'power3.out', stagger: 0.1 }
        );
      }

      // 2. Intro Text Fade Up
      if (introRef.current) {
        gsap.fromTo(
          introRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', delay: 0.25 }
        );
      }

      // 3. Stagger Form Fields
      const fields = formRef.current?.querySelectorAll('.contact-field');
      if (fields && fields.length > 0) {
        gsap.fromTo(
          fields,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.06,
            ease: 'power2.out',
            delay: 0.35,
          }
        );
      }

      // 4. Portrait Card Scale-in & Scroll Parallax
      if (imageCardRef.current) {
        gsap.fromTo(
          imageCardRef.current,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out', delay: 0.3 }
        );

        gsap.to(imageCardRef.current, {
          yPercent: -4,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // 5. Directory Info Cards
      if (directoryRef.current) {
        gsap.fromTo(
          directoryRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out', delay: 0.45 }
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterSuccess(false);
      setNewsletterEmail('');
    }, 4500);
  };

  const fieldWrap =
    'contact-field flex flex-col border-b border-[#003D32]/15 pb-2.5 focus-within:border-[#C6A36A] transition-colors duration-300';
  const labelClass = 'font-mono text-[10px] uppercase tracking-[0.22em] text-[#003D32]/65 mb-2 font-semibold';
  const inputClass =
    'bg-transparent border-none outline-none font-sans text-sm sm:text-base text-[#003D32] placeholder-[#003D32]/35 w-full';

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-[#FBF8F1] text-[#003D32] pt-28 sm:pt-32 pb-24 px-6 sm:px-10 lg:px-16 selection:bg-[#C6A36A] selection:text-[#FBF8F1] font-sans relative overflow-hidden"
    >
      {/* Archival Paper Grain */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-20" />

      {/* Atmospheric Soft Light Radiance (Vantara Warm Sand Glow) */}
      <div
        className="absolute top-10 left-1/4 w-[50vw] h-[450px] pointer-events-none blur-[160px] opacity-35"
        style={{
          background:
            'radial-gradient(circle at 40% 40%, rgba(229, 214, 195, 0.8) 0%, rgba(198, 163, 106, 0.25) 60%, transparent 80%)',
        }}
      />

      <div className="relative z-10 max-w-[1480px] mx-auto space-y-16 sm:space-y-20">
        
        {/* =================================================================== */}
        {/* 0. TOP ARCHIVAL FOLIO HEADER                                        */}
        {/* =================================================================== */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#C6A36A]/30">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#C6A36A] font-bold">
              [ CHAPTER V · DIALOGUE &amp; STEWARDSHIP ]
            </span>
            <div className="w-8 h-px bg-[#C6A36A]/50" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#003D32]/60 hidden sm:inline font-semibold">
              DR. RAVI SHANKAR RAI · SAVITRI GROUP
            </span>
          </div>
          <div className="font-mono text-[10px] sm:text-xs tracking-widest text-[#003D32]/60 uppercase">
            NEW DELHI · 28.5672° N, 77.1892° E
          </div>
        </div>

        {/* =================================================================== */}
        {/* 1. HERO BANNER: MASKED GSAP HEADLINE & LEAD PHILOSOPHY              */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8 space-y-4">
            <h1
              ref={headingRef}
              className="font-playfair font-bold text-4xl sm:text-6xl lg:text-[4.5rem] text-[#003D32] tracking-tight leading-[1.04] uppercase overflow-hidden"
            >
              <span className="block overflow-hidden">
                <span className="reveal-line-inner block">Engage &amp;</span>
              </span>
              <span className="block overflow-hidden">
                <span className="reveal-line-inner block text-[#C6A36A] font-serif font-normal italic lowercase">
                  collaborate.
                </span>
              </span>
            </h1>
          </div>

          <div ref={introRef} className="lg:col-span-4 lg:pb-2 space-y-3 opacity-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C6A36A] animate-pulse" />
              <p className="font-devanagari font-bold text-lg sm:text-xl text-[#003D32] leading-snug">
                संवाद, सहयोग और राष्ट्र-निर्माण की दिशा में एक साझा कदम।
              </p>
            </div>
            <p className="font-sans text-xs sm:text-[13.5px] text-[#003D32]/75 leading-relaxed font-light">
              For executive alliances, nationwide telecommunication test infrastructure, keynote invitations, or literary consultations with Dr. Ravi Shankar Rai.
            </p>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 2. MAIN COMPOSITION: INTERACTIVE DISPATCH FORM VS DIRECTORY CARDS   */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ================================================================= */}
          {/* LEFT: COMPREHENSIVE INTERACTIVE DISPATCH FORM (Dr. Waiel Awwad)  */}
          {/* ================================================================= */}
          <div className="lg:col-span-7 bg-[#FAF7F1] rounded-2xl p-8 sm:p-12 border border-[#C6A36A]/35 shadow-[0_16px_45px_rgba(0,61,50,0.06)] space-y-8">
            <div className="space-y-2 border-b border-[#003D32]/10 pb-5">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C6A36A] font-bold block">
                COMMUNICATION DISPATCH
              </span>
              <h3 className="font-playfair font-bold text-2xl sm:text-3xl text-[#003D32] tracking-tight">
                Direct Professional Enquiry
              </h3>
              <p className="font-sans text-xs text-[#003D32]/70 font-light">
                Please complete the details below. All enquiries are reviewed directly by the Office of the CMD coordination secretariat.
              </p>
            </div>

            {submitted ? (
              <div className="py-14 px-6 text-center space-y-5 rounded-xl bg-[#E5D6C3]/40 border border-[#C6A36A]/40">
                <div className="w-14 h-14 rounded-full bg-[#003D32] text-[#C6A36A] flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-playfair font-bold text-2xl text-[#003D32]">
                    Dispatch Transmitted Successfully
                  </h4>
                  <p className="font-sans text-sm text-[#003D32]/80 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-[#003D32]">{formData.firstName} {formData.lastName}</span>. Your enquiry regarding <span className="font-medium text-[#003D32]">{formData.domain}</span> has been logged and routed to the executive office.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      firstName: '',
                      lastName: '',
                      email: '',
                      countryCode: '+91',
                      phone: '',
                      domain: 'Executive & Strategic Telecom Advisory (Office of CMD)',
                      topic: '',
                      date: '',
                      language: 'Hindi',
                      message: '',
                    });
                  }}
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#C6A36A] hover:text-[#003D32] font-bold underline pt-2 cursor-pointer transition-colors"
                >
                  <span>Transmit another dispatch</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-7">
                
                {/* 1. Name: First & Last Name Split */}
                <div className="space-y-3">
                  <span className={labelClass + ' block'}>Full Name</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className={fieldWrap}>
                      <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#003D32]/50 mb-1">
                        First Name <span className="text-[#C6A36A]">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="e.g. Narendra"
                        className={inputClass}
                      />
                    </div>

                    <div className={fieldWrap}>
                      <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#003D32]/50 mb-1">
                        Last Name <span className="text-[#C6A36A]">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="e.g. Verma"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Email & Phone with Country Code Select */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className={fieldWrap}>
                    <label className={labelClass}>
                      Email Address <span className="text-[#C6A36A]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@organization.com"
                      className={inputClass}
                    />
                  </div>

                  <div className={fieldWrap}>
                    <label className={labelClass}>
                      Phone Number <span className="text-[#C6A36A]">*</span>
                    </label>
                    <div className="flex items-center w-full gap-2">
                      <div className="relative shrink-0 flex items-center">
                        <select
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleChange}
                          className="bg-transparent border-none outline-none font-mono text-xs text-[#003D32] cursor-pointer appearance-none pr-4 py-0.5 font-bold"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={`${c.code}-${c.iso}`} value={c.code} className="text-[#003D32] bg-[#FAF7F1]">
                              {c.iso} ({c.code})
                            </option>
                          ))}
                        </select>
                        <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[8px] text-[#003D32]/40">
                          ▼
                        </span>
                      </div>

                      <div className="w-px h-5 bg-[#003D32]/20 mx-1 shrink-0" />

                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="00000 00000"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Enquiry Domain / Category */}
                <div className={fieldWrap}>
                  <label className={labelClass}>
                    Engagement Domain / Purpose <span className="text-[#C6A36A]">*</span>
                  </label>
                  <select
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                    className={inputClass + ' appearance-none cursor-pointer font-medium py-1'}
                  >
                    {ENGAGEMENT_DOMAINS.map((cat) => (
                      <option key={cat} value={cat} className="text-[#003D32] bg-[#FAF7F1]">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 4. Proposed Topic or Theme */}
                <div className={fieldWrap}>
                  <label className={labelClass}>
                    Proposed Topic, Project or Agenda <span className="text-[#C6A36A]">*</span>
                  </label>
                  <input
                    type="text"
                    name="topic"
                    required
                    value={formData.topic}
                    onChange={handleChange}
                    placeholder="e.g. Nationwide Optical Fiber Network Testing Alliance / Keynote Symposium"
                    className={inputClass}
                  />
                </div>

                {/* 5. Anticipated Date & Language Required */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className={fieldWrap}>
                    <label className={labelClass}>
                      Anticipated Date / Timeline
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div className={fieldWrap}>
                    <label className={labelClass}>
                      Preferred Language <span className="text-[#C6A36A]">*</span>
                    </label>
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      className={inputClass + ' appearance-none cursor-pointer font-medium py-1'}
                    >
                      {LANGUAGES.map((lang) => (
                        <option key={lang} value={lang} className="text-[#003D32] bg-[#FAF7F1]">
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 6. Message / Detailed Synopsis */}
                <div className={fieldWrap}>
                  <label className={labelClass}>
                    Message / Detailed Synopsis <span className="text-[#C6A36A]">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please outline the context of your engagement, organizational background, and any specific timelines..."
                    className={inputClass + ' resize-none'}
                  />
                </div>

                {/* Submit Action with Signature Vantara Emerald Lift */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="contact-field btn-vantara-solid w-full py-4 px-8 text-xs tracking-[0.24em]"
                  >
                    <span>TRANSMIT DISPATCH</span>
                    <ArrowRight className="w-4 h-4 vantara-arrow" />
                  </button>
                </div>

              </form>
            )}

          </div>

          {/* ================================================================= */}
          {/* RIGHT: PORTRAIT, SAVITRI HEADQUARTERS & DIRECTORY CARDS           */}
          {/* ================================================================= */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* 1. Archival Framed Portrait */}
            <div
              ref={imageCardRef}
              className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden border border-[#C6A36A]/35 shadow-xl bg-[#002018] group"
            >
              <img
                src={ceoPortrait}
                alt="Dr. Ravi Shankar Rai"
                className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-[0.96] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001713]/90 via-[#001713]/25 to-transparent" />
              
              <div className="absolute bottom-5 inset-x-6 flex items-end justify-between">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#C6A36A] font-bold block">
                    FOUNDER &amp; MANAGING DIRECTOR
                  </span>
                  <h4 className="font-playfair font-bold text-xl text-[#FBF8F1]">
                    Dr. Ravi Shankar Rai
                  </h4>
                  <p className="font-devanagari text-xs text-[#FAF7F0]/80">
                    सावित्री समूह · संस्थापक एवं प्रबंध निदेशक
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#C6A36A]/20 border border-[#C6A36A]/60 flex items-center justify-center text-[#C6A36A]">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* 2. Executive Office & Savitri Telecom Directory Card */}
            <div
              ref={directoryRef}
              className="p-8 sm:p-9 bg-white rounded-2xl border border-[#C6A36A]/30 shadow-lg space-y-6 text-left"
            >
              <div className="space-y-1">
                <span className="font-mono text-[10px] tracking-[0.24em] text-[#C6A36A] uppercase font-bold block">
                  REGISTERED CORPORATE HEADQUARTERS
                </span>
                <h3 className="font-playfair font-bold text-2xl text-[#003D32]">
                  Savitri Telecom Services
                </h3>
                <p className="font-sans text-xs text-[#003D32]/70 font-light">
                  Direct channels for nationwide telecommunications, optical fiber testing alliances, government advisory, and board proceedings.
                </p>
              </div>

              <div className="space-y-4 pt-2 border-t border-[#003D32]/10 font-mono text-xs">
                {/* Physical Location */}
                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-[#003D32]/5 flex items-center justify-center text-[#C6A36A] shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[#003D32]/50 block text-[9.5px] uppercase tracking-wider font-semibold">
                      Registered &amp; Corporate Office
                    </span>
                    <span className="text-[#003D32] font-sans text-xs sm:text-[13px] leading-relaxed block font-medium">
                      203 / 205, Ansal Chamber - II, 6, Bhikaji Cama Place, New Delhi – 110066, India
                    </span>
                  </div>
                </div>

                {/* Direct Phone Lines (Savitri official numbers) */}
                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-[#003D32]/5 flex items-center justify-center text-[#C6A36A] shrink-0 mt-0.5">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[#003D32]/50 block text-[9.5px] uppercase tracking-wider font-semibold">
                      Board Lines &amp; Telecommunication
                    </span>
                    <span className="text-[#003D32] font-mono text-xs sm:text-[12.5px] block font-semibold">
                      +91-11-26103358 · +91-11-26700500
                    </span>
                    <span className="text-[#003D32]/65 font-mono text-[11px] block mt-0.5">
                      Direct Executive Line: +91-9212605204
                    </span>
                  </div>
                </div>

                {/* Email Channels (from PHP project & Savitri) */}
                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-[#003D32]/5 flex items-center justify-center text-[#C6A36A] shrink-0 mt-0.5">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[#003D32]/50 block text-[9.5px] uppercase tracking-wider font-semibold">
                      Official Correspondence
                    </span>
                    <a
                      href="mailto:reachus@savitritelecom.com"
                      className="text-[#003D32] hover:text-[#C6A36A] font-semibold transition-colors block text-xs"
                    >
                      reachus@savitritelecom.com
                    </a>
                    <a
                      href="mailto:ravishankarrai@gmail.com"
                      className="text-[#003D32]/80 hover:text-[#C6A36A] transition-colors block text-xs font-mono"
                    >
                      ravishankarrai@gmail.com
                    </a>
                  </div>
                </div>

                {/* Official Web Portals */}
                <div className="pt-3 border-t border-[#003D32]/10 flex flex-col gap-2">
                  <a
                    href="https://savitritelecom.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full px-4 py-3 rounded-lg bg-[#003D32] text-[#FBF8F1] hover:bg-[#C6A36A] hover:text-[#001713] transition-colors font-mono text-xs uppercase tracking-wider font-bold"
                  >
                    <span>Visit SavitriTelecom.com</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-lg border border-[#003D32]/20 text-[#003D32] hover:border-[#C6A36A] hover:text-[#C6A36A] transition-colors font-mono text-[11px] uppercase tracking-wider font-bold"
                  >
                    <span>LinkedIn Executive Profile</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            </div>

            {/* 3. Literary Forum & Social Stewardship Card */}
            <div className="p-7 rounded-2xl bg-[#E5D6C3]/50 border border-[#C6A36A]/35 text-left space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#C6A36A]" />
                <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#C6A36A] font-bold">
                  LITERARY &amp; CULTURAL DIALOGUE
                </span>
              </div>
              <h4 className="font-playfair font-bold text-lg text-[#003D32]">
                Kaluwa Ghazipuri Literary Forum &amp; Maati Samman
              </h4>
              <p className="font-sans text-xs text-[#003D32]/75 leading-relaxed font-light">
                For invitations to literary panels, Kavi Sammelans, cultural conferences, and poetry symposiums across India.
              </p>
              <div className="pt-2 flex items-center gap-3 text-xs font-mono text-[#003D32]/60">
                <span>संस्कृति</span>
                <span>·</span>
                <span>काव्य</span>
                <span>·</span>
                <span>माटी सम्मान</span>
              </div>
            </div>

          </div>

        </div>

        {/* =================================================================== */}
        {/* 3. NEWSLETTER SECTION (Directly from PHP Project footer.php)         */}
        {/* =================================================================== */}
        <div className="rounded-3xl bg-[#00140F] text-[#FAF7F0] p-10 sm:p-14 border border-[#C6A36A]/30 shadow-2xl relative overflow-hidden text-center sm:text-left">
          {/* Subtle Ambient Glow */}
          <div
            className="absolute top-0 right-0 w-[400px] h-[300px] pointer-events-none blur-[140px] opacity-25"
            style={{
              background: 'radial-gradient(circle, rgba(198, 163, 106, 0.4) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-[#C6A36A] font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold">
                <Mail className="w-3.5 h-3.5" />
                <span>SUBSCRIBE TO THOUGHTS &amp; KEYNOTES</span>
              </div>
              <h3 className="font-playfair font-bold text-3xl sm:text-4xl text-[#FAF7F0] tracking-tight">
                Reflections in Enterprise &amp; Literature.
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#FAF7F0]/70 font-light max-w-xl">
                Receive curated executive essays, telecommunications perspectives, and philosophical poetry by Dr. Ravi Shankar Rai directly in your correspondence inbox.
              </p>
            </div>

            <div className="lg:col-span-5">
              {newsletterSuccess ? (
                <div className="p-4 rounded-xl bg-[#C6A36A]/15 border border-[#C6A36A]/40 text-[#C6A36A] font-mono text-xs text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Subscription confirmed. Welcome to the executive circle.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 px-5 py-3.5 rounded-full bg-[#FAF7F0]/10 border border-[#FAF7F0]/20 text-[#FAF7F0] placeholder-[#FAF7F0]/40 font-sans text-sm focus:outline-none focus:border-[#C6A36A] transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-7 py-3.5 rounded-full bg-[#C6A36A] text-[#00140F] hover:bg-[#FAF7F0] transition-colors font-mono text-xs uppercase tracking-wider font-bold shrink-0 cursor-pointer shadow-md"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
