import React, { useCallback, useEffect, useState } from 'react';
import { SEARCH_BAR_TEXT_KEY } from '../../application.constants';
import { NotificationType } from '../../types/notification';
import SearchBar from '../SearchBar';
import Loading from '../Loading';
import BookCards from '../Cards/BookCards';
import { BooksDto } from '../../types/dto/books.dto';
import { BookPreview } from '../../types/book-preview';
import { fetchBooks } from '../../utils';

export interface Props {
  showNotification: (type: NotificationType, message: string) => void;
}

const Home = ({ showNotification }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>(
    localStorage.getItem(SEARCH_BAR_TEXT_KEY) ?? ''
  );
  const [bookPreviews, setBookPreviews] = useState<BookPreview[]>([]);

  useEffect(() => {
    return () => localStorage.setItem(SEARCH_BAR_TEXT_KEY, searchText);
  }, [searchText]);

  const fetchBookPreviews = useCallback(async () => {
    setLoading(true);
    let books: BookPreview[] = [];
    try {
      books = (await fetchBooks<BooksDto>(`?name=/${searchText}/i`)).docs.map(({ _id, name }) => ({
        bookId: _id,
        bookName: name,
      }));
      showNotification('success', 'Books fetched successfully');
    } catch (error) {
      console.error(error);
      showNotification(
        'error',
        error instanceof Error ? error.message : 'Failed to fetch book previews'
      );
    }
    setLoading(false);
    return books;
  }, [searchText, showNotification]);

  const searchBooks = useCallback(async () => {
    const bookPreviews = await fetchBookPreviews();
    if (bookPreviews.length === 0)
      showNotification('info', `Unable to find books with search text '${searchText}'`);
    setBookPreviews(bookPreviews);
  }, [fetchBookPreviews, searchText, showNotification]);

  useEffect(() => {
    (async () => {
      await searchBooks();
    })();
  }, [searchBooks]);

  return (
    <>
      {loading && <Loading />}
      <SearchBar searchText={searchText} changeSearchText={setSearchText} />
      <BookCards data={bookPreviews} showNotification={showNotification} />
    </>
  );
};

export default Home;
