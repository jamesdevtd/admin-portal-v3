import { createSlice } from '@reduxjs/toolkit';

import { mockLeagues } from '@/static/leagues';

import type { RootState } from '../../app/store';

import { LeagueProps } from '@/types/league';


export type LeaguesListProps = {
  leagues: LeagueProps[];
  loading: boolean;
  error: string | null;
};

const initialState: LeaguesListProps = {
  leagues: mockLeagues,
  loading: false,
  error: null,
};


export const leaguesListSlice = createSlice({
  name: 'leaguesList',
  initialState,
  reducers: {}
});


// eslint-disable-next-line unused-imports/no-unused-vars
export const getLeaguesList = (state: RootState) => state.leaguesList.leagues;

export default leaguesListSlice.reducer;
