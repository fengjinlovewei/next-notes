'use client';

import { ChangeEvent, useEffect } from 'react';

import cls from 'classnames';

import styles from './index.module.scss';

interface Props extends PropsBase {}

const UpLoad = (props: Props) => {
  const {} = props;

  useEffect(() => {
    var fileUpload = document.getElementById('upload')!;

    if (!fileUpload) return;

    fileUpload.addEventListener('dragover', function () {
      fileUpload.classList.add(styles.drag);
      fileUpload.classList.remove(styles.drop, styles.done);
    });

    fileUpload.addEventListener('dragleave', function () {
      fileUpload.classList.remove(styles.drag);
    });

    fileUpload.addEventListener('drop', start, false);
    fileUpload.addEventListener('change', start, false);

    function start() {
      fileUpload.classList.remove(styles.drag);
      fileUpload.classList.add(styles.drop);
      setTimeout(() => fileUpload.classList.add(styles.done), 5000);
    }
  });

  const size = 40;

  const style: any = { '--size': `${size}px` };

  return (
    <>
      <div className={styles.upload} id='upload' style={style}>
        <div className={styles.uploadInfo}>
          <input type='file' title='' className={styles['drop-here']} />
          {/* <div className={cls(styles.text, styles['text-drop'])}>上传</div> */}
          <g className={styles.pil}>
            <path
              className={styles.p2}
              d='m 40.056531,47.971893 9.914191,-9.514425
                                    9.994144,9.514425'
            />
            <path className={styles.p2} d='M 49.970722,38.457468 V 61.56393' />
          </g>
          {/* <div className={cls(styles.text, styles['text-upload'])}>上传中</div> */}
          <svg
            className={styles['progress-wrapper']}
            width={size}
            height={size}>
            <circle
              className={styles.progress}
              r={(size / 2) * 0.77}
              cx={size / 2}
              cy={size / 2}></circle>
          </svg>
          <svg
            className={styles['check-wrapper']}
            width={(size / 2) * 0.86}
            height={(size / 2) * 0.86}>
            <polyline
              className={styles.check}
              // points='100.2,40.2 51.5,88.8 29.8,67.5 '
              points={`${size * 0.33},${size * 0.134} ${size * 0.172},${
                size * 0.296
              } ${size * 0.1},${size * 0.225}`}
            />
          </svg>
        </div>

        <div className={styles.shadow}></div>
      </div>
    </>
  );
};

export default UpLoad;
