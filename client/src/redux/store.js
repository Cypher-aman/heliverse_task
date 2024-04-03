import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user';
import teamSlice from './features/team';

export const store = configureStore({
  reducer: {
    user: userSlice,
    team: teamSlice,
  },
});
