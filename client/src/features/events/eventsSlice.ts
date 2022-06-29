import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isSameDay } from 'date-fns';
import { RootState } from '../../app/store';
import { selectFiltered } from '../filter/filterSlice';

export interface IEvent {
  _id: string;
  date: string | Date;
  feat: Record<string, Record<string, string>>;
  description: '';
  note: '';
  urls: {
    youtube: string;
  },
  color: string;
}

interface EventsState {
  events: IEvent[];
}

const initialState: EventsState = {
  events: [],
}

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    insertEvents: (_state, action: PayloadAction<EventsState>) => {
      return action.payload;
    }
  }
});

export const { insertEvents } = eventsSlice.actions;

export const selectEvents = (state: RootState) => state.events.events;

export const selectByDate = createSelector(
  [selectEvents, (_, date: Date) => date],
  (events, date) => events.filter(event => isSameDay(new Date(event.date), date))
);

export const selectByDateAndFilter = createSelector(
  [selectEvents, selectFiltered, (_state, date) => date],
  (events, livers, date) => events.filter(event => isSameDay(new Date(event.date), date) && !Object.keys(event.feat).every(name => !livers[name]))
)

export default eventsSlice.reducer;