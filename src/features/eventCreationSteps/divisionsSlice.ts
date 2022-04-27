import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';

import { DivisionProps } from '@/types/division';

// declaring the types for our state
export type DivisionsState = {
  value: DivisionProps[];
};

const initialState: DivisionsState = {
  value: [
    {
      id: 1,
      divisionType: '',
      makeUp: '',
      competitionLevel: '',
      numberOfPools: 1,
      pools: [],
      isEdited: false,
    },
  ],
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
          i.isEdited = item.isEdited;
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

export default divisionsSlice.reducer;
