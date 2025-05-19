import Community1 from './community1';
import Community2 from './community2';
import Community3 from './community3';

export const iconCommunityRegistry = {
  Community1,
  Community2,
  Community3,
};

export type IconCommunityName = keyof typeof iconCommunityRegistry;
