import { cookies, headers } from 'next/headers';
import { getMyAllNotes, getMySearchNote } from '@/app/actions';

import SidebarNoteItem from '@/components/SidebarNoteItem';

import styles from './index.module.scss';

interface Props extends PropsBase {}

export default async function NoteList() {
  const header = headers();
  const XQueryData = JSON.parse(header.get('x-query-data')!) as Record<
    string,
    string
  >;

  const { search } = XQueryData;

  console.log('XQueryData', XQueryData);

  const notes = await (search ? getMySearchNote(search) : getMyAllNotes());

  console.log('notes', notes);

  if (notes.length == 0) {
    return <div className={styles.empty}>{'No notes created yet!'}</div>;
  }

  return (
    <ul className={styles.list}>
      {notes.map((item) => {
        return (
          <li key={item.id}>
            <SidebarNoteItem noteId={item.id} note={item} />
          </li>
        );
      })}
    </ul>
  );
}
