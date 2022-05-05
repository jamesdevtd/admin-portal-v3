import React, { useRef, useState } from "react";
import Cropper from "react-cropper";

import "cropperjs/dist/cropper.css";
import styles from "./CropperModal.module.scss";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getExtraImage, updateExtraImage } from '@/features/eventCreation/eventPublicPageSlice';

type Props = {
  imgSrc?: string
}


export const Modal = ({ imgSrc }: Props) => {

  const dispatch = useAppDispatch();
  const imgObject = useAppSelector(getExtraImage);

  const [image, setImage] = useState(imgObject.modalSrc);
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState<any>();
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

  const getCropData = () => {
    console.log('cropperRef?.current: ', cropperRef?.current);
    if (typeof cropper !== "undefined") {
      const imgData = cropper.getCroppedCanvas().toDataURL();
      setCroppedImage(imgData);
    }
  };

  const cropperRef = useRef<HTMLImageElement>(null);

  const onCrop = () => {
    console.log('on Crop...');
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    const imgData = cropper.getCroppedCanvas().toDataURL();
    // console.log('imgData: ', typeof imgData);
    // console.log(cropper.getCroppedCanvas().toDataURL());
  };

  const cropEnd = () => {
    console.log('on cropEnd');
  }

  const handleCancel = () => {
    dispatch(updateExtraImage({
      ...imgObject,
      ...{ modalSrc: '' }
    }));
  }

  const setCroppedImage = (val: string) => {
    dispatch(updateExtraImage({
      ...imgObject,
      ...{ modalSrc: '', output: val }
    }));
  }

  return (
    <>
      {image ?
        <div className={styles.CropperModal}>
          <div className="cropper-stage">
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
              minCropBoxHeight={80}
              minCropBoxWidth={10}
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
        </div> :
        <div className="empty-img-cropper"></div>
      }
    </>


  );
};

export default Modal;
