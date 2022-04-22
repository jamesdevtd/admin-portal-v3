import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import styles from './ContactDetailForm.module.scss';
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

const formDefaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: null,
}

type Props = {
  handleAddContactItem: (val: ContactDetailsProps) => void,
  removeForm: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}

export default function ContactDetailForm({ handleAddContactItem, removeForm }: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [hasErrors, setHasErrors] = useState(false);

  const {
    register,
    clearErrors,
    getValues,
    trigger,
    formState,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: formDefaultValues
  });

  // TODO validation and saving
  // useEffect(() => {
  //   if (hasErrors) {
  //     console.log('form has errors: ', formState.errors);
  //     trigger();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [hasErrors]);

  // useEffect(() => {
  //   Object.keys(formState.errors).length ? setHasErrors(true) : setHasErrors(false);
  // }, [formState]);


  const submitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log('validating data...');
    trigger();
  };

  return (
    <form className={`${styles.contactDetailForm} item`} >
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
          <input type='email' {...register('email')}
            onChange={() => clearErrors('email')}
          />
          {formState.errors.email ?
            <span className='error'>Email is required</span> :
            <label>Email <span className='req'>*</span></label>
          }
        </div>
        <div className='col'>
          <input type='text' {...register('phone')}
            onChange={() => clearErrors('phone')}
          />
          <label>Mobile <span className='req'>*</span></label>
        </div>
      </div>
      <div className="buttons">
        <div className='wrap'>
          <SubmitButton
            variant='grey'
            clickHander={removeForm}
          >
            Remove
          </SubmitButton>
          <SubmitButton
            clickHander={submitForm}
          >
            Save
          </SubmitButton>
        </div>
      </div>
    </form>
  )
}