import type { ReactNode } from 'react';
import type { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient;

  interface ResponesData {
    message?: string;
    errors?: string;
    code?: 0 | 100 | 101 | 200 | 201;
    data?: Record<string, string>;
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

  type NoteUpdataData = Partial<NoteData>;
}
