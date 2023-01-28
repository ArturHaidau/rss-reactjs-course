import { configureStore } from '@reduxjs/toolkit';
import booksSlice from './slices/books';
import loadingSlice from './slices/loading';
import notificationsSlice from './slices/notifications';
import profilesSlice from './slices/profiles';

const store = configureStore({
  reducer: {
    loading: loadingSlice,
    notifications: notificationsSlice,
    books: booksSlice,
    profiles: profilesSlice,
  },
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;
