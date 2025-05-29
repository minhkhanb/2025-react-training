import { useToast } from '@/components/Toast/hooks/useToast';
import { useMutation } from '@tanstack/react-query';
import { login } from '../api/loginService';
import { ToastType } from '@/components/Toast/types/IToast';
import { useAuthStore } from '@/store/authStore';

export const useLoginUser = () => {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: login,
    onSuccess: res => {
      showToast(`Login success`, ToastType.SUCCESS);
      useAuthStore.getState().setAuth(res);
    },
  });
};
