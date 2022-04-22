import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';

// declaring the types for our state
export type EventCreationStepState = {
  value: number;
};

const initialState: EventCreationStepState = {
  value: 0,
};

export const eventCreationStepsSlice = createSlice({
  name: 'eventCreationStep',
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
  },
});

export const { increment, decrement, setCurrentStep } =
  eventCreationStepsSlice.actions;

export const selectCurrentStep = (state: RootState) =>
  state.eventCreationStep.value;

export default eventCreationStepsSlice.reducer;
