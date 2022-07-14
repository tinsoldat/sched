import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";

export enum Tabs {
  filter ='filter',
  options = 'options',
  none = 'none',
};

interface UIState {
  tab: Tabs;
};

const initialState: UIState = {
  tab: Tabs.none,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openTab: (state, action: PayloadAction<Tabs>) => {
      state.tab = action.payload;
    },
    closeTab: (state) => {
      state.tab = Tabs.none;
    }
  }
});

export const { openTab, closeTab } = uiSlice.actions;

export const toggleTab =
  (tab: Tabs): AppThunk =>
  (dispatch, getState) => {
    const currentTab = getState().ui.tab;
    if (tab === currentTab) {
      dispatch(closeTab());
    } else {
      dispatch(openTab(tab));
    }
  }

export default uiSlice.reducer;