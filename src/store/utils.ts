import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { BaseQueryApi, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';
import { MaybePromise } from '@reduxjs/toolkit/dist/query/tsHelpers';
import { boardsApi } from './api/boards';

export const queryWithBoardInvalidate = async <T>(
  fetchArgs: FetchArgs,
  baseQuery: (args: FetchArgs) => MaybePromise<QueryReturnValue<unknown, FetchBaseQueryError>>,
  { dispatch }: BaseQueryApi
) => {
  const result = await baseQuery(fetchArgs);
  if (result.error) return { error: result.error };
  else {
    dispatch(boardsApi.util.invalidateTags(['Board']));
    const data = result.data as T;
    return { data };
  }
};
