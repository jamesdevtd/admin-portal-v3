import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { startingEventCreationSteps } from '@/static/event';

import type { RootState } from '../../app/store';

import { EventCreationStepProps } from '@/types/event';

export type EventCreation = {
  currentStep: number;
  steps: EventCreationStepProps[];
};

const initialState: EventCreation = {
  currentStep: 1,
  steps: startingEventCreationSteps,
};

export const eventCreationSlice = createSlice({
  name: 'eventCreation',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setIsEditedById: (state, action: PayloadAction<number>) => {
      const index = state.steps.findIndex((i) => i.id === action.payload);
      if (index !== -1) state.steps[index].isEdited = true;
    },
    setIsValidatedById: (state, action: PayloadAction<number>) => {
      const index = state.steps.findIndex((i) => i.id === action.payload);
      if (index !== -1) state.steps[index].isValidated = true;
      if (index !== -1) state.steps[index].isEdited = false;
    },
  },
});

export const { setCurrentStep, setIsEditedById, setIsValidatedById } =
  eventCreationSlice.actions;

export const getCurrentStep = (state: RootState) =>
  state.eventCreation.currentStep;

export const getStepById = (id: number) => (state: RootState) => {
  return state.eventCreation.steps.find((i) => i.id === id);
};

export default eventCreationSlice.reducer;
