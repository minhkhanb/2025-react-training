import { fakeFetch } from '@/utils/fakeFetch';

const listClient: { clientImageLink: string }[] = [
  { clientImageLink: '/images/client-icon1.png' },
  { clientImageLink: '/images/client-icon2.png' },
  { clientImageLink: '/images/client-icon3.png' },
  { clientImageLink: '/images/client-icon4.png' },
  { clientImageLink: '/images/client-icon5.png' },
  { clientImageLink: '/images/client-icon6.png' },
  { clientImageLink: '/images/client-icon7.png' },
];

export const getListClientIcons = () => {
  return fakeFetch<{ clientImageLink: string }[]>(listClient);
};
