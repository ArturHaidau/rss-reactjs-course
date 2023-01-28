import { TextField } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import useColumns from '../../../hooks/useColumns';
import { ModalProps } from '../../../types/modal-props';
import Modal from '../Modal';
import ModalForm from '../ModalForm';
import styles from '../ModalForm/styles';
import validation from '../validation/column';

interface Props extends ModalProps {
  boardId: string;
}

interface Form {
  title: string;
}

const AddColumnModal = ({ open, hideModal, boardId }: Props) => {
  const { t } = useTranslation();
  const { createColumn } = useColumns(boardId);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Form>();

  const reset = useCallback(() => {
    setValue('title', '');
  }, [setValue]);

  useEffect(() => {
    reset();
  }, [reset]);

  const handleClose = () => {
    hideModal();
    reset();
  };

  const onSubmit = async ({ title }: Form) => {
    await createColumn(title);
    handleClose();
  };

  return (
    <Modal open={open} hideModal={handleClose} title={t('common.addColumn')}>
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
      </ModalForm>
    </Modal>
  );
};

export default AddColumnModal;
