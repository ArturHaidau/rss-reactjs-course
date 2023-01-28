import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectAuth } from '../../../store/selectors';

const ProtectedLayout = () => {
  const { isAuth } = useSelector(selectAuth);
  if (!isAuth) return <Navigate to="/" />;
  else return <Outlet />;
};

export default ProtectedLayout;
