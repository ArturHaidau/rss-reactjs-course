import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ModalProps } from '../../../types/modal-props';
import Modal from '../Modal';
import styles from './styles';

interface Props extends ModalProps {
  title: string;
  onSubmit: () => Promise<unknown>;
}

const DeleteModal = ({ open, hideModal, onSubmit, title }: Props) => {
  const { t } = useTranslation();
  return (
    <Modal open={open} hideModal={hideModal} title={title}>
      <Box sx={styles.buttons}>
        <Button onClick={onSubmit} color="primary">
          <Typography fontWeight="bold">{t('common.submit')}</Typography>
        </Button>
        <Button onClick={hideModal} color="secondary">
          <Typography fontWeight="bold">{t('common.close')}</Typography>
        </Button>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
