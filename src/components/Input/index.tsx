// components/EditButton.js
import { InputHTMLAttributes, ReactNode } from 'react';
import cls from 'classnames';
import styles from './index.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  left?: ReactNode;
  right?: ReactNode;
  bottom?: ReactNode;
}

export function Input(props: Props) {
  const { children, className, left, right, bottom, ...other } = props;
  const inputProps = {
    type: 'text',
    ...other,
  };
  return (
    <div className={cls([styles.inputWrap, className])}>
      <div className={cls([styles.inputBox])}>
        {left}
        <input className={styles.input} {...inputProps} />
        {right}
      </div>
      {bottom && <div className={styles.bottom}>{bottom}</div>}
    </div>
  );
}

export default Input;
