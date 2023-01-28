import { createApi } from '@reduxjs/toolkit/query/react';
import { AddBoard } from '../../types/add-board';
import { Board } from '../../types/board';
import { BoardPreview } from '../../types/board-preview';
import baseQuery from './baseQuery';

export const boardsApi = createApi({
  reducerPath: 'boardsApi',
  baseQuery: baseQuery,
  tagTypes: ['Board', 'BoardPreviews'],
  endpoints: (builder) => ({
    getAll: builder.query<BoardPreview[], void>({
      query: () => ({
        url: 'boards',
      }),
      providesTags: ['BoardPreviews'],
    }),
    create: builder.mutation<BoardPreview, AddBoard>({
      query: (body) => ({
        url: 'boards',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['BoardPreviews'],
    }),
    getById: builder.query<Board, string>({
      query: (id) => ({
        url: `boards/${id}`,
      }),
      providesTags: ['Board'],
    }),
    deleteById: builder.mutation<void, string>({
      query: (id) => ({
        url: `boards/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BoardPreviews'],
    }),
    update: builder.mutation<BoardPreview, BoardPreview>({
      query: ({ id, ...body }) => ({
        url: `boards/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Board', 'BoardPreviews'],
    }),
  }),
});
