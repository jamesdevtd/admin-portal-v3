import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { EditorProps } from 'react-draft-wysiwyg';
import { FiYoutube } from 'react-icons/fi';

import styles from './EventPublicPage.module.scss';

import ImageDropCrop from '@/components/forms/fields/ImageDropCrop';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setIsEditedById } from '@/features/eventCreation/eventCreationSlice';
import { addField, getFields, getFieldsLength } from '@/features/eventCreation/eventPublicPageSlice';

import DragButtons from './OrderButtons';
import YoutubeLink from './YoutubeLink';

import ImageIcon from '~/icons/blue/image.svg';
import TextIcon from '~/icons/blue/text-t.svg';


type Props = {
  eventId?: number
}

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
)

export default function OrderedFields({ eventId }: Props) {

  const dispatch = useAppDispatch();
  const fieldsLength = useAppSelector(getFieldsLength);
  const fields = useAppSelector(getFields);
  const [editorVal, setEditorVal] = useState('');

  const onHtmlChange = (e: any) => {
    // setHtml(e.target.value);
    // console.log('onHtmlChange: ', e);
    // console.log('onHtmlChange: ', e.target.value);
  }

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
          {fields.map(i =>
            <section key={i.id}>
              {i.type === 'text' &&
                <textarea name="" id="" cols={30} rows={2} className='w-full'></textarea>
              }
              {i.type === 'image' &&
                <ImageDropCrop fieldId={i.id} imgId={i.id + 1} />
              }
              {i.type === 'video' &&
                <YoutubeLink itemId={i.id} />
              }
              <DragButtons itemId={i.id} />
            </section>
          )}
        </div>
      }

      <div className="buttons-row">
        <button className='btn blue-outline' onClick={addText}><TextIcon />Add Text</button>
        <button className='btn blue-outline' onClick={addImage}><ImageIcon />Add Image</button>
        <button className='btn blue-outline' onClick={addVideo}> <FiYoutube /> Add Video </button>
      </div>

    </div>
  )
}