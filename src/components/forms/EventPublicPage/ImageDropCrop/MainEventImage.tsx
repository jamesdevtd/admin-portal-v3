
import React, { useEffect, useState } from 'react'
// React Dropzone
import { useDropzone } from 'react-dropzone';

import styles from '@/components/forms/styles/FormGroup.module.scss';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getEventMainImage, updateMainImage } from '@/features/eventCreation/eventPublicPageSlice';

import ImageIcon from '~/icons/grey/image.svg';
import ImagePlaceholder from '~/svg/image-placeholder.svg';

type Props = {
  eventId: number
}

export default function MainEventImage({ eventId }: Props) {

  const dispatch = useAppDispatch();
  const imgObject = useAppSelector(getEventMainImage);

  const [files, setFiles] = useState<any[]>([]);
  const [error, setError] = useState('');

  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    maxFiles: 1,
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    },
    onDropRejected: fileRejections => {
      fileRejections.map(file => setError(file.errors[0].message));
    },
  });

  useEffect(() => {
    if (files.length) {
      setSourceImage(files[0]?.preview);
    }
  }, [files])


  const setSourceImage = (val: string) => {
    dispatch(updateMainImage({
      ...imgObject,
      ...{ src: val, modalSrc: files[0]?.preview }
    }));
  }

  const removeImages = () => {
    dispatch(updateMainImage({
      ...imgObject,
      ...{ src: '', output: '', modalSrc: '' }
    }))
  }

  const reCrop = () => {
    dispatch(updateMainImage({
      ...imgObject,
      ...{ modalSrc: imgObject.output }
    }))
  }

  const thumb =
    <div key={files[0]?.name}>
      <div >
        <img
          alt={files[0]?.name}
          src={imgObject.output || files[0]?.preview}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(files[0]?.preview) }}
        />
      </div>
    </div>

  return (
    <div className={styles.formGroup}>
      <ImageIcon />
      <div className='label'>
        <span>Main Event Image* </span>
      </div>
      <p className='instructions'>This is the first image athletes will see at the top of your event page and listing card. <br />Use a high quality image: 2160x1080px (2:1 ratio).</p>
      <div className="fields-group">
        <section className="dropzone-box">

          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            {thumb}
            <div className="error">{error}</div>
            <ImagePlaceholder />
            <div className="instructions">
              <h3>Drag and drop some files here, or click to select files</h3>
              <p>JPEG or PNG, no larger than 10MB.</p>
            </div>
          </div>

          {(files.length > 0 || imgObject.output) &&
            <div className="flex gap-5 mt-3">
              <button className='btn grey' onClick={removeImages}>Remove Image</button>
              <button className='btn' onClick={reCrop}>Crop Image</button>
            </div>
          }
        </section>
      </div>
    </div>
  )
}

