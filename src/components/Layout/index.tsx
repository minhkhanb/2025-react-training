import { memo, ReactNode, Suspense } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import Loading from '../Loading';
import { getHeaderContent } from './api/headerServices';
import { getListCompanyLinks, getListSocialIcons, getListSupportLinks } from './api/footerServices';

export const Layout = memo(function Layout({ children }: { children: ReactNode }) {
  const headerContents = getHeaderContent();
  const SocialIcons = getListSocialIcons();
  const CompanyLinks = getListCompanyLinks();
  const SupportLinks = getListSupportLinks();

  return (
    <div>
      <Suspense fallback={<Loading className="h-10" />}>
        <Header headerContents={headerContents} />
      </Suspense>

      {children}

      <Suspense fallback={<Loading className="h-10" />}>
        <Footer SocialIcons={SocialIcons} CompanyLinks={CompanyLinks} SupportLinks={SupportLinks} />
      </Suspense>
    </div>
  );
});
