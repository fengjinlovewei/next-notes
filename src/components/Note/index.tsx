import dayjs from 'dayjs';
import Link from 'next/link';
import NotePreview from '@/components/NotePreview';
import Button from '@/components/Button';
import styles from './index.module.scss';

interface Props extends PropsBase {
  noteId: string;
  note: any;
}

export default function Note({ noteId, note }: Props) {
  const { title, content, updateTime } = note;

  return (
    <div className={styles.note}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.menu}>
          <small className={styles.updated_at}>
            Last updated on {dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')}
          </small>
          <Link href={`/note/edit/${noteId}`}>
            <Button.Line>Edit</Button.Line>
          </Link>
        </div>
      </div>
      <NotePreview>{content}</NotePreview>
    </div>
  );
}
