import NoteEditor from '@/components/NoteEditor';

interface Props extends PropsBase {}

export default async function EditPage() {
  return <NoteEditor noteId='' initialTitle='Untitled' initialBody='' />;
}
