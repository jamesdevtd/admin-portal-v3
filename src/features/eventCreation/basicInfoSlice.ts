import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { sampleBasicInfo } from './../../static/event';
import type { RootState } from '../../app/store';

import { EventProps } from '@/types/event';

export type basicInfoStateProps = {
  value: EventProps;
};
const initialState: basicInfoStateProps = {
  value: {
    // id: 1,
    // status: 'draft',
    // additionalEvents: [],
    // contactDetails: [],
    // eventEndDate: '', // string($date-time)
    // eventName: '',
    // eventStartDate: '', // string($date-time)
    // eventStartTime: '', // string($date-time)
    // eventYear: 0,
    // facilityAddress: null, // lat long array
    // facilityAddressString: '', // String address
    // facilityName: '',
    // facilityNotes: '',
    // registrationEndDate: '', // string($date-time)
    // registrationStartDate: '', // string($date-time)
    // seriesMonth: 0,
    ...sampleBasicInfo,
  },
};

export const basicInfoSlice = createSlice({
  name: 'basicInfo',
  initialState,
  reducers: {
    updateBasicInfo: (state, action: PayloadAction<EventProps>) => {
      console.log('slice updateBasicInfo...');
      state.value = { ...state.value, ...action.payload };
    },
  },
});

export const { updateBasicInfo } = basicInfoSlice.actions;

// eslint-disable-next-line unused-imports/no-unused-vars
export const getBasicInfo = (state: RootState) => state.basicInfo.value;

export default basicInfoSlice.reducer;
