import dynamic from 'next/dynamic'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { EditorProps } from 'react-draft-wysiwyg';
import { useForm } from 'react-hook-form';

import 'react-datepicker/dist/react-datepicker.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import groupStyles from '@/components/forms/styles/FormGroup.module.scss';

import { useAppDispatch } from '@/app/hooks';
import { setCurrentStep, setIsEditedById } from '@/features/eventCreation/eventCreationSlice';

import MainEventImage from './ImageDropCrop';

import CloseIcon from '~/icons/close.svg';
import ErrorIcon from '~/icons/error.svg';
import DescriptionIcon from '~/icons/grey/description.svg';
import ImageIcon from '~/icons/grey/image.svg';


type Props = {
  step: number,
  eventStatus: { id: number, status: string }
}

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
)

export const EventPublicPage = forwardRef(({ step, eventStatus, ...props }: Props, ref) => {

  const dispatch = useAppDispatch();

  const [hasErrors, setHasErrors] = useState(false);
  const [hideErrorBox, setHideErrorBox] = useState(false);

  const [editorVal, setEditorVal] = useState('');

  const onHtmlChange = (e: any) => {
    // setHtml(e.target.value);
    console.log('onHtmlChange: ', e);

  }

  const {
    handleSubmit,
    getValues,
    setValue,
    formState,
  } = useForm({
    mode: 'onSubmit',
  });


  const setIsFormEdited = () => {
    dispatch(setIsEditedById(step));
  }
  const handleNextStep = () => {
    dispatch(setCurrentStep(step + 1));
  }

  useEffect(() => {
    if (formState.isDirty) {
      setIsFormEdited();
      console.log('FORM VALUES: ');
      console.log(getValues());
    }
    Object.keys(formState.errors).length ? setHasErrors(true) : setHasErrors(false);
    if (Object.keys(formState.errors).length) {
      console.log('FORM VALUES: ');
      console.log(getValues());
      console.log('FORM ERRORS: ');
      console.log(formState.errors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.errors, formState.isDirty]);


  const onSubmit = (data: unknown) => {
    //TODO: POST request to API
    console.log('POST: sending data...');
    console.log(data);
    handleNextStep();
  };

  const submitForm = () => {
    setHideErrorBox(false);
    handleSubmit(onSubmit)();
  };

  useImperativeHandle(ref, () => ({ submitForm }));


  return (
    <div
      {...ref}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
      className={`main-form ${hasErrors ? 'has-errors' : ''}`}
    >
      {(hasErrors && !hideErrorBox) &&
        <div className={groupStyles.errorBox}>
          <div className="wrap">
            <ErrorIcon />
            <span>Please Complete All Required Fields </span>
            <button onClick={() => setHideErrorBox(true)}><CloseIcon /></button>
          </div>
        </div>
      }

      <h3>Event Public Page</h3>

      <div className={groupStyles.formGroup}>
        <ImageIcon />
        <div className='label'>
          <span>Main Event Image* </span>
        </div>
        <p className='instructions'>This is the first image athletes will see at the top of your event page and listing card. <br />Use a high quality image: 2160x1080px (2:1 ratio).</p>
        <MainEventImage eventId={eventStatus.id} />

      </div>

      <div className={groupStyles.formGroup}>
        <DescriptionIcon />
        <div className='label'>
          <span>Description</span>
        </div>
        <p className='instructions'>Add more details to your Event - these details will be shown to <br />Teams who are searching for Events to join, so make sure to include why they should register and what they can look forward to! </p>

        <div className="draggable-fields mt-5">

          <section>
            {/* <DefaultEditor value={html} onChange={onHtmlChange} /> */}
            <Editor
              // editorState={editorVal}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onHtmlChange}
            />
          </section>

          <section>
            <MainEventImage eventId={eventStatus.id} />
          </section>
          <section>
            <div className="box-input">
              <input type="text" placeholder='Video URL (Vimeo &amp; YouTube links currently supported)' />
            </div>
          </section>

        </div>

      </div>

    </div >
  );
});
