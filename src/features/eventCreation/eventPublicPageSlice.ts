import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';

import { MainEventImageProps } from '@/types/event';

// declaring the types for our state
export type EventPupublicPageProps = {
  eventMainImage: MainEventImageProps;
  items: any[];
};

const initialState: EventPupublicPageProps = {
  eventMainImage: {
    eventId: 0,
    src: '',
    isModalOpen: false,
    output: '',
    modalSrc: '',
  },
  items: [],
};

export const eventPublicPageSlice = createSlice({
  name: 'eventPublicPage',
  initialState,
  reducers: {
    updateMainImage: (state, action: PayloadAction<MainEventImageProps>) => {
      state.eventMainImage.eventId = action.payload.eventId;
      state.eventMainImage.src = action.payload.src;
      state.eventMainImage.isModalOpen = action.payload.isModalOpen;
      state.eventMainImage.modalSrc = action.payload.modalSrc;
      state.eventMainImage.output = action.payload.output;
    },
  },
});

export const { updateMainImage } = eventPublicPageSlice.actions;

export const getEventMainImage = (state: RootState) =>
  state.eventPublicPage.eventMainImage;

export default eventPublicPageSlice.reducer;
