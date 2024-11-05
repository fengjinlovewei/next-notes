import Note from '@/components/Note';
import Empty from '@/components/Empty';
import { getNote } from '@/lib/redis';
import { sleep } from '@/lib/utils';

interface Props {
  params: any;
}

export default async function Page({ params }: Props) {
  // 动态路由 获取笔记 id
  const noteId = params.id;
  const note = await getNote(noteId);

  // 为了让 Suspense 的效果更明显
  await sleep(500);

  if (note == null) {
    return <Empty />;
  }

  return <Note noteId={noteId} note={note} />;
}
