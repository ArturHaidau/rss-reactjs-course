import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useModals from '../../../hooks/useModals';
import { Board as BoardType } from '../../../types/board';
import Column from '../../columns/Column';
import AddColumnModal from '../../modals/AddColumnModal';
import styles from './styles';

interface Props {
  data: BoardType;
}

type Modal = 'addColumn';

const Board = ({ data }: Props) => {
  const { t } = useTranslation();
  const { modals, showModal, hideModal } = useModals<Modal>({ addColumn: false });
  return (
    <>
      <Box sx={styles.container}>
        {[...data.columns]
          .sort((a, b) => a.order - b.order)
          .map((x, index) => (
            <Column key={index} data={x} boardId={data.id} />
          ))}
        <Box>
          <Button
            onClick={() => showModal('addColumn')}
            sx={styles.addColumnBtn}
            variant="contained"
          >
            <Typography>{t('common.addColumn')}</Typography>
          </Button>
        </Box>
      </Box>
      <AddColumnModal
        boardId={data.id}
        open={modals.addColumn}
        hideModal={() => hideModal('addColumn')}
      />
    </>
  );
};

export default Board;
