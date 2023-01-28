import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '../store';
import { fetchBookPreviews } from '../store/slices/books';
import { showNotification } from '../store/slices/notifications';
import { SearchParams } from '../types/search-params';

const useBooks = () => {
  const dispatch = useDispatch<Dispatch>();

  const searchBookPreviews = useCallback(
    async (searchParams: SearchParams, page: number) => {
      const { text, sortBy, pageLimit } = searchParams;
      try {
        await dispatch(
          fetchBookPreviews(
            `?name=/${text}/i&limit=${pageLimit}&page=${page}${
              sortBy === 'default' ? '' : `&sort=name:${sortBy}`
            }`
          )
        ).unwrap();
      } catch (error) {
        console.error(error);
        dispatch(
          showNotification({
            type: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch book previews',
          })
        );
      }
    },
    [dispatch]
  );

  return { searchBookPreviews };
};

export default useBooks;
