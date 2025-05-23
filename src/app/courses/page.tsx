import Courses from '@src/section/Courses';
import { fetchInitialData } from '@src/server/actions/courses';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { PhotoData } from '@src/app/courses/photo/[photoId]/page';
import PhotoDisplay from '@src/app/courses/photo/[photoId]/PhotoDisplay';

export const dynamic = 'force-dynamic';

interface CourseSearchParams {
  page?: string;
  sort?: string;
}

type Props = {
  searchParams: Promise<CourseSearchParams>;
};

export default async function CoursesPage({ searchParams }: Props) {
  const params = await searchParams;

  const pageParam = params.page ? parseInt(params.page) : 1;
  const pageIndex = Math.max(0, pageParam - 1);

  const initialData = await fetchInitialData(pageIndex);

  const response = await fetch('http://localhost:3500/images', { cache: 'no-store' });

  const images: PhotoData[] = await response.json();

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Courses</h1>

      <Suspense
        fallback={
          <div className="flex justify-center items-center h-[450px]">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading...</span>
          </div>
        }
      >
        <Courses initialData={initialData} initialPage={pageIndex} />
        {images.map(photoData => (
          <PhotoDisplay key={photoData.id} photoData={photoData} />
        ))}
      </Suspense>
    </div>
  );
}
