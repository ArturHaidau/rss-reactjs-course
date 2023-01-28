import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dispatch } from '../../../store';
import { selectBooks } from '../../../store/selectors';
import { fetchBook } from '../../../store/slices/books';
import { showNotification } from '../../../store/slices/notifications';
import { BookPreview } from '../../../types/book-preview';
import BookCard from '../BookCard';
import styles from './BookCards.module.css';

const BookCards = () => {
  const { bookPreviews } = useSelector(selectBooks);
  const dispatch = useDispatch<Dispatch>();
  const navigate = useNavigate();

  const openBook = async (bookPreview: BookPreview) => {
    try {
      await dispatch(fetchBook(bookPreview)).unwrap();
      navigate('/book');
      dispatch(
        showNotification({
          type: 'success',
          message: 'Book opened successfully',
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(
        showNotification({
          type: 'error',
          message: 'Unable to open the book',
        })
      );
    }
  };

  return (
    <>
      <div className={styles.cards}>
        {bookPreviews.map((x, index) => (
          <div key={index} className={styles.card}>
            <BookCard bookPreview={x} handleClick={() => openBook(x)} />
          </div>
        ))}
      </div>
    </>
  );
};

export default BookCards;
