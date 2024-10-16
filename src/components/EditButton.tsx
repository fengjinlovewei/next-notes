// components/EditButton.js
import Link from 'next/link';

interface Props extends PropsBase {
  noteId: string;
}

export default function EditButton({ noteId, children }: Props) {
  const isDraft = noteId === '';
  return (
    <Link href={`/note/edit/${noteId}`} className='link--unstyled'>
      <button
        className={[
          'edit-button',
          isDraft ? 'edit-button--solid' : 'edit-button--outline',
        ].join(' ')}
        role='menuitem'>
        {children}
      </button>
    </Link>
  );
}
