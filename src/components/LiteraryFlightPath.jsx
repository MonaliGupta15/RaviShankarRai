import React, { useEffect, useRef, useState, useId } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import quillPureImg from '../assets/quill-pure.png';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// LITERARY FLIGHT PATH — BIDIRECTIONAL CALLIGRAPHIC QUILL & GOLD TRAIL
// - Forward scroll: Quill glides forward writing the Champagne Gold (#C6A36A) dotted line
// - Backward scroll: Quill smoothly traces back to the starting point, un-drawing the line
// - Pure calligraphy nib tip anchored precisely at (0, 0) directly touching the path
// - Smooth damped interpolation for a calm, aesthetic, silky-smooth feel in both directions
// - Permanent resting pose with gentle breathing float when settled at the destination
// ============================================================================

export default function LiteraryFlightPath({
  className = '',
  accentColor = '#C6A36A',       // Pure Champagne Gold
  quillColor = '#C66A3D',        // Burnt Terracotta
  textColor = '#003D32',          // Deep Emerald
  labelLeft = 'कलम से विचार तक', // "From pen to thoughts"
  labelRight = 'THE LITERARY QUILL',
  triggerSelector = null,         // If null, uses own container
  isPinnedHero = false,           // Set true when controlled by Hero master timeline
  autoAnimate = false,            // If true, glides gracefully across upon page mount
  onProgress = null,              // Callback receiving flight progress (0 to 1) on every tick
  activeLens = 'titan',           // 'titan' | 'writer'
  onToggleLens = null,            // Optional click handler to toggle lens
}) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const clipRectRef = useRef(null);
  const quillRef = useRef(null);
  const uniqueId = useId().replace(/:/g, '_');

  const [dimensions, setDimensions] = useState({ width: 1200, height: 70 });
  const [pathD, setPathD] = useState('');
  const [midPoint, setMidPoint] = useState({ x: 0, y: 0 });

  const restingHoverRef = useRef(null);
  const isHoveringRef = useRef(false);
  const flightStateRef = useRef({ p: 0 });
  const onProgressRef = useRef(onProgress);
  const onToggleLensRef = useRef(onToggleLens);

  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    onToggleLensRef.current = onToggleLens;
  }, [onToggleLens]);

  // Global Programmatic Flight Target API
  // Allows tabs and manual triggers to smoothly glide the quill anywhere along the wave
  useEffect(() => {
    window.__setLiteraryFlightTarget = (targetVal, duration = 0.85) => {
      stopRestingHover();
      const clamped = Math.max(0, Math.min(1, targetVal));
      gsap.to(flightStateRef.current, {
        p: clamped,
        duration: duration,
        ease: 'power2.out',
        overwrite: 'auto',
        onUpdate: () => {
          updateFlight(flightStateRef.current.p);
          if (onProgressRef.current) {
            onProgressRef.current(flightStateRef.current.p);
          }
        },
        onComplete: () => {
          if (flightStateRef.current.p >= 0.95) {
            startRestingHover();
          }
        },
      });
    };

    return () => {
      if (window.__setLiteraryFlightTarget) {
        delete window.__setLiteraryFlightTarget;
      }
    };
  }, []);

  // Measure container and generate smooth wave with safe end padding
  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth || window.innerWidth || 1200;
      const h = Math.min(Math.max(w * 0.038, 40), 60); // Calibrated responsive height 40px - 60px
      setDimensions({ width: w, height: h });

      const mid = h * 0.5;
      const amp = h * 0.32; // gentle amplitude
      
      // Safe padding: start at 24px, end at w - 70px so the 46px quill stays fully in view
      const startX = 24;
      const endX = Math.max(startX + 100, w - 70);
      const span = endX - startX;

      // 3 natural sinusoidal crests & troughs (graceful calligraphic wave)
      const d = `M ${startX},${mid.toFixed(1)} 
        C ${(startX + span * 0.15).toFixed(1)},${(mid - amp * 1.05).toFixed(1)} ${(startX + span * 0.28).toFixed(1)},${(mid + amp * 1.15).toFixed(1)} ${(startX + span * 0.42).toFixed(1)},${(mid - amp * 0.3).toFixed(1)}
        C ${(startX + span * 0.56).toFixed(1)},${(mid - amp * 1.25).toFixed(1)} ${(startX + span * 0.70).toFixed(1)},${(mid + amp * 1.18).toFixed(1)} ${(startX + span * 0.84).toFixed(1)},${mid.toFixed(1)}
        C ${(startX + span * 0.92).toFixed(1)},${(mid - amp * 0.95).toFixed(1)} ${(startX + span * 0.97).toFixed(1)},${(mid + amp * 0.55).toFixed(1)} ${endX.toFixed(1)},${(mid - amp * 0.15).toFixed(1)}`;

      setPathD(d);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Calculate precise midpoint along the SVG wave where the 50% transition happens
  useEffect(() => {
    const calcMid = () => {
      if (!pathRef.current) return;
      try {
        const len = pathRef.current.getTotalLength();
        if (len > 0) {
          const pt = pathRef.current.getPointAtLength(len * 0.5);
          setMidPoint({ x: pt.x, y: pt.y });
        }
      } catch (e) {}
    };
    calcMid();
    const rafId = requestAnimationFrame(calcMid);
    return () => cancelAnimationFrame(rafId);
  }, [pathD, dimensions]);

  // Update quill and clip rect along path
  const updateFlight = (progress) => {
    if (!pathRef.current || !clipRectRef.current || !quillRef.current) return;
    const path = pathRef.current;
    const totalLength = path.getTotalLength();
    if (!totalLength || totalLength <= 0) return;

    const clamped = Math.max(0, Math.min(1, progress));
    const dist = clamped * totalLength;
    const pt = path.getPointAtLength(dist);

    // Tangent angle along curve (computed along forward tangent)
    const stepAhead = Math.min(totalLength, dist + 2);
    const ptNext = path.getPointAtLength(stepAhead);
    const rawAngle = Math.atan2(ptNext.y - pt.y, ptNext.x - pt.x) * (180 / Math.PI);
    
    // Subtle calligraphic angle dampening (maintains authentic upright writing posture)
    const dampedAngle = rawAngle * 0.35;

    // Update clip rect so the dashed trail ends precisely at the nib tip
    clipRectRef.current.setAttribute('width', Math.max(0, pt.x));

    // Move & rotate quill around its exact sharp nib contact point (0, 0)
    quillRef.current.setAttribute(
      'transform',
      `translate(${pt.x}, ${pt.y}) rotate(${dampedAngle})`
    );

    // Smooth fade in once motion begins, fades out when back at 0
    quillRef.current.setAttribute('opacity', clamped <= 0.005 ? 0 : 1);
  };

  const startRestingHover = () => {
    if (isHoveringRef.current || !quillRef.current) return;
    isHoveringRef.current = true;
    restingHoverRef.current = gsap.to(quillRef.current, {
      y: '+=1.6',
      duration: 2.8,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });
  };

  const stopRestingHover = () => {
    if (restingHoverRef.current) {
      restingHoverRef.current.kill();
      restingHoverRef.current = null;
    }
    isHoveringRef.current = false;
  };

  // Bidirectional Scrub Hook for Pinned Hero Curtain Reveal
  useEffect(() => {
    if (!isPinnedHero) return;

    window.__updateCurtainFlight = (rawVal) => {
      const targetVal = Math.max(0, Math.min(1, rawVal));

      if (targetVal < 0.95) {
        stopRestingHover();
      }

      // Smooth damped interpolation to targetVal in both forward AND backward directions
      gsap.to(flightStateRef.current, {
        p: targetVal,
        duration: 0.65, // Silky smooth 0.65s dampening for calm, liquid motion
        ease: 'power1.out',
        overwrite: 'auto',
        onUpdate: () => {
          updateFlight(flightStateRef.current.p);
          if (onProgressRef.current) {
            onProgressRef.current(flightStateRef.current.p);
          }
        },
        onComplete: () => {
          if (flightStateRef.current.p >= 0.98) {
            startRestingHover();
          }
        },
      });
    };

    return () => {
      if (window.__updateCurtainFlight) {
        delete window.__updateCurtainFlight;
      }
      stopRestingHover();
    };
  }, [isPinnedHero, pathD]);

  // Standalone: either auto-animate on mount OR bidirectional ScrollTrigger
  useEffect(() => {
    if (isPinnedHero || !pathD || !containerRef.current) return;

    if (autoAnimate) {
      updateFlight(0);
      const tween = gsap.to(flightStateRef.current, {
        p: 1,
        duration: 1.6,
        delay: 0.35,
        ease: 'power2.out',
        onUpdate: () => {
          updateFlight(flightStateRef.current.p);
          if (onProgressRef.current) {
            onProgressRef.current(flightStateRef.current.p);
          }
        },
        onComplete: () => {
          startRestingHover();
        },
      });

      return () => {
        tween.kill();
        stopRestingHover();
      };
    }

    const target = triggerSelector
      ? document.querySelector(triggerSelector) || containerRef.current
      : containerRef.current;

    const st = ScrollTrigger.create({
      trigger: target,
      start: 'top 85%',
      end: 'top 28%',
      scrub: 1.2, // Smooth bidirectional scrub
      onUpdate: (self) => {
        const val = self.progress; // 0 to 1 on scroll down, 1 to 0 on scroll up!
        if (val < 0.95) stopRestingHover();

        gsap.to(flightStateRef.current, {
          p: val,
          duration: 0.5,
          ease: 'power1.out',
          overwrite: 'auto',
          onUpdate: () => {
            updateFlight(flightStateRef.current.p);
            if (onProgressRef.current) {
              onProgressRef.current(flightStateRef.current.p);
            }
          },
          onComplete: () => {
            if (flightStateRef.current.p >= 0.98) {
              startRestingHover();
            }
          },
        });
      },
    });

    return () => {
      st.kill();
      stopRestingHover();
    };
  }, [isPinnedHero, pathD, triggerSelector, autoAnimate]);

  // Interactive handler: Clicking anywhere on the flight track moves the quill
  const handleTrackClick = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0.02, Math.min(0.98, clickX / rect.width));
    const nextLens = ratio >= 0.5 ? 'writer' : 'titan';

    if (window.__setLiteraryFlightTarget) {
      window.__setLiteraryFlightTarget(ratio, 0.75);
    }
    if (onToggleLensRef.current) {
      onToggleLensRef.current(nextLens);
    }
  };

  // Interactive handler: Clicking the quill directly flips the lens perspective
  const handleQuillClick = (e) => {
    e.stopPropagation();
    const nextLens = activeLens === 'titan' ? 'writer' : 'titan';
    const targetP = nextLens === 'writer' ? 0.85 : 0.18;

    if (window.__setLiteraryFlightTarget) {
      window.__setLiteraryFlightTarget(targetP, 0.85);
    }
    if (onToggleLensRef.current) {
      onToggleLensRef.current(nextLens);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-visible select-none py-1 group/flight ${className}`}
      style={{ height: `${dimensions.height + 8}px` }}
    >
      {/* Top Editorial Monospace & Devanagari Metadata Markers */}
      <div className="absolute top-0 inset-x-6 sm:inset-x-12 flex items-center justify-between text-[9px] sm:text-[10px] tracking-[0.24em] uppercase font-mono z-10 opacity-70">
        <span className="flex items-center gap-2 font-devanagari tracking-normal text-xs" style={{ color: textColor }}>
          <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse" style={{ backgroundColor: quillColor }} />
          {labelLeft}
        </span>
        {labelRight && (
          <span className="hidden sm:inline font-mono tracking-[0.24em] text-[9.5px]" style={{ color: accentColor }}>
            {labelRight}
          </span>
        )}
      </div>

      <svg
        ref={svgRef}
        onClick={handleTrackClick}
        className="w-full h-full overflow-visible cursor-pointer"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        title="Click anywhere along the flight path to glide the quill"
      >
        <defs>
          {/* Dynamic Clipping Rect that reveals or un-reveals trail strictly at the nib tip */}
          <clipPath id={`flight_clip_${uniqueId}`}>
            <rect
              ref={clipRectRef}
              x="-20"
              y="-60"
              width="0"
              height={dimensions.height + 120}
            />
          </clipPath>

          {/* Warm Champagne Gold Glow Filter for Liquid-Gold Ink Look */}
          <filter id={`gold_glow_${uniqueId}`} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="1.2" stdDeviation="2.5" floodColor={accentColor} floodOpacity="0.45" />
          </filter>
        </defs>

        {/* 1. Ghost Reference Track (Subtle 8% Opacity Guide Line) */}
        {pathD && (
          <path
            d={pathD}
            stroke={textColor}
            strokeWidth="1.2"
            strokeDasharray="2, 6"
            strokeOpacity="0.12"
            fill="none"
          />
        )}

        {/* 2. Active Dashed Wavy Trail (Written in Pure Champagne Gold #C6A36A with Soft Glow) */}
        {pathD && (
          <path
            ref={pathRef}
            d={pathD}
            stroke={accentColor}
            strokeWidth="1.85"
            strokeDasharray="6, 8"
            strokeLinecap="round"
            fill="none"
            filter={`url(#gold_glow_${uniqueId})`}
            clipPath={`url(#flight_clip_${uniqueId})`}
          />
        )}

        {/* 3. Transition Waypoint Dot: Exact 50% Threshold Where Perspective Shifts */}
        {pathD && (
          <g
            className="cursor-pointer transition-transform hover:scale-125"
            transform={`translate(${midPoint.x || dimensions.width * 0.5}, ${midPoint.y || dimensions.height * 0.5})`}
            onClick={(e) => {
              e.stopPropagation();
              const nextLens = activeLens === 'titan' ? 'writer' : 'titan';
              const targetP = nextLens === 'writer' ? 0.85 : 0.18;
              if (window.__setLiteraryFlightTarget) window.__setLiteraryFlightTarget(targetP, 0.85);
              if (onToggleLensRef.current) onToggleLensRef.current(nextLens);
            }}
            title="50% Perspective Transition Point: Click to toggle"
          >
            {/* Ambient soft glow pulse */}
            <circle
              r="8"
              fill={activeLens === 'writer' ? '#FF6B35' : accentColor}
              opacity="0.18"
              className="animate-pulse"
            />
            {/* Concentric dashed boundary halo */}
            <circle
              r="6"
              stroke={accentColor}
              strokeWidth="0.85"
              strokeDasharray="2, 2"
              fill="none"
              opacity="0.65"
            />
            {/* Core transition waypoint dot */}
            <circle
              r="3.5"
              fill={activeLens === 'writer' ? '#FF6B35' : accentColor}
              className="transition-colors duration-400"
            />
          </g>
        )}

        {/* 4. PURE AUTHENTIC CALLIGRAPHY QUILL — EXACTLY ON THE PATH */}
        {/* The sharp metal nib tip is at (0, 0), directly touching the champagne-gold dots */}
        <g
          ref={quillRef}
          onClick={handleQuillClick}
          className="cursor-pointer will-change-transform pointer-events-auto transition-transform hover:scale-110 active:scale-95"
          opacity="0"
          title="Literary Quill: Click to toggle or scroll past 50% to switch perspective"
        >
          {/* Exact User Quill Artwork (Tightly cropped 133x117, sharp nib tip at (0, 0)) */}
          <image
            href={quillPureImg}
            x="0"
            y="-40.5"
            width="46"
            height="40.5"
            preserveAspectRatio="xMidYMid meet"
            className="select-none drop-shadow-[0_2px_10px_rgba(198,106,61,0.45)]"
          />
        </g>
      </svg>
    </div>
  );
}
