import { useSelector } from 'react-redux';
import { selectAuth } from '../store/selectors';
import { Jwt } from '../types/jwt';

const useJWT = () => {
  const { accessToken } = useSelector(selectAuth);

  const getJWT = () => {
    try {
      return JSON.parse(atob(accessToken.split('.')[1])) as Jwt;
    } catch (error) {
      console.error(error);
      throw new Error('Unable to parse JWT');
    }
  };

  const getUserId = () => getJWT().userId;

  return { getUserId };
};

export default useJWT;
