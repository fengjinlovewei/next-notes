import { getNote, getUserData } from '@/lib/prisma';

import NotePreview from '@/components/NotePreview';

export default async function Page({
  params,
}: PageProps<{ author: string; articleId: string }>) {
  const { author, articleId } = await params;

  const userData = await getUserData(author);
  if (!userData) {
    return <div>未知作者！</div>;
  }

  const note = await getNote(articleId, {
    public: true,
    authorId: userData.id,
  });

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
