import { getNote, getUserData } from '@/lib/prisma';

import NotePreview from '@/components/NotePreview';

interface Props {
  params: { name: string; id: string };
}

export default async function Page({ params }: Props) {
  const { name, id } = params;

  const userData = await getUserData(name);
  if (!userData) {
    return <div>未知作者！</div>;
  }

  const note = await getNote(id, { public: true, authorId: userData.id });

  if (!note) {
    return <div>作者 {userData.username} 没有这篇文章！！</div>;
  }

  return (
    <div>
      <h1>{note.title}</h1>
      <NotePreview>{note.content}</NotePreview>
    </div>
  );
}
