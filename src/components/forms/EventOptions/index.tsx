import { yupResolver } from '@hookform/resolvers/yup';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './EventOptions.module.scss';

import { useAppDispatch } from '@/app/hooks';
import { setCurrentStep, setIsEditedById } from '@/features/eventCreation/eventCreationSlice';

import Divisions from './Divisions';
import PlayerFees from './PlayerFees';

import CloseIcon from '~/icons/close.svg';
import DvisionsIcon from '~/icons/divisions.svg';
import ErrorIcon from '~/icons/error.svg';
import PlayerFeesIcon from '~/icons/player-fees.svg';

const schema = yup
  .object({
    divisions: yup.array()
  })
  .required();

const formDefaultValues = {
  divisions: [{}],
}

type Props = {
  step: number
}

export const EventOptions = forwardRef(({ step, ...props }: Props, ref) => {

  console.log('EventOptions render...');

  const dispatch = useAppDispatch();

  const [hasErrors, setHasErrors] = useState(false);
  const [hideErrorBox, setHideErrorBox] = useState(false);

  const {
    handleSubmit,
    register,
    clearErrors,
    getValues,
    setValue,
    control,
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
      console.log('FORM VALUES with Errors: ');
      console.log(getValues());
      console.log('FORM ERRORS: ');
      console.log(formState.errors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.errors, formState.isDirty]);


  const onSubmit = (data: unknown) => {
    //TODO: POST request to API
    console.log('Sending EventOptions FORM data...');
    console.log(data);
    // handleNextStep(2);
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

      <h3>Event Options</h3>

      <div className={styles.formGroup}>
        <DvisionsIcon />
        <div className='label'>
          <span>Divisions</span>
        </div>
        <p className='instructions'>
          Select Divisions you would like to be available in the Open Series</p>
        <Divisions />
      </div>

      <div className={styles.formGroup}>
        <PlayerFeesIcon />
        <div className='label'>
          <span>Player Fees</span>
        </div>
        <p className='instructions'>Set the Entry Fee for each available Division</p>
        <p className='instructions italic'>* PLEASE NOTE: If choosing to offer Free Entry for any Division, you will still be responsible for providing payment as per standard TAGX fees prior to publishing your Event Draw.</p>
        <PlayerFees />
      </div>




    </form >
  );
});

