// 'use client';

// import { revalidatePath } from 'next/cache';
// import { useRouter } from 'next/navigation';

import styles from './index.module.scss';
import cls from 'classnames';

interface Props extends PropsBase {}

export default function SidebarTitle({}: Props) {
  // const router = useRouter();
  // const home = () => {
  //   router.push(`/`);
  // };

  return (
    <div className={styles.sidebarHeaderBox}>
      <a href='/note'>
        <section className={styles.sidebarHeader}>
          <i className={cls('iconfont icon-logo', styles.logo)}></i>
          {/* <strong>笔记本</strong> */}
        </section>
      </a>
    </div>
  );
}
