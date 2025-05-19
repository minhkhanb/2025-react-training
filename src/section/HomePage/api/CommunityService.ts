import { fakeFetch } from '@/utils/fakeFetch';
import { IconCommunityName } from '../icons/CommunityIcon/iconRegistry';

export interface Community {
  Icon: IconCommunityName;
  title: string;
  description: string;
}

const communityList: Community[] = [
  {
    Icon: 'Community1',
    title: 'Membership Organisations',
    description:
      'Our membership management software provides full automation of membership renewals and payments',
  },
  {
    Icon: 'Community2',
    title: 'National Associations',
    description:
      'Our membership management software provides full automation of membership renewals and payments',
  },
  {
    Icon: 'Community3',
    title: 'Clubs And Groups',
    description:
      'Our membership management software provides full automation of membership renewals and payments',
  },
];

export const getListcommunities = () => {
  return fakeFetch<Community[]>(communityList);
};
