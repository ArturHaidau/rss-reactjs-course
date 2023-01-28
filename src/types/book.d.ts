import { Chapter } from './chapter';

export interface Book {
  id: string;
  name: string;
  chapters: Chapter[];
}
