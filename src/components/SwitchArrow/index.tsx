import { ChangeEvent } from 'react';
import cls from 'classnames';
import styles from './index.module.scss';

interface Props extends PropsBase {
  open: boolean;
  size?: string;
  color?: string;
  time?: string;
}

const SwitchArrow = (props: Props) => {
  const {
    open,
    size = '32px',
    color = 'var(--gray-60)',
    time = '0.5s',
  } = props;

  const style: any = { '--size': size, '--color': color, '--time': time };

  return (
    <button
      className={cls(styles.arrow, { [styles.active]: open })}
      style={style}>
      <span></span>
    </button>
  );
};

export default SwitchArrow;
