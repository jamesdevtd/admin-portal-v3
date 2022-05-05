import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';

import {
  CroppedImageProps,
  CropperModalProps,
  EventImageProps,
} from '@/types/event';

// declaring the types for our state
export type EventPupublicPageProps = {
  eventMainImage: EventImageProps;
  items: any[];
  croppedImages: CroppedImageProps[];
  cropperModal: CropperModalProps;
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
  croppedImages: [],
  cropperModal: {
    imgId: 0,
    isOpen: false,
    src: '',
    isReCrop: false,
  },
};

export const eventPublicPageSlice = createSlice({
  name: 'eventPublicPage',
  initialState,
  reducers: {
    updateMainImage: (state, action: PayloadAction<EventImageProps>) => {
      state.eventMainImage.eventId = action.payload.eventId;
      state.eventMainImage.src = action.payload.src;
      state.eventMainImage.isModalOpen = action.payload.isModalOpen;
      state.eventMainImage.modalSrc = action.payload.modalSrc;
      state.eventMainImage.output = action.payload.output;
    },
    addCroppedImage: (state, action: PayloadAction<CroppedImageProps>) => {
      const { id, src } = action.payload;
      state.croppedImages.push({ id: id, src: src });
    },
    updateCroppedImage: (state, action: PayloadAction<CroppedImageProps>) => {
      const { id, src } = action.payload;
      state.croppedImages.filter((i) => {
        if (i.id === id) {
          i.id = id;
          i.src = src;
        }
      });
    },
    updateCropperModal: (state, action: PayloadAction<any>) => {
      state.cropperModal = { ...state.cropperModal, ...action.payload };
      // const { imgId, isOpen, src, isReCrop } = action.payload;
      // state.cropperModal.imgId = imgId;
      // state.cropperModal.src = src;
      // state.cropperModal.isOpen = isOpen;
      // state.cropperModal.isReCrop = isReCrop;
    },
    removedCroppedImageById: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((i) => i.id === action.payload);
      if (index !== -1) state.items.splice(index, 1);
    },
  },
});

export const {
  updateMainImage,
  updateCropperModal,
  removedCroppedImageById,
  addCroppedImage,
  updateCroppedImage,
} = eventPublicPageSlice.actions;

export const getMainImage = (state: RootState) =>
  state.eventPublicPage.eventMainImage;

export const getCropperModal = (state: RootState) =>
  state.eventPublicPage.cropperModal;

export const getCroppedImageById = (id: number) => (state: RootState) => {
  return state.eventPublicPage.croppedImages.find((i) => i.id === id);
};

export const getCroppedImagesCount = (state: RootState) => {
  return state.eventPublicPage.croppedImages.length;
};

export default eventPublicPageSlice.reducer;
