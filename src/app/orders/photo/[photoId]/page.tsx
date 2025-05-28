import PhotoDisplay from './PhotoDisplay';

export type PhotoData = {
  id: number;
  title: string;
  path: string;
};

type Props = {
  params: Promise<{
    photoId: string;
  }>;
};

export default async function Photo({ params }: Props) {
  const { photoId } = await params;
  const response = await fetch(`http://localhost:3500/api/courses/${photoId}`, {
    cache: 'no-store',
  });

  console.log(response);

  const photoData: PhotoData = await response.json();

  if (!photoData?.id) {
    return <h1 className="text-center">No Photo Found for that ID.</h1>;
  }

  return (
    <div className="mt-2 grid place-content-center">
      <PhotoDisplay photoData={photoData} />
    </div>
  );
}
