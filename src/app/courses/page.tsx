import Courses from '@src/section/Courses';
import { fetchInitialData } from '@src/server/actions/courses';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface CourseSearchParams {
  page?: string;
  sort?: string;
}

type Props = {
  searchParams: CourseSearchParams | Promise<CourseSearchParams>;
};

export default async function CoursesPage({ searchParams }: Props) {
  const params = await searchParams;

  const pageParam = params.page ? parseInt(params.page) : 1;
  const pageIndex = Math.max(0, pageParam - 1);

  const initialData = await fetchInitialData(pageIndex);

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
      </Suspense>
    </div>
  );
}
