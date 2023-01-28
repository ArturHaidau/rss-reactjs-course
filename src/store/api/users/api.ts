import { createApi } from '@reduxjs/toolkit/query/react';
import { User } from '../../../types/user';
import baseQuery from '../baseQuery';
import { UpdateRequest } from './types';

const baseURL = () => 'users';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getAll: builder.query<User[], void>({
      query: () => ({
        url: baseURL(),
      }),
    }),
    getById: builder.query<User, string>({
      query: (userId) => ({
        url: `${baseURL()}/${userId}`,
      }),
      providesTags: ['User'],
    }),
    deleteById: builder.mutation<void, string>({
      query: (userId) => ({
        url: `${baseURL()}/${userId}`,
        method: 'DELETE',
      }),
    }),
    update: builder.mutation<User, UpdateRequest>({
      query: ({ id, ...body }) => ({
        url: `${baseURL()}/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});
