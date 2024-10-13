'use server';

import { redirect } from 'next/navigation';
import { addNote, updateNote, delNote } from '@/lib/redis';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { sleep } from '@/lib/utils';

const schema = z.object({
  title: z.string(),
  content: z.string().min(1, '请填写内容').max(100, '字数最多 100'),
});

export async function saveNote(prevState: any, formData: FormData) {
  await sleep(400);
  const noteId = formData.get('noteId') as string;
  const isAdd = formData.get('isAdd') as string;

  const data = {
    title: formData.get('title'),
    content: formData.get('body'),
    updateTime: new Date(),
  };

  // 校验数据
  const validated = schema.safeParse(data);
  if (!validated.success) {
    return {
      errors: validated.error.issues,
    };
  }
  let id = noteId;
  if (noteId) {
    updateNote(noteId, JSON.stringify(data));
    // revalidatePath('/', 'layout')
    // redirect(`/note/${noteId}`);
  } else {
    id = await addNote(JSON.stringify(data));
    //revalidatePath('/', 'layout')
    // redirect(`/note/${id}`);
  }

  if (isAdd === '1') {
    redirect(`/note/${id}`);
  }

  // revalidatePath('/', 'layout');

  return { message: `Add Success!` };
}

export async function deleteNote(prevState: any, formData: FormData) {
  const noteId = formData.get('noteId') as string;

  delNote(noteId);
  //revalidatePath('/', 'layout')
  redirect('/');
}
