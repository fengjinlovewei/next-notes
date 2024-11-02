import { cookies, headers } from 'next/headers';
import { getAllNotes, getSraechNotes } from '@/lib/redis';

import SidebarNoteItem from '@/components/SidebarNoteItem';
import { sleep } from '@/lib/utils';

import styles from './index.module.scss';

interface Props extends PropsBase {}

export default async function NoteList() {
  await sleep(300);
  const header = headers();
  const XQueryData = JSON.parse(header.get('x-query-data')!) as Record<
    string,
    string
  >;

  const { search } = XQueryData;

  console.log('XQueryData', XQueryData);

  const notes = await (search ? getSraechNotes(search) : getAllNotes());

  console.log('notes', notes);

  const arr = Object.entries(notes);

  if (arr.length == 0) {
    return <div className={styles.empty}>{'No notes created yet!'}</div>;
  }

  return (
    <ul className={styles.list}>
      {arr.map(([noteId, note]) => {
        return (
          <li key={noteId}>
            <SidebarNoteItem noteId={noteId} note={JSON.parse(note)} />
          </li>
        );
      })}
    </ul>
  );
}
