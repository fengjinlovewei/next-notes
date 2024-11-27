'use client';

import { useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import cls from 'classnames';
import { debounce } from 'lodash-es';

import Spinner from '@/components/Spinner';
import Input from '@/components/Input';

import styles from './index.module.scss';

export default function SidebarSearchField() {
  const { replace, refresh } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  //是否输入完成值
  const composition = useRef(false);

  const searchVal = searchParams.get('search') ?? '';

  const handleSearch = debounce((value: string) => {
    if (composition.current) return;
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

  return (
    <div className={styles.search}>
      <Input
        icon='icon-search'
        defaultValue={searchVal}
        className={styles.searchInput}
        focusClassName={styles.searchInputActive}
        onCompositionEnd={() => {
          composition.current = false;
        }}
        onCompositionStart={() => {
          composition.current = true;
        }}
        onChange={(e) => {
          console.log(e.target.value);
          handleSearch(e.target.value);
        }}
        placeholder='搜索'
      />
      <Spinner active={isPending} className={styles.spinner} />
    </div>
  );
}
