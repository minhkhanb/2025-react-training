import { fakeFetch } from '@/utils/fakeFetch';

export interface HeaderContent {
  link: string;
  title: string;
}

const redirectLinkList: HeaderContent[] = [
  { link: '/', title: 'Home' },
  { link: '/blog', title: 'Service' },
  { link: '/docs', title: 'Feature' },
  { link: '/showcase', title: 'Product' },
  { link: '/todo-list', title: 'Testimonial' },
  { link: '/todo-list', title: 'FAQ' },
];

export const getHeaderContent = () => {
  return fakeFetch<HeaderContent[]>(redirectLinkList);
};
