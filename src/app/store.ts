import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';
import divisionsReducer from '../features/eventCreationSteps/divisionsSlice';
import eventCreationStepReducer from '../features/eventCreationSteps/eventCreationStepsSlice';
import poolsReducer from '../features/eventCreationSteps/poolsSlice';
import onboardingStepReducer from '../features/onboardingSteps/onboardingStepsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    onboardingStep: onboardingStepReducer,
    eventCreationStep: eventCreationStepReducer,
    divisions: divisionsReducer,
    pools: poolsReducer,
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
