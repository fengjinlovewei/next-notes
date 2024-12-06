import { toast, ToastOptions } from 'react-toastify';

export const success = (message: string, options?: ToastOptions) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 2000,
    ...options,
  });
};
