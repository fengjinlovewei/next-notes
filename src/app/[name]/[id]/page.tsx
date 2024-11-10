import Note from '@/components/Note';
import Empty from '@/components/Empty';
import { getMyNote } from '@/app/actions';
import {
  getNote,
  addNote,
  updateNote,
  delNote,
  getSraechNotes,
  addUser,
  getUser,
  getAllNotes,
  getUserData,
} from '@/lib/prisma';

import Home from '@/components/Home';
import NotePreview from '@/components/NotePreview';

interface Props {
  params: { id: string };
}

export default async function Page({ params }: Props) {
  const { id } = params;

  const note = await getNote(id);

  if (!note) {
    return <div>没有文章！！</div>;
  }

  return (
    <div>
      <h1>{note.title}</h1>
      <NotePreview>{note.content}</NotePreview>
    </div>
  );
}
