import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as dispatch } from 'react-redux';
import { ACCESS_TOKEN_KEY } from '../application.constants';
import { authApi } from './api/auth/api';
import { boardsApi } from './api/boards';
import { columnsApi } from './api/columns/api';
import { tasksApi } from './api/tasks/api';
import { usersApi } from './api/users/api';
import authSlice from './slices/auth';
import notificationsSlice from './slices/notifications';

const store = configureStore({
  reducer: {
    notifications: notificationsSlice,
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    [boardsApi.reducerPath]: boardsApi.reducer,
    [columnsApi.reducerPath]: columnsApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (gDM) =>
    gDM().concat(
      authApi.middleware,
      boardsApi.middleware,
      columnsApi.middleware,
      tasksApi.middleware,
      usersApi.middleware
    ),
});

store.subscribe(() => {
  localStorage.setItem(ACCESS_TOKEN_KEY, store.getState().auth.accessToken);
});

export type State = ReturnType<typeof store.getState>;
type Dispatch = typeof store.dispatch;

export const useDispatch = dispatch<Dispatch>;

export default store;
