'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import cls from 'classnames';

function Spinner({ active = true }) {
  return <div className={cls('spinner', { 'spinner--active': active })} />;
}

export default function SidebarSearchField() {
  const { replace, refresh } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const searchVal = searchParams.get('search') ?? '';

  function handleSearch(term: any) {
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
      refresh();
    });
  }

  return (
    <div className='search'>
      <input
        value={searchVal}
        id='sidebar-search-input'
        placeholder='Search'
        type='text'
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Spinner active={isPending} />
    </div>
  );
}
