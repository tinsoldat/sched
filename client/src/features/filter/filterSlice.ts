import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface FilterState {
  livers: Record<string, boolean>;
  categories: Record<string, boolean>;
}

const initialState: FilterState = {
  livers: {},
  categories: {},
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string | string[]>) => {
      if (Array.isArray(action.payload))
        action.payload.forEach(liver => state.livers[liver] = true);
      else
        state.livers[action.payload] = true;
    },
    remove: (state, action: PayloadAction<string | string[]>) => {
      if (Array.isArray(action.payload))
        action.payload.forEach(liver => state.livers[liver] = false);
      else
        state.livers[action.payload] = false;
    },
  },
});

export const { add, remove } = filterSlice.actions;

export const selectFiltered = createSelector(
  [(state: RootState) => state.filter.livers],
  livers => Object.fromEntries(Object.entries(livers).filter(([_name, status]) => status))
)

export const selectFilteredByName = createSelector(
  [selectFiltered, (_, name: string) => name],
  (livers, name) => livers[name]
)

export const toggle =
  (livers: string | string[]): AppThunk =>
  (dispatch, getState) => {
  const filter = selectFiltered(getState());

  if (Array.isArray(livers)) {
    const flag = livers.every(liver => !filter[liver]);
    if (flag) {
      dispatch(add(livers));
    } else {
      dispatch(remove(livers));
    }
  } else if (!filter[livers]) {
    dispatch(add(livers));
  } else {
    dispatch(remove(livers));
  }
}

export default filterSlice.reducer;
