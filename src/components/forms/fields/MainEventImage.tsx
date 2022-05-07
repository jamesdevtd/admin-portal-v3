
import React, { useState } from 'react'
// React Dropzone
import { useDropzone } from 'react-dropzone';

// Pintura Image Editor
// import 'pintura/pintura.css';
// // Pintura Image Editor
// import 'pintura/pintura.css';
import styles from '@/components/forms/styles/FormGroup.module.scss';

import ImageIcon from '~/icons/grey/image.svg';
import ImagePlaceholder from '~/svg/image-placeholder.svg';

export default function MainEventImage() {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: 'image/*',
  });
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
            <ImagePlaceholder />
            <h3>Drag and drop some files here, or click to select files</h3>
            <p>JPEG or PNG, no larger than 10MB.</p>
          </div>
        </section>
      </div>

    </div>
  )
}

