import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles';

interface Props {
  onSubmit: () => Promise<unknown>;
  onClose: () => void;
}

const ModalForm = ({ children, onSubmit, onClose }: React.PropsWithChildren<Props>) => {
  const { t } = useTranslation();
  return (
    <Box component="form" onSubmit={onSubmit} sx={styles.form}>
      {children}
      <Box sx={styles.buttons}>
        <Button type="submit" color="primary">
          <Typography fontWeight="bold">{t('common.submit')}</Typography>
        </Button>
        <Button onClick={onClose} color="secondary">
          <Typography fontWeight="bold">{t('common.close')}</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default ModalForm;
