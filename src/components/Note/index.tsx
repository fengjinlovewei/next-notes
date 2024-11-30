import dayjs from 'dayjs';
import Link from 'next/link';
import NotePreview from '@/components/NotePreview';
import Button from '@/components/Button';
import ScrollBar from '@/components/ScrollBar';
import styles from './index.module.scss';
import Pubilc from './Public';

interface Props extends PropsBase {
  noteId: string;
  note: Note;
}

export default function Note({ noteId, note }: Props) {
  const { title, content, updatedAt } = note;

  return (
    <div className={styles.note}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.menu}>
          <small className={styles.updatedAt}>
            上次更新： {dayjs(updatedAt).format('YYYY-MM-DD hh:mm:ss')}
          </small>
          <Pubilc note={note} />
          <Link href={`/note/edit/${noteId}`}>
            <Button.Line>编辑</Button.Line>
          </Link>
        </div>
      </div>
      <div className={styles.contentBox}>
        <ScrollBar>
          <NotePreview>{content}</NotePreview>
        </ScrollBar>
      </div>
    </div>
  );
}
