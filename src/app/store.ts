import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';
import eventCreationStepReducer from '../features/eventCreationSteps/eventCreationStepsSlice';
import onboardingStepReducer from '../features/onboardingSteps/onboardingStepsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    onboardingStep: onboardingStepReducer,
    eventCreationStep: eventCreationStepReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
