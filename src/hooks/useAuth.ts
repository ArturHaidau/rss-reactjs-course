import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../store';
import { authApi } from '../store/api/auth/api';
import * as auth from '../store/slices/auth';
import { showNotification } from '../store/slices/notifications';
import { SignInData, SignUpData } from '../types/auth';

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [doSignIn] = authApi.useSignInMutation();
  const [doSignUp] = authApi.useSignUpMutation();

  const signUp = async (data: SignUpData) => {
    await doSignUp(data).unwrap();
    dispatch(showNotification({ type: 'success', message: 'You signed up successfully' }));
    navigate('/sign-in');
  };

  const signIn = async (data: SignInData) => {
    await doSignIn(data).unwrap();
    dispatch(showNotification({ type: 'success', message: 'You signed in successfully' }));
    navigate('/boards');
  };

  const signOut = () => {
    dispatch(auth.signOut());
    dispatch(showNotification({ type: 'success', message: 'You signed out successfully' }));
  };

  return { signUp, signIn, signOut };
};

export default useAuth;
