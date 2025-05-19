import { fakeFetch } from '@/utils/fakeFetch';

export interface Achievement {
  achievementImageLink: string;
  total: string;
  title: string;
}

const AchievementsList: Achievement[] = [
  { achievementImageLink: '/images/achieve-icon1.png', total: '2,245,341', title: 'Members' },
  { achievementImageLink: '/images/achieve-icon2.png', total: '46,328', title: 'Clubs' },
  { achievementImageLink: '/images/achieve-icon3.png', total: '828,867', title: 'Event Bookings' },
  { achievementImageLink: '/images/achieve-icon4.png', total: '1,926,436', title: 'Payments' },
];

export const getListAchievements = () => {
  return fakeFetch<Achievement[]>(AchievementsList);
};
