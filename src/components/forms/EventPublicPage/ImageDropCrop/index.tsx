
import React, { useEffect, useState } from 'react'
// React Dropzone
import { useDropzone } from 'react-dropzone';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getEventMainImage, updateMainImage } from '@/features/eventCreation/eventPublicPageSlice';

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
    <section className="dropzone-box">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {imgObject.output ?
          thumb :
          <>
            <div className="error">{error}</div>
            <ImagePlaceholder />
            <div className="instructions">
              <h3>Drag and drop some files here, or click to select files</h3>
              <p>JPEG or PNG, no larger than 10MB.</p>
            </div>
          </>
        }

      </div>

      {(files.length > 0 || imgObject.output) &&
        <div className="flex gap-5 mt-3">
          <button className='btn grey' onClick={removeImages}>Remove Image</button>
          <button className='btn' onClick={reCrop}>Crop Image</button>
        </div>
      }
    </section>
  )
}

