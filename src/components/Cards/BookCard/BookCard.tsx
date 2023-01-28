import React from 'react';
import styles from './BookCard.module.css';
import bookImage from '../../../assets/book.png';
import { BookPreview } from '../../../types/book-preview';

export interface Props {
  bookPreview: BookPreview;
  handleClick: () => void;
}

const BookCard = ({ handleClick, bookPreview }: Props) => (
  <div className={styles.card} onClick={handleClick}>
    <img src={bookImage} alt="book" className={styles.image} />
    <div className={styles.bookName}>{bookPreview.bookName}</div>
  </div>
);

export default BookCard;
