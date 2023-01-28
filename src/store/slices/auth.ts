import { createSlice } from '@reduxjs/toolkit';
import { ACCESS_TOKEN_KEY } from '../../application.constants';
import { authApi } from '../api/auth/api';

interface State {
  isAuth: boolean;
  accessToken: string;
}

const initialState: State = {
  isAuth: !!localStorage.getItem(ACCESS_TOKEN_KEY),
  accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) ?? '',
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut(state) {
      state.isAuth = false;
      state.accessToken = '';
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.signIn.matchFulfilled, (state, { payload: { token } }) => {
      state.isAuth = true;
      state.accessToken = token;
    });
    builder.addMatcher(authApi.endpoints.signIn.matchRejected, (state) => {
      state.isAuth = false;
      state.accessToken = '';
    });
  },
});

export const { signOut } = slice.actions;
export default slice.reducer;
