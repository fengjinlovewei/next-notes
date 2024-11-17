'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { uploads } from './upload';

import cls from 'classnames';

import styles from './index.module.scss';

interface Props extends PropsBase {
  sizeWidth?: string;
  zoom?: number;
  fontSize?: string;
  multiple?: boolean;
}

const UpLoad = (props: Props) => {
  const {
    sizeWidth = '80px',
    zoom = 0.8,
    fontSize = '15px',
    multiple = true,
  } = props;

  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {});

  const style: any = {
    '--size': `${zoom * 160}px`,
    '--size-width': sizeWidth,
    '--font-size': fontSize,
  };

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    console.log('fileInput.files', fileInput.files);
    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn('files list is empty');
      return;
    }

    setChecked(true);
    const progress = ({ total, length }: any) => {
      console.log('haha', total, length);
    };

    const data = await uploads(fileInput.files, {}, progress);

    console.log('data', data);

    // 重置 file input
    e.target.type = 'text';
    e.target.type = 'file';
  };

  return (
    <>
      <div className={styles.container} style={style}>
        <input
          type='file'
          id='file'
          name='file'
          multiple={multiple}
          className={styles.file}
          onChange={onChange}
          accept='*'
        />
        <label className={styles.label} htmlFor='check'>
          <input
            id='check'
            type='checkbox'
            //readOnly
            className={styles.input}
            //checked={checked}
          />

          <span className={styles.circle}>
            <svg
              className={styles.icon}
              aria-hidden='true'
              fill='none'
              viewBox='0 0 24 24'>
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.5'
                d='M12 19V5m0 14-4-4m4 4 4-4'></path>
            </svg>
            <div className={styles.square}></div>
          </span>
          <div className={styles.before}></div>
          <div className={cls(styles.title, styles.text1)}>
            <span>上传图片</span>
          </div>
          <div className={cls(styles.title, styles.text2)}>
            <span>上传完成</span>
          </div>
        </label>
      </div>
    </>
  );
};

export default UpLoad;
