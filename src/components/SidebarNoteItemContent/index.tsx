'use client';

import { useState, ReactNode, MouseEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';

import SwitchArrow from '@/components/SwitchArrow';

import cls from 'classnames';
import styles from './index.module.scss';

interface Props extends PropsBase {
  note: Note;
  expandedChildren: ReactNode;
}

export default function SidebarNoteContent({
  note,
  children,
  expandedChildren,
}: Props) {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [isExpanded, setIsExpanded] = useState(false);

  const { id } = note;

  const { id: currentId } = params;

  const handleToggle: (
    e: MouseEvent<HTMLElement, globalThis.MouseEvent>,
  ) => void = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const showDetails = () => {
    router.push(`/note/${id}`);
  };

  return (
    <div
      className={cls(styles.item, {
        [styles.expanded]: isExpanded,
        [styles.active]: id === currentId,
      })}
      onClick={showDetails}>
      {children}
      <div className={styles.expand} onClick={handleToggle}>
        <SwitchArrow open={isExpanded} size='20px' />
      </div>
      {isExpanded && expandedChildren}
    </div>
  );
}
