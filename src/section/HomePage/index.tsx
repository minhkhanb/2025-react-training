'use client';

import React from 'react';
import HeroSection from './components/HeroSection';
// import PricingSection from './components/PricingSection';
// import StartupPlan from './components/StartupPlan';
import ClientSection from './components/ClientSection';
import CommunitySection from './components/CommunitySection';
import UnlockSection from './components/UnlockSection';
import Achievements from './components/AchievementsSection';
import CalenderSection from './components/CalenderSection';
import CustomerSection from './components/CustomerSection';
import CommunityUpdateSection from './components/CommunityUpdateSection';
import GetDemoSection from './components/GetDemoSection';

export default function HomePage() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <HeroSection />

      <ClientSection />

      <CommunitySection />

      <UnlockSection />

      <Achievements />

      <CalenderSection />

      <CustomerSection />

      <CommunityUpdateSection />

      <GetDemoSection />

      {/* <PricingSection />

      <StartupPlan /> */}
    </div>
  );
}
