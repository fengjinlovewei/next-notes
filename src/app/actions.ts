'use server';

import { redirect } from 'next/navigation';
import {
  getNote,
  addNote,
  updateNote,
  delNote,
  getSraechNotes,
  addUser,
  getUser,
  getAllNotes,
} from '@/lib/prisma';
import { getUserSession, getUserSessionData } from '@/lib/session';

import { cookies } from 'next/headers';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { sleep } from '@/lib/utils';
import { login } from '@/lib/session';

const userRegisterSchema = z.object({
  username: z.string().min(1, '用户名不能为空').max(50, '字数最多 50'),
  password: z.string().min(6, '密码最少6位').max(50, '密码最多  50 位'),
  invitecode: z.string().regex(/182769/, '邀请码错误'),
});

const userLoginSchema = z.object({
  username: z.string().min(1, '用户名不能为空').max(50, '字数最多 50'),
  password: z.string().min(1, '密码不能为空').max(50, '密码最多  50 位'),
});

const saveNoteSchema = z.object({
  title: z.string(),
  content: z.string().min(1, '请填写内容').max(50000, '字数最多 50000'),
});

const validatedYzm = async (yzm: string): Promise<ResponesData | null> => {
  const session = await getUserSessionData();

  if (yzm?.toLocaleLowerCase() !== session.yzm?.toLocaleLowerCase()) {
    return {
      code: 102,
      errors: '验证码错误',
    };
  }
  return null;
};

export async function userRegister(
  prevState: any,
  formData: FormData,
): Promise<ResponesData> {
  console.log('prevState', prevState);
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const yzm = formData.get('yzm') as string;
  const invitecode = formData.get('invitecode') as string;

  const v = await validatedYzm(yzm);

  if (v) return v;

  // 校验数据
  const validated = userRegisterSchema.safeParse({
    username,
    password,
    invitecode,
  });
  if (!validated.success) {
    return {
      errors: validated.error.issues.map((item) => item.message).join(','),
    };
  }

  try {
    const data = await addUser(username, password);

    return {
      code: 0,
      message: '注册成功',
      data,
    };
  } catch (e: any) {
    if (e.code === 'P2002') {
      return {
        code: 100,
        errors: `用户名已存在`,
      };
    }
    return {
      code: 101,
      errors: `rediserror - ${JSON.stringify(e)}`,
    };
  }
}

export async function userLogin(
  prevState: any,
  formData: FormData,
): Promise<ResponesData> {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const yzm = formData.get('yzm') as string;

  const v = await validatedYzm(yzm);

  if (v) return v;

  // 校验数据
  const validated = userLoginSchema.safeParse({ username, password });
  if (!validated.success) {
    return {
      errors: validated.error.issues.map((item) => item.message).join(','),
    };
  }

  try {
    const data = await getUser(username, password);

    if (data === 0 || data === 1) {
      return {
        code: 200,
        errors: '账号或密码错误',
      };
    }

    await login(data.username, data.userId);

    return {
      code: 0,
      message: '登陆成功',
      data,
    };
  } catch (e) {
    return {
      code: 201,
      errors: `rediserror - ${JSON.stringify(e)}`,
    };
  }
}

export async function getMyAllNotes() {
  const session = await getUserSession();
  // 查找登录用户的笔记
  const res = await getAllNotes(session.user.userId);
  return res;
}

export async function getMySearchNote(searchContent: string) {
  const session = await getUserSession();

  const data = await getSraechNotes(session.user.userId, searchContent);
  return data;
}

export async function getMySearchNoteForm(prevState: any, formData: FormData) {
  const session = await getUserSession();

  const searchContent = formData.get('search') as string;

  try {
    const data = await getSraechNotes(session.user.userId, searchContent);
    return data;
  } catch (e) {
    return {
      errors: `rediserror - ${JSON.stringify(e)}`,
    };
  }
}

export async function getMyNote(uuid: string) {
  await getUserSession();
  const res = await getNote(uuid);
  return res;
}

export async function saveNote({
  title,
  content,
  noteId,
  pathName,
}: AddNoteData): Promise<ResponesData> {
  const session = await getUserSession();

  const data = {
    title,
    content,
    pathName,
    updateTime: new Date(),
  };

  // 校验数据
  const validated = saveNoteSchema.safeParse(data);
  if (!validated.success) {
    return {
      errors: validated.error.issues.map((item) => item.message).join(','),
    };
  }
  let noteData: Note;
  if (noteId) {
    noteData = await updateNote(noteId, data);
    // revalidatePath('/', 'layout')
    // redirect(`/note/${noteId}`);
  } else {
    noteData = await addNote(session.user.userId, data);
    //revalidatePath('/', 'layout')
    // redirect(`/note/${id}`);
  }

  revalidatePath('/', 'layout');

  return {
    code: 0,
    message: `保存成功!`,
    data: noteData,
  };
}

export async function saveNoteForm(
  prevState: any,
  formData: FormData,
): Promise<ResponesData> {
  const noteId = formData.get('noteId') as string;
  const isAdd = formData.get('isAdd') as '0' | '1';
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  const noteData = await saveNote({ noteId, title, content });

  if (isAdd === '1') {
    redirect(`/note/${noteData.data.id}`);
  }

  return {
    code: 0,
    message: `保存成功!`,
    data: noteData,
  };
}

export async function deleteNote(
  prevState: any,
  formData: FormData,
): Promise<ResponesData> {
  await getUserSession();

  const noteId = formData.get('noteId') as string;

  await delNote(noteId);
  //revalidatePath('/', 'layout')
  redirect('/note');

  // return { code: 0, message: `删除成功` };
}
