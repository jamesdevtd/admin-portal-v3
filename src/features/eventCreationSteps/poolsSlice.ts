import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';

import { PoolItemProps } from '@/types/division';

// declaring the types for our state
export type PoolsState = {
  value: {
    totalTeams: number;
    items: PoolItemProps[];
  };
};

const initialState: PoolsState = {
  value: {
    totalTeams: 8,
    items: [
      {
        id: 1,
        name: 'Pool 1',
        numberOfTeams: 8,
      },
    ],
  },
};

export const poolsSlice = createSlice({
  name: 'pools',
  initialState,
  reducers: {
    addPool: (state, action: PayloadAction<PoolItemProps>) => {
      state.value.items.push(action.payload);
    },
    updatePool: (state, action: PayloadAction<PoolItemProps>) => {
      const item = action.payload;
      state.value.items.filter((i) => {
        if (i.id === item.id) {
          i.id = item.id;
          i.name = item.name;
          i.numberOfTeams = item.numberOfTeams;
        }
      });
    },
    deleteLastPool: (state) => {
      state.value.items.pop();
    },
    deletePool: (state, action: PayloadAction<PoolItemProps>) => {
      const index = state.value.items.findIndex(
        (i) => i.id === action.payload.id
      );
      if (index !== -1) state.value.items.splice(index, 1);
    },
    updateTotalTeams: (state, action: PayloadAction<number>) => {
      state.value.totalTeams = action.payload;
    },
  },
});

export const {
  addPool,
  updatePool,
  deleteLastPool,
  deletePool,
  updateTotalTeams,
} = poolsSlice.actions;

export const getPools = (state: RootState) => state.pools.value.items;
export const getTotalTeams = (state: RootState) => state.pools.value.totalTeams;

export default poolsSlice.reducer;
