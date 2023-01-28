import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import { DndItemType } from '../../../application.constants';
import useColumns from '../../../hooks/useColumns';
import useModals from '../../../hooks/useModals';
import useTasks from '../../../hooks/useTasks';
import { Column as ColumnType } from '../../../types/column';
import { DraggedTask } from '../../../types/task';
import DeleteModal from '../../modals/DeleteModal';
import TaskModal from '../../modals/TaskModal';
import Task from '../../Task';
import EditColumn from '../EditColumn';
import styles from './styles';

interface Props {
  data: ColumnType;
  boardId: string;
}

type Modals = {
  deleteColumn: boolean;
  addTask: boolean;
};

const Column = ({ data, boardId }: Props) => {
  const { t } = useTranslation();
  const [isColumnEdited, setIsColumnEdited] = useState(false);
  const { deleteColumnById, updateColumn } = useColumns(boardId);
  const { updateTask, createTask } = useTasks(boardId, data.id);
  const { modals, showModal, hideModal } = useModals<Modals>({
    addTask: false,
    deleteColumn: false,
  });

  const ref = useRef<HTMLDivElement>(null);
  const drag = useDrag(
    () => ({
      type: DndItemType.Column,
      item: { ...data },
    }),
    [data]
  )[1];
  const drop = useDrop(
    () => ({
      accept: [DndItemType.Task, DndItemType.Column],
      async drop(_item, monitor) {
        if (monitor.isOver()) {
          const itemType = monitor.getItemType();
          if (itemType === DndItemType.Task) {
            const { columnId, ...rest } = monitor.getItem<DraggedTask>();
            !(rest.order === 1 && columnId === data.id) &&
              (await updateTask({ ...rest, order: 1 }, columnId, data.id));
          } else if (itemType === DndItemType.Column) {
            const item = monitor.getItem<ColumnType>();
            item.id !== data.id && (await updateColumn({ ...item, order: data.order }));
          } else throw new Error(`No such drag and drop item type = ${String(itemType)}`);
        }
      },
    }),
    [data]
  )[1];
  drag(drop(ref));

  const onDeleteColumnSubmit = async () => {
    await deleteColumnById(data.id);
    hideModal('deleteColumn');
  };

  const onEditColumnSubmit = async (title: string) => {
    await updateColumn({ ...data, title });
    setIsColumnEdited(false);
  };

  return (
    <>
      <Box ref={ref} sx={styles.container}>
        <Box sx={styles.content}>
          <Box sx={styles.headerContainer}>
            {!isColumnEdited ? (
              <Grid container>
                <Grid item container xs={7} alignItems="center" justifyContent="center">
                  <Typography fontWeight="bold">{data.title}</Typography>
                </Grid>
                <Grid item xs={5} sx={styles.buttons}>
                  <Button onClick={() => setIsColumnEdited(true)}>
                    <Edit />
                  </Button>
                  <Button onClick={() => showModal('deleteColumn')}>
                    <Delete color="secondary" />
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <EditColumn
                title={data.title}
                onClose={() => setIsColumnEdited(false)}
                onSubmit={onEditColumnSubmit}
              />
            )}
          </Box>
          <Box sx={styles.tasks}>
            {[...data.tasks]
              .sort((a, b) => a.order - b.order)
              .map((x, index) => (
                <Task key={index} data={x} boardId={boardId} columnId={data.id} />
              ))}
          </Box>
          <Button onClick={() => showModal('addTask')} sx={styles.addTaskBtn} variant="contained">
            <Typography>{t('common.addTask')}</Typography>
          </Button>
        </Box>
      </Box>
      <TaskModal
        task={{ title: '', description: '' }}
        open={modals.addTask}
        hideModal={() => hideModal('addTask')}
        action={({ title, description }) => createTask(title, description)}
        title={t('common.addTask')}
      />
      <DeleteModal
        title={t('modals.delete.column')}
        onSubmit={onDeleteColumnSubmit}
        open={modals.deleteColumn}
        hideModal={() => hideModal('deleteColumn')}
      />
    </>
  );
};

export default Column;
