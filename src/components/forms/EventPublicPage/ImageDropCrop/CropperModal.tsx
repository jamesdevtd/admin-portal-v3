import React, { useEffect, useRef, useState } from "react";
import Cropper from "react-cropper";

import "cropperjs/dist/cropper.css";
import styles from "./CropModal.module.scss";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getCropperModal, updateCroppedImage, updateCropperModal } from '@/features/eventCreation/eventPublicPageSlice';


export const CropperModal = () => {

  const dispatch = useAppDispatch();
  const cropperModal = useAppSelector(getCropperModal);

  const [image, setImage] = useState('');
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState<any>();

  useEffect(() => {
    setImage(cropperModal.src);
  }, [cropperModal]);

  const onChange = (e: any) => {
    console.log('onChange : ', e.target.value);

    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = async () => {
    console.log('cropperRef?.current: ', cropperRef?.current);
    if (typeof cropper !== "undefined") {
      const src = cropper.getCroppedCanvas().toDataURL('image/jpeg');
      console.log('src: ', src);

      // convert bas64 to blob
      const base64Response = await fetch(src);
      const blob = await base64Response.blob();
      const imgUrl = URL.createObjectURL(blob);
      saveImage(imgUrl);
      // const imgUrl = URL.createObjectURL(src);
      // console.log('parsed: ', imgUrl);

      // saveImage(src);
    }
  };

  const cropperRef = useRef<HTMLImageElement>(null);

  const onCrop = () => {

    // const imageElement: any = cropperRef?.current;
    // const cropper: any = imageElement?.cropper;
    // const imgData = cropper.getCroppedCanvas().toDataURL();
    console.log('on crop: ');
  };

  const cropEnd = () => {
    console.log('on cropEnd');
  }

  const handleCancel = () => {
    dispatch(updateCropperModal({ imgId: 0, src: '', isOpen: false, isReCrop: false }));
  }

  const saveImage = (val: string) => {
    dispatch(updateCroppedImage({ id: cropperModal.imgId, src: val }));
    handleCancel();
  }

  console.log('init modal with src: ', image);

  return (
    <>
      {/* {image ? */}
      <h3>test element here...</h3>

      <div className={`${styles.CropperModal} ${cropperModal.src ? styles[`active`] : styles[`inactive`]}`}>
        <div className={`cropper-stage ${cropperModal.isReCrop && 're-crop'}`}>
          <Cropper
            // style={{ height: 400, width: "100%" }}
            zoomTo={0}
            initialAspectRatio={2.66}
            preview=".img-preview"
            src={image}
            viewMode={2}
            dragMode='move'
            movable={true}
            cropBoxMovable={true}
            cropBoxResizable={false}
            // minCropBoxHeight={80}
            // minCropBoxWidth={10}
            background={true}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            onInitialized={(instance) => {
              setCropper(instance);
              // console.log('onInitialized...');
            }}
            guides={false}
            crop={onCrop}
            ref={cropperRef}
          />
        </div>
        <div className="cropper-buttons" >
          <button style={{ float: "right" }}
            onClick={handleCancel} className='btn grey'>
            Cancel Crop
          </button>
          <button style={{ float: "right" }} onClick={getCropData} className='btn'>
            Crop Image
          </button>
        </div>
      </div>

      <div className="empty-img-cropper"></div>
    </>


  );
};

export default CropperModal;
