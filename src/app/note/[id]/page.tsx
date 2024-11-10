import Note from '@/components/Note';
import Empty from '@/components/Empty';
import { getMyNote } from '@/app/actions';
import { sleep } from '@/lib/utils';

interface Props {
  params: any;
}

export default async function Page({ params }: Props) {
  // 动态路由 获取笔记 id
  const noteId = params.id;
  const note = await getMyNote(noteId);

  if (note == null) {
    return <Empty />;
  }

  return <Note noteId={noteId} note={note} />;
}
