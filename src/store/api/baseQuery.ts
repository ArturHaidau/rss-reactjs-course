import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query/react';
import { HttpStatus, REQUEST_TIMEOUT } from '../../application.constants';
import { getErrorMessage } from '../../utils';
import { State } from '../index';
import { signOut } from '../slices/auth';
import { showNotification } from '../slices/notifications';

const query = fetchBaseQuery({
  baseUrl: process.env.BACKEND_URL,
  timeout: REQUEST_TIMEOUT,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as State).auth.accessToken;
    token && headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await query(args, api, extraOptions);
  if (result.error) {
    api.dispatch(
      showNotification({
        type: 'error',
        message: getErrorMessage(result.error, 'Request failed'),
      })
    );
    if (
      result.error.status === HttpStatus.Unauthorized ||
      result.error.status === HttpStatus.Forbidden
    )
      api.dispatch(signOut());
  }
  return result;
};

export default baseQuery;
