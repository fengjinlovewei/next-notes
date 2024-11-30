import { cookies, headers } from 'next/headers';
import { getMyAllNotes, getMySearchNote } from '@/app/actions';

import SidebarNoteItem from '@/components/SidebarNoteItem';

import { getHeaderQuery } from '@/util/server';

import { sleep } from '@/lib/utils';

import styles from './index.module.scss';

interface Props extends PropsBase {}

export default async function NoteList() {
  const { search } = getHeaderQuery();

  console.log('XQueryData', getHeaderQuery());

  // await sleep(5000);

  const notes = await (search ? getMySearchNote(search) : getMyAllNotes());

  console.log('notes', notes);

  if (notes.length == 0) {
    return (
      <div className={styles.empty}>
        {search ? '没有找到相关笔记' : '还没有创建笔记'}
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {notes.map((item) => {
        return (
          <li key={item.id}>
            <SidebarNoteItem note={item} />
          </li>
        );
      })}
    </ul>
  );
}
