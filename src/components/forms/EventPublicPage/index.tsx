import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';

import 'react-datepicker/dist/react-datepicker.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from './EventPublicPage.module.scss';
import groupStyles from '@/components/forms/styles/FormGroup.module.scss';

import { useAppDispatch } from '@/app/hooks';
import { setCurrentStep, setIsEditedById } from '@/features/eventCreation/eventCreationSlice';

import DraggableFields from './DraggableFields';
import ImageDropCrop from '../fields/ImageDropCrop';

import CloseIcon from '~/icons/close.svg';
import ErrorIcon from '~/icons/error.svg';
import DescriptionIcon from '~/icons/grey/description.svg';
import ImageIcon from '~/icons/grey/image.svg';


type Props = {
  step: number,
  eventStatus: { id: number, status: string }
}

export const EventPublicPage = forwardRef(({ step, eventStatus, ...props }: Props, ref) => {

  const dispatch = useAppDispatch();

  const [hasErrors, setHasErrors] = useState(false);
  const [hideErrorBox, setHideErrorBox] = useState(false);

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

      <div className={`${groupStyles.formGroup} ${styles.formGroup}`}>
        <ImageIcon />
        <div className='label'>
          <span>Main Event Image* </span>
        </div>
        <p className='instructions'>This is the first image athletes will see at the top of your event page and listing card. <br />Use a high quality image: 2160x1080px (2:1 ratio).</p>

        <div className="main-event-img">
          <ImageDropCrop imgId={1} />
        </div>

      </div>

      <div className={groupStyles.formGroup}>
        <DescriptionIcon />
        <div className='label' draggable>
          <span>Description</span>
        </div>
        <p className='instructions' draggable>Add more details to your Event - these details will be shown to <br />Teams who are searching for Events to join, so make sure to include why they should register and what they can look forward to! </p>

        <DraggableFields />

      </div>

    </div >
  );
});
