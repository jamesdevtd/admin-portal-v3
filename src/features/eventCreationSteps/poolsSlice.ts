import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';

import { PoolItemProps } from '@/types/division';

// declaring the types for our state
export type PoolsState = {
  value: PoolItemProps[];
};

const initialState: PoolsState = {
  value: [],
};

export const poolsSlice = createSlice({
  name: 'pools',
  initialState,
  reducers: {
    addPool: (state, action: PayloadAction<PoolItemProps>) => {
      state.value.push(action.payload);
    },
    updatePool: (state, action: PayloadAction<PoolItemProps>) => {
      const item = action.payload;
      state.value.filter((i) => {
        if (i.id === item.id) {
          i.id = item.id;
          i.name = item.name;
          i.numberOfTeams = item.numberOfTeams;
        }
      });
    },
    deleteLastPool: (state) => {
      state.value.pop();
    },
    deletePool: (state, action: PayloadAction<PoolItemProps>) => {
      const index = state.value.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) state.value.splice(index, 1);
    },
  },
});

export const { addPool, updatePool, deleteLastPool, deletePool } =
  poolsSlice.actions;

export const getPools = (state: RootState) => state.pools.value;

export default poolsSlice.reducer;
