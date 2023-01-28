import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <Box sx={styles.container}>
      <Typography variant="h2">{t('common.pageNotFound')}</Typography>
    </Box>
  );
};

export default NotFound;
