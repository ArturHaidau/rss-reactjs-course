import { TextField } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ModalProps } from '../../../types/modal-props';
import { User } from '../../../types/user';
import validation from '../../auth/validation';
import Modal from '../Modal';
import ModalForm from '../ModalForm';
import styles from '../ModalForm/styles';

interface FormData {
  name: string;
  login: string;
  password: string;
}

interface Props extends ModalProps {
  title: string;
  action: (data: FormData) => Promise<unknown>;
  user: User;
}

const UserModal = ({ user, open, hideModal, title, action }: Props) => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    reset: resetForm,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const reset = useCallback(() => {
    resetForm();
    setValue('name', user.name);
    setValue('login', user.login);
    setValue('password', '');
  }, [resetForm, setValue, user.login, user.name]);

  useEffect(() => {
    reset();
  }, [reset]);

  const handleClose = () => {
    hideModal();
    reset();
  };

  const onSubmit = async (data: FormData) => {
    await action(data);
    handleClose();
  };

  return (
    <Modal open={open} hideModal={handleClose} title={title}>
      <ModalForm onSubmit={handleSubmit(onSubmit)} onClose={handleClose}>
        <Controller
          name="login"
          control={control}
          rules={validation(t).login}
          render={({ field }) => (
            <TextField
              {...field}
              sx={styles.field}
              label={t('common.login')}
              variant="outlined"
              error={!!errors.login}
              helperText={errors.login?.message}
            />
          )}
        />
        <Controller
          name="name"
          control={control}
          rules={validation(t).name}
          render={({ field }) => (
            <TextField
              {...field}
              sx={styles.field}
              label={t('common.name')}
              variant="outlined"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={validation(t).password}
          render={({ field }) => (
            <TextField
              {...field}
              sx={styles.field}
              label={t('common.password')}
              type="password"
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
      </ModalForm>
    </Modal>
  );
};

export default UserModal;
