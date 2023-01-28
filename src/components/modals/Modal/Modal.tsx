import { Box, Modal, Typography } from '@mui/material';
import React from 'react';
import { ModalProps } from '../../../types/modal-props';
import styles from './styles';

interface Props extends ModalProps {
  title: string;
}

const Component = ({ open, hideModal, title, children }: React.PropsWithChildren<Props>) => (
  <Modal open={open} onClose={hideModal}>
    <Box sx={styles.box}>
      <Typography variant="h5" textAlign="center">
        {title}
      </Typography>
      {children}
    </Box>
  </Modal>
);

export default Component;
