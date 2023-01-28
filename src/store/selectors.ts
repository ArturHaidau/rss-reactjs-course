import { QueryStatus } from '@reduxjs/toolkit/query';
import { State } from './index';

export const selectNotifications = (state: State) => state.notifications;
export const selectAuth = (state: State) => state.auth;
export const selectLoading = (state: State) =>
  [state.authApi, state.boardsApi, state.columnsApi, state.tasksApi, state.usersApi].some((api) =>
    Object.values({ ...api.mutations, ...api.queries }).some(
      (x) => x?.status === QueryStatus.pending
    )
  );
