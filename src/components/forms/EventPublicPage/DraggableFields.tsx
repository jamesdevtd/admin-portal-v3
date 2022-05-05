import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { EditorProps } from 'react-draft-wysiwyg';
import { FiYoutube } from 'react-icons/fi';

import DragButtons from './DragButtons';
import ExtraImageDropCrop from './ImageDropCrop';

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
    <div className="draggable-fields mt-5">

      <section draggable>
        <Editor
          // editorState={editorVal}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onHtmlChange}
        />
        <DragButtons itemId={1} />
      </section>

      <section draggable>
        <ExtraImageDropCrop imgId={2} />
        <DragButtons itemId={2} />
      </section>

      <section draggable>
        <div className="box-input">
          <FiYoutube />
          <input type="text" placeholder='Video URL (Vimeo &amp; YouTube links currently supported)' />
        </div>
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