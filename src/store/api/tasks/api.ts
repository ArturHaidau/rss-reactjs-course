import { createApi } from '@reduxjs/toolkit/query/react';
import { queryWithBoardInvalidate } from '../../utils';
import baseQuery from '../baseQuery';
import {
  CreateRequest,
  CreateResponse,
  DeleteRequest,
  UpdateRequest,
  UpdateResponse,
} from './types';

const baseURL = (boardId: string, columnId: string) =>
  `/boards/${boardId}/columns/${columnId}/tasks`;

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    create: builder.mutation<CreateResponse, CreateRequest>({
      queryFn: async ({ boardId, columnId, ...body }, api, extraOptions, baseQuery) =>
        queryWithBoardInvalidate<CreateResponse>(
          {
            url: baseURL(boardId, columnId),
            method: 'POST',
            body,
          },
          baseQuery,
          api
        ),
    }),
    deleteById: builder.mutation<void, DeleteRequest>({
      queryFn: async ({ boardId, columnId, id }, api, extraOptions, baseQuery) =>
        queryWithBoardInvalidate<void>(
          {
            url: `${baseURL(boardId, columnId)}/${id}`,
            method: 'DELETE',
          },
          baseQuery,
          api
        ),
    }),
    update: builder.mutation<UpdateResponse, UpdateRequest>({
      queryFn: async ({ boardId, taskId, oldColumnId, ...rest }, api, extraOptions, baseQuery) =>
        queryWithBoardInvalidate<UpdateResponse>(
          {
            url: `${baseURL(boardId, oldColumnId)}/${taskId}`,
            method: 'PUT',
            body: { ...rest, boardId },
          },
          baseQuery,
          api
        ),
    }),
  }),
});
