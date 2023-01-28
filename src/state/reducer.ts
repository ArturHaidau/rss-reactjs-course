import { Action, State } from './provider';

const reducer = (state: State, action: Action): State => {
  const { type, payload } = action;
  const { notifications } = state;
  switch (type) {
    case 'SHOW_NOTIFICATION':
      return {
        ...state,
        notifications: [
          ...notifications,
          { id: crypto.randomUUID(), type: payload.notificationType, message: payload.message },
        ],
      };
    case 'HIDE_NOTIFICATION':
      const index = notifications.findIndex((x) => x.id === payload.notificationId);
      const newArray = [...notifications];
      newArray.splice(index, 1);
      return { ...state, notifications: newArray };
    case 'SET_BOOK_PREVIEWS':
      return { ...state, bookPreviews: payload.bookPreviews };
    case 'ADD_PROFILE':
      return { ...state, profiles: [...state.profiles, payload.profile] };
    case 'SET_OPENED_BOOK':
      return { ...state, openedBook: payload.openedBook };
    case 'SET_SEARCH_PARAMS':
      return { ...state, searchParams: { ...state.searchParams, ...payload } };
    case 'SET_BOOK_PREVIEWS_PAGING':
      return { ...state, bookPreviewsPaging: { ...payload } };
    case 'SET_LOADING':
      return { ...state, loading: payload.loading };
    default:
      return state;
  }
};

export default reducer;
