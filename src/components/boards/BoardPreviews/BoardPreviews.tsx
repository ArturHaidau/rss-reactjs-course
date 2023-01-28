import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useBoards from '../../../hooks/useBoards';
import useModals from '../../../hooks/useModals';
import { boardsApi } from '../../../store/api/boards';
import BoardModal from '../../modals/BoardModal';
import BoardPreview from '../BoardPreview';
import styles from './styles';

type Modals = {
  addBoard: boolean;
};

const BoardPreviews = () => {
  const { t } = useTranslation();
  const { modals, hideModal, showModal } = useModals<Modals>({ addBoard: false });
  const { createBoard } = useBoards();
  const { data: boardPreviews = [] } = boardsApi.useGetAllQuery();
  return (
    <Box sx={styles.background}>
      <Container maxWidth="xl">
        <Typography variant="h1" textAlign="center">
          {t('common.boards')}
        </Typography>
        <Grid container spacing={4}>
          {boardPreviews.map((boardPreview, index) => (
            <Grid key={index} item lg={3} md={4} sm={6} xs={12}>
              <BoardPreview boardPreview={boardPreview} />
            </Grid>
          ))}
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <Paper sx={styles.addBoard} onClick={() => showModal('addBoard')} elevation={4}>
              <Typography variant="h5" fontWeight="bold">
                {t('common.addBoard')}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <BoardModal
          open={modals.addBoard}
          hideModal={() => hideModal('addBoard')}
          title={t('common.addBoard')}
          action={(data) => createBoard(data)}
          boardPreview={{ id: '', description: '', title: '' }}
        />
      </Container>
    </Box>
  );
};

export default BoardPreviews;
