import Link from 'next/link';

export default function Blog() {
  const posts = [
    {
      title: 'First Post',
      slug: 'first-post',
      description: 'This is the first blog post.',
    },
    {
      title: 'Second Post',
      slug: 'second-post',
      description: 'Here is another interesting article.',
    },
    {
      title: 'Next.js Tips',
      slug: 'nextjs-tips',
      description: 'Some useful tips for working with Next.js.',
    },
  ];

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <p className=" mb-8">Welcome to the blog page.</p>
      <ul className="space-y-6">
        {posts.map((post, idx) => (
          <li key={idx} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">
              <Link href={`/blog/post/${post.slug}`}>{post.title}</Link>
            </h2>
          </li>
        ))}
      </ul>
    </div>
  );
}
