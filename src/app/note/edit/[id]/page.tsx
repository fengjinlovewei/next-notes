import NoteEditor from '@/components/NoteEditor';
import Empty from '@/components/Empty';
import { getMyNote } from '@/app/actions';

import { sleep } from '@/lib/utils';

export default async function EditPage({ params }: PageProps) {
  const { id } = await params;
  const note = await getMyNote(id);

  if (note === null) {
    return <Empty />;
  }

  return (
    <NoteEditor
      noteId={id}
      initialTitle={note.title}
      initialBody={note.content}
    />
  );
}
