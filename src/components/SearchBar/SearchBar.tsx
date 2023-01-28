import React from 'react';
import styles from './SearchBar.module.css';

const ENTER_KEY = 'Enter';

interface Props {
  searchText: string;
  changeSearchText: (searchText: string) => void;
  searchBooks: () => void;
}

const SearchBar = ({ searchText, changeSearchText, searchBooks }: Props) => (
  <div className={styles.searchBarContainer}>
    <input
      type="text"
      value={searchText}
      placeholder="Search..."
      className={styles.searchBar}
      onChange={({ target: { value } }) => {
        changeSearchText(value);
      }}
      onKeyUp={(event) => {
        if (event.key === ENTER_KEY) searchBooks();
      }}
    />
  </div>
);

export default SearchBar;
