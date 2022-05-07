
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addCroppedImage, getCroppedImageById, updateCroppedImage, updateCropperModal, updateField } from '@/features/eventCreation/eventPublicPageSlice';

import ImagePlaceholder from '~/svg/image-placeholder.svg';

type Props = {
  fieldId?: number,
  imgId: number
}

export default function ImageDropCrop({ fieldId, imgId }: Props) {


  const dispatch = useAppDispatch();
  const imgObject = useAppSelector(getCroppedImageById(imgId));

  const [thumbSrc, setThumbSrc] = useState('');
  const [error, setError] = useState('');

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
        setModalSrc(imgUrl);
        return;
      });
    },
    onDropRejected: fileRejections => {
      fileRejections.map(file => {
        console.log(file);

        if (file.errors[0].code === 'file-too-large') {
          setError('Not Allowed: File is larger than 5MB')
        } else {
          setError(file.errors[0].message);
        }
      });
    },
  });

  useEffect(() => {
    async function getImgData() {
      if (imgObject?.src) {
        const base64Response = await fetch(imgObject?.src as any);
        const blob = await base64Response.blob();
        const imgUrl = URL.createObjectURL(blob);
        setThumbSrc(imgUrl);
        if (fieldId) {
          dispatch(updateField({
            id: fieldId,
            data: { imgId: imgId, src: imgUrl }
          }));
        }
      }
    }
    if (imgObject?.src) {
      getImgData();
    }
  }, [imgObject])

  const setModalSrc = (val: string) => {
    if (imgObject) {
      dispatch(updateCroppedImage({ id: imgId, src: val }));
    } else {
      dispatch(addCroppedImage({ id: imgId, src: val }));
    }
    dispatch(updateCropperModal({ imgId: imgId, src: val, isOpen: true, isReCrop: false }));
  }

  const removeImage = () => {
    dispatch(updateCroppedImage({ id: imgId, src: '' }));
    setThumbSrc('');
  }

  const reCrop = () => {
    dispatch(updateCropperModal({ imgId: imgId, src: thumbSrc, isOpen: true, isReCrop: true }));
  }

  const thumb =
    <div key={imgId}>
      <div >
        <img
          alt={`cropped image ${imgId} `}
          src={thumbSrc}
        // TODO test performance on 10+ images and check if revoking logic is needed i.e. below
        // Revoke data uri after image is loaded
        // onLoad={() => { URL.revokeObjectURL(thumbSrc) }}
        />
      </div>
    </div>

  return (
    <div className={`dropzone-box ${thumbSrc && 'has-thumb'}`}>
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
              <h3>Drag and drop some files here, or click to select files</h3>
              <p>JPEG or PNG, no larger than 5MB.</p>
            </div>
          </div>
        }
      </div>

      {thumbSrc &&
        <button type="button" className="btn replace" onClick={open}>Replace Image</button>
      }
    </div>
  )
}

