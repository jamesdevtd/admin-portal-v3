import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './EventPublicPage.module.scss';

import { useAppDispatch } from '@/app/hooks';
import { setCurrentStep, setIsEditedById } from '@/features/eventCreation/eventCreationSlice';

import CloseIcon from '~/icons/close.svg';
import ErrorIcon from '~/icons/error.svg';
import PlaceholderDescription from '~/images/wip-placeholders/description-placeholder.png';
import PlaceholderMainEvent from '~/images/wip-placeholders/main-event-placeholder.png';

const schema = yup
  .object({
    additionalEvents: yup.array(),
    contactDetails: yup.array(),
    eventEndDate: yup.date().required().nullable(),
    eventName: yup.string().required(),
    eventStartDate: yup.date().required(),
    eventStartTime: yup.date().required(),
    eventYear: yup.number().positive().integer().required().nullable(),
    facilityAddress: yup.array().required(),
    facilityName: yup.string().required(),
    facilityNotes: yup.string().nullable(),
    registrationEndDate: yup.date().required(),
    registrationStartDate: yup.date().required(),
    seriesMonth: yup.number().positive().integer().required().nullable(),
  })
  .required();

const formDefaultValues = {
  additionalEvents: [{}],
  contactDetails: [{}],
  eventEndDate: null,
  eventName: null,
  eventStartDate: null,
  eventStartTime: null,
  eventYear: null,
  facilityAddress: [{}],
  facilityName: null,
  facilityNotes: '',
  registrationEndDate: null,
  registrationStartDate: null,
  seriesMonth: null,
}


type Props = {
  step: number
}

export const EventPublicPage = forwardRef(({ step, ...props }: Props, ref) => {

  const dispatch = useAppDispatch();

  const [hasErrors, setHasErrors] = useState(false);
  const [hideErrorBox, setHideErrorBox] = useState(false);

  const {
    handleSubmit,
    getValues,
    setValue,
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

  const clearSelectedDates = () => {
    setValue('seriesMonth', null);
    setValue('eventStartDate', null);
    setValue('registrationStartDate', null);
  }

  const setAvaiableSeries = (year: number) => {
    const d = new Date();
    const startMonthNumber = (year === d.getFullYear() && d.getDate() >= 7) ? d.getMonth() + 1 : null;
    clearSelectedDates();
  }


  // TODO: transfter googleApiKey to .env


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
    <form
      {...ref}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
      className={`main-form ${hasErrors ? 'has-errors' : ''}`}
    >
      {(hasErrors && !hideErrorBox) &&
        <div className={styles.errorBox}>
          <div className="wrap">
            <ErrorIcon />
            <span>Please Complete All Required Fields </span>
            <button onClick={() => setHideErrorBox(true)}><CloseIcon /></button>
          </div>
        </div>
      }

      <h3>Event Public Page</h3>

      <div className={styles.formGroup}>
        <Image
          src={PlaceholderMainEvent}
          alt='placeholder'
          className='img-placeholder'
        />

      </div>

      <div className={styles.formGroup}>
        <Image
          src={PlaceholderDescription}
          alt='placeholder'
          className='img-placeholder'
        />
      </div>




    </form >
  );
});
