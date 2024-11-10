'use server';

import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient();

// 为了避免开发环境下建立多个 Prisma Client 实例导致问题
// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function getAllNotes(userId: string, other: NoteSearchData = {}) {
  // 查找登录用户的笔记
  const notes = await prisma.note.findMany({
    where: {
      authorId: userId,
      ...other,
    },
  });
  // 构造返回数据

  return notes;
}

export async function getSraechNotes(userId: string, content: string) {
  const data = await getAllNotes(userId);

  if (!content) return data;

  content = content.toLocaleLowerCase();

  return data.filter((item) => {
    return item.content.toLocaleLowerCase().indexOf(content) > -1;
  });
}

export async function addNote(userId: string, data: NoteData) {
  const result = await prisma.note.create({
    data: {
      title: data.title,
      content: data.content,
      public: data.public,
      author: { connect: { id: userId } },
    },
  });

  return result.id;
}

export async function updateNote(uuid: string, data: NoteUpdataData) {
  return await prisma.note.update({
    where: {
      id: uuid,
    },
    data: {
      title: data.title,
      content: data.content,
      public: data.public,
    },
  });
}

export async function getNote(uuid: string) {
  const data = await prisma.note.findFirst({
    where: {
      id: uuid,
    },
  });

  if (!data) return null;

  return data;
}

export async function delNote(uuid: string) {
  await prisma.note.delete({
    where: {
      id: uuid,
    },
  });
}

export async function addUser(username: string, password: string) {
  const data = {
    username,
    password,
    notes: {
      create: [],
    },
  };
  const user = await prisma.user.create({
    data,
  });

  return {
    username,
    userId: user.id,
  };
}

export async function getUserData(username: string) {
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
    include: {
      notes: true,
    },
  });

  return user;
}

export async function getUser(username: string, password: string) {
  const user = await getUserData(username);
  if (!user) return 0;
  if (!user || user.password !== password) return 1;
  return {
    username,
    userId: user.id,
  };
}
