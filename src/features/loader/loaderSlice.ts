import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';

export type LoaderState = {
  isShown: boolean;
};

const initialState: LoaderState = {
  isShown: false,
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoader: (state) => {
      state.isShown = true;
    },
    hideLoader: (state) => {
      state.isShown = false;
    },
  },
});

export const { showLoader, hideLoader } = loaderSlice.actions;

export const isLoaderShown = (state: RootState) => state.loader.isShown;

export default loaderSlice.reducer;
