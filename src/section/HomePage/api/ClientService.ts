import { fakeFetch } from '@/utils/fakeFetch';
import { IconClientName } from '../icons/ClientIcon/iconRegistry';

const listClient: { Icon: IconClientName }[] = [
  { Icon: 'Client1' },
  { Icon: 'Client2' },
  { Icon: 'Client3' },
  { Icon: 'Client4' },
  { Icon: 'Client5' },
  { Icon: 'Client6' },
  { Icon: 'Client7' },
];

export const getListClientIcons = () => {
  return fakeFetch<{ Icon: IconClientName }[]>(listClient);
};
