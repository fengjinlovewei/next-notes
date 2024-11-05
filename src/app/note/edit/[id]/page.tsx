import NoteEditor from '@/components/NoteEditor';
import Empty from '@/components/Empty';
import { getNote } from '@/lib/redis';

import { sleep } from '@/lib/utils';

interface Props {
  params: any;
}

export default async function EditPage({ params }: Props) {
  const noteId = params.id;
  const note = await getNote(noteId);

  // 让效果更明显
  await sleep(300);

  if (note === null) {
    return <Empty />;
  }

  return (
    <NoteEditor
      noteId={noteId}
      initialTitle={note.title}
      initialBody={note.content}
    />
  );
}
