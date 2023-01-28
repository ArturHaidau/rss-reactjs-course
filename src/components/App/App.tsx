import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { INITIAL_BOOK_PREVIEWS_SEARCH_PARAMS } from '../../application.constants';
import useBooks from '../../hooks/useBooks';
import { useStateContext } from '../../state';
import AboutUs from '../AboutUs';
import Book from '../Book';
import Form from '../Form';
import Header from '../Header';
import Home from '../Home';
import Loading from '../Loading';
import NotFound from '../NotFound';
import Notifications from '../Notifications';
import styles from './App.module.css';

const App = () => {
  const { searchBookPreviews } = useBooks();
  const { loading } = useStateContext();

  useEffect(() => {
    (async () => {
      await searchBookPreviews(INITIAL_BOOK_PREVIEWS_SEARCH_PARAMS, 1);
    })();
  }, [searchBookPreviews]);

  return (
    <div>
      {loading && <Loading />}
      <Header />
      <div className={styles.contentContainer}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/form" element={<Form />} />
          <Route path="/book" element={<Book />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
        <Notifications />
      </div>
    </div>
  );
};

export default App;
