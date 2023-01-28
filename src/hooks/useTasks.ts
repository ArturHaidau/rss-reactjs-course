import { useDispatch } from '../store';
import { tasksApi } from '../store/api/tasks/api';
import { showNotification } from '../store/slices/notifications';
import { Task } from '../types/task';
import useJWT from './useJWT';

const useTasks = (boardId: string, columnId: string) => {
  const [create] = tasksApi.useCreateMutation();
  const [update] = tasksApi.useUpdateMutation();
  const [deleteById] = tasksApi.useDeleteByIdMutation();
  const { getUserId } = useJWT();
  const dispatch = useDispatch();

  const createTask = async (title: string, description: string) => {
    await create({ boardId, columnId, title, description, userId: getUserId() }).unwrap();
    dispatch(
      showNotification({ type: 'success', message: `You created task '${title}' successfully` })
    );
  };

  const deleteTaskById = async (id: string) => {
    await deleteById({ boardId, columnId, id });
    dispatch(showNotification({ type: 'success', message: `You deleted task successfully` }));
  };

  const updateTask = async (
    { files, id, ...rest }: Task,
    oldColumnId: string,
    newColumnId: string
  ) => {
    await update({ taskId: id, boardId, columnId: newColumnId, oldColumnId, ...rest }).unwrap();
    dispatch(
      showNotification({
        type: 'success',
        message: `You updated task '${rest.title}' successfully`,
      })
    );
  };

  return { createTask, updateTask, deleteTaskById };
};

export default useTasks;
