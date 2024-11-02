import cls from 'classnames';

import styles from './index.module.scss';

export default function Spinner({ active = true, className = '' }) {
  return (
    <div
      className={cls(styles.spinner, { [styles.active]: active }, className)}
    />
  );
}
