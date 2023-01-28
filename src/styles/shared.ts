export default {
  avatar: { backgroundColor: 'primary.main' },
  headerColor: 'rgb(25, 118, 210)',
  glassyColor: 'rgba(255, 255, 255, 0.2)',
  image: { height: '100%', width: '100%' },
  background: {
    width: '100%',
    height: '100%',
    padding: '20px 0 30px',
    backgroundColor: '#51a8f0',
    color: 'white',
  },
  scrollbar: (type: 'horizontal' | 'vertical') => ({
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 2px grey',
      borderRadius: '30px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'gold',
      borderRadius: '30px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: 'darkgoldenrod',
    },
    '&::-webkit-scrollbar':
      type === 'horizontal'
        ? {
            height: '5px',
            borderRadius: '30px',
          }
        : {
            width: '5px',
            borderRadius: '30px',
          },
  }),
};
