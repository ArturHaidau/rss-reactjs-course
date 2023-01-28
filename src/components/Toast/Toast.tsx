import classNames from 'classnames';
import React from 'react';
import { Notification } from '../../types/notification';
import styles from './Toast.module.css';

export interface Props {
  notification: Notification;
  handleClick: () => void;
}

const Toast = ({ notification, handleClick }: Props) => {
  const { type } = notification;
  let content;
  if (type === 'success') content = { header: 'Success', style: styles.success };
  else if (type === 'error') content = { header: 'Error', style: styles.error };
  else if (type === 'info') content = { header: 'Info', style: styles.info };
  else throw new Error(`Wrong notification type provided = ${type}`);

  return (
    <div className={classNames(styles.toast, content.style)}>
      <span className={styles.closeButton} onClick={handleClick}>
        &times;
      </span>
      <div className={styles.header}>{content.header}</div>
      <div>{notification.message}</div>
    </div>
  );
};

export default Toast;
