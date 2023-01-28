import React, { useCallback, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Notification, NotificationType } from '../../types/notification';
import AboutUs from '../AboutUs';
import Header from '../Header';
import Home from '../Home';
import NotFound from '../NotFound';
import Notifications from '../Notifications';
import styles from './App.module.css';
import Form from '../Form';

const App = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback(
    (type: NotificationType, message: string) =>
      setNotifications((prev) => [...prev, { type, message, id: crypto.randomUUID() }]),
    []
  );

  const hideNotification = useCallback(
    (notificationId: string) => {
      const index = notifications.findIndex((x) => x.id === notificationId);
      setNotifications((prev) => {
        const newState = [...prev];
        newState.splice(index, 1);
        return newState;
      });
    },
    [notifications]
  );

  return (
    <div>
      <Header />
      <div className={styles.contentContainer}>
        <Routes>
          <Route path="/" element={<Home showNotification={showNotification} />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/form" element={<Form />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
        <Notifications notifications={notifications} handleClick={hideNotification} />
      </div>
    </div>
  );
};

export default App;
