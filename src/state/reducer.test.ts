import { INITIAL_BOOK_PREVIEWS_SEARCH_PARAMS } from '../application.constants';
import { bookPreviews, openedBook, profiles } from '../mocks/data';
import { initialState, State } from './provider';
import reducer from './reducer';

describe('reducer', () => {
  test('should update the state', async () => {
    let state = initialState as State;

    state = reducer(state, {
      type: 'SHOW_NOTIFICATION',
      payload: { notificationType: 'success', message: 'some message' },
    });
    expect(
      state.notifications.findIndex((x) => x.type === 'success' && x.message === 'some message')
    ).not.toStrictEqual(-1);

    const notification = state.notifications[0];
    state = reducer(state, {
      type: 'HIDE_NOTIFICATION',
      payload: { notificationId: notification.id },
    });
    expect(state.notifications.findIndex((x) => x.id === notification.id)).toStrictEqual(-1);

    state = reducer(state, {
      type: 'SET_BOOK_PREVIEWS',
      payload: { bookPreviews },
    });
    expect(state.bookPreviews).toStrictEqual(bookPreviews);

    state = reducer(state, {
      type: 'ADD_PROFILE',
      payload: { profile: { ...profiles[0], avatarImage: 'image' } },
    });
    expect(state.profiles).toStrictEqual([{ ...profiles[0], avatarImage: 'image' }]);

    state = reducer(state, {
      type: 'SET_OPENED_BOOK',
      payload: { openedBook },
    });
    expect(state.openedBook).toStrictEqual(openedBook);

    state = reducer(state, {
      type: 'SET_SEARCH_PARAMS',
      payload: { ...INITIAL_BOOK_PREVIEWS_SEARCH_PARAMS },
    });
    expect(state.searchParams).toStrictEqual(INITIAL_BOOK_PREVIEWS_SEARCH_PARAMS);

    state = reducer(state, {
      type: 'SET_BOOK_PREVIEWS_PAGING',
      payload: { count: 5, current: 3 },
    });
    expect(state.bookPreviewsPaging).toStrictEqual({ count: 5, current: 3 });

    state = reducer(state, {
      type: 'SET_LOADING',
      payload: { loading: true },
    });
    expect(state.loading).toBeTruthy();
  });
});
