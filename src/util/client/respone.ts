import { toast, ToastOptions } from 'react-toastify';

export const initialUseFormState: ResponesData = {
  message: '',
  errors: '',
};

export function formStateToast(state: ResponesData, options?: ToastOptions) {
  if (state.errors) {
    // 处理错误
    toast.error(state.errors, {
      position: 'top-right',
      autoClose: 10000,
      ...options,
    });
  }

  if (state.message) {
    // 成功
    toast.success(state.message, {
      position: 'top-right',
      autoClose: 2000,
      ...options,
    });
  }
}
