import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { blankAffiliateInfo } from './../../static/affiliate';
import type { RootState } from '../../app/store';

import { AffiliateProps } from '@/types/affiliate';

export type affiliateDetailsProps = {
  value: AffiliateProps;
  isEdited: boolean;
};
const initialState: affiliateDetailsProps = {
  value: {
    ...blankAffiliateInfo,
  },
  isEdited: false,
};

export const affiliateDetailsSlice = createSlice({
  name: 'affiliateDetails',
  initialState,
  reducers: {
    updateAffiliateDetails: (state, action: PayloadAction<AffiliateProps>) => {
      state.value = { ...state.value, ...action.payload };
    },
    updateIsEdited: (state, action: PayloadAction<{ isEdited: boolean }>) => {
      state.isEdited = action.payload.isEdited;
    },
  },
});

export const { updateAffiliateDetails, updateIsEdited } =
  affiliateDetailsSlice.actions;

// eslint-disable-next-line unused-imports/no-unused-vars
export const getAffiliateDetails = (state: RootState) =>
  state.affiliateDetails.value;
export const getIsEdited = (state: RootState) =>
  state.affiliateDetails.isEdited;

export default affiliateDetailsSlice.reducer;
