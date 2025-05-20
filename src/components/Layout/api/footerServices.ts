import { fakeFetch } from '@/utils/fakeFetch';

export interface SocialIcons {
  link: string;
  title: string;
  Icon: string;
}

export interface RedirectLink {
  link: string;
  title: string;
}

const listSocial: SocialIcons[] = [
  { link: 'https://www.facebook.com/nhat3173', title: 'Instagram', Icon: 'InstagramOutlined' },
  {
    link: 'https://github.com/nhattlm3173/HDW-TRAINING-NEXTJS',
    title: 'Dribbble',
    Icon: 'DribbbleOutlined',
  },
  { link: 'https://www.facebook.com/nhat3173', title: 'Twitter', Icon: 'TwitterOutlined' },
  { link: 'https://www.facebook.com/nhat3173', title: 'Youtube', Icon: 'YoutubeFilled' },
];

const listCompanyLinks: RedirectLink[] = [
  { link: '/', title: 'About us' },
  { link: '/blog', title: 'Blog' },
  { link: '/docs', title: 'Contact us' },
  { link: '/showcase', title: 'Pricing' },
  { link: '/todo-list', title: 'Testimonials' },
];

const listSupportLinks: RedirectLink[] = [
  { link: '/', title: 'Help center' },
  { link: '/blog', title: 'Terms of service' },
  { link: '/docs', title: 'Legal' },
  { link: '/showcase', title: 'Privacy policy' },
  { link: '/todo-list', title: 'Status' },
];

export const getListSocialIcons = () => {
  return fakeFetch<SocialIcons[]>(listSocial);
};

export const getListCompanyLinks = () => {
  return fakeFetch<RedirectLink[]>(listCompanyLinks);
};

export const getListSupportLinks = () => {
  return fakeFetch<RedirectLink[]>(listSupportLinks);
};
