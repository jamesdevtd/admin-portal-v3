import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import inlineFieldStyles from '@/components/forms/styles/InlineFields.module.scss';

import { useAppDispatch } from '@/app/hooks';
import { addContact, removeUser, setEditContactId, setEditUserId, updateContact } from '@/features/affiliateDetails/affiliateDetailsSlice';
import { sampleRoles } from '@/static/user';

import ContactDetails from '@/types/contactDetails';
import UserDetails from '@/types/userDetails';
import { Role } from "@/types/userDetails";

type Props = {
  user: UserDetails;
  isAdd: boolean;
};

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email("Please provide proper Email.").required('Email is required.'),
    phone: yup.string().required(),
    role: yup.string().required(),
  })
  .required();

const UserAccountForm = ({ user, isAdd }: Props) => {
  const dispatch = useAppDispatch();
  const [hasErrors, setHasErrors] = useState(false);

  const formDefaultValues = {} as UserDetails;

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
    reset(user);
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
    dispatch(setEditUserId({ id: null }));
    if (user.id !== undefined) {
      dispatch(removeUser(user as UserDetails));
    }
  }

  return (
    <td colSpan={4}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}
          className={`${hasErrors ? 'has-errors' : ''}`}>
          <div className="grid grid-flow-col col-auto">
            <div className={`${inlineFieldStyles.InlineField} w-24 max-w-xs`}>
              <input type="text" {...register('firstName')} onChange={() => clearErrors('firstName')} />
              {formState.errors.firstName && (
                <span className='error'>First Name is required</span>
              )}
            </div>
            <div className={`${inlineFieldStyles.InlineField} w-24 max-w-xs`}>
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
            <div className={inlineFieldStyles.InlineField}>
              <select {...register('role')} onChange={() => clearErrors('role')}>
                <option value="" className='hidden'></option>
                {sampleRoles.map((role: Role, index) => (
                  <option key={index} value={role.name}>{role.name}</option>
                ))}
              </select>
              {formState.errors.role && (
                <span className='error'>Role is required</span>
              )}
            </div>
            <div className='flex justify-around w-40'>
              <button type="submit" className='btn mt-2 h-5 blue-outline'>ok</button>
              <button type="button" className='btn mt-2 h-5 red' onClick={cancel}>Remove</button>
            </div>
          </div>
        </form>
      </FormProvider>
    </td>
  );
};

export default UserAccountForm;