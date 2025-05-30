import Courses from '@src/section/Courses';
import { fetchUsersDataWithSorting } from '@src/server/actions/courses';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface UserSearchParams {
  page?: string;
  sort?: string;
  limit?: string;
}

interface Props {
  searchParams: Promise<UserSearchParams>;
}

const CoursesLoading = () => (
  <div className="flex justify-center items-center h-[450px]">
    <Loader2 className="h-8 w-8 animate-spin" />
    <span className="ml-2">Loading...</span>
  </div>
);

async function getUsersData(searchParams: UserSearchParams) {
  try {
    const pageParam = searchParams.page ? parseInt(searchParams.page) : 1;
    const page = Math.max(0, pageParam - 1);
    const limit = searchParams.limit ? parseInt(searchParams.limit) : 10;

    const response = await fetchUsersDataWithSorting({
      filters: { page, limit, offset: page * limit, sort: [] },
    });

    if (!response) {
      throw new Error('No data returned from the server');
    }

    const { data, meta } = response.data;

    return {
      user: data,
      pagination: meta,
    };
  } catch (err) {
    console.error('Error fetching user data:', err);
    throw new Error('Failed to fetch user data');
  }
}

export default async function UsersPage({ searchParams }: Props) {
  const usersData = await getUsersData(await searchParams);

  return (
    <>
      <Suspense fallback={<CoursesLoading />}>
        <Courses data={usersData} />
      </Suspense>
    </>
  );
}
