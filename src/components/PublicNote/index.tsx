import Link from 'next/link';
import NotePreview from '@/components/NotePreview';
import Button from '@/components/Button';
import styles from './index.module.scss';

interface Props extends PropsBase {}

export default function Note({}: Props) {
  return <div className={styles.note}></div>;
}
