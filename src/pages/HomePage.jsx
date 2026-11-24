import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import IntroductionSection from '../components/IntroductionSection';
import DualPerspectiveMonograph from '../components/DualPerspectiveMonograph';
import AchievementsHorizontalGallery from '../components/AchievementsHorizontalGallery';

export default function HomePage({ onNavigate }) {
  // Jean Rottner Scroll Transition:
  // Both Introduction and Monograph start on Ivory (#FAF7F0).
  // When the user scrolls down into the upper half of the Monograph section,
  // the canvas dramatically transitions to the authentic Midnight Emerald Green (#00140F).
  const [isThemeDark, setIsThemeDark] = useState(false);

  return (
    <>
      {/* Section 01 + 02: Pinned Hero with Center Curtain Split Reveal into Introduction */}
      <div id="home">
        <HeroSection onNavigate={onNavigate}>
          <IntroductionSection
            onNavigate={onNavigate}
            isCurtainReveal={true}
          />
        </HeroSection>
      </div>

      {/* Section 03: Dual Perspective Monograph (Brief Bookish Dual Spreads) */}
      <DualPerspectiveMonograph
        onNavigate={onNavigate}
        isThemeDark={isThemeDark}
        setIsThemeDark={setIsThemeDark}
      />

      {/* Section 04: Pinned Horizontal Scrolling Gallery: Achievements & Citations (Vantara Ivory & Sand) */}
      <AchievementsHorizontalGallery onNavigate={onNavigate} />
    </>
  );
}
