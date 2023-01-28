import { useCallback } from 'react';
import { useStateDispatch } from '../state';
import { BookChaptersDto } from '../types/dto/book-chapters.dto';
import { BookPreviewsDto } from '../types/dto/book-previews.dto';
import { SearchParams } from '../types/search-params';
import { fetchBooks, createBookPreviewsFromResponse, createChaptersFromResponse } from '../utils';

const useBooks = () => {
  const dispatch = useStateDispatch();

  const fetchBookPreviews = useCallback(
    async (url: string) => {
      try {
        dispatch({ type: 'SET_LOADING', payload: { loading: true } });
        const response = await fetchBooks<BookPreviewsDto>(url);
        dispatch({
          type: 'SHOW_NOTIFICATION',
          payload: { notificationType: 'success', message: 'Books fetched successfully' },
        });
        return {
          paging: { count: response.pages, current: response.page },
          bookPreviews: createBookPreviewsFromResponse(response),
        };
      } catch (error) {
        console.error(error);
        dispatch({
          type: 'SHOW_NOTIFICATION',
          payload: {
            notificationType: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch book previews',
          },
        });
        throw error;
      } finally {
        dispatch({ type: 'SET_LOADING', payload: { loading: false } });
      }
    },
    [dispatch]
  );

  const fetchBookChapters = async (bookId: string) => {
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    const chapters = createChaptersFromResponse(
      await fetchBooks<BookChaptersDto>(`${bookId}/chapter`)
    );
    dispatch({ type: 'SET_LOADING', payload: { loading: false } });
    return chapters;
  };

  const searchBookPreviews = useCallback(
    async (searchParams: SearchParams, page: number) => {
      const { text, sortBy, pageLimit } = searchParams;
      const { bookPreviews, paging } = await fetchBookPreviews(
        `?name=/${text}/i&limit=${pageLimit}&page=${page}${
          sortBy === 'default' ? '' : `&sort=name:${sortBy}`
        }`
      );
      dispatch({ type: 'SET_BOOK_PREVIEWS_PAGING', payload: { ...paging } });
      dispatch({ type: 'SET_BOOK_PREVIEWS', payload: { bookPreviews } });
      if (bookPreviews.length === 0)
        dispatch({
          type: 'SHOW_NOTIFICATION',
          payload: {
            notificationType: 'info',
            message: 'Unable to find books with such search parameters',
          },
        });
    },
    [dispatch, fetchBookPreviews]
  );

  return { fetchBookChapters, searchBookPreviews };
};

export default useBooks;
