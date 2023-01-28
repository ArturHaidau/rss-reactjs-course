import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';
import styles from './styles';

const Loading = () => (
  <Backdrop open sx={styles.backdrop}>
    <CircularProgress size={100} />
  </Backdrop>
);

export default Loading;
