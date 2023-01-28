import classNames from 'classnames';
import React from 'react';
import { PAGES_RADIUS } from '../../application.constants';
import useBooks from '../../hooks/useBooks';
import { useStateContext } from '../../state';
import { range } from '../../utils';
import styles from './Pages.module.css';

const Pages = () => {
  const {
    searchParams,
    bookPreviewsPaging: { count, current },
  } = useStateContext();
  const { searchBookPreviews } = useBooks();

  return (
    <div className={styles.container}>
      <div className={styles.pages}>
        {[
          1,
          ...range(
            Math.max(current - PAGES_RADIUS, 1),
            Math.min(current + PAGES_RADIUS, count)
          ).slice(1),
        ].map((x) => (
          <button
            key={x}
            onClick={() => searchBookPreviews(searchParams, x)}
            className={classNames(styles.page, x === current && styles.active)}
          >
            {x}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pages;
