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

interface Props {
  params: { name: string };
}

export default async function Page({ params }: Props) {
  const username = params.name;

  return <Home username={username} />;
}
