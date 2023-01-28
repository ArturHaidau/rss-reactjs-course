import { File } from './file';

export interface Task {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  files: File[];
}

export interface DraggedTask extends Task {
  columnId: string;
}
