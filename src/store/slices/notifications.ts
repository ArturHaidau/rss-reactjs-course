import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Notification, NotificationType } from '../../types/notification';

interface ShowNotificationPayload {
  type: NotificationType;
  message: string;
}

const initialState: Notification[] = [];

const slice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showNotification(
      state,
      { payload: { type, message } }: PayloadAction<ShowNotificationPayload>
    ) {
      state.push({ type, message, id: crypto.randomUUID() });
    },
    hideNotification(state, { payload }: PayloadAction<string>) {
      state.splice(
        state.findIndex((x) => x.id === payload),
        1
      );
    },
  },
});

export const { showNotification, hideNotification } = slice.actions;
export default slice.reducer;
