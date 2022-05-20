import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// import { starterDivisions } from '@/static/division';
import { getSumByKey } from '@/utils/arrayUtils';

import type { RootState } from '../../app/store';

import { DivisionProps } from '@/types/division';

export type DivisionsState = {
  items: DivisionProps[];
};

const initialState: DivisionsState = {
  items: [],
};

export const divisionsSlice = createSlice({
  name: 'divisions',
  initialState,
  reducers: {
    addDivision: (state, action: PayloadAction<DivisionProps>) => {
      state.items.push(action.payload);
    },
    setIsEdited: (
      state,
      action: PayloadAction<{ id: number; isEdited: boolean }>
    ) => {
      const index = state.items.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) state.items[index].isEdited = action.payload.isEdited;
    },
    setIsValidatedById: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((i) => i.id === action.payload);
      if (index !== -1) state.items[index].isValidated = true;
    },
    updateDivision: (state, action: PayloadAction<DivisionProps>) => {
      const item = action.payload;
      state.items.filter((i) => {
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
    updatePool: (
      state,
      action: PayloadAction<{
        divId: number;
        poolIndex: number;
        poolName: string;
        poolTeamCount: number;
      }>
    ) => {
      const { divId, poolIndex, poolName, poolTeamCount } = action.payload;
      const index = state.items.findIndex((i) => i.id === divId);
      if (index !== -1) {
        state.items[index].isEdited = true;
        state.items[index].pools[poolIndex] = {
          ...{
            id: poolIndex + 1,
            name: poolName || 'Pool ' + (poolIndex + 1),
            numberOfTeams: poolTeamCount,
          },
        };
      }
    },
    updateDivisionFee: (
      state,
      action: PayloadAction<{ id: number; playerFee: any }>
    ) => {
      const index = state.items.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) state.items[index].playerFee = action.payload.playerFee;
    },

    deleteDivision: (state, action: PayloadAction<DivisionProps>) => {
      const index = state.items.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) state.items.splice(index, 1);
    },
  },
});

export const {
  addDivision,
  updateDivision,
  deleteDivision,
  setIsEdited,
  setIsValidatedById,
  updatePool,
  updateDivisionFee,
} = divisionsSlice.actions;

export const getDivisions = (state: RootState) => state.divisions.items;

export const getNumberOfDivisions = (state: RootState) =>
  state.divisions.items.length;

export const getDivisionById = (id: number) => (state: RootState) => {
  return state.divisions.items.find((i) => i.id === id);
};

export const getDivisionStatusById = (id: number) => (state: RootState) => {
  let response;
  state.divisions.items.filter((i) => {
    if (i.id === id) response = i.isValidated;
  });
  return response;
};

export const getTotalTeams = (id: number) => (state: RootState) => {
  const index = state.divisions.items.findIndex((i) => i.id === id);
  return getSumByKey(state.divisions.items[index].pools, 'numberOfTeams');
};

export const getPoolbyParentAndId =
  (divisionId: number, poolId: number) => (state: RootState) => {
    let response;
    const division = state.divisions.items.find((i) => i.id === divisionId);
    division?.pools.filter((p) => {
      if (p.id === poolId) response = p;
    });
    return response;
  };

export default divisionsSlice.reducer;
