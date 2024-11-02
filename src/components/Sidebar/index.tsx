import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import SidebarSearchField from '@/components/SidebarSearchField';
import SidebarNoteList from '@/components/SidebarNoteList';
import Button from '@/components/Button';
import NoteListSkeleton from '@/components/NoteListSkeleton';
import cls from 'classnames';

import styles from './index.module.scss';

import logo from '@/images/logo.png';

export default async function Sidebar() {
  return (
    <>
      <section className={styles.sidebar}>
        <div className={styles.sidebar_info}>
          <a href={'/'}>
            <section className={styles.sidebar_header}>
              <Image
                src={logo}
                className={styles.logo}
                width='40'
                height='40'
                alt='logo'
              />
              <strong>Notes</strong>
            </section>
          </a>
          <section className={styles.sidebar_menu}>
            <SidebarSearchField />
            <Button.Edit noteId={''}>New</Button.Edit>
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
