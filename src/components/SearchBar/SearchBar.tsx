import React, { useState } from 'react';
import styles from './SearchBar.module.css';

const ENTER_KEY = 'Enter';

interface Props {
  searchText: string;
  changeSearchText: (searchText: string) => void;
}

const SearchBar = ({ searchText, changeSearchText }: Props) => {
  const [text, setText] = useState<string>(searchText);
  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        value={text}
        placeholder="Search..."
        className={styles.searchBar}
        onChange={({ target: { value } }) => {
          setText(value);
        }}
        onKeyUp={(event) => {
          if (event.key === ENTER_KEY) changeSearchText(text);
        }}
      />
    </div>
  );
};

export default SearchBar;
