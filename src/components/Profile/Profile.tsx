import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useJWT from '../../hooks/useJWT';
import useModals from '../../hooks/useModals';
import useUsers from '../../hooks/useUsers';
import { useDispatch } from '../../store';
import { usersApi } from '../../store/api/users/api';
import { signOut } from '../../store/slices/auth';
import DeleteModal from '../modals/DeleteModal';
import UserModal from '../modals/UserModal';
import styles from './styles';

type Modals = {
  editUser: boolean;
  deleteUser: boolean;
};

const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { getUserId } = useJWT();
  const { data } = usersApi.useGetByIdQuery(getUserId());
  const { modals, hideModal, showModal } = useModals<Modals>({
    deleteUser: false,
    editUser: false,
  });
  const { deleteUserById, updateUser } = useUsers();

  const handleDeleteSubmit = async () => {
    await deleteUserById(data!.id);
    hideModal('deleteUser');
    dispatch(signOut());
  };

  return (
    <Box sx={styles.background}>
      <Container maxWidth="md">
        {data && (
          <>
            <Paper sx={styles.paper} elevation={4}>
              <Typography variant="h4">
                {t('common.login')}: {data.login}
              </Typography>
              <Typography variant="h4">
                {t('common.name')}: {data.name}
              </Typography>
              <Box sx={styles.buttons}>
                <Button onClick={() => showModal('editUser')}>
                  <Edit fontSize="medium" color="primary" />
                </Button>
                <Button onClick={() => showModal('deleteUser')}>
                  <Delete fontSize="medium" color="secondary" />
                </Button>
              </Box>
            </Paper>
            <DeleteModal
              open={modals.deleteUser}
              hideModal={() => hideModal('deleteUser')}
              title={t('modals.delete.user')}
              onSubmit={handleDeleteSubmit}
            />
            <UserModal
              title={t('modals.edit.user')}
              action={({ name, login, password }) =>
                updateUser({ id: data.id, name, login }, password)
              }
              user={data}
              open={modals.editUser}
              hideModal={() => hideModal('editUser')}
            />
          </>
        )}
      </Container>
    </Box>
  );
};

export default Profile;
