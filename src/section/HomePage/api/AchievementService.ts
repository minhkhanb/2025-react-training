import { fakeFetch } from '@/utils/fakeFetch';

export interface Achievement {
  achievementImageLink: string;
  total: string;
  title: string;
}

const AchievementsList: Achievement[] = [
  { achievementImageLink: '/images/Achievement1.png', total: '2,245,341', title: 'Members' },
  { achievementImageLink: '/images/Achievement2.png', total: '46,328', title: 'Clubs' },
  { achievementImageLink: '/images/Achievement3.png', total: '828,867', title: 'Event Bookings' },
  { achievementImageLink: '/images/Achievement4.png', total: '1,926,436', title: 'Payments' },
];

export const getListAchievements = () => {
  return fakeFetch<Achievement[]>(AchievementsList);
};
