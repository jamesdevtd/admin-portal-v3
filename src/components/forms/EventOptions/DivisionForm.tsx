import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import styles from './DivisionForm.module.scss';
import fieldStyles from '@/components/forms/fields/FieldsGroup.module.scss';

import SubmitButton from '@/components/buttons/SubmitButton';

import DivisionProps from '@/types/division';

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
  handleAddDivision: (val: DivisionProps) => void,
  removeForm: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}

export default function DivisionForm({ handleAddDivision, removeForm }: Props) {
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
    <form className={`${styles.divisionForm} item`} >
      <h3>
        {firstName} {lastName}
      </h3>
      <div className={`${fieldStyles.fieldsGroup} inner-box`}>
        <img
          src='/images/wip-placeholders/division-form-placeholder.png'
          alt='palceholder'
          className='img-placeholder'
        />
      </div>
      <div className="buttons">
        <div className='wrap'>
          <SubmitButton
            variant='grey'
            clickHander={removeForm}
            className='hidden'
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