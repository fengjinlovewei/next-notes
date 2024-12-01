'use client';

import { ButtonHTMLAttributes } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import cls from 'classnames';
import styles from './index.module.scss';
import UpLoad from '@/components/UpLoad';

import { toast, Bounce } from 'react-toastify';

interface Props extends PropsBase {}

export function UpLoadMD(props: Props) {
  const { children, className, ...other } = props;

  const { replace, refresh } = useRouter();

  const beforeUpload = async (file: File) => {
    const isBig = file.size / 1024 / 1024 > 10;
    if (isBig) {
      toast.error('不能超过10M！', {
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
    return !isBig;
  };

  const endUpload = (data: any) => {
    console.log('haha data', data[0]);
    const id = data[0].data.id;
    replace(`/note/${id}`);
    refresh();
  };

  return (
    <UpLoad
      beforeUpload={beforeUpload}
      endUpload={endUpload}
      text='上传笔记'
      accept='.md'
      fetchType='md'
      number={2}
    />
  );
}

export default UpLoadMD;
