interface Base {
  boardId: string;
  columnId: string;
}

export interface CreateRequest extends Base {
  title: string;
  description: string;
  userId: string;
}

export interface CreateResponse extends CreateRequest {
  id: string;
}

interface Task {
  title: string;
  order: number;
  description: string;
  userId: string;
}

export interface UpdateRequest extends Base, Task {
  taskId: string;
  oldColumnId: string;
}

export interface UpdateResponse extends Base, Task {
  id: string;
}

export interface DeleteRequest extends Base {
  id: string;
}
