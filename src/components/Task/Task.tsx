import { Delete, Edit, MoreVert } from '@mui/icons-material';
import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import React, { useMemo, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import { DndItemType } from '../../application.constants';
import useModals from '../../hooks/useModals';
import useTasks from '../../hooks/useTasks';
import { usersApi } from '../../store/api/users/api';
import { DraggedTask, Task as TaskType } from '../../types/task';
import { User } from '../../types/user';
import Menu from '../Menu';
import DeleteModal from '../modals/DeleteModal';
import TaskModal from '../modals/TaskModal';
import styles from './styles';

interface Props {
  data: TaskType;
  boardId: string;
  columnId: string;
}

type Modal = 'editTask' | 'deleteTask';

const Task = ({ data, boardId, columnId }: Props) => {
  const { t } = useTranslation();
  const { modals, showModal, hideModal } = useModals<Modal>({
    deleteTask: false,
    editTask: false,
  });
  const { data: users } = usersApi.useGetAllQuery();
  const { updateTask, deleteTaskById } = useTasks(boardId, columnId);

  const ref = useRef<HTMLDivElement>(null);
  const drag = useDrag(
    () => ({
      type: DndItemType.Task,
      item: { ...data, columnId },
    }),
    [data]
  )[1];
  const drop = useDrop(
    () => ({
      accept: DndItemType.Task,
      async drop(_item, monitor) {
        const { columnId: oldColumnId, ...rest } = monitor.getItem<DraggedTask>();
        rest.id !== data.id &&
          (await updateTask({ ...rest, order: data.order }, oldColumnId, columnId));
      },
    }),
    [data, columnId]
  )[1];
  drag(drop(ref));

  const onDeleteSubmit = async () => {
    await deleteTaskById(data.id);
    hideModal('deleteTask');
  };

  const user = useMemo(
    () => users && users.find((x) => x.id === data.userId),
    [data.userId, users]
  );

  return (
    <>
      <Paper sx={styles.container} ref={ref} elevation={2}>
        <Typography variant="h6" fontWeight="bold">
          {data.title}
        </Typography>
        <Typography>{data.description}</Typography>
        {users && user && (
          <Box sx={styles.user}>
            <Typography>{`${user.name}(${user.login})`}</Typography>
            <Menu<User>
              options={users}
              equal={(a, b) => a.id === b.id}
              text={(x) => `${x.name}(${x.login})`}
              handleClick={(user) => updateTask({ ...data, userId: user.id }, columnId, columnId)}
              selected={user}
              button={
                <IconButton>
                  <MoreVert />
                </IconButton>
              }
            />
          </Box>
        )}
        <Box sx={styles.buttons}>
          <Button onClick={() => showModal('editTask')}>
            <Edit fontSize="small" color="primary" />
          </Button>
          <Button onClick={() => showModal('deleteTask')}>
            <Delete fontSize="small" color="secondary" />
          </Button>
        </Box>
      </Paper>
      <DeleteModal
        title={t('modals.delete.task')}
        onSubmit={onDeleteSubmit}
        open={modals.deleteTask}
        hideModal={() => hideModal('deleteTask')}
      />
      <TaskModal
        title={t('modals.edit.task')}
        task={data}
        open={modals.editTask}
        hideModal={() => hideModal('editTask')}
        action={({ title, description }) =>
          updateTask(
            {
              ...data,
              title,
              description,
            },
            columnId,
            columnId
          )
        }
      />
    </>
  );
};

export default Task;
