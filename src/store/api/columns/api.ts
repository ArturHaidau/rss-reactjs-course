import { createApi } from '@reduxjs/toolkit/query/react';
import { ColumnPreview } from '../../../types/column-preview';
import { queryWithBoardInvalidate } from '../../utils';
import baseQuery from '../baseQuery';
import { CreateRequest, DeleteByIdRequest, UpdateRequest } from './types';

const baseURL = (boardId: string) => `/boards/${boardId}/columns`;

export const columnsApi = createApi({
  reducerPath: 'columnsApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    create: builder.mutation<ColumnPreview, CreateRequest>({
      queryFn: async ({ boardId, ...body }, api, extraOptions, baseQuery) =>
        queryWithBoardInvalidate<ColumnPreview>(
          {
            url: baseURL(boardId),
            method: 'POST',
            body,
          },
          baseQuery,
          api
        ),
    }),
    deleteById: builder.mutation<void, DeleteByIdRequest>({
      queryFn: ({ boardId, id }, api, extraOptions, baseQuery) =>
        queryWithBoardInvalidate<void>(
          {
            url: `${baseURL(boardId)}/${id}`,
            method: 'DELETE',
          },
          baseQuery,
          api
        ),
    }),
    update: builder.mutation<ColumnPreview, UpdateRequest>({
      queryFn: async ({ boardId, id, ...body }, api, extraOptions, baseQuery) =>
        queryWithBoardInvalidate<ColumnPreview>(
          {
            url: `${baseURL(boardId)}/${id}`,
            method: 'PUT',
            body,
          },
          baseQuery,
          api
        ),
    }),
  }),
});
