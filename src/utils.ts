import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';

export const getErrorMessage = (error: FetchBaseQueryError, defaultMessage: string) =>
  (error.data as { message: string })?.message ?? defaultMessage;
