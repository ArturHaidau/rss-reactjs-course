import { useDispatch } from '../store';
import { boardsApi } from '../store/api/boards';
import { showNotification } from '../store/slices/notifications';
import { AddBoard } from '../types/add-board';
import { BoardPreview } from '../types/board-preview';

const useBoards = () => {
  const [create] = boardsApi.useCreateMutation();
  const [update] = boardsApi.useUpdateMutation();
  const [deleteById] = boardsApi.useDeleteByIdMutation();
  const dispatch = useDispatch();

  const createBoard = async (data: AddBoard) => {
    await create(data).unwrap();
    dispatch(
      showNotification({
        type: 'success',
        message: `You created board '${data.title}' successfully`,
      })
    );
  };

  const updateBoard = async (data: BoardPreview) => {
    await update(data).unwrap();
    dispatch(
      showNotification({
        type: 'success',
        message: `You updated board '${data.title}' successfully`,
      })
    );
  };

  const deleteBoardById = async (id: string) => {
    await deleteById(id).unwrap();
    dispatch(showNotification({ type: 'success', message: `You deleted board successfully` }));
  };

  return { createBoard, updateBoard, deleteBoardById };
};

export default useBoards;
