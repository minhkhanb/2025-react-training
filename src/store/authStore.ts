import { LoginResponseValues } from '@/section/Login/types/ILogin';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type AuthStoreActions = {
  setAuth: (auth: LoginResponseValues) => void;
  setToken: (token: string) => void;
  clearAuth: () => void;
};

const authStore = create<LoginResponseValues & AuthStoreActions>()(
  persist(
    set => ({
      _id: '',
      email: '',
      phoneNumber: '',
      username: '',
      accessToken: '',
      setAuth: auth => set(() => auth),
      setToken: token => set(state => ({ ...state, accessToken: token })),
      clearAuth: () =>
        set(() => ({
          _id: '',
          email: '',
          phoneNumber: '',
          username: '',
          accessToken: '',
        })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
    }
  )
);

export const useAuthStore = authStore;
