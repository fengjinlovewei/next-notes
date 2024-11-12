import dayjs from 'dayjs';
import styles from './index.module.scss';

interface Props extends PropsBase {
  title: string;
  updateTime: any;
}

export default function SidebarNoteItemHeader({ title, updateTime }: Props) {
  console.log('updateTime', updateTime);
  return (
    <header className={styles.header}>
      <strong>{title}</strong>
      <small>{dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')}</small>
    </header>
  );
}
