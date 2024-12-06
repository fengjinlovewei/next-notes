import type { ReactNode } from 'react';
import type { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient;

  interface LayoutProps<T = { [key: string]: any }> {
    params: Promise<T>;
  }

  interface ApiProps extends LayoutProps {}
  interface PageProps<
    T = { [key: string]: any },
    S = { [key: string]: string | string[] | undefined },
  > {
    params: Promise<T>;
    searchParams: Promise<S>;
  }

  interface ResponesData {
    message?: string;
    errors?: any;
    code?: 0 | 100 | 101 | 102 | 200 | 201;
    data?: any;
  }
  interface PropsBase {
    children?: ReactNode;
    className?: string;
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
    pathName?: string;
    public?: boolean;
  }

  interface AddNoteData extends NoteData {
    noteId?: string; // 有这个id就说明是修改保存
  }

  type NoteUpdataData = Partial<NoteData>;

  interface FileInfo {
    md5: string;
    fileName: string;
    index: number;
    length: number;
    type: string;
    fetchType?: 'md';
  }

  interface LargeFileRespone {
    fileUrl: string;
    filesUrl: string;
  }

  type Func = (...arg: any[]) => void;
}
