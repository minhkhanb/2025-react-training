export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div>
      <h1>Bài viết {params.slug}</h1>
      <p>Nội dung bài viết {params.slug}...</p>
    </div>
  );
}
