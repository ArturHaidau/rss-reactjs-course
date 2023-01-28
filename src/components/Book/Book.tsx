import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext, useStateDispatch } from '../../state';
import styles from './Book.module.css';

const REDIRECT_TIMING = 3000;

const Book = () => {
  const navigate = useNavigate();
  const { openedBook } = useStateContext();
  const dispatch = useStateDispatch();

  if (!openedBook) {
    setTimeout(() => navigate('/'), REDIRECT_TIMING);
    return <div>There is no opened book. You will be redirected to home page in 3 seconds</div>;
  } else {
    const data = [
      { label: 'Name:', value: openedBook.name },
      { label: 'Chapters:', value: openedBook.chapters.map(({ name }) => name).join(', ') },
    ];
    return (
      <>
        <div className={styles.backContainer}>
          <Link
            to="/"
            onClick={() => dispatch({ type: 'SET_OPENED_BOOK', payload: { openedBook: null } })}
            className={styles.back}
          >
            Back
          </Link>
        </div>
        {data.map(({ label, value }, index) => (
          <div key={index} className={styles.field}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{value}</span>
          </div>
        ))}
      </>
    );
  }
};

export default Book;
