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
  const [isMove, setIsMove] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {});

  const style: any = {
    '--size': `${zoom * 160}px`,
    '--size-width': sizeWidth,
    '--font-size': fontSize,
    '--progress': progress,
  };

  const testFn = () => {
    // let value = 0;
    // setIsMove(true);
    // let id = setInterval(() => {
    //   value += 5;
    //   if (value >= 100) {
    //     clearInterval(id);
    //   }
    //   setProgress(value);
    // }, 300);
  };

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    console.log('fileInput.files', fileInput.files);
    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn('文件不能为空');
      return;
    }

    setIsMove(true);

    const progress = ({ total, length }: any) => {
      console.log('haha', total, length);

      const n = ((total / length) * 100) >> 0;

      if (n >= 100) {
        setProgress(99.99);
        setTimeout(() => {
          setProgress(100);
          setTimeout(() => {
            setProgress(0);
            setIsMove(false);
          }, 2000);
        }, 1000);
      } else {
        setProgress(n);
      }
    };

    const data = await uploads(fileInput.files, {}, progress);

    console.log('data', data);

    // 重置 file input
    e.target.type = 'text';
    e.target.type = 'file';
  };

  return (
    <>
      <div
        className={cls(styles.container, {
          [styles.moving]: isMove && progress < 100,
          [styles.moveEnd]: progress >= 100,
        })}
        style={style}
        onClick={testFn}>
        <input
          type='file'
          id='file'
          name='file'
          multiple={multiple}
          className={styles.file}
          onChange={onChange}
          accept='*'
        />
        <label className={styles.label} htmlFor='file'>
          {/* <input
            id='check'
            type='checkbox'
            //readOnly
            className={styles.input}
            //checked={checked}
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
            <div className={styles.circleBefore}></div>
          </span>
          <div className={styles.labelBefore}></div>
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
