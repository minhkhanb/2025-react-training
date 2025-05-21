import Courses from '@src/section/Courses';
import { makeData } from '@src/section/Courses/makeData';

export default function CoursesPage() {
  const initialData = makeData(1_000);

  return <Courses initialData={initialData} />;
}
