import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type CourseState = {
  sample: string;
  hydrated: boolean;
};

type CourseActions = {
  setSample: (value: string) => void;
  setHydrated: () => void;
};

type CourseStore = CourseState & CourseActions;

const defaultInitState: CourseState = {
  sample: 'Hello, Course Store!',
  hydrated: false,
};

const isClient = typeof window !== 'undefined';

export const createCourseStore = (initState: CourseState = defaultInitState) =>
  create<CourseStore>()(
    isClient
      ? devtools(
          persist(
            set => ({
              ...initState,
              sample: 'Hello, Course Store!',
              hydrated: false,
              setSample: value => set({ sample: value }),
              setHydrated: () => set({ hydrated: true }),
            }),
            {
              name: 'course-storage',
              onRehydrateStorage: () => state => {
                state?.setHydrated();
              },
            }
          ),
          { name: 'CourseStore' }
        )
      : _set => ({
          ...initState,
          setSample: () => {},
          setHydrated: () => {},
        })
  );

export const useCourseStore = createCourseStore();
