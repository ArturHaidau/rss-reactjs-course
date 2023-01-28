import { renderHook } from '@testing-library/react';
import { INITIAL_BOOK_PREVIEWS_SEARCH_PARAMS } from '../application.constants';
import { bookChaptersResponse, bookPreviewsResponse } from '../mocks/data';
import { mockRejectedFetchWith, mockResolvedFetchWith } from '../mocks/fetch';
import { createBookPreviewsFromResponse, createChaptersFromResponse } from '../utils';
import useBooks from './useBooks';

const mockDispatch = jest.fn();

jest.mock('../state', () => ({
  useStateDispatch: () => mockDispatch,
}));

describe('useBooks', () => {
  test('should fetch book chapters', async () => {
    mockResolvedFetchWith(bookChaptersResponse);
    const {
      result: {
        current: { fetchBookChapters },
      },
    } = renderHook(() => useBooks());
    expect(await fetchBookChapters('id')).toStrictEqual(
      createChaptersFromResponse(bookChaptersResponse)
    );
  });

  test('should dispatch book previews data', async () => {
    mockResolvedFetchWith(bookPreviewsResponse);
    const {
      result: {
        current: { searchBookPreviews },
      },
    } = renderHook(() => useBooks());
    await searchBookPreviews(INITIAL_BOOK_PREVIEWS_SEARCH_PARAMS, 0);
    const { page, pages } = bookPreviewsResponse;
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_BOOK_PREVIEWS_PAGING',
      payload: { count: pages, current: page },
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_BOOK_PREVIEWS',
      payload: { bookPreviews: createBookPreviewsFromResponse(bookPreviewsResponse) },
    });
  });

  test('should throw error when fetching book previews failed', async () => {
    mockRejectedFetchWith(new Error('Fetching book previews failed'));
    const {
      result: {
        current: { searchBookPreviews },
      },
    } = renderHook(() => useBooks());
    await expect(() =>
      searchBookPreviews(INITIAL_BOOK_PREVIEWS_SEARCH_PARAMS, 0)
    ).rejects.toThrowError();
  });
});
