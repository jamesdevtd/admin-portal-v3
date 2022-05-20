import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';

import { ClonedEventProps } from '@/types/event';

export type ClonedEvents = {
  items: ClonedEventProps[];
};

const initialState: ClonedEvents = {
  items: [],
};

export const clonedEventsSlice = createSlice({
  name: 'clonedEvents',
  initialState,
  reducers: {
    updateClonedEvent: (
      state,
      action: PayloadAction<{ id: number; isEdited: boolean }>
    ) => {
      const index = state.items.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) state.items[index].isEdited = action.payload.isEdited;
    },
  },
});

export const { updateClonedEvent } = clonedEventsSlice.actions;

export const getClonedEvents = (state: RootState) => state.clonedEvents.items;

export const getClonedEventbyId = (id: number) => (state: RootState) => {
  return state.clonedEvents.items.find((i) => i.id === id);
};

export default clonedEventsSlice.reducer;
