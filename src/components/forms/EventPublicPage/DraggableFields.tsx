import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { EditorProps } from 'react-draft-wysiwyg';
import { FiYoutube } from 'react-icons/fi';

import styles from './EventPublicPage.module.scss';

import DragButtons from './DragButtons';
import YoutubeLink from './YoutubeLink';
import ExtraImageDropCrop from '../fields/ImageDropCrop';

import ImageIcon from '~/icons/blue/image.svg';
import TextIcon from '~/icons/blue/text-t.svg';

type Props = {
  eventId?: number
}

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
)

export default function DraggableFields({ eventId }: Props) {

  const [editorVal, setEditorVal] = useState('');

  const onHtmlChange = (e: any) => {
    // setHtml(e.target.value);
    console.log('onHtmlChange: ', e);

  }

  function addText() {
    console.log('addText...');
  }
  function addImage() {
    console.log('addText...');
  }
  function addVideo() {
    console.log('addText...');
  }

  return (
    <div className={`${styles.draggableFields} mt-5`}>

      <section>
        <Editor
          // editorState={editorVal}
          wrapperClassName="Wysiwyg"
          onEditorStateChange={onHtmlChange}
        />
        <DragButtons itemId={1} />
      </section>

      <section>
        <ExtraImageDropCrop imgId={2} />
        <DragButtons itemId={2} />
      </section>

      <section>
        <YoutubeLink />
        <DragButtons itemId={3} />
      </section>

      <div className="buttons-row">
        <button className='btn blue-outline' onClick={addText}><TextIcon />Add Text</button>
        <button className='btn blue-outline' onClick={addImage}><ImageIcon />Add Image</button>
        <button className='btn blue-outline' onClick={addVideo}> <FiYoutube /> Add Video </button>
      </div>

    </div>
  )
}