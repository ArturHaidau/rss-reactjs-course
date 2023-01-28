import { useDispatch } from '../store';
import { columnsApi } from '../store/api/columns/api';
import { showNotification } from '../store/slices/notifications';
import { Column } from '../types/column';

const useColumns = (boardId: string) => {
  const [create] = columnsApi.useCreateMutation();
  const [deleteById] = columnsApi.useDeleteByIdMutation();
  const [update] = columnsApi.useUpdateMutation();
  const dispatch = useDispatch();

  const createColumn = async (title: string) => {
    await create({ boardId, title }).unwrap();
    dispatch(
      showNotification({ type: 'success', message: `You created column '${title}' successfully` })
    );
  };

  const deleteColumnById = async (id: string) => {
    await deleteById({ boardId, id }).unwrap();
    dispatch(showNotification({ type: 'success', message: `You deleted column successfully` }));
  };

  const updateColumn = async ({ tasks, ...rest }: Column) => {
    await update({ boardId, ...rest }).unwrap();
    dispatch(
      showNotification({
        type: 'success',
        message: `You updated column '${rest.title}' successfully`,
      })
    );
  };

  return { createColumn, deleteColumnById, updateColumn };
};

export default useColumns;
