import { fakeFetch } from '@/utils/fakeFetch';
import { IconAchievementName } from '../icons/AchievementsIcon/iconRegistry';

export interface Achievement {
  icon: IconAchievementName;
  total: string;
  title: string;
}

const AchievementsList: Achievement[] = [
  { icon: 'Achievement1', total: '2,245,341', title: 'Members' },
  { icon: 'Achievement2', total: '46,328', title: 'Clubs' },
  { icon: 'Achievement3', total: '828,867', title: 'Event Bookings' },
  { icon: 'Achievement4', total: '1,926,436', title: 'Payments' },
];

export const getListAchievements = () => {
  return fakeFetch<Achievement[]>(AchievementsList);
};
