import React from 'react';
import { Mail, MapPin, Phone, ArrowUpRight, Globe, Linkedin, BookOpen } from 'lucide-react';

export default function ContactSection() {
  return (
    <footer
      id="contact"
      className="relative z-20 bg-[#002B23] text-[#FAF7F0] border-t border-[#C6A36A]/30 overflow-hidden font-sans"
    >
      {/* Background grain texture */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-30" />

      {/* Subtle radial ambient glow */}
      <div className="absolute top-0 right-1/4 w-[40vw] h-[40vw] rounded-full bg-[#004539]/30 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 sm:pt-28 pb-12">
        
        {/* Top Metadata Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-12 border-b border-[#C6A36A]/20">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#C6A36A] font-semibold">
              [ 06 — CONTACT & PROFESSIONAL ENQUIRIES ]
            </span>
            <div className="w-12 h-px bg-[#C6A36A]/50" />
          </div>

          <div className="font-mono text-[11px] tracking-[0.2em] text-[#FAF7F0]/60 uppercase">
            NEW DELHI · PAN-INDIA CORRIDORS
          </div>
        </div>

        {/* Main Editorial Invitation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-16 border-b border-[#FAF7F0]/10">
          
          {/* Left: Oversized Heading & Vision */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif font-bold text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F0] tracking-tight leading-[1.05]">
              Engage &amp;
              <span className="block mt-1 text-[#C6A36A]">Collaborate.</span>
            </h2>

            <p className="font-devanagari font-[600] text-xl sm:text-2xl text-[#FAF7F0]/90">
              संवाद, सहयोग और राष्ट्र-निर्माण की दिशा में एक साझा कदम।
            </p>

            <p className="font-sans text-sm sm:text-base text-[#FAF7F0]/75 leading-relaxed max-w-xl">
              For strategic leadership, optical infrastructure partnerships, technological advisory, or literary &amp; cultural speaking engagements with Dr. Ravi Shankar Rai.
            </p>

            {/* Quick Enquiries Card */}
            <div className="p-6 bg-[#001D17]/80 rounded-sm border border-[#C6A36A]/30 max-w-xl mt-6">
              <span className="font-mono text-[10px] tracking-[0.22em] text-[#C6A36A] uppercase font-semibold block mb-2">
                EXECUTIVE OFFICE
              </span>
              <p className="font-sans text-sm text-[#FAF7F0]/85 leading-relaxed">
                Executive enquiries are directed to the Office of the Managing Director, Savitri Telecom Services.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono">
                <a
                  href="mailto:contact@savitritelecom.com"
                  className="inline-flex items-center gap-1.5 text-[#C6A36A] hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  contact@savitritelecom.com
                </a>
                <span className="text-[#FAF7F0]/30">|</span>
                <span className="inline-flex items-center gap-1.5 text-[#FAF7F0]/75">
                  <MapPin className="w-3.5 h-3.5 text-[#C6A36A]" />
                  New Delhi, India
                </span>
              </div>
            </div>
          </div>

          {/* Right: Key Portals & Links */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            <div id="leadership" className="p-6 sm:p-8 bg-[#F1E8D9] text-[#003D32] rounded-sm border border-[#C6A36A]/40 shadow-xl scroll-mt-20">
              <span className="font-mono text-[10px] tracking-[0.24em] text-[#C6A36A] uppercase font-bold block mb-2">
                SAVITRI GROUP PORTAL
              </span>
              <h3 className="font-serif font-bold text-2xl tracking-tight text-[#003D32]">
                Savitri Telecom Services
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#003D32]/75 mt-2 leading-relaxed">
                Pioneering optical fiber test and measurement solutions, enterprise network integration, and telecommunications infrastructure since 1999.
              </p>
              
              <a
                href="https://savitritelecom.com"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center justify-between w-full px-4 py-3 bg-[#003D32] text-[#FAF7F0] rounded-xs font-mono text-xs tracking-wider uppercase hover:bg-[#00261F] transition-colors"
              >
                <span>Visit Savitri Telecom</span>
                <ArrowUpRight className="w-4 h-4 text-[#C6A36A]" />
              </a>
            </div>

            {/* Literary & Media Quick Connect */}
            <div className="grid grid-cols-2 gap-4">
              <div id="literary-world" className="p-4 bg-[#001D17]/60 border border-[#C6A36A]/20 rounded-sm scroll-mt-20">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-3.5 h-3.5 text-[#C6A36A]" />
                  <span className="font-mono text-[10px] tracking-wider uppercase text-[#C6A36A]">
                    LITERARY
                  </span>
                </div>
                <h4 className="font-sans font-bold text-sm text-[#FAF7F0]">
                  Kaluwa Ghazipuri
                </h4>
                <p className="font-sans text-[11px] text-[#FAF7F0]/65 mt-1">
                  Hindi poetry &amp; essays
                </p>
              </div>

              <div id="media-recognition" className="p-4 bg-[#001D17]/60 border border-[#C6A36A]/20 rounded-sm scroll-mt-20">
                <div className="flex items-center gap-2 mb-1">
                  <Linkedin className="w-3.5 h-3.5 text-[#C6A36A]" />
                  <span className="font-mono text-[10px] tracking-wider uppercase text-[#C6A36A]">
                    CONNECT
                  </span>
                </div>
                <h4 className="font-sans font-bold text-sm text-[#FAF7F0]">
                  Professional
                </h4>
                <p className="font-sans text-[11px] text-[#FAF7F0]/65 mt-1">
                  Executive Network
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Colophon & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#FAF7F0]/50">
          <div>
            © {new Date().getFullYear()} DR. RAVI SHANKAR RAI · ALL RIGHTS RESERVED
          </div>
          <div className="flex items-center gap-4 text-[#C6A36A]">
            <span>LEADER</span>
            <span>·</span>
            <span>THINKER</span>
            <span>·</span>
            <span>WRITER</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
