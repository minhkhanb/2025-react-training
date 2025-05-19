import Achievement1 from './Achievements1';
import Achievement2 from './Achievements2';
import Achievement3 from './Achievements3';
import Achievement4 from './Achievements4';

export const iconAchievementRegistry = {
  Achievement1,
  Achievement2,
  Achievement3,
  Achievement4,
};

export type IconAchievementName = keyof typeof iconAchievementRegistry;
