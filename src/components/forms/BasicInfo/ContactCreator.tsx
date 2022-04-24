import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import styles from './ContactCreator.module.scss';
import fieldStyles from '@/components/forms/fields/FieldsGroup.module.scss';

import SubmitButton from '@/components/buttons/SubmitButton';

import ContactDetailsProps from '@/types/contactDetails';

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().nullable(),
    // TODO: phone number validation
    // phone: yup.string().nullable().matches(phoneRegExp, 'Phone number is not valid'),
  })
  .required();



type Props = {
  itemsLength: number,
  addItem: (val: ContactDetailsProps) => void,
  setShowBlankForm: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function ContactCreator({ itemsLength, addItem, setShowBlankForm }: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const formDefaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  }

  const {
    register,
    clearErrors,
    getValues,
    trigger,
    watch,
    formState,
  } = useForm({
    resolver: yupResolver(schema),
    // mode: 'onSubmit',
    defaultValues: formDefaultValues
  });

  useEffect(() => {
    if (formState.isValid) {
      const data = { ...getValues(), id: ++itemsLength };
      addItem(data);
      setShowBlankForm(false);
    }
  }, [formState]);

  const submitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    trigger();
  };

  return (
    <div className={`${styles.contactCreator} item`} >
      <h3>
        {firstName} {lastName}
      </h3>
      <div className={`${fieldStyles.fieldsGroup} inner-box`}>
        <div className='col'>
          <input
            type='text' {...register('firstName')}
            onChange={(e) => {
              setFirstName(e.target.value);
              clearErrors('firstName');
            }}
          />
          {formState.errors.firstName ?
            <span className='error'>First Name is required</span> :
            <label>First Name <span className='req'>*</span></label>
          }
        </div>
        <div className='col'>
          <input type='text' {...register('lastName')}
            onChange={(e) => {
              setLastName(e.target.value);
              clearErrors('lastName');
            }}
          />
          {formState.errors.lastName ?
            <span className='error'>Last Name is required</span> :
            <label>Last Name <span className='req'>*</span></label>
          }
        </div>
        <div className='col'>
          <input type='email' {...register('email')} />
          {formState.errors.email ?
            <span className='error'>Valid Email is required</span> :
            <label>Email <span className='req'>*</span></label>
          }
        </div>
        <div className='col'>
          <input type='text' {...register('phone')}
          />
          <label>Mobile</label>
        </div>
      </div>
      <div className="buttons">
        <div className='wrap'>
          <SubmitButton
            variant='grey'
            clickHander={(e) => {
              e.preventDefault();
              setShowBlankForm(false);
            }}
          >
            Remove
          </SubmitButton>
          <SubmitButton
            clickHander={submitForm}
            disabled={!formState.isDirty}
          >
            Save
          </SubmitButton>
        </div>
      </div>
    </div>
  )
};