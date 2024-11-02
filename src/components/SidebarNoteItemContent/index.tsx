'use client';

import { useState, useRef, useEffect, useTransition, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

import chevroDown from '@/images/chevron-down.svg';
import chevroUp from '@/images/chevron-up.svg';

interface Props extends PropsBase {
  id: string;
  title: string;
  expandedChildren: ReactNode;
}

export default function SidebarNoteContent({
  id,
  title,
  children,
  expandedChildren,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const selectedId = pathname?.split('/')[1] || null;

  const [isPending] = useTransition();
  const [isExpanded, setIsExpanded] = useState(false);
  const isActive = id === selectedId;

  // Animate after title is edited.
  const itemRef = useRef<null | HTMLDivElement>(null);
  const prevTitleRef = useRef(title);

  useEffect(() => {
    if (title !== prevTitleRef.current) {
      prevTitleRef.current = title;
      itemRef.current?.classList.add('flash');
    }
  }, [title]);

  return (
    <div
      ref={itemRef}
      onAnimationEnd={() => {
        itemRef.current?.classList?.remove('flash');
      }}
      className={[
        'sidebar-note-list-item',
        isExpanded ? 'note-expanded' : '',
      ].join(' ')}>
      {children}
      <button
        className='sidebar-note-open'
        style={{
          backgroundColor: isPending
            ? 'var(--gray-80)'
            : isActive
            ? 'var(--tertiary-blue)'
            : '',
          border: isActive
            ? '1px solid var(--primary-border)'
            : '1px solid transparent',
        }}
        onClick={() => {
          const sidebarToggle = document.getElementById(
            'sidebar-toggle',
          ) as HTMLInputElement;
          if (sidebarToggle) {
            sidebarToggle.checked = true;
          }
          router.push(`/note/${id}`);
        }}>
        Open note for preview
      </button>
      <button
        className='sidebar-note-toggle-expand'
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}>
        {isExpanded ? (
          <Image src={chevroDown} width='10' height='10' alt='Collapse' />
        ) : (
          <Image src={chevroUp} width='10' height='10' alt='Expand' />
        )}
      </button>
      {isExpanded && expandedChildren}
    </div>
  );
}
