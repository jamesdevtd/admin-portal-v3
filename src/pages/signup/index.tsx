import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import RICIBs from 'react-individual-character-input-boxes';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/fields/Input';
import LoginLayout from '@/components/layout/LoginLayout';
import UnstyledLink from '@/components/links/UnstyledLink';

import { handleSignUp } from '@/services/signup';

import TagxLogo from '~/svg/tagx.svg';
// import Cookies from 'js-cookie';
import { signIn } from 'next-auth/react'

export default function SignUpPage() {
  const [showReferralCode, setShowReferralCode] = useState<boolean>(false);
  const [referralCode, setReferralCode] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const router = useRouter();
  //#region  //*=========== Form ===========
  const methods = useForm({
    mode: 'onTouched',
  });
  const { getValues, handleSubmit } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Form Submit ===========
  const onSubmit = async (_data: unknown) => {
    const firstName = getValues('firstName');
    const lastName = getValues('lastName');
    const username = getValues('username');
    const password = getValues('password');
    const submitData = {
      firstName,
      lastName,
      username,
      password,
      referralCode,
    };


    await handleSignUp(submitData)
      .then(async data => {
        await signIn(
          'credentials',
          {
            redirect: true,
            username: username,
            password: password,
            callbackUrl: '/affiliate-setup'
          }
        );
      })
      .catch(err => {
        setMessage(err.title);
      });
  };
  //#endregion  //*======== Form Submit ===========

  const handleOutput = (_code: string) => {
    // TODO: referral code
    console.log(_code);
    setReferralCode(_code);
  };

  return (
    <LoginLayout pageTitle='TagX Affiliate Setup'>
      <div className='form-wrap signup m-auto flex w-full flex-col gap-5'>
        <TagxLogo className='logo m-auto h-10 w-36' />
        <div className='forms-nav'>
          <ul className='list-style-none text-center'>
            <li>
              <UnstyledLink href='/login'>Log in</UnstyledLink>
            </li>
            <li className='active'>
              <UnstyledLink href='/signup'>Sign Up</UnstyledLink>
            </li>
          </ul>
        </div>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-5'
          >
            <Input
              id='firstName'
              label='First Name'
              validation={{ required: 'First Name is required.' }}
            />
            <Input
              id='lastName'
              label='Last Name'
              validation={{ required: 'Last Name is required.' }}
            />
            <Input
              id='username'
              label='Email'
              type='email'
              validation={{
                required: 'Email is required.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email Address is not valid.',
                },
              }}
            />
            {message && (
              <div className='form-group'>
                <span className='text-red-500'>{message}</span>
              </div>
            )}
            <Input
              id='password'
              label='Password'
              type='password'
              helperText='Use 8 or more characters with a mix of letters, numbers, and symbols.'
              validation={{
                required: 'Password is required.',
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
                  message:
                    'Password must be 8 or more characters with a mix of letters, numbers, and symbols.',
                },
              }}
            />
            <p
              onClick={() => setShowReferralCode(!showReferralCode)}
              className={`-mb-3 cursor-pointer text-blue-brand ${showReferralCode ? 'with-caret' : 'underline'
                }`}
            >
              Enter a referral code
            </p>
            {showReferralCode && (
              <div className='referral-code-input'>
                <RICIBs
                  amount={5}
                  handleOutputString={handleOutput}
                  inputProps={[
                    { style: { color: 'gray', fontSize: 'small' } },
                    { style: { color: 'gray', fontSize: 'small' } },
                    { style: { color: 'gray', fontSize: 'small' } },
                    { style: { color: 'gray', fontSize: 'small' } },
                    { style: { color: 'gray', fontSize: 'small' } },
                  ]}
                  inputRegExp={/^[0-9]$/}
                />
              </div>
            )}
            <div className='mt-5 self-center'>
              <Button type='submit' className='narrow'>
                SUBMIT
              </Button>
            </div>
          </form>
        </FormProvider>

        <div className='mt-3 text-center text-gray-400'>
          <p>
            Already have an account? &nbsp;
            <UnstyledLink href='/login' className='anchor'>
              Log In
            </UnstyledLink>
          </p>
        </div>
      </div>
    </LoginLayout>
  );
}
