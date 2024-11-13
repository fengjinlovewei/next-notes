'use client';

import { useRef } from 'react';
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
      <input
        defaultValue={searchVal}
        placeholder='搜索'
        type='text'
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
      />

      <svg fill='#999' width='20px' height='20px' viewBox='0 0 1920 1920'>
        <path
          d='M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z'
          fillRule='evenodd'></path>
      </svg>

      <Spinner active={isPending} className={styles.spinner} />
    </div>
  );
}
