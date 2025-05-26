import ReactQueryProvider from '@src/components/providers/ReactQuery';
import configureApp from '@src/config';

interface Props {
  children: React.ReactNode;
}

configureApp().then(() => {});

const Providers = ({ children }: Props) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
};

export default Providers;
