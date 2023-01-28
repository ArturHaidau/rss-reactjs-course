import { useDispatch } from '../store';
import { usersApi } from '../store/api/users/api';
import { showNotification } from '../store/slices/notifications';
import { User } from '../types/user';

const useUsers = () => {
  const [deleteById] = usersApi.useDeleteByIdMutation();
  const [update] = usersApi.useUpdateMutation();
  const dispatch = useDispatch();

  const deleteUserById = async (id: string) => {
    await deleteById(id);
    dispatch(showNotification({ type: 'success', message: 'You deleted account successfully' }));
  };

  const updateUser = async (user: User, password: string) => {
    await update({ ...user, password });
    dispatch(showNotification({ type: 'success', message: 'You updated account successfully' }));
  };

  return { deleteUserById, updateUser };
};

export default useUsers;
