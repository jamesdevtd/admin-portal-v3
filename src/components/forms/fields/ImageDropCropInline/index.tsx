
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';

import styles from "./Index.module.scss";

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addCroppedImage, getCroppedImage, getCropperModal, getIsCropped, updateCroppedImage, updateCropperModal, updateIsCropped } from '@/features/onboardingSteps/onboardingStepsSlice';

import CropperInline from './CropperInline';

import ImagePlaceholder from '~/svg/tagx_logo_circle.svg';

type Props = {
  getValues: any
}

export default function ImageDropCrop({ getValues }: Props) {
  const dispatch = useAppDispatch();
  const imgObject = useAppSelector(getCroppedImage);
  const cropperModal = useAppSelector(getCropperModal);
  const isCroppedSelector = useAppSelector(getIsCropped);

  const [thumbSrc, setThumbSrc] = useState('');
  const [error, setError] = useState('');
  const [image, setImage] = useState('');
  const [isCropped, setIsCropped] = useState<boolean>(false);

  useEffect(() => {
    setIsCropped(isCroppedSelector);
  }, [isCroppedSelector]);

  useEffect(() => {
    setImage(cropperModal.src);
  }, [cropperModal]);

  const {
    getRootProps,
    getInputProps,
    open
  } = useDropzone({
    useFsAccessApi: false,
    maxSize: 5000000,
    maxFiles: 1,
    accept: 'image/*',
    onDrop: acceptedFiles => {
      acceptedFiles.map(file => {
        const imgUrl = URL.createObjectURL(file);
        setSourceImage(imgUrl);
        return;
      });
    },
    onDropRejected: fileRejections => {
      fileRejections.map(file => {
        if (file.errors[0].code === 'file-too-large') {
          setError('Not Allowed: File is larger than 5MB')
        }
        setError(file.errors[0].message);
      });
    },
  });

  useEffect(() => {
    async function getImgData() {
      const base64Response = await fetch(imgObject as string);
      const blob = await base64Response.blob();
      const imgUrl = URL.createObjectURL(blob);
      setThumbSrc(imgUrl);
    }
    if (imgObject) {
      getImgData();
    }
  }, [imgObject])

  useEffect(() => {
    const { image, imageContentType } = getValues();
    async function getImgData() {
      const base64Response = await fetch(`data:${imageContentType};base64,${image}`);
      const blob = await base64Response.blob();
      const imgUrl = URL.createObjectURL(blob);
      setThumbSrc(imgUrl);
      dispatch(updateIsCropped({ isCropped: true }));
    }
    if (image) {
      getImgData();
    }
  }, [])


  const setSourceImage = (val: string) => {
    if (imgObject) {
      dispatch(updateCroppedImage({ src: val }));
    } else {
      dispatch(addCroppedImage({ src: val }));
    }
    dispatch(updateCropperModal({ src: val, isOpen: true, isReCrop: false }));
  }

  const removeImage = () => {
    dispatch(updateCroppedImage({ src: '' }));
    dispatch(updateIsCropped({ isCropped: false }));
    setThumbSrc('');
  }

  const Cropper =
    <div>
      <CropperInline />
    </div>;

  const thumb =
    <div>
      <div >
        <img
          alt="cropped image"
          src={thumbSrc}
        />
      </div>
    </div>

  return (
    <div className={styles.round}>{
      image ?
        Cropper :
        <>
          <section className={`dropzone-box ${thumbSrc && 'has-thumb grid place-items-center'}`}>
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              {thumbSrc ?
                thumb :
                <div className='placeholder-info'>
                  {error ?
                    <h3 className="error">{error}</h3> :
                    <ImagePlaceholder />
                  }
                  <div className="instructions">
                    <p><h3>CLICK TO CHOOSE A FILE</h3> OR DRAG IT HERE.</p>
                  </div>
                </div>
              }
            </div>

          </section>
          {isCropped &&
            <div className="w-full text-center my-4">Not happy? <button type="button" onClick={removeImage}>Upload a New Image</button></div>
          }
        </>
    }
    </div>
  )
}

