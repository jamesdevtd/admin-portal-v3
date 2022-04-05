import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';

// declaring the types for our state
export type OnboardingStepState = {
  value: number;
};

const initialState: OnboardingStepState = {
  value: 0,
};

export const onboardingStepsSlice = createSlice({
  name: 'onboardingStep',
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
  onboardingStepsSlice.actions;

export const selectStep = (state: RootState) => state.onboardingStep.value;

export default onboardingStepsSlice.reducer;
