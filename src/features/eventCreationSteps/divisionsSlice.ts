import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getSumByKey } from '@/utils/arrayUtils';

import type { RootState } from '../../app/store';

import { DivisionProps } from '@/types/division';

// declaring the types for our state
export type DivisionsState = {
  value: DivisionProps[];
};

const initialState: DivisionsState = {
  value: [],
};

export const divisionsSlice = createSlice({
  name: 'divisions',
  initialState,
  reducers: {
    addDivision: (state, action: PayloadAction<DivisionProps>) => {
      state.value.push(action.payload);
    },
    updateDivision: (state, action: PayloadAction<DivisionProps>) => {
      const item = action.payload;
      state.value.filter((i) => {
        if (i.id === item.id) {
          i.divisionType = item.divisionType;
          i.makeUp = item.makeUp;
          i.competitionLevel = item.competitionLevel;
          i.numberOfPools = item.numberOfPools;
          i.pools = item.pools;
          i.playerFee = item.playerFee;
          i.isEdited = item.isEdited;
          i.isValidated = item.isValidated;
        }
      });
    },
    deleteDivision: (state, action: PayloadAction<DivisionProps>) => {
      const index = state.value.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) state.value.splice(index, 1);
    },
  },
});

export const { addDivision, updateDivision, deleteDivision } =
  divisionsSlice.actions;

export const getDivisions = (state: RootState) => state.divisions.value;

export const getNumberOfDivisions = (state: RootState) =>
  state.divisions.value.length;

export const getDivsionById = (id: number) => (state: RootState) => {
  return state.divisions.value.find((i) => i.id === id);
};

export const getTotalTeams = (id: number) => (state: RootState) => {
  const index = state.divisions.value.findIndex((i) => i.id === id);
  return getSumByKey(state.divisions.value[index].pools, 'numberOfTeams');
};

export const getPoolbyParentAndId =
  (divisionId: number, poolId: number) => (state: RootState) => {
    const division = state.divisions.value.find((i) => i.id === divisionId);
    return division?.pools.filter((p) => p.id === poolId);
  };

export default divisionsSlice.reducer;
