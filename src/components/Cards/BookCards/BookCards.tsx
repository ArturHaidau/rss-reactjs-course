import React from 'react';
import { useNavigate } from 'react-router-dom';
import useBooks from '../../../hooks/useBooks';
import { useStateContext, useStateDispatch } from '../../../state';
import { BookPreview } from '../../../types/book-preview';
import BookCard from '../BookCard';
import styles from './BookCards.module.css';

const BookCards = () => {
  const { fetchBookChapters } = useBooks();
  const { bookPreviews } = useStateContext();
  const dispatch = useStateDispatch();
  const navigate = useNavigate();

  const handleBookClick = async (bookPreview: BookPreview) => {
    try {
      dispatch({
        type: 'SET_OPENED_BOOK',
        payload: {
          openedBook: {
            id: bookPreview.bookId,
            name: bookPreview.bookName,
            chapters: await fetchBookChapters(bookPreview.bookId),
          },
        },
      });
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: {
          notificationType: 'success',
          message: 'Book opened successfully',
        },
      });
      navigate('/book');
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'SHOW_NOTIFICATION',
        payload: {
          notificationType: 'error',
          message: 'Unable to open the book',
        },
      });
    }
  };

  return (
    <>
      <div className={styles.cards}>
        {bookPreviews.map((x, index) => (
          <div key={index} className={styles.card}>
            <BookCard bookPreview={x} handleClick={handleBookClick} />
          </div>
        ))}
      </div>
    </>
  );
};

export default BookCards;
