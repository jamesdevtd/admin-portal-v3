import { convertToHTML } from "draft-convert";
import {
  convertFromRaw,
  convertToRaw,
  Editor, EditorState, RichUtils
} from "draft-js";
// import { Interweave } from 'interweave';
import React, { useEffect, useState } from "react";

import "draft-js/dist/Draft.css";
import styles from './DraftEditor.module.scss';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setIsEditedById } from "@/features/eventCreation/eventCreationSlice";
import { getFieldById, updateDescription, updateField } from '@/features/eventCreation/eventPublicPageSlice';
import { useDebounce } from '@/utils/customHooks';

type Props = {
  fieldId: number,
}

export default function DraftEditor({ fieldId }: Props) {
  const dispatch = useAppDispatch();

  const itemState = useAppSelector(getFieldById(fieldId));

  let initialState;
  if (itemState?.data && Object.keys(itemState?.data).length !== 0) {
    initialState = EditorState.createWithContent(convertFromRaw(itemState?.data));
  } else {
    initialState = EditorState.createEmpty();
  }

  // console.log('hasText(): ', initialState.getCurrentContent().hasText());

  const [editorState, setEditorState] = useState(initialState);
  const [htmlOutput, setHtmlOutput] = useState('');
  const editor = React.useRef<any>(null);
  const debouncedValue = useDebounce<string>(editorState, 300);

  // console.log('hasText(): ', editorState.getCurrentContent().hasText());

  function saveContent() {
    const raw = convertToRaw(editorState.getCurrentContent());
    const html = convertToHTML(editorState.getCurrentContent());
    setHtmlOutput(html);
    const payload = { id: fieldId, type: 'text', html: html, data: raw };
    console.log('payload: ', payload);
    dispatch(updateField(payload));
    if (editorState.getCurrentContent().hasText()) {
      dispatch(updateDescription(html));
    } else {
      dispatch(updateDescription(''));
    }
  }

  useEffect(() => {
    saveContent();
  }, [debouncedValue]);

  //#region  //*=========== Tool Bars ===========
  function focusEditor() {
    editor.current!.focus();
    console.log('focusEditor..');
  }

  useEffect(() => {
    focusEditor();
  }, []);

  const StyleButton = (props: any) => {
    const onClickButton = (e: any) => {
      e.preventDefault();
      props.onToggle(props.style);
    };
    return <button className={props.style} onMouseDown={onClickButton}>{props.label}</button>;
  };

  const BLOCK_TYPES = [
    { label: "Heading 1", style: "header-one" },
    { label: "Heading 2", style: "header-two" },
    { label: "Heading 3", style: "header-three" },
    { label: "Normal", style: "unstyled" },
  ];

  const BlockStyleControls = (props: any) => {
    return (
      <div>
        {BLOCK_TYPES.map((type) => (
          <StyleButton
            key={type.label}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        ))}
      </div>
    );
  };

  const BLOCK_TYPES_2 = [
    { label: "OL", style: "ordered-list-item" },
    { label: "UL", style: "unordered-list-item" }
  ];

  const BlockStyleControls2 = (props: any) => {
    return (
      <div>
        {BLOCK_TYPES_2.map((type) => (
          <StyleButton
            key={type.label}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        ))}
      </div>
    );
  };

  const INLINE_STYLES = [
    { label: "Bold", style: "BOLD" },
    { label: "Italic", style: "ITALIC" },
    { label: "Link", style: "link" },

  ];
  const InlineStyleControls = (props: any) => {
    return (
      <div>
        {INLINE_STYLES.map((type) => (
          <StyleButton
            key={type.label}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        ))}
      </div>
    );
  };

  const onInlineClick = (e: any) => {
    const nextState = RichUtils.toggleInlineStyle(editorState, e);
    setEditorState(nextState);
  };

  const onBlockClick = (e: any) => {
    const nextState = RichUtils.toggleBlockType(editorState, e);
    setEditorState(nextState);
  };
  //#endregion //*=========== Tool Bars ===========

  return (
    <>
      <div className={styles.DraftEditor} onClick={focusEditor}>
        <div className='toolbars'>
          <div className="style-selector">
            <div className="items">
              <BlockStyleControls onToggle={onBlockClick} />
            </div>
          </div>
          <InlineStyleControls onToggle={onInlineClick} />
          <BlockStyleControls2 onToggle={onBlockClick} />
        </div>
        <div className='stage'>
          <Editor
            ref={editor}
            editorState={editorState}
            onChange={(editorState) => {
              setEditorState(editorState);
              dispatch(setIsEditedById(3));
            }}
          />
        </div>
        <hr />
        {/* <div className="output">
          <Interweave content={htmlOutput} />
        </div> */}
      </div>

    </>
  );
}
