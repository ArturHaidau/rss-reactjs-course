import React from 'react';
import { Notification } from '../../types/notification';
import Toast from '../Toast';
import styles from './Notifications.module.css';

export interface Props {
  notifications: Notification[];
  handleClick: (notificationId: string) => void;
}

const Notifications = ({ notifications, handleClick }: Props) => (
  <div className={styles.notifications}>
    {notifications.map((x, index) => (
      <Toast key={index} notification={x} handleClick={handleClick} />
    ))}
  </div>
);

export default Notifications;
