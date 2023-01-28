import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Profile } from '../../types/profile';

const initialState: Profile[] = [];

const slice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    addProfile(state, { payload }: PayloadAction<Profile>) {
      state.push(payload);
    },
  },
});

export const { addProfile } = slice.actions;
export default slice.reducer;
