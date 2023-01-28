import { TextField } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AddBoard } from '../../../types/add-board';
import { BoardPreview } from '../../../types/board-preview';
import { ModalProps } from '../../../types/modal-props';
import Modal from '../Modal';
import ModalForm from '../ModalForm';
import styles from '../ModalForm/styles';
import validation from '../validation/boardPreview';

interface Props extends ModalProps {
  title: string;
  boardPreview: BoardPreview;
  action: (data: AddBoard) => Promise<void>;
}

const BoardModal = ({ open, hideModal, boardPreview, action, title }: Props) => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    reset: resetForm,
    setValue,
    formState: { errors },
  } = useForm<AddBoard>();

  const reset = useCallback(() => {
    resetForm();
    setValue('title', boardPreview.title);
    setValue('description', boardPreview.description);
  }, [boardPreview.description, boardPreview.title, resetForm, setValue]);

  useEffect(() => {
    reset();
  }, [reset]);

  const onSubmit = async (data: AddBoard) => {
    await action(data);
    handleClose();
  };

  const handleClose = () => {
    hideModal();
    reset();
  };

  return (
    <Modal open={open} hideModal={handleClose} title={title}>
      <ModalForm onSubmit={handleSubmit(onSubmit)} onClose={handleClose}>
        <Controller
          name="title"
          control={control}
          rules={validation(t).title}
          render={({ field }) => (
            <TextField
              {...field}
              sx={styles.field}
              label={t('common.title')}
              variant="outlined"
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={validation(t).description}
          render={({ field }) => (
            <TextField
              {...field}
              sx={styles.field}
              label={t('common.description')}
              variant="outlined"
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />
      </ModalForm>
    </Modal>
  );
};

export default BoardModal;
