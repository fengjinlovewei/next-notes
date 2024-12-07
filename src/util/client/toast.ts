import { toast, ToastOptions } from 'react-toastify';

export const success = (message = '成功', options?: ToastOptions) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 2000,
    ...options,
  });
};

export const error = (message = '未知错误', options?: ToastOptions) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 10000,
    ...options,
  });
};
