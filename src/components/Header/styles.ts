import shared from '../../styles/shared';
import { ScrollDirection } from '../../types/scroll-direction';

export default {
  header: (scrollDirection: ScrollDirection) => ({
    zIndex: 1,
    flex: '0 0 6vh',
    backgroundColor: shared.headerColor,
    display: 'flex',
    alignItems: 'center',
    position: 'sticky',
    top: scrollDirection === 'down' ? '-6vh' : 0,
    boxShadow: '0 15px 22px 2px rgba(34, 60, 80, 0.2)',
    transitionProperty: 'all',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '500ms',
  }),
  nav: {
    width: '100%',
  },
  buttonLabel: {
    '@media screen and (max-width: 1000px)': {
      display: 'none',
    },
  },
};
