import { yupResolver } from '@hookform/resolvers/yup';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './EventOptions.module.scss';

import Divisions from './Divisions';
import PlayerFees from './PlayerFees';

import { DivisionProps } from '@/types/division';

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
  setIsFormEdited: React.Dispatch<React.SetStateAction<boolean>>,
  handleNextStep: (val: number) => void
}

export const EventOptions = forwardRef(({ setIsFormEdited, handleNextStep, ...props }: Props, ref) => {
  const [divisionItems, setDivisionItems] = useState<DivisionProps[]>([]);
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

  useEffect(() => {
    if (formState.isDirty) {
      setIsFormEdited(true);
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

  useEffect(() => {
    if (divisionItems) {
      console.log('has division Items');

      setValue('divisions', divisionItems);
    } else {
      console.log('has NO division Items yet....');
    }
  }, [divisionItems]);

  const handleAddDivision = (val: DivisionProps) => {
    setDivisionItems([...divisionItems, val]);
    setIsFormEdited(true);
  };

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

  const handleAddDivisionItem = (val: DivisionProps) => {
    setDivisionItems([...divisionItems, val]);
    setIsFormEdited(true);
  };

  const handleRemoveDivisionItem = (val: DivisionProps) => {
    const newItems = divisionItems.filter(item => item.id !== val.id);
    setDivisionItems(newItems);
  };

  const handleUpdateDivisionItem = (val: DivisionProps) => {
    console.log('handleUpdateDivisionItem: ', val);
    const newItems = divisionItems.map(item => item.id === val.id ? val : item);
    setDivisionItems(newItems);
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
        <div className='center-note'>Please create a Division - once created, Division Entry Fee options will be displayed here</div>
        <PlayerFees />
      </div>




    </form >
  );
});
