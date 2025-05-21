import Header from '@src/components/layout/Header';
import Footer from '@src/components/layout/Footer';

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className="isolate1">
      <Header />
      <main className="flex min-h-dvh flex-col pt-32">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
