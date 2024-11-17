import type { ReactNode } from 'react';
import type { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient;

  interface ResponesData {
    message?: string;
    errors?: string;
    code?: 0 | 100 | 101 | 200 | 201;
    data?: any;
  }
  interface PropsBase {
    children?: ReactNode;
  }

  interface Note {
    id: string;
    title: string;
    content: string;
    public: boolean;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
  }

  type NoteSearchData = Partial<Note>;

  interface NoteData {
    title: string;
    content: string;
    public?: boolean;
  }

  interface AddNoteData extends NoteData {
    noteId?: string; // 有这个id就说明是修改保存
  }

  type NoteUpdataData = Partial<NoteData>;

  interface FileInfo {
    md5: string;
    fileName: string;
    extName: string;
    index: number;
    length: number;
  }

  interface LargeFileRespone {
    fileUrl: string;
    filesUrl: string;
  }
}
