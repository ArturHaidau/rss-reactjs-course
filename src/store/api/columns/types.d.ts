interface Base {
  boardId: string;
}

export interface CreateRequest extends Base {
  title: string;
}

export interface DeleteByIdRequest extends Base {
  id: string;
}

export interface UpdateRequest extends Base {
  id: string;
  title: string;
  order: number;
}
