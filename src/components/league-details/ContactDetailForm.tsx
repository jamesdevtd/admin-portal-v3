import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import inlineFieldStyles from '@/components/forms/styles/InlineFields.module.scss';

import { useAppDispatch } from '@/app/hooks';
import { addContact, removeContact, setEditContactId, updateContact } from '@/features/affiliateDetails/affiliateDetailsSlice';

import ContactDetails from '@/types/contactDetails';

type Props = {
  contact: ContactDetails;
  isAdd: boolean;
};

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email("Please provide proper Email.").required('Email is required.'),
    phone: yup.string().required(),
  })
  .required();

const ContactDetailForm = ({ contact, isAdd }: Props) => {
  const dispatch = useAppDispatch();
  const [hasErrors, setHasErrors] = useState(false);

  const formDefaultValues = {} as ContactDetails;

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: formDefaultValues,
  });
  const {
    handleSubmit,
    register,
    clearErrors,
    getValues,
    setValue,
    formState,
    reset
  } = methods;

  useEffect(() => {
    Object.keys(formState.errors).length
      ? setHasErrors(true)
      : setHasErrors(false);
  }, [formState.errors, formState.isDirty]);

  useEffect(() => {
    reset(contact);
  }, [])

  const onSubmit = (data: unknown) => {
    // eslint-disable-next-line no-console
    console.log('POST: sending data...', data);
    if (isAdd)
      dispatch(addContact(data as ContactDetails));
    else
      dispatch(updateContact(data as ContactDetails));
    reset();
    dispatch(setEditContactId({ id: null }));
  };

  const cancel = () => {
    dispatch(setEditContactId({ id: null }));
    if (contact.id !== undefined) {
      dispatch(removeContact(contact as ContactDetails));
    }
  }

  return (
    <td colSpan={5}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}
          className={`${hasErrors ? 'has-errors' : ''}`}>
          <div className="grid grid-flow-row-dense grid-cols-5">
            <div className={inlineFieldStyles.InlineField}>
              <input type="text" {...register('firstName')} onChange={() => clearErrors('firstName')} />
              {formState.errors.firstName && (
                <span className='error'>First Name is required</span>
              )}
            </div>
            <div className={inlineFieldStyles.InlineField}>
              <input type="text" {...register('lastName')} onChange={() => clearErrors('lastName')} />
              {formState.errors.lastName && (
                <span className='error'>Last Name is required</span>
              )}
            </div>
            <div className={inlineFieldStyles.InlineField}>
              <input type="text" {...register('email')} onChange={() => clearErrors('email')} />
              {formState.errors.email && (
                <span className='error'>{formState.errors.email?.message}</span>
              )}
            </div>
            <div className={inlineFieldStyles.InlineField}>
              <input type="text" {...register('phone')} onChange={() => clearErrors('phone')} />
              {formState.errors.phone && (
                <span className='error'>Phone is required</span>
              )}
            </div>
            <div className='flex justify-around'>
              <button type="submit" className='btn mt-2 h-5 blue-outline'>ok</button>
              <button type="button" className='btn mt-2 h-5 red' onClick={cancel}>Remove</button>
            </div>
          </div>
        </form>
      </FormProvider>
    </td>
  );
};

export default ContactDetailForm;