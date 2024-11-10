import NoteEditor from '@/components/NoteEditor';
import Empty from '@/components/Empty';
import { getMyNote } from '@/app/actions';

import { sleep } from '@/lib/utils';

interface Props {
  params: any;
}

export default async function EditPage({ params }: Props) {
  const noteId = params.id;
  const note = await getMyNote(noteId);

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
