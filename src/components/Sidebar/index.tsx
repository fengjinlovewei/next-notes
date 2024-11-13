import { Suspense } from 'react';
import Link from 'next/link';

import SidebarSearchField from '@/components/SidebarSearchField';
import SidebarNoteList from '@/components/SidebarNoteList';
import Button from '@/components/Button';
import NoteListSkeleton from '@/components/NoteListSkeleton';
import SidebarTitle from '@/components/SidebarTitle';

import UpLoad from '@/components/UpLoad';

import styles from './index.module.scss';

export default async function Sidebar() {
  return (
    <>
      <section className={styles.sidebar}>
        <div className={styles.sidebarInfo}>
          <SidebarTitle />
          <section className={styles.sidebarMenu}>
            <SidebarSearchField />
            <Link href={`/note/edit`} className={styles.addBtn}>
              <Button.Default>+</Button.Default>
            </Link>
            <UpLoad />
          </section>
          <nav>
            <Suspense fallback={<NoteListSkeleton />}>
              <SidebarNoteList />
            </Suspense>
          </nav>
        </div>
      </section>
    </>
  );
}
