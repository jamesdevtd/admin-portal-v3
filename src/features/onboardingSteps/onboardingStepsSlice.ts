import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';

// declaring the types for our state
export type OnboardingStepState = {
  value: number;
  isCropped: boolean,
  croppedImage: string,
  cropperModal: {
    isOpen: boolean,
    src: '',
    isReCrop: false,
  },
};
const initialState: OnboardingStepState = {
  value: 0,
  isCropped: false,
  croppedImage: '',
  cropperModal: {
    isOpen: false,
    src: '',
    isReCrop: false,
  },
};

export interface CroppedImageProps {
  src: string;
}
export interface CropperModalProps {
  imgId: number;
  src: string;
  isOpen: boolean;
  isReCrop: boolean;
}

export const onboardingStepsSlice = createSlice({
  name: 'onboardingStep',
  initialState,
  reducers: {
    addCroppedImage: (state, action: PayloadAction<CroppedImageProps>) => {
      const { src } = action.payload;
      state.croppedImage = src;
    },
    updateCroppedImage: (state, action: PayloadAction<CroppedImageProps>) => {
      const { src } = action.payload;
      state.croppedImage = src;
    },
    updateCropperModal: (state, action: PayloadAction<any>) => {
      state.cropperModal = { ...state.cropperModal, ...action.payload };
    },
    removeCroppedImage: (state) => {
      state.croppedImage = '';
    },
    updateIsCropped: (state, action: PayloadAction<any>) => {
      const { isCropped } = action.payload;
      state.isCropped = isCropped;
    },
  },
});

export const {
  addCroppedImage,
  updateCroppedImage,
  updateCropperModal,
  removeCroppedImage,
  updateIsCropped
} = onboardingStepsSlice.actions;

export const getCropperModal = (state: RootState) => state.onboardingStep.cropperModal;

export const getCroppedImage = (state: RootState) => state.onboardingStep.croppedImage;

export const getIsCropped = (state: RootState) => state.onboardingStep.isCropped;

export default onboardingStepsSlice.reducer;
