import dayjs from 'dayjs';
import styles from './index.module.scss';

interface Props extends PropsBase {
  title: string;
  updateTime: any;
}

export default function SidebarNoteItemHeader({ title, updateTime }: Props) {
  return (
    <header className={styles.header}>
      <h5>{title}</h5>
      <p>{dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')}</p>
    </header>
  );
}
