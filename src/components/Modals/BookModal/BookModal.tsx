import React from 'react';
import { Book } from '../../../types/book';
import Modal from '../Modal';
import styles from './BookModal.module.css';

export interface Props {
  handleClick: () => void;
  book: Book;
}

const BookModal = ({ handleClick, book }: Props) => {
  const data = [
    { label: 'Name:', value: book.name },
    { label: 'Chapters:', value: book.chapters.map(({ name }) => name).join(', ') },
  ];
  return (
    <Modal handleClick={handleClick}>
      {data.map(({ label, value }, index) => (
        <div key={index} className={styles.field}>
          <span className={styles.label}>{label}</span>
          <span className={styles.value}>{value}</span>
        </div>
      ))}
    </Modal>
  );
};

export default BookModal;
