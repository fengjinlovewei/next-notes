'use client';

import { useState, ReactNode, MouseEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';

import SwitchArrow from '@/components/SwitchArrow';

import cls from 'classnames';
import styles from './index.module.scss';

import chevroDown from '@/images/chevron-down.svg';
import chevroUp from '@/images/chevron-up.svg';

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

  console.log('paramsparams', currentId);

  const handleToggle: (
    e: MouseEvent<HTMLElement, globalThis.MouseEvent>,
  ) => void = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const showDetails = () => {
    router.push(`/note/${id}`);
  };

  const img = isExpanded ? chevroDown : chevroUp;
  const alt = isExpanded ? 'Collapse' : 'Expand';

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
      {/* <button className={styles.expand} onClick={handleToggle}>
        <Image src={img} width='10' height='10' alt={alt} />
      </button> */}

      {isExpanded && expandedChildren}
    </div>
  );
}
