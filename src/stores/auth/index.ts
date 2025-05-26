import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { wait } from 'next/dist/lib/wait';

type AuthState = {
  authUser: { id: string; name: string } | null;
  sample: string;
  hydrated: boolean;
};

type AuthActions = {
  setHydrated: () => void;
  getAccessToken: () => Promise<string | null>;
  logout: () => Promise<void>;
};

type AuthStore = AuthState & AuthActions;

const defaultInitState: AuthState = {
  authUser: null,
  sample: 'Hello, Course Store!',
  hydrated: false,
};

const isClient = typeof window !== 'undefined';

export const createAuthStore = (initState: AuthState = defaultInitState) =>
  create<AuthStore>()(
    isClient
      ? devtools(
          persist(
            set => ({
              ...initState,
              sample: 'Hello, Course Store!',
              hydrated: false,
              logout: () => {
                return new Promise<void>(resolve => {
                  set({ authUser: null });
                  resolve();
                });
              },
              setHydrated: () => set({ hydrated: true }),
              getAccessToken: async () => {
                try {
                  await wait(800);

                  return 'access_token';
                } catch (_err) {
                  return null;
                }
              },
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
      : set => ({
          ...initState,
          logout: () => {
            return new Promise<void>(resolve => {
              set({ authUser: null });
              resolve();
            });
          },
          setHydrated: () => {},
          getAccessToken: async () => {
            try {
              await wait(800);

              return null;
            } catch (_err) {
              return null;
            }
          },
        })
  );

export const useAuthStore = createAuthStore();
