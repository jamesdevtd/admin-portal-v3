import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { startingEventCreationSteps } from '@/static/event';

import type { RootState } from '../../app/store';

import { EventCreationStepProps, EventProps } from '@/types/event';

// declaring the types for our state
export type EventCreation = {
  currentStep: number;
  steps: EventCreationStepProps[];
  newEventData: EventProps;
};

const initialState: EventCreation = {
  currentStep: 1,
  steps: startingEventCreationSteps,
  newEventData: {} as EventProps,
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
    updateNewEventData: (state, action: PayloadAction<EventProps>) => {
      state.newEventData = { ...state.newEventData, ...action.payload };
    },
  },
});

export const {
  setCurrentStep,
  setIsEditedById,
  setIsValidatedById,
  updateNewEventData,
} = eventCreationSlice.actions;

export const getCurrentStep = (state: RootState) =>
  state.eventCreation.currentStep;

export const getStepById = (id: number) => (state: RootState) => {
  return state.eventCreation.steps.find((i) => i.id === id);
};

export const getNewEventData = (state: RootState) => {
  return state.eventCreation.newEventData;
};

export default eventCreationSlice.reducer;
