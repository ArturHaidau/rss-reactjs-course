import { createApi } from '@reduxjs/toolkit/query/react';
import { SignInData, SignUpData } from '../../../types/auth';
import { SignInResponse } from './types';
import baseQuery from '../baseQuery';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInResponse, SignInData>({
      query: (signInData) => ({
        url: 'signin',
        method: 'POST',
        body: signInData,
      }),
    }),
    signUp: builder.mutation<void, SignUpData>({
      query: (signUpData) => ({
        url: 'signup',
        method: 'POST',
        body: signUpData,
      }),
    }),
  }),
});
