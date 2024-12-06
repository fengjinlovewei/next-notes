import { InputHTMLAttributes, ReactNode, useId } from 'react';
import cls from 'classnames';
import styles from './index.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  left?: ReactNode;
  right?: ReactNode;
  bottom?: ReactNode;
  icon?: string;
  focusClassName?: string;
  error?: string | ReactNode | undefined;
}

function Input(props: InputProps) {
  const {
    children,
    className,
    left,
    right,
    bottom,
    icon,
    focusClassName = '',
    error,
    ...other
  } = props;

  const id = useId();

  const inputProps = {
    type: 'text',
    ...other,
  };

  const iconNode = icon ? (
    <i className={cls('iconfont', icon, styles.icon)}></i>
  ) : null;

  const leftNode = left || iconNode;

  return (
    <span className={cls(styles.inputWrap, 'global-inputWrap', className)}>
      <label className={cls(styles.inputBox, 'global-inputBox')} htmlFor={id}>
        {leftNode}
        <input
          id={id}
          className={cls(styles.input, 'global-input')}
          autoComplete='off'
          spellCheck='false' // 去掉单词的正确性检测
          {...inputProps}
        />
        {right}
      </label>
      {error && <div className={styles.errorBox}>{error}</div>}
      {bottom && <div className={styles.bottom}>{bottom}</div>}
    </span>
  );
}

export function SearchInput() {}

export default Input;
