import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import filterReducer, { add, remove } from '../features/filter/filterSlice';
import eventsReducer from '../features/events/eventsSlice';
// import liversReducer from '../features/livers/liversSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    events: eventsReducer,
    // livers: liversReducer,
  },
  devTools: {
    name: 'test',
    actionCreators: { add, remove },
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
