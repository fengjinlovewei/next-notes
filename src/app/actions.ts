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

import {
  userLoginSchema as oldUserLoginSchema,
  saveNoteSchema,
} from '@/lib/types';

import type {
  userLoginSchemaType,
  userRegisterSchemaType,
  saveNoteSchemaType,
} from '@/lib/types';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { sleep } from '@/lib/utils';
import { login } from '@/lib/session';

const invitecode_z = z.string().regex(/18232547182/, '邀请码错误');

const yzm_z = z.string().refine(
  async (yzm) => {
    const session = await getUserSessionData();
    return yzm?.toLocaleLowerCase() === session.yzm?.toLocaleLowerCase();
  },
  { message: '验证码错误' },
);

const userLoginSchema = oldUserLoginSchema.extend({
  yzm: yzm_z,
});

const userRegisterSchema = userLoginSchema.extend({
  invitecode: invitecode_z,
});

export async function userRegister(
  params: userRegisterSchemaType,
): Promise<ResponesData> {
  // 校验数据
  const validated = await userRegisterSchema.spa(params);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    const data = await addUser(params.username, params.password);

    return {
      code: 0,
      message: '注册成功',
      data,
    };
  } catch (e: any) {
    if (e.code === 'P2002') {
      return {
        code: 100,
        errors: {
          username: [`用户名已存在`],
        },
      };
    }
    return {
      code: 101,
      errors: `sqlerror - ${JSON.stringify(e)}`,
    };
  }
}

export async function userLogin(
  params: userLoginSchemaType,
): Promise<ResponesData> {
  // 校验数据
  const validated = await userLoginSchema.spa(params);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    const data = await getUser(params.username, params.password);

    if (data === 0 || data === 1) {
      return {
        code: 200,
        errors: {
          password: ['账号或密码错误'],
        },
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
      errors: validated.error.flatten().fieldErrors,
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
  params: saveNoteSchemaType,
): Promise<ResponesData> {
  // const noteId = formData.get('noteId') as string;
  // const isAdd = formData.get('isAdd') as '0' | '1';
  // const title = formData.get('title') as string;
  // const content = formData.get('content') as string;

  const { isAdd, ...data } = params;

  const noteData = await saveNote(data);

  if (noteData.errors) return noteData;

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
