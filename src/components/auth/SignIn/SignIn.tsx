import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import useAuth from '../../../hooks/useAuth';
import { SignInData } from '../../../types/auth';
import styles from '../styles';
import validation from '../validation';

const SignIn = () => {
  const { t } = useTranslation();
  const { signIn } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    defaultValues: { login: '', password: '' },
  });

  const onSubmit = async (data: SignInData) => {
    await signIn(data);
  };

  return (
    <Container maxWidth="xs">
      <Box sx={styles.container}>
        <Box sx={styles.header}>
          <Avatar sx={styles.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">{t('common.signIn')}</Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={styles.form}>
          <Controller
            name="login"
            control={control}
            rules={validation(t).login}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                label={t('common.login')}
                error={!!errors.login}
                helperText={errors.login?.message}
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
                type="password"
                variant="outlined"
                label={t('common.password')}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
          <Button type="submit" variant="contained">
            {t('common.signIn')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
