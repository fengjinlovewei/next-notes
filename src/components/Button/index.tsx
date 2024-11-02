// components/EditButton.js
import Link from 'next/link';
import cls from 'classnames';
import styles from './index.module.scss';

interface Props extends PropsBase {
  noteId: string;
}

export function Edit({ noteId, children }: Props) {
  const isDraft = noteId === '';
  return (
    <Link href={`/note/edit/${noteId}`}>
      <button
        className={cls([styles.btn, isDraft ? styles.solid : styles.outline])}>
        {children}
      </button>
    </Link>
  );
}

//export function

const Button = {
  Edit,
};

export default Button;
