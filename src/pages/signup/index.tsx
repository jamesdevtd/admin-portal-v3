import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import RICIBs from 'react-individual-character-input-boxes';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import Layout from '@/components/layout/Layout';
import UnstyledLink from '@/components/links/UnstyledLink';

import TagxLogo from '~/svg/tagx.svg';

export default function SignUpPage() {
  const [showReferralCode, setShowReferralCode] = useState<boolean>(false);

  const router = useRouter();
  //#region  //*=========== Form ===========
  const methods = useForm({
    mode: 'onTouched',
  });
  const { handleSubmit } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Form Submit ===========
  const onSubmit = (_data: unknown) => {
    // eslint-disable-next-line no-console
    // console.log(data);
    router.push('/affiliate-setup');
  };
  //#endregion  //*======== Form Submit ===========

  const handleOutput = (_code: string) => {
    // Do something with the string
    // console.log(code);
  };

  return (
    <Layout layoutName='login' pageTitle='TagX Affiliate Setup'>
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
              id='email'
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
              className={`-mb-3 cursor-pointer text-blue-brand ${
                showReferralCode ? 'with-caret' : 'underline'
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
    </Layout>
  );
}
