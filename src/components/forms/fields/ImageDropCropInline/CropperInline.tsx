import React, { useEffect, useRef, useState } from "react";
import Cropper from "react-cropper";
import Slider from 'react-input-slider';

import "cropperjs/dist/cropper.css";
import styles from "./CropInline.module.scss";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getCropperModal, updateCroppedImage, updateCropperModal, updateIsCropped } from '@/features/onboardingSteps/onboardingStepsSlice';

export const CropperInline = () => {

  const dispatch = useAppDispatch();
  const cropperModal = useAppSelector(getCropperModal);
  const [zoom, setZoom] = useState({ x: 0 });
  const [image, setImage] = useState('');
  // TODO: test if using cropData is more optimal in saving cropped image to store 
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState<any>();

  useEffect(() => {
    setImage(cropperModal.src);
  }, [cropperModal]);

  const getCropData = async () => {
    if (typeof cropper !== "undefined") {
      const src = cropper.getCroppedCanvas().toDataURL('image/png');
      saveImage(src);
    }
  };

  const cropperRef = useRef<HTMLImageElement>(null);

  const saveImage = (val: string) => {
    dispatch(updateCroppedImage({ src: val }));
    handleCancel();
  }

  const handleCancel = () => {
    dispatch(updateCropperModal({ src: '', isOpen: false, isReCrop: false }));
  }

  const setCropFinished = () => {
    getCropData();
    dispatch(updateIsCropped({ isCropped: true }));
  }

  return (
    <div className={styles.CropperModal}>
      <div className={`cropper-stage ${cropperModal.isReCrop && 're-crop'}`}>
        <Cropper
          zoomTo={zoom.x}
          initialAspectRatio={1}
          src={image}
          viewMode={2}
          dragMode='move'
          movable={true}
          cropBoxMovable={false}
          cropBoxResizable={false}
          background={false}
          responsive={true}
          autoCropArea={.65}
          guides={true}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          ref={cropperRef}
          zoom={(e) => {
            const x = e.detail.ratio;
            setZoom(zoom => ({ ...zoom, x }))
          }}
        />
        <div className="my-1 text-xl">
          <span className="mx-2">- </span>
          <Slider
            axis="x"
            xstep={0.1}
            xmax={10}
            xmin={0}
            x={zoom.x}
            onChange={({ x }) => setZoom(zoom => ({ ...zoom, x }))}
          />
          <span className="mx-2">+</span>
        </div>
        <div className="" >
          <button type="button" onClick={handleCancel} className='btn cancel'>
            Cancel
          </button>
          <button type="button" onClick={setCropFinished} className='btn save'>
            Save
          </button>
        </div>
      </div>
    </div>

  );
};

export default CropperInline;
