import Note from '@/components/Note';
import Empty from '@/components/Empty';
import { getMyNote } from '@/app/actions';
import { sleep } from '@/lib/utils';

export default async function Page({ params }: PageProps) {
  // 动态路由 获取笔记 id
  const { id } = await params;
  const note = await getMyNote(id);

  // await sleep(1000000);

  if (note == null) {
    return <Empty />;
  }

  return <Note noteId={id} note={note} />;
}
