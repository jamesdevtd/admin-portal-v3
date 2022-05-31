import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { blankAffiliateInfo } from './../../static/affiliate';
import type { RootState } from '../../app/store';

import { AffiliateProps } from '@/types/affiliate';

export type affiliateDetailsProps = {
  value: AffiliateProps;
};
const initialState: affiliateDetailsProps = {
  value: {
    ...blankAffiliateInfo,
  },
};

export const affiliateDetailsSlice = createSlice({
  name: 'affiliateDetails',
  initialState,
  reducers: {
    updateAffiliateDetails: (state, action: PayloadAction<AffiliateProps>) => {
      console.log('slice updateAffiliateDetails...');
      state.value = { ...state.value, ...action.payload };
    },
  },
});

export const { updateAffiliateDetails } = affiliateDetailsSlice.actions;

// eslint-disable-next-line unused-imports/no-unused-vars
export const getAffiliateDetails = (state: RootState) => state.affiliateDetails.value;

export default affiliateDetailsSlice.reducer;
