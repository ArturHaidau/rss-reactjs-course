import { Box, Button, Paper, Typography } from '@mui/material';
import React, { SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useBoards from '../../../hooks/useBoards';
import useModals from '../../../hooks/useModals';
import { BoardPreview as BoardPreviewType } from '../../../types/board-preview';
import BoardModal from '../../modals/BoardModal';
import DeleteModal from '../../modals/DeleteModal';
import styles from './styles';

interface Props {
  boardPreview: BoardPreviewType;
}

type Modal = 'editBoard' | 'deleteBoard';

const BoardPreview = ({ boardPreview }: Props) => {
  const { t } = useTranslation();
  const { updateBoard, deleteBoardById } = useBoards();
  const { modals, hideModal, showModal } = useModals<Modal>({
    editBoard: false,
    deleteBoard: false,
  });
  const navigate = useNavigate();
  const { title, description } = boardPreview;

  const handleClick = (name: Modal) => (event: SyntheticEvent) => {
    event.stopPropagation();
    showModal(name);
  };

  const onDeleteSubmit = async () => {
    await deleteBoardById(boardPreview.id);
    hideModal('deleteBoard');
  };

  return (
    <>
      <Paper onClick={() => navigate(boardPreview.id)} sx={styles.paper} elevation={4}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="h6">{description}</Typography>
        <Box sx={styles.buttons}>
          <Button onClick={handleClick('editBoard')} color="primary">
            <Typography fontWeight="bold">{t('common.edit')}</Typography>
          </Button>
          <Button onClick={handleClick('deleteBoard')} color="secondary">
            <Typography fontWeight="bold">{t('common.delete')}</Typography>
          </Button>
        </Box>
      </Paper>
      <BoardModal
        title={t('modals.edit.board')}
        open={modals.editBoard}
        hideModal={() => hideModal('editBoard')}
        boardPreview={boardPreview}
        action={(data) => updateBoard({ id: boardPreview.id, ...data })}
      />
      <DeleteModal
        open={modals.deleteBoard}
        hideModal={() => hideModal('deleteBoard')}
        title={t('modals.delete.board')}
        onSubmit={onDeleteSubmit}
      />
    </>
  );
};

export default BoardPreview;
