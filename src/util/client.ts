'use client';

import { toast, Bounce, ToastOptions } from 'react-toastify';

function getConfig(timeout = 100000) {
  const controller = new AbortController();
  const signal = controller.signal;

  setTimeout(() => {
    controller.abort('timeout');
  }, timeout); // 设置超时为10秒

  const config: RequestInit = {
    credentials: 'include',
    signal, // 10秒
    mode: 'same-origin',
    cache: 'no-cache',
  };

  return config;
}

function filterData(json: any) {
  if ([700].includes(json.code)) {
    return (window.location.href = json.url ?? '/login');
  }
  return json;
}

export async function fetchPost(
  url: string,
  body: Record<string, any>,
  headers?: HeadersInit,
) {
  try {
    const json = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...getConfig(),
      body: JSON.stringify(body),
    }).then((res) => res.json());

    return filterData(json);
  } catch (err) {
    if (err === 'timeout') {
      toast.error('连接超时', {
        // position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
    }
    throw err;
  }
}

export async function fetchGet(
  url: string,
  params: Record<string, any>,
  headers?: HeadersInit,
) {
  try {
    const newUrl = new URL(url, window.location.origin);

    Object.entries(params).filter(([key, value]) => {
      newUrl.searchParams.append(key, value);
    });

    const json = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...getConfig(),
    }).then((res) => res.json());

    return filterData(json);
  } catch (err) {
    if (err === 'timeout') {
      toast.error('连接超时', {
        // position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
    }
    throw err;
  }
}

export const initialUseFormState: ResponesData = {
  message: '',
  errors: '',
};

export function formStateToast(state: ResponesData, options?: ToastOptions) {
  if (state.errors) {
    // 处理错误
    toast.error(state.errors, {
      position: 'top-right',
      autoClose: false,
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
