import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import useBoards from '../../../hooks/useBoards';
import useModals from '../../../hooks/useModals';
import { boardsApi } from '../../../store/api/boards';
import BoardDescriptionModal from '../../modals/BoardDescriptionModal';
import BoardModal from '../../modals/BoardModal';
import DeleteModal from '../../modals/DeleteModal';
import Board from '../Board';
import styles from './styles';

type Modal = 'boardDescription' | 'editBoard' | 'deleteBoard';

const BoardPage = () => {
  const { t } = useTranslation();
  const { modals, hideModal, showModal } = useModals<Modal>({
    boardDescription: false,
    editBoard: false,
    deleteBoard: false,
  });
  const navigate = useNavigate();
  const { updateBoard, deleteBoardById } = useBoards();
  const { id } = useParams();
  const { data: board } = boardsApi.useGetByIdQuery(id!);

  const onDeleteSubmit = async () => {
    await deleteBoardById(board!.id);
    hideModal('deleteBoard');
    navigate('/boards');
  };

  return (
    <Box sx={styles.background}>
      <Container maxWidth="xl">
        {board && (
          <>
            <Box sx={styles.content}>
              <Typography variant="h3">{board.title}</Typography>
              <Typography variant="h4">{board.description}</Typography>
              <Box sx={styles.buttons}>
                <Button
                  onClick={() => showModal('boardDescription')}
                  variant="contained"
                  sx={styles.button}
                >
                  <Typography>{t('common.description')}</Typography>
                </Button>
                <Button
                  onClick={() => showModal('editBoard')}
                  variant="contained"
                  sx={styles.button}
                >
                  <Typography>{t('common.edit')}</Typography>
                </Button>
                <Button
                  onClick={() => showModal('deleteBoard')}
                  variant="contained"
                  sx={styles.button}
                >
                  <Typography>{t('common.delete')}</Typography>
                </Button>
              </Box>
              {board.columns.length === 0 && (
                <Typography variant="h4">{t('common.noColumns')}</Typography>
              )}
              <Board data={board} />
            </Box>
            <BoardDescriptionModal
              open={modals.boardDescription}
              hideModal={() => hideModal('boardDescription')}
              boardPreview={board}
            />
            <BoardModal
              title={t('modals.edit.board')}
              open={modals.editBoard}
              hideModal={() => hideModal('editBoard')}
              boardPreview={board}
              action={(data) => updateBoard({ id: board.id, ...data })}
            />
            <DeleteModal
              open={modals.deleteBoard}
              hideModal={() => hideModal('deleteBoard')}
              title={t('modals.delete.board')}
              onSubmit={onDeleteSubmit}
            />
          </>
        )}
      </Container>
    </Box>
  );
};

export default BoardPage;
