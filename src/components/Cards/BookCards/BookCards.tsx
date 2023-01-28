import React, { useState } from 'react';
import { Book } from '../../../types/book';
import { BookPreview } from '../../../types/book-preview';
import { BookChaptersDto } from '../../../types/dto/book-chapters.dto';
import { NotificationType } from '../../../types/notification';
import { fetchBooks } from '../../../utils';
import Loading from '../../Loading';
import BookModal from '../../Modals/BookModal';
import BookCard from '../BookCard';
import styles from './BookCards.module.css';

export interface Props {
  data: BookPreview[];
  showNotification: (type: NotificationType, message: string) => void;
}

const BookCards = ({ data, showNotification }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [openedBook, setOpenedBook] = useState<Book | null>(null);

  const fetchBookChapters = async (bookId: string) => {
    setLoading(true);
    const chapters = (await fetchBooks<BookChaptersDto>(`${bookId}/chapter`)).docs.map(
      ({ _id, chapterName }) => ({
        id: _id,
        name: chapterName,
      })
    );
    setLoading(false);
    return chapters;
  };

  const handleModalOpen = async (bookPreview: BookPreview) => {
    try {
      setOpenedBook({
        id: bookPreview.bookId,
        name: bookPreview.bookName,
        chapters: await fetchBookChapters(bookPreview.bookId),
      });
      showNotification('success', 'Book opened successfully');
    } catch (error) {
      console.error(error);
      showNotification('error', 'Unable to open the book');
    }
  };

  const handleModalClose = () => setOpenedBook(null);

  return (
    <>
      {loading && <Loading />}
      {openedBook && <BookModal handleClick={handleModalClose} book={openedBook} />}
      <div className={styles.cards}>
        {data.map((bookPreview, index) => (
          <div key={index} className={styles.card}>
            <BookCard bookPreview={bookPreview} handleClick={handleModalOpen} />
          </div>
        ))}
      </div>
    </>
  );
};

export default BookCards;
