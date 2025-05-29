import { LoginResponseValues } from '@/section/Login/types/ILogin';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type AuthStoreActions = {
  setAuth: (auth: Omit<AuthStoreValues, 'isLoggedIn'>) => void;
  setToken: (token: string) => void;
  clearAuth: () => void;
};

type AuthStoreValues = {
  user: Omit<LoginResponseValues, 'accessToken'> | null;
  accessToken?: string | null;
  isLoggedIn: boolean;
};

type AuthStore = AuthStoreValues & AuthStoreActions;

const initialState: AuthStoreValues = {
  user: null,
  accessToken: null,
  isLoggedIn: false,
};

const authStore = create<AuthStore>()(
  devtools(
    persist(
      set => ({
        ...initialState,
        setAuth: auth =>
          set(() => ({
            user: auth.user,
            accessToken: auth.accessToken,
            isLoggedIn: !!auth.accessToken,
          })),
        setToken: token => set(state => ({ ...state, accessToken: token })),
        clearAuth: () =>
          set(() => ({
            ...initialState,
          })),
      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
      }
    )
  )
);

export const useAuthStore = authStore;
