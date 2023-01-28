import shared from '../../styles/shared';

export default {
  avatar: {
    ...shared.avatar,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100px',
    height: '100px',
  },
  image: shared.image,
  column: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  paragraph: {
    paddingBottom: '20px',
  },
  repairIcon: { fontSize: 80 },
  section: {
    padding: '30px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px',
    padding: '25px',
    height: '100%',
    borderRadius: '5px',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    textAlign: 'center',
    boxSizing: 'border-box',
  },
  techImageContainer: {
    height: 150,
    width: 150,
    boxSizing: 'border-box',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};
