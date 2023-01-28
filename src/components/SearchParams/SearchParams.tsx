import React, { ChangeEvent } from 'react';
import { useStateContext, useStateDispatch } from '../../state';
import { SortOrder } from '../../types/sort-order';
import styles from './SearchParams.module.css';

const SearchParams = () => {
  const {
    searchParams: { sortBy, pageLimit },
    bookPreviewsPaging: { count },
  } = useStateContext();
  const dispatch = useStateDispatch();
  const onSortByChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SEARCH_PARAMS', payload: { sortBy: value as SortOrder } });
  };

  const onPageLimitChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SEARCH_PARAMS', payload: { pageLimit: Number(value) } });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.fieldsContainer}>
          <div className={styles.sortByContainer}>
            <span className={styles.field}>Sort by:</span>
            <input
              id="sort-asc"
              type="radio"
              value="asc"
              onChange={onSortByChange}
              checked={sortBy === 'asc'}
            />
            <label htmlFor="sort-asc">Ascending</label>
            <input
              id="sort-desc"
              type="radio"
              value="desc"
              onChange={onSortByChange}
              checked={sortBy === 'desc'}
            />
            <label htmlFor="sort-desc">Descending</label>
            <input
              id="sort-default"
              type="radio"
              value="default"
              onChange={onSortByChange}
              checked={sortBy === 'default'}
            />
            <label htmlFor="sort-default">Default</label>
          </div>
          <div className={styles.pageLimitContainer}>
            <span className={styles.field}>Page limit:</span>
            <input
              id="page-limit-input"
              type="number"
              className={styles.pageLimitInput}
              onChange={onPageLimitChange}
              value={pageLimit}
              min={0}
            />
            <span className={styles.pagesCount}>{`Pages count = ${count}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchParams;
