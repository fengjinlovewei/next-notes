// components/EditButton.js
import { ButtonHTMLAttributes } from 'react';
import Link from 'next/link';
import cls from 'classnames';
import styles from './index.module.scss';

import SidebarTitle from '@/components/SidebarTitle';
import SidebarSearchField from '@/components/SidebarSearchField';
import Button from '@/components/Button';
import UpLoad from '@/components/UpLoad';

interface Props extends PropsBase {}

export function Nav(props: Props) {
  const {} = props;
  return (
    <nav className={styles.nav}>
      <div className={styles.navLeft}>
        <div className={styles.navLogo}>
          <SidebarTitle />
        </div>

        <SidebarSearchField />
        <div className={styles.navTools}>
          <Link href={`/note/edit`} className={styles.addBtn}>
            <Button.Default>新建笔记</Button.Default>
          </Link>
          <UpLoad zoom={0.64} text='上传笔记' />
        </div>
      </div>
    </nav>
  );
}

export default Nav;
