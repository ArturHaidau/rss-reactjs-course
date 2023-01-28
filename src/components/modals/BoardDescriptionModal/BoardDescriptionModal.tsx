import { Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BoardPreview } from '../../../types/board-preview';
import { ModalProps } from '../../../types/modal-props';
import Modal from '../Modal';

interface Props extends ModalProps {
  boardPreview: BoardPreview;
}

const BoardDescriptionModal = ({ open, hideModal, boardPreview }: Props) => {
  const { t } = useTranslation();
  return (
    <Modal open={open} hideModal={hideModal} title={t('common.board')}>
      <Typography>{boardPreview.title}</Typography>
      <Typography>{boardPreview.description}</Typography>
    </Modal>
  );
};

export default BoardDescriptionModal;
