'use client';

import { ChangeEvent, useEffect } from 'react';

import cls from 'classnames';

import styles from './index.module.scss';

interface Props extends PropsBase {
  sizeWidth?: string;
  zoom?: number;
  fontSize?: string;
}

const UpLoad = (props: Props) => {
  const { sizeWidth = '80px', zoom = 0.8, fontSize = '15px' } = props;

  useEffect(() => {});

  const style: any = {
    '--size': `${zoom * 160}px`,
    '--size-width': sizeWidth,
    '--font-size': fontSize,
  };

  return (
    <>
      <div className={styles.container} style={style}>
        <label className={styles.label}>
          <input type='checkbox' className={styles.input} />
          {/* <input
            type='file'
            id='file'
            name='file'
            multiple
            className={styles.file}
            style={{ position: 'absolute', clip: 'rect(0 0 0 0)' }}
          /> */}
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
