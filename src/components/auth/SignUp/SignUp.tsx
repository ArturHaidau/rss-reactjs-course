import { AccountCircleOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import useAuth from '../../../hooks/useAuth';
import { SignUpData } from '../../../types/auth';
import styles from '../styles';
import validation from '../validation';

const SignUp = () => {
  const { t } = useTranslation();
  const { signUp } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    defaultValues: { name: '', login: '', password: '' },
  });

  const onSubmit = async (data: SignUpData) => {
    await signUp(data);
  };

  return (
    <Container maxWidth="xs">
      <Box sx={styles.container}>
        <Box sx={styles.header}>
          <Avatar sx={styles.avatar}>
            <AccountCircleOutlined />
          </Avatar>
          <Typography variant="h5">{t('common.signUp')}</Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={styles.form}>
          <Controller
            name="name"
            control={control}
            rules={validation(t).name}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                label={t('common.name')}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
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
            {t('common.signUp')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
