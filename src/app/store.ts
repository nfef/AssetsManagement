import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import AuthUserSlice from '../auth/AuthUserSlice';
import PageSlice from './PageSlice';

export const store = configureStore({
  reducer: {
    /**
     * authUser is used to store the authentificated user
     */
    authUser: AuthUserSlice,
    page: PageSlice,

  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
