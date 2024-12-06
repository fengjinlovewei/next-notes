'use client';

import { useId, useState, useLayoutEffect } from 'react';

import ScrollBar from '@/components/ScrollBar';

import TextArea, { TextAreaProps } from 'rc-textarea';

import styles from './index.module.scss';

interface Props extends TextAreaProps {}

export default function Textarea(props: Props) {
  const { children, className, value, ...other } = props;
  const [show, setShow] = useState(false);
  useLayoutEffect(() => {
    setShow(true);
  }, []);
  const id = useId();
  return (
    <label className={styles.textareaBox} htmlFor={id}>
      <ScrollBar>
        <div className={styles.info}>
          {show && <TextArea className={styles.textarea} {...other} />}
        </div>
      </ScrollBar>
    </label>
  );
}
