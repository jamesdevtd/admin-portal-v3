import dynamic from 'next/dynamic';
import React from 'react'
import { FiYoutube } from 'react-icons/fi';

import styles from './EventPublicPage.module.scss';

// import DraftEditor from '@/components/forms/fields/DraftEditor';
import ImageDropCrop from '@/components/forms/fields/ImageDropCrop';
import VideoLink from '@/components/forms/fields/VideoLink';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setIsEditedById } from '@/features/eventCreation/eventCreationSlice';
import { addField, getFields, getFieldsLength } from '@/features/eventCreation/eventPublicPageSlice';

import DragButtons from './OrderButtons';

import ImageIcon from '~/icons/blue/image.svg';
import TextIcon from '~/icons/blue/text-t.svg';


const DraftEditor = dynamic(
  () => import('@/components/forms/fields/DraftEditor'),
  { loading: () => <p>Editor is loading</p>, ssr: false }
);

type Props = {
  eventId?: number
}

export default function OrderedFields({ eventId }: Props) {

  const dispatch = useAppDispatch();
  const fieldsLength = useAppSelector(getFieldsLength);
  const fields = useAppSelector(getFields);
  const isTextButtonDisabled = fields[fields.length - 1].type === 'text';

  const setIsFormEdited = () => {
    dispatch(setIsEditedById(3));
  }

  function addText() {
    setIsFormEdited();
    dispatch(addField({ id: fieldsLength + 1, type: 'text', data: '' }));
  }
  function addImage() {
    setIsFormEdited();
    dispatch(addField({ id: fieldsLength + 1, type: 'image', data: '' }));
  }
  function addVideo() {
    dispatch(addField({ id: fieldsLength + 1, type: 'video', data: '' }));
    setIsFormEdited();
  }

  return (
    <div className={`${styles.orderedFields}`}>

      {(fieldsLength > 0) &&
        <div className="fields">
          {fields.map((i, index) =>
            <section key={index} data-id={i.id}>
              {i.type === 'text' &&
                <DraftEditor fieldId={i.id} />
              }
              {i.type === 'image' &&
                <ImageDropCrop fieldId={i.id} imgId={i.id + 1} />
              }
              {i.type === 'video' &&
                <VideoLink fieldId={i.id} />
              }
              <DragButtons fieldId={i.id} itemIndex={index} />
            </section>
          )}
        </div>
      }

      <div className="buttons-row">
        <button className='btn blue-outline' onClick={addText} disabled={isTextButtonDisabled}><TextIcon />Add Text</button>
        <button className='btn blue-outline' onClick={addImage}><ImageIcon />Add Image</button>
        <button className='btn blue-outline' onClick={addVideo}> <FiYoutube /> Add Video </button>
      </div>

    </div>
  )
}