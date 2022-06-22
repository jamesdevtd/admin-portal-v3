import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import affiliateDetailsSlice from '@/features/affiliateDetails/affiliateDetailsSlice';
import counterReducer from '@/features/counter/counterSlice';
import basicInfoReducer from '@/features/eventCreation/basicInfoSlice';
import clonedEventsReducer from '@/features/eventCreation/clonedEventsSlice';
import divisionsReducer from '@/features/eventCreation/divisionsSlice';
import eventCreationReducer from '@/features/eventCreation/eventCreationSlice';
import eventPublicPageReducer from '@/features/eventCreation/eventPublicPageSlice';
import eventsFiltersSlice from '@/features/eventsListing/eventsFiltersSlice';
import eventsListReducer from '@/features/eventsListing/eventsList';
import leaguesFiltersSlice from '@/features/leaguesListing/leaguesFiltersSlice';
import leaguesListReducer from '@/features/leaguesListing/leaguesList';
import loaderReducer from '@/features/loader/loaderSlice';
import onboardingStepReducer from '@/features/onboardingSteps/onboardingStepsSlice';
import { eventCreationApi } from '@/services/eventCreationApi';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    onboardingStep: onboardingStepReducer,
    eventCreation: eventCreationReducer,
    basicInfo: basicInfoReducer,
    eventsList: eventsListReducer,
    divisions: divisionsReducer,
    eventPublicPage: eventPublicPageReducer,
    clonedEvents: clonedEventsReducer,
    eventsFilters: eventsFiltersSlice,
    affiliateDetails: affiliateDetailsSlice,
    leaguesList: leaguesListReducer,
    leaguesFilters: leaguesFiltersSlice,
    loader: loaderReducer,
    [eventCreationApi.reducerPath]: eventCreationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(eventCreationApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
