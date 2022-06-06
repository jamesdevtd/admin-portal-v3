import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';

// declaring the types for our state
export type LeaguesFiltersState = {
  filters: {
    search?: string;
    status?: string;
    country?: string;
    isPro?: boolean;
    isNonPro?: boolean;
    championshipQualifier?: boolean;
  }
};

const initialState: LeaguesFiltersState = {
  filters: {
    search: '',
    status: 'all',
    country: 'all',
    isPro: false,
    isNonPro: false,
    championshipQualifier: false,
  }
};

export const leaguesFiltersSlice = createSlice({
  name: 'leaguesFilters',
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<LeaguesFiltersState>) => {
      state.filters = { ...state.filters, ...action.payload.filters };
    },
  },
});

export const { updateFilters } =
  leaguesFiltersSlice.actions;

export const getFilters = (state: RootState) => state.leaguesFilters.filters;

export default leaguesFiltersSlice.reducer;
