import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import Layout from '@/components/layout/Layout';
import UnstyledLink from '@/components/links/UnstyledLink';

import { handleLogin } from '../../services/login';

import TagxLogo from '~/svg/tagx.svg';

export default function LoginPage() {
  const [message, setMessage] = useState<string>('');
  const router = useRouter();
  //#region  //*=========== Form ===========
  const methods = useForm({
    mode: 'onTouched',
  });
  const { getValues, handleSubmit } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Form Submit ===========
  const onSubmit = async () => {
    const email = getValues('email');
    const password = getValues('password');
    if (await handleLogin({ email, password })) {
      router.push('/dashboard');
    } else {
      setMessage('Invalid Credentials!');
    }
    // router.push('/dashboard');
  };
  //#endregion  //*======== Form Submit ===========

  return (
    <Layout layoutName='login' pageTitle='TagX Affiliate Log In'>
      <div className='form-wrap m-auto flex w-full flex-col gap-5'>
        <TagxLogo className='logo m-auto h-10 w-36' />
        <div className='forms-nav'>
          <ul className='list-style-none text-center'>
            <li className='active'>
              <UnstyledLink href='/login'>Log in</UnstyledLink>
            </li>
            <li>
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
              id='email'
              type='email'
              label='Email'
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
              validation={{
                required: 'Password is required.',
              }}
            />
            {message && (
              <div className='form-group'>
                <span className='text-red-500'>{message}</span>
              </div>
            )}
            <UnstyledLink href='/forgot-password' className='anchor'>
              Forgot Password
            </UnstyledLink>
            <div className='self-center'>
              <Button type='submit' className='narrow'>
                LOGIN
              </Button>
            </div>
          </form>
        </FormProvider>

        <div className='text-center text-gray-600'>
          <p>
            Don&apos;t have an account? &nbsp;
            <UnstyledLink href='/signup' className='anchor'>
              Sign Up
            </UnstyledLink>
          </p>
        </div>
      </div>
    </Layout>
  );
}
