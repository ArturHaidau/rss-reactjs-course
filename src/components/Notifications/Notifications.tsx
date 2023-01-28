import React from 'react';
import { useStateContext, useStateDispatch } from '../../state';
import Toast from '../Toast';
import styles from './Notifications.module.css';

const Notifications = () => {
  const { notifications } = useStateContext();
  const dispatch = useStateDispatch();
  return (
    <div className={styles.notifications}>
      {notifications.map((x, index) => (
        <Toast
          key={index}
          notification={x}
          handleClick={() =>
            dispatch({ type: 'HIDE_NOTIFICATION', payload: { notificationId: x.id } })
          }
        />
      ))}
    </div>
  );
};

export default Notifications;
