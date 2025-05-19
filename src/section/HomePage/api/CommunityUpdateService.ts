import { fakeFetch } from '@/utils/fakeFetch';

export interface CommunityUpdate {
  imageLink: string;
  caption: string;
}

const communitiesUpdateList = [
  {
    imageLink: '/images/community-update1.jpg',
    caption: 'Creating Streamlined Safeguarding Processes with OneRen',
  },
  {
    imageLink: '/images/community-update2.jpg',
    caption: 'What are your safeguarding responsibilities and how can you manage them?',
  },
  {
    imageLink: '/images/community-update3.jpg',
    caption: 'Revamping the Membership Model with Triathlon Australia',
  },
];

export const getListCommunitiesUpdate = () => {
  return fakeFetch<CommunityUpdate[]>(communitiesUpdateList);
};
