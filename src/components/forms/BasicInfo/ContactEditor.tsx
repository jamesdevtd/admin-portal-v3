import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import formStyles from '@/components/forms/styles/ContactForm.module.scss';
import fieldStyles from '@/components/forms/styles/FieldsGroup.module.scss';

import SubmitButton from '@/components/buttons/SubmitButton';

import ContactDetailsProps from '@/types/contactDetails';

// TODO: replace this icon with import from react-icons
import ChevronIcon from '~/icons/chevron-down.svg';

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
  itemData: ContactDetailsProps,
  updateItem: (val: ContactDetailsProps) => void,
  removeItem: (val: ContactDetailsProps) => void,
}

export default function ContactEditor({ itemData, updateItem, removeItem }: Props) {
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [expand, setExpand] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const defaultValues = {
    firstName: itemData.firstName,
    lastName: itemData.lastName,
    email: itemData.email,
    phone: itemData.phone,
  }

  const {
    register,
    clearErrors,
    getValues,
    trigger,
    formState,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: defaultValues
  });

  const handleSaveItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    trigger();
    if (formState.isValid) {
      const updatedData = { ...getValues(), id: itemData.id };
      updateItem(updatedData);
      setIsEdited(false);
    }
  };

  return (
    <div className={`${formStyles.contactForm} ${expand ? formStyles['expanded'] : formStyles['collapsed']}`} >
      <h3 onClick={(e) => {
        e.preventDefault();
        setExpand(!expand);
      }}>
        {firstName ? firstName : getValues('firstName')} {lastName ? lastName : getValues('lastName')}
        <ChevronIcon />
      </h3>
      <div className={`${fieldStyles.fieldsGroup} ${fieldStyles['inner-box']}`}>
        <div className='col'>
          <input
            type='text' {...register('firstName')}
            onChange={(e) => {
              setFirstName(e.target.value);
              setIsEdited(true);
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
              setIsEdited(true);
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
            onChange={() => {
              clearErrors('email');
              setIsEdited(true);
            }}
          />
          {formState.errors.email ?
            <span className='error'>Valid Email is required</span> :
            <label>Email <span className='req'>*</span></label>
          }
        </div>
        <div className='col'>
          <input type='text' {...register('phone')}
            onChange={() => {
              clearErrors('phone');
              setIsEdited(true);
            }}
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
              removeItem(itemData);
            }}
          >
            Remove
          </SubmitButton>
          <SubmitButton
            clickHander={handleSaveItem}
            disabled={!isEdited}
          >
            Save
          </SubmitButton>
        </div>
      </div>
    </div >
  )
}