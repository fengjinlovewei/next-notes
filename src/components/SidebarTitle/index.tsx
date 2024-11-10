// 'use client';

import Image from 'next/image';
// import { revalidatePath } from 'next/cache';
// import { useRouter } from 'next/navigation';

import styles from './index.module.scss';

import logo from '@/images/logo.png';

interface Props extends PropsBase {}

export default function SidebarTitle({}: Props) {
  // const router = useRouter();
  // const home = () => {
  //   router.push(`/`);
  // };

  return (
    <a href='/note'>
      <section className={styles.sidebarHeader}>
        <Image
          src={logo}
          className={styles.logo}
          width='40'
          height='40'
          alt='logo'
        />
        <strong>笔记本</strong>
      </section>
    </a>
  );
}
