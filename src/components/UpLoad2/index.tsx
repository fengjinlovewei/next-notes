'use client';

import { ChangeEvent, useEffect } from 'react';

import cls from 'classnames';

import styles from './index.module.scss';

interface Props extends PropsBase {}

const UpLoad = (props: Props) => {
  const {} = props;

  useEffect(() => {});

  const size = 40;

  const style: any = { '--size': `${size}px` };

  return (
    <>
      <div className={styles.upload} id='upload' style={style}>
        <svg width='100' height='100' viewBox='0 0 100 100'>
          <defs>
            <clipPath id='clipIt'>
              <circle fill='black' r='35' cy='50' cx='50' />
            </clipPath>
          </defs>
          <path
            className={styles.utveckling}
            d='M 49.99955,21.646452 A 28.35355,28.353548 0 0 0 21.646,50
                    28.35355,28.353548 0 0 0 49.99955,78.353548
                    28.35355,28.353548 0
                    0 0 78.3531,50 28.35355,28.353548 0 0 0 49.99955,21.646452
                    Z'
          />
          <g className={styles.cut} clip-path='url(#clipIt)'>
            <circle r='35' cy='50' cx='50' className={styles.p1} />
            <g className={styles.pil}>
              <path
                className={styles.p2}
                d='m 40.056531,47.971893 9.914191,-9.514425
                                    9.994144,9.514425'
              />
              <path
                className={styles.p3}
                d='M 49.970722,38.457468 V 61.56393'
              />
            </g>
            <path
              className={styles.bock}
              d='m 49.533063,13 c 0,0
                                        -4.038975,0.243204 -7.084664,1.6
                                        -10.965877,4.88509 -12.03936,12.900449
                                        -12.029016,15.995361 0.02524,7.552595
                                        4.607455,12.168562 6.129905,13.956538 C
                                        41.41924,50.271203 47.447623,56.491
                                        47.447623,56.491 L 63.320719,42.911532'
            />
          </g>
        </svg>
      </div>
    </>
  );
};

export default UpLoad;
