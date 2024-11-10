import type { ReactNode } from 'react';
import type { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient;
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
