import React from 'react';
import BookCards from '../Cards/BookCards';
import Pages from '../Pages';
import SearchBar from '../SearchBar';
import SearchParams from '../SearchParams';

const Home = () => (
  <>
    <SearchBar />
    <SearchParams />
    <Pages />
    <BookCards />
  </>
);

export default Home;
