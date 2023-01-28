import shared from '../../../styles/shared';

export default {
  headerContainer: {
    width: '100%',
    borderRadius: '5px',
    backgroundColor: '#0d9e3d',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  container: {
    flex: '0 0 300px',
    padding: '20px',
    height: 'fit-content',
    backgroundColor: shared.glassyColor,
    borderRadius: '5px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    rowGap: '20px',
  },
  tasks: {
    ...shared.scrollbar('vertical'),
    paddingRight: '10px',
    width: '100%',
    maxHeight: '400px',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px',
    overflowY: 'auto',
    boxSizing: 'border-box',
  },
  addTaskBtn: {
    width: '100%',
  },
};
