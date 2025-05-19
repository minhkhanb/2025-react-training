import { fakeFetch } from '@/utils/fakeFetch';

const listClient: { clientImageLink: string }[] = [
  { clientImageLink: '/images/Client1.png' },
  { clientImageLink: '/images/Client2.png' },
  { clientImageLink: '/images/Client3.png' },
  { clientImageLink: '/images/Client4.png' },
  { clientImageLink: '/images/Client5.png' },
  { clientImageLink: '/images/Client6.png' },
  { clientImageLink: '/images/Client7.png' },
];

export const getListClientIcons = () => {
  return fakeFetch<{ clientImageLink: string }[]>(listClient);
};
