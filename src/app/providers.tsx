import ReactQueryProvider from '@src/components/providers/ReactQuery';

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
};

export default Providers;
