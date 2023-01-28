import shared from '../../../styles/shared';

export default {
  container: {
    ...shared.scrollbar('horizontal'),
    display: 'flex',
    flexDirection: 'row',
    columnGap: '20px',
    overflowX: 'auto',
    padding: '30px 0 30px',
  },
  addColumnBtn: {
    width: '300px',
  },
};
