import { TextField } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ModalProps } from '../../../types/modal-props';
import Modal from '../Modal';
import ModalForm from '../ModalForm';
import styles from '../ModalForm/styles';
import validation from '../validation/task';

interface Task {
  title: string;
  description: string;
}

interface Props extends ModalProps {
  title: string;
  action: (task: Task) => Promise<unknown>;
  task: Task;
}

const TaskModal = ({ task, open, hideModal, title, action }: Props) => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    reset: resetForm,
    setValue,
    formState: { errors },
  } = useForm<Task>();

  const reset = useCallback(() => {
    resetForm();
    setValue('title', task.title);
    setValue('description', task.description);
  }, [resetForm, setValue, task.description, task.title]);

  useEffect(() => {
    reset();
  }, [reset]);

  const handleClose = () => {
    hideModal();
    reset();
  };

  const onSubmit = async (data: Task) => {
    await action(data);
    handleClose();
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

export default TaskModal;
