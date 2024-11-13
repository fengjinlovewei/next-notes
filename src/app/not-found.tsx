import Link from 'next/link';
import Image from 'next/image';
import { headers } from 'next/headers';

import img404 from '@/images/404.gif';

import styles from './not-found.module.scss';

export default async function NotFound() {
  const headersList = await headers();
  const domain = headersList.get('host');

  return (
    <div className={styles.notFoundBox}>
      <div className={styles.imgBox}>
        <Image priority src={img404} width='800' height='600' alt='404' />
        <Link href={'/'}>首页</Link>
      </div>
    </div>
  );
}
