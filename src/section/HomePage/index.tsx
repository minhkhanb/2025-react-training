'use client';

import React from 'react';
import HeroSection from './components/HeroSection';
import PricingSection from './components/PricingSection';
import StartupPlan from './components/StartupPlan';
import ClientSection from './components/ClientSection';
import CommunitySection from './components/CommunitySection';
import UnlockSection from './components/UnlockSection';
import Achievements from './components/AchievementsSection';

export default function HomePage() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <HeroSection />

      <ClientSection />

      <CommunitySection />

      <UnlockSection />

      <Achievements />

      <PricingSection />

      <StartupPlan />
    </div>
  );
}
