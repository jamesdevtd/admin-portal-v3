import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import counterReducer from '@/features/counter/counterSlice';
import divisionsReducer from '@/features/eventCreation/divisionsSlice';
import eventCreationReducer from '@/features/eventCreation/eventCreationSlice';
import onboardingStepReducer from '@/features/onboardingSteps/onboardingStepsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    onboardingStep: onboardingStepReducer,
    eventCreation: eventCreationReducer,
    divisions: divisionsReducer,
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
