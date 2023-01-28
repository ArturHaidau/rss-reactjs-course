import { State } from './index';

export const selectLoading = (state: State) => state.loading.value;
export const selectProfiles = (state: State) => state.profiles;
export const selectNotifications = (state: State) => state.notifications;
export const selectBooks = (state: State) => state.books;
