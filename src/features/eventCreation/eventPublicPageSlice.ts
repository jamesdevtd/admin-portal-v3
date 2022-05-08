import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { startingOrderedFields } from '@/static/event';

import type { RootState } from '../../app/store';

import {
  CroppedImageProps,
  CropperModalProps,
  EventImageProps,
  OrderedField,
} from '@/types/event';

export type EventPupublicPageProps = {
  eventMainImage: EventImageProps;
  fields: OrderedField[];
  croppedImages: CroppedImageProps[];
  cropperModal: CropperModalProps;
};

const initialState: EventPupublicPageProps = {
  eventMainImage: {
    eventId: 0,
    src: '',
  },
  fields: startingOrderedFields,
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
    },
    removedCroppedImageById: (state, action: PayloadAction<number>) => {
      const index = state.croppedImages.findIndex(
        (i) => i.id === action.payload
      );
      if (index !== -1) state.croppedImages.splice(index, 1);
    },
    addField: (state, action: PayloadAction<OrderedField>) => {
      state.fields.push(action.payload);
    },
    updateField: (
      state,
      action: PayloadAction<{ id: number; type: string; data: any }>
    ) => {
      const index = state.fields.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) state.fields[index].data = action.payload.data;
    },
    deleteField: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index !== -1) state.fields.splice(index, 1);
    },
    moveFieldUp: (state, action: PayloadAction<number>) => {
      const fromIndex = action.payload;
      if (fromIndex > 0) {
        const toIndex = fromIndex - 1;
        if (
          state.fields[fromIndex].type === 'text' &&
          state.fields[toIndex].type === 'text'
        ) {
          console.log('NOT permitted: field above is also text');
        } else {
          const element = state.fields[fromIndex];
          state.fields.splice(fromIndex, 1);
          state.fields.splice(toIndex, 0, element);
        }
      }
    },
    moveFieldDown: (state, action: PayloadAction<number>) => {
      const fromIndex = action.payload;
      if (fromIndex < state.fields.length - 1) {
        const toIndex = fromIndex + 1;
        if (
          state.fields[fromIndex].type === 'text' &&
          state.fields[toIndex].type === 'text'
        ) {
          console.log('NOT permitted: field below is also text');
        } else {
          const element = state.fields[fromIndex];
          state.fields.splice(fromIndex, 1);
          state.fields.splice(toIndex, 0, element);
        }
      }
    },
  },
});

export const {
  deleteField,
  updateField,
  updateCropperModal,
  removedCroppedImageById,
  addCroppedImage,
  updateCroppedImage,
  addField,
  moveFieldUp,
  moveFieldDown,
} = eventPublicPageSlice.actions;

export const getCropperModal = (state: RootState) =>
  state.eventPublicPage.cropperModal;

export const getCroppedImageById = (id: number) => (state: RootState) => {
  return state.eventPublicPage.croppedImages.find((i) => i.id === id);
};

export const getFieldById = (id: number) => (state: RootState) => {
  return state.eventPublicPage.fields.find((i) => i.id === id);
};

export const getFields = (state: RootState) => {
  return state.eventPublicPage.fields;
};

export const getFieldsLength = (state: RootState) => {
  return state.eventPublicPage.fields.length;
};

export const getCroppedImagesCount = (state: RootState) => {
  return state.eventPublicPage.croppedImages.length;
};

export default eventPublicPageSlice.reducer;
