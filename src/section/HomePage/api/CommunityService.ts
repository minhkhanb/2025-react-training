import { fakeFetch } from '@/utils/fakeFetch';

export interface Community {
  communityImageLink: string;
  title: string;
  description: string;
}

const communityList: Community[] = [
  {
    communityImageLink: '/images/Community1.png',
    title: 'Membership Organisations',
    description:
      'Our membership management software provides full automation of membership renewals and payments',
  },
  {
    communityImageLink: '/images/Community2.png',
    title: 'National Associations',
    description:
      'Our membership management software provides full automation of membership renewals and payments',
  },
  {
    communityImageLink: '/images/Community3.png',
    title: 'Clubs And Groups',
    description:
      'Our membership management software provides full automation of membership renewals and payments',
  },
];

export const getListcommunities = () => {
  return fakeFetch<Community[]>(communityList);
};
