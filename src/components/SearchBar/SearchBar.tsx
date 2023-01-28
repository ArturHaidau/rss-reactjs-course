import React from 'react';
import styles from './SearchBar.module.css';

interface Props {
  searchText: string;
  changeSearchText: (searchText: string) => void;
}

const SearchBar = ({ searchText, changeSearchText }: Props) => (
  <div className={styles.searchBarContainer}>
    <input
      type="text"
      value={searchText}
      placeholder="Search..."
      className={styles.searchBar}
      onChange={({ target: { value } }) => {
        changeSearchText(value);
      }}
    />
  </div>
);

export default SearchBar;
