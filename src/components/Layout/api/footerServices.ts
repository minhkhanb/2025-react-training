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

const socialIcons: SocialIcons[] = [
  { link: 'https://www.facebook.com/nhat3173', title: 'Instagram', Icon: 'InstagramOutlined' },
  {
    link: 'https://github.com/nhattlm3173/HDW-TRAINING-NEXTJS',
    title: 'Dribbble',
    Icon: 'DribbbleOutlined',
  },
  { link: 'https://www.facebook.com/nhat3173', title: 'Twitter', Icon: 'TwitterOutlined' },
  { link: 'https://www.facebook.com/nhat3173', title: 'Youtube', Icon: 'YoutubeFilled' },
];

const companyLinks: RedirectLink[] = [
  { link: '/', title: 'About us' },
  { link: '/blog', title: 'Blog' },
  { link: '/docs', title: 'Contact us' },
  { link: '/showcase', title: 'Pricing' },
  { link: '/todo-list', title: 'Testimonials' },
];

const supportLinks: RedirectLink[] = [
  { link: '/', title: 'Help center' },
  { link: '/blog', title: 'Terms of service' },
  { link: '/docs', title: 'Legal' },
  { link: '/showcase', title: 'Privacy policy' },
  { link: '/todo-list', title: 'Status' },
];

/**
 * Fetches social media icons data
 */
export const getListSocialIcons = async (): Promise<SocialIcons[]> => {
  try {
    return await fakeFetch<SocialIcons[]>(socialIcons);
  } catch (err) {
    console.error('Failed to fetch social icons: ', err);
    return [];
  }
};

/**
 * Fetches company navigation links
 */
export const getListCompanyLinks = async (): Promise<RedirectLink[]> => {
  try {
    return await fakeFetch<RedirectLink[]>(companyLinks);
  } catch (err) {
    console.error('Failed to fetch company links: ', err);
    return [];
  }
};

/**
 * Fetches support navigation links
 */
export const getListSupportLinks = async (): Promise<RedirectLink[]> => {
  try {
    return await fakeFetch<RedirectLink[]>(supportLinks);
  } catch (err) {
    console.error('Failed to fetch support links: ', err);
    return [];
  }
};
