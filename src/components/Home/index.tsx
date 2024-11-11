// app/page.js
import NotePreview from '@/components/NotePreview';
import { getMyNote } from '@/app/actions';

import {
  getNote,
  addNote,
  updateNote,
  delNote,
  getSraechNotes,
  addUser,
  getUser,
  getAllNotes,
  getUserData,
} from '@/lib/prisma';

import Link from 'next/link';

import styles from './index.module.scss';

interface Props extends PropsBase {
  username: string;
}

export default async function Page(props: Props) {
  const { username } = props;
  const userData = await getUserData(username);
  if (!userData) {
    return <div>用户不存在</div>;
  }
  const notes = await getAllNotes(userData.id, { public: true });

  console.log('notes', notes);

  if (notes.length == 0) {
    return <div className={styles.empty}>{'No notes created yet!'}</div>;
  }

  return (
    <ul className={styles.list}>
      {notes.map((item) => {
        return (
          <Link href={`/${username}/${item.id}`} key={item.id}>
            <li key={item.id}>
              <div>{item.title}</div>
            </li>
          </Link>
        );
      })}
    </ul>
  );
}
