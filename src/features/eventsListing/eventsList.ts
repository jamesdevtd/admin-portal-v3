import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GET } from '@/services/rest.service';

import type { RootState } from '../../app/store';

import { EventProps } from '@/types/event';

export type EventsListProps = {
  events: any[];
  loading: boolean;
  error: string | null;
};

const initialState: EventsListProps = {
  events: [],
  loading: false,
  error: null,
};

export const getEvents = createAsyncThunk('events/get', async () => {
  let response: any;
  await GET('/league', {})
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      // console.log('catch err:', err);
      response = err;
    });
  return response;
});

export const eventsListSlice = createSlice({
  name: 'eventsList',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<EventProps>) => {
      state.events.push(action.payload);
    },
  },
  extraReducers: {
    [getEvents.pending as any]: (state, action) => {
      state.loading = true;
    },
    [getEvents.fulfilled as any]: (state, action) => {
      state.loading = false;
      // console.log('getEvents.fulfilled - action.payload: ', action.payload);
      state.events = action.payload;
    },
    [getEvents.rejected as any]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addEvent } = eventsListSlice.actions;

// eslint-disable-next-line unused-imports/no-unused-vars
export const getEventsListState = (state: RootState) => state.eventsList;

export default eventsListSlice.reducer;
