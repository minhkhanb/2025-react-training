import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <ul className="space-y-3">
        <li className="hover:text-blue-600 transition-colors">
          <Link
            href="/blog"
            className="block py-2 px-3 rounded-md hover:bg-gray-100"
          >
            Trang chủ
          </Link>
        </li>
        <li className="hover:text-blue-600 transition-colors">
          <Link
            href="/blog/post/first-post"
            className="block py-2 px-3 rounded-md hover:bg-gray-100"
          >
            First Post
          </Link>
        </li>
      </ul>
    </div>
  );
}
