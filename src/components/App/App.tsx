import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AboutUs from '../AboutUs';
import Header from '../Header';
import Cards from '../Cards';
import NotFound from '../NotFound';
import styles from './App.module.css';

const App = () => (
  <div>
    <Header />
    <div className={styles.contentContainer}>
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </div>
  </div>
);

export default App;
