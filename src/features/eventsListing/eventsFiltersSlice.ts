import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';

export type EventsFiltersState = {
  value: number;
  filters: {
    view: string;
    own: boolean;
    search: string;
    country: string;
    type: string;
    series: string;
    division: string;
    status: string;
    date: string;
  };
};

const initialState: EventsFiltersState = {
  value: 0,
  filters: {
    view: 'card',
    own: false,
    search: '',
    country: '',
    type: '',
    series: '',
    division: '',
    status: '',
    date: '',
  },
};

export const eventsFiltersSlice = createSlice({
  name: 'eventsFilters',
  initialState,
  reducers: {
    // TODO: replace any with actual interface
    updateFilters: (state, action: PayloadAction<any>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const { updateFilters } = eventsFiltersSlice.actions;

export const getStep = (state: RootState) => state.eventsFilters.value;
export const getFilters = (state: RootState) => state.eventsFilters.filters;

export default eventsFiltersSlice.reducer;
