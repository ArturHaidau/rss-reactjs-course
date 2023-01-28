import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface State {
  value: boolean;
}

const initialState: State = { value: false };

const slice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading(state, { payload }: PayloadAction<boolean>) {
      state.value = payload;
    },
  },
});

export const { setLoading } = slice.actions;
export default slice.reducer;
