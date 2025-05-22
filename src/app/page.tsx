import Link from 'next/link';
import { Button } from '@src/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        Welcome to My Home Page
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 text-center max-w-xl">
        This is a basic home page built with Next.js and React.
      </p>
      <div className="flex mb-6 gap-4">
        <Link
          href="/about-us"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold text-lg"
        >
          About Us
        </Link>
        <Link
          href="/blog"
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-colors font-semibold text-lg"
        >
          Blog
        </Link>
      </div>
      <Button>Test Button</Button>
    </div>
  );
}
