'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import cls from 'classnames';
import { debounce } from 'lodash-es';

import Spinner from '@/components/Spinner';

import styles from './index.module.scss';

export default function SidebarSearchField() {
  const { replace, refresh } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const searchVal = searchParams.get('search') ?? '';

  const handleSearch = debounce((value: string) => {
    console.log('value', value);

    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
      refresh();
    });
  }, 300);

  console.log('render', searchVal);

  return (
    <div className={styles.search}>
      <input
        defaultValue={searchVal}
        placeholder='Search'
        type='text'
        onChange={(e) => {
          console.log(e.target.value);
          handleSearch(e.target.value);
        }}
      />
      <Spinner active={isPending} className={styles.spinner} />
    </div>
  );
}
