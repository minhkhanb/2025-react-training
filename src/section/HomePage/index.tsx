import React, { Suspense } from 'react';
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
import { getListClientIcons } from './api/ClientService';
import { getListcommunities } from './api/CommunityService';
import Loading from '@/components/Loading';
import { getListAchievements } from './api/AchievementService';
import { getListCustomers } from './api/CustomerService';
import { getListCommunitiesUpdate } from './api/CommunityUpdateService';

export default function HomePage() {
  const listClientIcons = getListClientIcons();
  const listcommunities = getListcommunities();
  const listAchievements = getListAchievements();
  const listCustomers = getListCustomers();
  const listCommunitiesUpdate = getListCommunitiesUpdate();

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <HeroSection />

      <Suspense fallback={<Loading className="h-80" />}>
        <ClientSection listClientIcons={listClientIcons} />
      </Suspense>

      <Suspense fallback={<Loading className="h-80" />}>
        <CommunitySection listcommunities={listcommunities} />
      </Suspense>

      <UnlockSection />

      <Suspense fallback={<Loading className="h-80" />}>
        <Achievements listAchievements={listAchievements} />
      </Suspense>

      <CalenderSection />

      <Suspense fallback={<Loading className="h-80" />}>
        <CustomerSection listCustomers={listCustomers} />
      </Suspense>

      <Suspense fallback={<Loading className="h-80" />}>
        <CommunityUpdateSection listCommunitiesUpdate={listCommunitiesUpdate} />
      </Suspense>

      <GetDemoSection />

      {/* <PricingSection />

      <StartupPlan /> */}
    </div>
  );
}
