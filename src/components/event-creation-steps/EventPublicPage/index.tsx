import { yupResolver } from '@hookform/resolvers/yup';
import dynamic from 'next/dynamic';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './EventPublicPage.module.scss';
import groupStyles from '@/components/forms/styles/FormGroup.module.scss';

import ImageDropCrop from '@/components/forms/fields/ImageDropCrop';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setCurrentStep, setIsEditedById, setIsValidatedById } from '@/features/eventCreation/eventCreationSlice';
import { getEventPublicPage } from '@/features/eventCreation/eventPublicPageSlice';
import { useIsFirstRender } from '@/utils/customHooks';

import OrderedFields from './OrderedFields';

import CloseIcon from '~/icons/close.svg';
import ErrorIcon from '~/icons/error.svg';
import DescriptionIcon from '~/icons/grey/description.svg';
import ImageIcon from '~/icons/grey/image.svg';

const schema = yup
  .object({
    mainEventImage: yup.string().required(),
    description: yup.string().required()
  })
  .required();

type Props = {
  step: number,
  eventStatus: { id: number, status: string }
}

const DraftEditor = dynamic(
  () => import('../../../components/forms/fields/DraftEditor'),
  { ssr: false }
)

export const EventPublicPage = forwardRef(({ step, eventStatus, ...props }: Props, ref) => {

  const dispatch = useAppDispatch();
  const eventPublicPage = useAppSelector(getEventPublicPage);
  const [hasErrors, setHasErrors] = useState(false);
  const [hideErrorBox, setHideErrorBox] = useState(false);
  const isFirstRender = useIsFirstRender();

  const formDefaultValues = {
    mainEventImage: eventPublicPage?.croppedImages.length ? eventPublicPage?.croppedImages[0]?.src : '',
    description: eventPublicPage?.description || ''
  };

  const {
    handleSubmit,
    getValues,
    setValue,
    clearErrors,
    formState,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: formDefaultValues
  });

  const setIsFormEdited = () => {
    dispatch(setIsEditedById(step));
  }
  const handleNextStep = () => {
    dispatch(setCurrentStep(step + 1));
  }

  useEffect(() => {
    if (isFirstRender) {
      console.log('first render');
      dispatch(setIsValidatedById(step));
    } else {
      // console.log('not first render');
      if (eventPublicPage?.croppedImages.length) {
        clearErrors('mainEventImage');
        setValue('mainEventImage', eventPublicPage?.croppedImages[0].src);
      }
      if (eventPublicPage?.description) {
        clearErrors('description');
        setValue('description', eventPublicPage?.description);
      } else {
        setValue('description', '');
      }
    }
  }, [eventPublicPage])

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
    console.log('POST: sending data from EventPublicPage...');
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
          {formState.errors.mainEventImage &&
            <span className='error'>Main Event Image is required</span>
          }
        </div>

      </div>

      <div className={`${groupStyles.formGroup} ${styles.formGroup}`}>
        <DescriptionIcon />
        <div className='label' >
          <span>Description*</span>
        </div>
        <p className='instructions' >Add more details to your Event - these details will be shown to Teams who are searching for Events to join, so make sure to include why they should register and what they can look forward to! </p>

        <OrderedFields />
        {formState.errors.description &&
          <span className='error'>Event Description is required</span>
        }
      </div>

    </div >
  );
});
