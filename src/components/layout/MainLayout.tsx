import Header from '@src/components/layout/Header';
import Footer from '@src/components/layout/Footer';
import Link from 'next/link';
import { LayoutDashboardIcon, Layers2 } from 'lucide-react';
import { cn } from '@src/utils';

interface Props {
  children: React.ReactNode;
}

interface NavItem {
  name: string;
  icon: React.FunctionComponent;
  route: string;
}

const nav: NavItem[] = [
  { name: 'Dashboard', icon: LayoutDashboardIcon, route: '/' },
  { name: 'Courses', icon: Layers2, route: '/courses' },
];

const MainLayout = ({ children }: Props) => {
  return (
    <div className="isolate1">
      <Header />
      <main
        className={cn(
          'grid min-h-dvh grid-cols-1 grid-rows-[1fr_1px_auto_1px_auto] pt-20 lg:grid-cols-[var(--container-2xs)_1.5rem_minmax(0,1fr)_1.5rem]',
          'lg:pt-20 xl:grid-cols-[var(--container-2xs)_2.5rem_minmax(0,1fr)_2.5rem]'
        )}
      >
        <div className="relative col-start-1 row-span-full row-start-1 max-lg:hidden">
          <div className="absolute inset-0">
            <div className="sticky top-14.25 bottom-0 left-0 h-full max-h-[calc(100dvh-(var(--spacing)*14.25))] w-2xs overflow-y-auto p-6">
              <nav className="flex flex-col gap-8">
                <div>
                  <h3 className="font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase sm:text-xs/6 dark:text-gray-400">
                    Dashboard
                  </h3>
                  <ul>
                    {nav.map(({ name, icon: Icon, route }, index) => (
                      <li key={index} className="flex flex-col items-start gap-2">
                        <Link
                          href={route}
                          className={cn(
                            'group inline-flex pl-5 items-center gap-3 text-base/8 text-gray-600 sm:text-sm/7 dark:text-gray-300',
                            '**:data-outline:stroke-gray-400 dark:**:data-outline:stroke-gray-500 **:[svg]:first:size-5',
                            ' **:[svg]:first:sm:size-4 hover:text-gray-950 hover:**:data-highlight:fill-gray-300',
                            'hover:**:data-outline:stroke-gray-950 dark:hover:text-white dark:hover:**:data-highlight:fill-gray-600',
                            'dark:hover:**:data-outline:stroke-white aria-[current]:font-semibold aria-[current]:text-gray-950',
                            'aria-[current]:**:data-highlight:fill-gray-300 aria-[current]:**:data-outline:stroke-gray-950',
                            'dark:aria-[current]:text-white dark:aria-[current]:**:data-highlight:fill-gray-600 dark:aria-[current]:**:data-outline:stroke-white'
                          )}
                        >
                          <Icon />
                          {name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase sm:text-xs/6 dark:text-gray-400">
                    Settings
                  </h3>
                  <ul>
                    {nav.map(({ name, icon: Icon, route }, index) => (
                      <li key={index} className="flex flex-col items-start gap-2">
                        <Link
                          href={route}
                          className={cn(
                            'group inline-flex pl-5 items-center gap-3 text-base/8 text-gray-600 sm:text-sm/7 dark:text-gray-300',
                            '**:data-outline:stroke-gray-400 dark:**:data-outline:stroke-gray-500 **:[svg]:first:size-5',
                            ' **:[svg]:first:sm:size-4 hover:text-gray-950 hover:**:data-highlight:fill-gray-300',
                            'hover:**:data-outline:stroke-gray-950 dark:hover:text-white dark:hover:**:data-highlight:fill-gray-600',
                            'dark:hover:**:data-outline:stroke-white aria-[current]:font-semibold aria-[current]:text-gray-950',
                            'aria-[current]:**:data-highlight:fill-gray-300 aria-[current]:**:data-outline:stroke-gray-950',
                            'dark:aria-[current]:text-white dark:aria-[current]:**:data-highlight:fill-gray-600 dark:aria-[current]:**:data-outline:stroke-white'
                          )}
                        >
                          <Icon />
                          {name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="col-start-2 row-span-5 row-start-1 border-l" />
        <div className="relative row-start-1 grid grid-cols-subgrid lg:col-start-3">
          <div className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-2 xl:max-w-5xl xl:grid-cols-[minmax(0,1fr)_var(--container)]">
            <div className="px-4 pt-10 pb-24 sm:px-6 xl:px-0">{children}</div>
          </div>
        </div>
        <div className="col-start-4" />
        <div className="col-span-full col-start-2 row-start-2 h-px bg-gray-950/5 dark:bg-white/10" />
        <div className="row-start-5 grid lg:col-start-3">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
