'use client';

import { ChangeEvent, useEffect, useState, DragEvent } from 'react';
import { uploads } from './upload';

import cls from 'classnames';

import styles from './index.module.scss';

interface Props extends PropsBase {
  sizeWidth?: string;
  zoom?: number;
  fontSize?: string;
  multiple?: boolean;
  text?: string;
  finishText?: string;
  accept?: string;
  beforeUpload?: (file: File) => Promise<boolean>;
  endUpload?: Func;
  fetchType?: 'md';
  number?: number;
  size?: number;
}

const UpLoad = (props: Props) => {
  const {
    sizeWidth = '80px',
    zoom = 0.6,
    fontSize = '15px',
    multiple = true,
    text = '上传图片',
    finishText = '上传完成',
    beforeUpload = async () => true,
    endUpload = () => {},
    fetchType,
    number,
    size,
    accept = '*',
  } = props;

  const [isMove, setIsMove] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {});

  const style: any = {
    '--size': `${zoom * 160}px`,
    '--size-width': sizeWidth,
    '--font-size': fontSize,
    '--progress': progress,
  };

  const progressCallback = ({ total, length }: any) => {
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

  const uploadsCommon = async (files: FileList | null) => {
    if (!files || files.length === 0) {
      console.warn('文件不能为空');
      return;
    }

    const res = await Promise.all([...files].map((file) => beforeUpload(file)));

    if (!res.every(Boolean)) {
      return console.log('验证未通过');
    }

    if (isMove) return;

    setIsMove(true);

    const data = await uploads(
      files,
      { fetchType, number, size },
      progressCallback,
    );

    console.log('data', data);

    endUpload(data);

    return data;
  };

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    console.log('fileInput.files', fileInput.files);

    const res = await uploadsCommon(fileInput.files);

    // 重置 file input
    e.target.type = 'text';
    e.target.type = 'file';
  };

  const handleDrop = async (e: DragEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setDragOver(false);
    await uploadsCommon(e.dataTransfer.files);
  };

  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.stopPropagation();
    e.preventDefault();

    setDragOver(over);
  };

  return (
    <div
      className={cls(styles.container, {
        [styles.moving]: isMove && progress < 100,
        [styles.going]: isMove,
        [styles.moveEnd]: progress >= 100,
        [styles.dragOver]: dragOver,
      })}
      style={style}>
      <input
        type='file'
        id='file'
        name='file'
        multiple={multiple}
        className={styles.file}
        onChange={onChange}
        accept={accept}
      />
      <label className={styles.label} htmlFor='file'>
        <div
          className={styles.handleBox}
          onDragLeave={(e) => {
            handleDrag(e, false);
          }}
          onDragOver={(e) => {
            handleDrag(e, true);
          }}
          onDrop={handleDrop}></div>

        <span className={styles.circle}>
          <i className={cls('iconfont icon-tubiao_down', styles.icon)}></i>
          <div className={styles.square}></div>
          <div className={styles.circleBefore}></div>
        </span>
        <div className={styles.labelBefore}></div>
        <div className={cls(styles.title, styles.text1)}>
          <span>{text}</span>
        </div>
        <div className={cls(styles.title, styles.text2)}>{finishText}</div>
      </label>
    </div>
  );
};

export default UpLoad;
