import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { revalidatePath } from 'next/cache';

import SidebarSearchField from '@/components/SidebarSearchField';
import SidebarNoteList from '@/components/SidebarNoteList';
import Button from '@/components/Button';
import NoteListSkeleton from '@/components/NoteListSkeleton';
import SidebarTitle from '@/components/SidebarTitle';
import cls from 'classnames';

import styles from './index.module.scss';

import logo from '@/images/logo.png';

export default async function Sidebar() {
  return (
    <>
      <section className={styles.sidebar}>
        <div className={styles.sidebarInfo}>
          <SidebarTitle />
          <section className={styles.sidebarMenu}>
            <SidebarSearchField />
            <Link href={`/note/edit`} className={styles.addBtn}>
              <Button.Default>新建</Button.Default>
            </Link>
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
