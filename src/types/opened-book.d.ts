import { Chapter } from './chapter';

interface Book {
  id: string;
  name: string;
  chapters: Chapter[];
}

export type OpenedBook = Book | null;
