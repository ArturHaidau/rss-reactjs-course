import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '../../store';
import { selectNotifications } from '../../store/selectors';
import { hideNotification } from '../../store/slices/notifications';
import Toast from '../Toast';
import styles from './Notifications.module.css';

const Notifications = () => {
  const notifications = useSelector(selectNotifications);
  const dispatch = useDispatch<Dispatch>();
  return (
    <div className={styles.notifications}>
      {notifications.map((x, index) => (
        <Toast key={index} notification={x} handleClick={() => dispatch(hideNotification(x.id))} />
      ))}
    </div>
  );
};

export default Notifications;
