import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';

// declaring the types for our state
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
    increment: (state) => {
      state.value++;
    },
    decrement: (state) => {
      state.value--;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    updateFilters: (state, action: PayloadAction<any>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const { increment, decrement, setCurrentStep, updateFilters } =
  eventsFiltersSlice.actions;

export const getStep = (state: RootState) => state.eventsFilters.value;
export const getFilters = (state: RootState) => state.eventsFilters.filters;

export default eventsFiltersSlice.reducer;
