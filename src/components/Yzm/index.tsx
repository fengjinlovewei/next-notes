// components/EditButton.js
import { useState, forwardRef, useImperativeHandle, Ref, useId } from 'react';
import cls from 'classnames';
import styles from './index.module.scss';

interface Props extends PropsBase {
  fontSize?: number;
  width?: number;
  height?: number;
}

export interface HandleProps {
  updataYzm(): void; //暴露给父组件的函数
}

const getRandom = () => Math.random();

function Yzm(props: Props, ref: Ref<unknown>) {
  const { fontSize = 50, width = 100, height = 36 } = props;
  // 使用这个id是为了水和成功
  const moduleId = useId();
  const [id, setID] = useState<number | string>(moduleId);

  const updataYzm = () => {
    setID(getRandom());
  };

  const searchParams = new URLSearchParams({
    fontSize: `${fontSize}`,
    width: `${width}`,
    height: `${height}`,
    id: `${id}`,
  });

  useImperativeHandle(ref, () => ({
    updataYzm,
  }));

  return (
    <div className={styles.yzmBox}>
      <img src={`/api/captcha?${searchParams}`} onClick={updataYzm} alt='yzm' />
    </div>
  );
}

export default forwardRef<HandleProps, Props>(Yzm);
