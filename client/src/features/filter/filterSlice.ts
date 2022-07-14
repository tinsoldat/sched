import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface FilterState {
  livers: Record<string, boolean>;
  categories: Record<string, boolean>;
}

const initialState: () => FilterState = () => {
  const storedState = window.localStorage.getItem('filter');
  return storedState ? JSON.parse(storedState) : { livers: {}, categories: {} };
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach(liver => state.livers[liver] = true);
    },
    remove: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach(liver => state.livers[liver] = false);
    },
  },
});

export const { add, remove } = filterSlice.actions;

export const selectFiltered = createSelector(
  [(state: RootState) => state.filter.livers],
  livers => Object.fromEntries(Object.entries(livers).filter(([_name, status]) => status))
)

export const toggle =
  (...livers: string[]): AppThunk =>
  (dispatch, getState) => {
  const filter = selectFiltered(getState());

  const flag = livers.every(liver => !filter[liver]);
  if (flag) {
    dispatch(add(livers));
  } else {
    dispatch(remove(livers));
  }
}

export default filterSlice.reducer;
