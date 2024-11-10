// components/EditButton.js
import { ButtonHTMLAttributes } from 'react';
import cls from 'classnames';
import styles from './index.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Unstyle(props: Props) {
  const { children, className, ...other } = props;
  return (
    <button className={cls([styles.btn, className])} {...other}>
      {children}
    </button>
  );
}

export function Default(props: Props) {
  const { children, className, ...other } = props;
  return (
    <button className={cls([styles.btn, styles.default, className])} {...other}>
      {children}
    </button>
  );
}

export function Line(props: Props) {
  const { children, className, ...other } = props;
  return (
    <button className={cls([styles.btn, styles.line, className])} {...other}>
      {children}
    </button>
  );
}

export function Red(props: Props) {
  const { children, className, ...other } = props;
  return (
    <button className={cls([styles.btn, styles.red, className])} {...other}>
      {children}
    </button>
  );
}

const Button = {
  Default,
  Line,
  Red,
  Unstyle,
};

export default Button;
