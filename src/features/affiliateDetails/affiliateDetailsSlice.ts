import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { blankAffiliateInfo } from './../../static/affiliate';
import type { RootState } from '../../app/store';

import { AffiliateProps } from '@/types/affiliate';
import ContactDetails from '@/types/contactDetails';
import { DivisionProps } from '@/types/division';
import { SubscriptionFee } from '@/types/subscriptionFee';
import UserDetails from '@/types/userDetails';

export type affiliateDetailsProps = {
  value: AffiliateProps;
  isEdited: boolean;
  editContactId: number | null;
  editUserId: number | null;
  editSubscriptionFeeId: number | null;
  editAffiliateFeeId: number | null;
  editAffiliateFeePoolId: number | null;
};
const initialState: affiliateDetailsProps = {
  value: {
    ...blankAffiliateInfo,
  },
  isEdited: false,
  editContactId: null,
  editUserId: null,
  editSubscriptionFeeId: null,
  editAffiliateFeeId: null,
  editAffiliateFeePoolId: null
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
    addContact: (state, action: PayloadAction<ContactDetails>) => {
      // TODO: need to call actual api and then push to state
      const countId = state.value.contactDetails.length + 1;
      state.value.contactDetails.push({ ...action.payload, ...{ id: countId } });
    },
    updateContact: (state, action: PayloadAction<ContactDetails>) => {
      // TODO: need to call actual api and then push to state
      const index = state.value.contactDetails.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) {
        state.value.contactDetails[index] = { ...state.value.contactDetails[index], ...action.payload };
      }
    },
    removeContact: (state, action: PayloadAction<ContactDetails>) => {
      // TODO: need to call actual api and then push to state after deleting contact from league
      state.value.contactDetails = state.value.contactDetails.filter((i) => i.id !== action.payload.id);
    },
    setEditContactId: (state, action: PayloadAction<{ id: number | null }>) => {
      state.editContactId = action.payload.id;
    },
    addUser: (state, action: PayloadAction<UserDetails>) => {
      // TODO: need to call actual api and then push to state
      const countId = state.value.userAccounts.length + 1;
      state.value.userAccounts.push({ ...action.payload, ...{ id: countId } });
    },
    updateUser: (state, action: PayloadAction<UserDetails>) => {
      // TODO: need to call actual api and then push to state
      const index = state.value.userAccounts.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) {
        state.value.userAccounts[index] = { ...state.value.userAccounts[index], ...action.payload };
      }
    },
    setEditUserId: (state, action: PayloadAction<{ id: number | null }>) => {
      state.editUserId = action.payload.id;
    },
    removeUser: (state, action: PayloadAction<UserDetails>) => {
      // TODO: need to call actual api and then push to state after deleting contact from league
      state.value.userAccounts = state.value.userAccounts.filter((i) => i.id !== action.payload.id);
    },

    addSubscriptionFee: (state, action: PayloadAction<SubscriptionFee>) => {
      // TODO: need to call actual api and then push to state
      const countId = state.value.subscriptionFee.length + 1;
      state.value.subscriptionFee.push({ ...action.payload, ...{ id: countId } });
    },
    updateSubscriptionFee: (state, action: PayloadAction<SubscriptionFee>) => {
      // TODO: need to call actual api and then push to state
      const index = state.value.subscriptionFee.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) {
        state.value.subscriptionFee[index] = { ...state.value.subscriptionFee[index], ...action.payload };
      }
    },
    setEditSubscriptionFeeId: (state, action: PayloadAction<{ id: number | null }>) => {
      state.editSubscriptionFeeId = action.payload.id;
    },
    removeSubscriptionFee: (state, action: PayloadAction<SubscriptionFee>) => {
      // TODO: need to call actual api and then push to state after deleting contact from league
      state.value.subscriptionFee = state.value.subscriptionFee.filter((i) => i.id !== action.payload.id);
    },


    addAffiliateFee: (state, action: PayloadAction<DivisionProps>) => {
      // TODO: need to call actual api and then push to state
      const countId = state.value.divisionDetails.length + 1;
      state.value.divisionDetails.push({ ...action.payload, ...{ id: countId } });
    },
    updateAffiliateFee: (state, action: PayloadAction<DivisionProps>) => {
      // TODO: need to call actual api and then push to state
      console.log('action.payload', action.payload);
      const index = state.value.divisionDetails.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) {
        state.value.divisionDetails[index] = { ...state.value.divisionDetails[index], ...action.payload };
      }
    },
    setEditAffiliateFeeId: (state, action: PayloadAction<{ id: number | null, poolId: number | null }>) => {
      state.editAffiliateFeeId = action.payload.id;
      state.editAffiliateFeePoolId = action.payload.poolId;
    },
    removeAffiliateFee: (state, action: PayloadAction<DivisionProps>) => {
      // TODO: need to call actual api and then push to state after deleting contact from league
      state.value.divisionDetails = state.value.divisionDetails.filter((i) => i.id !== action.payload.id);
    },
  },
});

export const {
  updateAffiliateDetails,
  updateIsEdited,
  addContact,
  updateContact,
  removeContact,
  setEditContactId,
  addUser,
  updateUser,
  setEditUserId,
  removeUser,

  addSubscriptionFee,
  updateSubscriptionFee,
  setEditSubscriptionFeeId,
  removeSubscriptionFee,

  addAffiliateFee,
  updateAffiliateFee,
  setEditAffiliateFeeId,
  removeAffiliateFee,
} = affiliateDetailsSlice.actions;

// eslint-disable-next-line unused-imports/no-unused-vars
export const getAffiliateDetails = (state: RootState) =>
  state.affiliateDetails.value;
export const getIsEdited = (state: RootState) =>
  state.affiliateDetails.isEdited;
export const getEditContactId = (state: RootState) =>
  state.affiliateDetails.editContactId;

export const getEditUserId = (state: RootState) =>
  state.affiliateDetails.editUserId;

export const getEditSubscriptionFeeId = (state: RootState) =>
  state.affiliateDetails.editSubscriptionFeeId;

export const getEditAffiliateFeeId = (state: RootState) =>
  state.affiliateDetails.editAffiliateFeeId;

export const getEditAffiliateFeePoolId = (state: RootState) =>
  state.affiliateDetails.editAffiliateFeePoolId;
export default affiliateDetailsSlice.reducer;
