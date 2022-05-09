import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { blankBasicInfo } from './../../static/event';
import type { RootState } from '../../app/store';

import { EventProps } from '@/types/event';

export type basicInfoStateProps = {
  value: EventProps;
};
const initialState: basicInfoStateProps = {
  value: {
    ...blankBasicInfo,
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
