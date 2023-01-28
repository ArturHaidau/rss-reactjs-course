import { act, renderHook } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { INITIAL_BOOK_PREVIEWS_SEARCH_PARAMS } from '../application.constants';
import { bookPreviewsResponse } from '../mocks/data';
import { mockRejectedFetchWith, mockResolvedFetchWith } from '../mocks/fetch';
import store from '../store';
import { createBookPreviewsFromResponse } from '../utils';
import useBooks from './useBooks';

describe('useBooks', () => {
  const render = () =>
    renderHook(() => useBooks(), {
      wrapper: ({ children }: PropsWithChildren) => <Provider store={store}>{children}</Provider>,
    });

  test('should dispatch book previews data', async () => {
    mockResolvedFetchWith(bookPreviewsResponse);
    const {
      result: {
        current: { searchBookPreviews },
      },
    } = render();
    await act(async () => {
      await searchBookPreviews(INITIAL_BOOK_PREVIEWS_SEARCH_PARAMS, 0);
    });
    const { page, pages } = bookPreviewsResponse;
    expect(store.getState().books.bookPreviewsPaging).toStrictEqual({
      count: pages,
      current: page,
    });
    expect(store.getState().books.bookPreviews).toStrictEqual(
      createBookPreviewsFromResponse(bookPreviewsResponse)
    );
  });

  test('should show error notification when fetching book previews failed', async () => {
    mockRejectedFetchWith(new Error('Fetching book previews failed'));
    const {
      result: {
        current: { searchBookPreviews },
      },
    } = render();
    await act(async () => {
      await searchBookPreviews(INITIAL_BOOK_PREVIEWS_SEARCH_PARAMS, 0);
    });
    expect(
      store
        .getState()
        .notifications.find(
          ({ type, message }) => type === 'error' && message === 'Failed to fetch book previews'
        )
    ).toBeTruthy();
  });
});
