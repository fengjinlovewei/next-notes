'use client';

import { useId, useState, useLayoutEffect } from 'react';
import useResizeObserver from 'use-resize-observer';
import TextArea, { TextAreaProps } from 'rc-textarea';
import cls from 'classnames';

import ScrollBar from '@/components/ScrollBar';

import styles from './index.module.scss';

interface Props extends TextAreaProps {}

export default function Textarea(props: Props) {
  const { children, className, ...other } = props;
  const [show, setShow] = useState(false);
  const id = useId();

  const { ref, height = 0 } = useResizeObserver<HTMLDivElement>();

  useLayoutEffect(() => {
    setShow(true);
  }, []);

  return (
    <label className={styles.textareaBox} htmlFor={id}>
      <div className={styles.textareaBoxInof} ref={ref}>
        <ScrollBar>
          {/* 这个空的div必须有 */}
          <div className={styles.info}>
            <TextArea
              className={cls(styles.textarea, { [styles.show]: show })}
              style={{ minHeight: `${height}px` }}
              autoSize={true}
              {...other}
            />
          </div>
        </ScrollBar>
      </div>
    </label>
  );
}
