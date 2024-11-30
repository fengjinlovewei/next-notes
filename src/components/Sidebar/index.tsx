import { Suspense } from 'react';

import SidebarNoteList from '@/components/SidebarNoteList';
import NoteListSkeleton from '@/components/NoteListSkeleton';
import ScrollBar from '@/components/ScrollBar';

import styles from './index.module.scss';

export default async function Sidebar() {
  return (
    <>
      <section className={styles.sidebar}>
        <div className={styles.sidebarInfo}>
          {/* <div className={styles.sidebarMenu}>
            <div className={styles.handleBox}></div>
          </div> */}
          <ScrollBar>
            <div className={styles.scrollBox}>
              <Suspense fallback={<NoteListSkeleton />}>
                <SidebarNoteList />
              </Suspense>
            </div>
          </ScrollBar>
        </div>
      </section>
    </>
  );
}
