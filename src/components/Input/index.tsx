import {
  InputHTMLAttributes,
  // FocusEventHandler,
  ReactNode,
  // useState,
} from 'react';
import cls from 'classnames';
import styles from './index.module.scss';

console.log('styles', styles);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  left?: ReactNode;
  right?: ReactNode;
  bottom?: ReactNode;
  icon?: string;
  focusClassName?: string;
}

function Input(props: InputProps) {
  // const [active, setActive] = useState(false);
  const {
    children,
    className,
    left,
    right,
    bottom,
    icon,
    focusClassName = '',
    onFocus,
    onBlur,
    ...other
  } = props;

  const inputProps = {
    type: 'text',
    ...other,
  };

  const iconNode = icon ? (
    <i className={cls('iconfont', icon, styles.icon)}></i>
  ) : null;

  const leftNode = left || iconNode;

  // const onFocusCall: FocusEventHandler<HTMLInputElement> = (e) => {
  //   onFocus?.(e);
  //   setActive(true);
  // };
  // const onBlurCall: FocusEventHandler<HTMLInputElement> = (e) => {
  //   onBlur?.(e);
  //   setActive(false);
  // };

  return (
    <span className={cls(styles.inputWrap, 'global-inputWrap', className)}>
      <div className={cls(styles.inputBox, 'global-inputBox')}>
        {leftNode}
        <input
          className={cls(styles.input, 'global-input')}
          autoComplete='off'
          {...inputProps}
          // onFocus={onFocusCall}
          // onBlur={onBlurCall}
        />
        {right}
      </div>
      {bottom && <div className={styles.bottom}>{bottom}</div>}
    </span>
  );
}

export function SearchInput() {}

export default Input;
