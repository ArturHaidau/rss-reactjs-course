import { Close, DoneSharp } from '@mui/icons-material';
import { Box, Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import validation from '../../modals/validation/column';
import styles from './styles';

interface Props {
  title: string;
  onClose: () => void;
  onSubmit: (title: string) => Promise<unknown>;
}

interface FormData {
  title: string;
}

const EditColumn = ({ title, onClose, onSubmit }: Props) => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { title } });

  return (
    <Box component="form" onSubmit={handleSubmit(({ title }: FormData) => onSubmit(title))}>
      <Grid container>
        <Grid item xs={7}>
          <Controller
            name="title"
            control={control}
            rules={validation(t).title}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={5}>
          <Box sx={styles.buttons}>
            <Button type="submit">
              <DoneSharp />
            </Button>
            <Button onClick={onClose} color="secondary">
              <Close />
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditColumn;
