import React, { useEffect } from 'react';
import { SEARCH_BAR_TEXT_KEY } from '../../application.constants';
import useBooks from '../../hooks/useBooks';
import { useStateContext, useStateDispatch } from '../../state';
import styles from './SearchBar.module.css';

const ENTER_KEY = 'Enter';

const SearchBar = () => {
  const { searchBookPreviews } = useBooks();
  const { searchParams } = useStateContext();
  const dispatch = useStateDispatch();

  useEffect(() => {
    localStorage.setItem(SEARCH_BAR_TEXT_KEY, searchParams.text);
  }, [searchParams.text]);

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        value={searchParams.text}
        placeholder="Search..."
        className={styles.searchBar}
        onChange={({ target: { value } }) => {
          dispatch({ type: 'SET_SEARCH_PARAMS', payload: { text: value } });
        }}
        onKeyUp={async (event) => {
          if (event.key === ENTER_KEY) await searchBookPreviews(searchParams, 1);
        }}
      />
    </div>
  );
};

export default SearchBar;
