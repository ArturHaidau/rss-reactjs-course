import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../store';
import { selectNotifications } from '../../store/selectors';
import { hideNotification } from '../../store/slices/notifications';
import styles from './styles';

const Notifications = () => {
  const notifications = useSelector(selectNotifications);
  const dispatch = useDispatch();
  return (
    <>
      {notifications.map((x, index) => (
        <Snackbar key={index} open>
          <Alert
            variant="filled"
            severity={x.type}
            onClose={() => dispatch(hideNotification(x.id))}
            sx={styles.alert}
          >
            {x.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default Notifications;
