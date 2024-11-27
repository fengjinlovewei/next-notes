import { Suspense } from 'react';

import SidebarNoteList from '@/components/SidebarNoteList';
import NoteListSkeleton from '@/components/NoteListSkeleton';

import styles from './index.module.scss';

export default async function Sidebar() {
  return (
    <>
      <section className={styles.sidebar}>
        <div className={styles.sidebarInfo}>
          <div className={styles.sidebarMenu}>
            <div className={styles.handleBox}></div>
          </div>
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
