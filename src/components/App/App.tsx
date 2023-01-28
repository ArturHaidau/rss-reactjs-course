import { Box } from '@mui/material';
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { selectLoading } from '../../store/selectors';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import BoardPage from '../boards/BoardPage';
import BoardPreviews from '../boards/BoardPreviews';
import Footer from '../Footer';
import Header from '../Header';
import AuthLayout from '../layouts/AuthLayout';
import ProtectedLayout from '../layouts/ProtectedLayout';
import Loading from '../Loading';
import NotFound from '../NotFound';
import Notifications from '../Notifications';
import Profile from '../Profile';
import Welcome from '../Welcome';
import styles from './styles';

const App = () => {
  const loading = useSelector(selectLoading);
  return (
    <Suspense fallback={<Loading />}>
      {loading && <Loading />}
      <Notifications />
      <Box sx={styles.wrapper}>
        <Header />
        <Box component="main" sx={styles.content}>
          <Routes>
            <Route path="" element={<Welcome />} />
            <Route element={<AuthLayout />}>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Route>
            <Route element={<ProtectedLayout />}>
              <Route path="/boards" element={<BoardPreviews />} />
              <Route path="/boards/:id" element={<BoardPage />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Suspense>
  );
};

export default App;
