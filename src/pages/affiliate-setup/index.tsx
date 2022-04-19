import axios from 'axios';
import { useRouter } from 'next/router';
import * as React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { FormProvider, useForm } from 'react-hook-form';
import { FiMinusCircle } from 'react-icons/fi';

import styles from './styles.module.scss';

import Button from '@/components/buttons/Button';
import DropzoneInput from '@/components/forms/fields/DropzoneInput';
import Input from '@/components/forms/fields/Input';
import LoginLayout from '@/components/layout/LoginLayout';
import NextImage from '@/components/NextImage';

import StepsButtons from './stepsButtons/StepsButtons';

import TagxLogo from '~/svg/tagx.svg';

export default function AffiliateSetupPage() {
  const router = useRouter();
  //#region  //*=========== Form ===========
  const methods = useForm({
    mode: 'onTouched',
  });
  const { handleSubmit } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Form Submit ===========
  // eslint-disable-next-line no-console
  const onSubmit = async (_data: unknown) => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // eslint-disable-next-line no-console
      console.log(_data);
    }
    if (step === 3) {
      const STRIPE_KEY =
        'sk_test_51Gkb7wKjMQt5gygn6rh0ly9yvQuckS9CjXxITZ7syp9Z9JTeo3QytjOh3MRfocKFhRJHNrskjX1o5jDmgFndpUpm00ArGvnnx1';
      const APP_BASE_URL = 'https://tagx-demo.anchormind.com';
      const config = {
        headers: {
          Authorization: `Bearer ${STRIPE_KEY}`,
        },
      };
      axios
        .post(
          `https://api.stripe.com/v1/account_links?type=account_onboarding&account=acct_1Ki0iAQSmYc5Xn5l&refresh_url=${APP_BASE_URL}/affiliate-setup&return_url=${APP_BASE_URL}/affiliate-setup-success`,
          {},
          config
        )
        .then((res) => router.push(res.data.url))
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err));
    }
    return;
  };
  //#endregion  //*======== Form Submit ===========

  const LeagueName = () => (
    <section className='flex flex-col space-y-8'>
      <div className='my-8 flex-col space-y-8 text-center text-gray-600'>
        <p>
          The first step is to give your League a Name. <br />
          Make sure the name is representative of your organization &amp;
          playing facility/venue.
        </p>

        <ul className='flex flex-row space-x-2 px-3 text-xs'>
          <li className='flex flex-row text-gray-600'>
            <FiMinusCircle className='fill-red-400 text-sm text-white' />
            No Profanity
          </li>
          <li className='flex flex-row text-gray-600'>
            <FiMinusCircle className='fill-red-400 text-sm text-white' />
            No Special Characters
          </li>
          <li className='flex flex-row text-gray-600'>
            <FiMinusCircle className='fill-red-400 text-sm text-white' />
            35 Character Max
          </li>
        </ul>
      </div>
      <Input
        id='name'
        label=''
        type='text'
        placeholder='Type your league name here'
      />
      <div className='space-x-2 self-center'>
        <Button variant='outline' type='submit'>
          SKIP
        </Button>
        <Button type='submit'>NEXT</Button>
      </div>
    </section>
  );

  const LeagueLogo = () => (
    <section className='my-8 flex flex-col space-y-8'>
      <div className='w-full text-center text-gray-600'>
        <p>
          Awesome! Now it’s about branding. <br />
          Upload a logo that can be used for your League. <br />
          No worries if you don&apos;t have one yet, you can always add your
          logo later.
        </p>
      </div>
      <DropzoneInput
        id='photo'
        label=''
        // validation={{ required: 'Photo must be filled' }}
        accept='image/png, image/jpg, image/jpeg'
        helperText='You can upload a file with .png, .jpg, or a .jpeg extension.'
      />
      <div className='space-x-2 self-center'>
        <Button variant='outline' type='submit'>
          SKIP
        </Button>
        <Button type='submit'>NEXT</Button>
      </div>
    </section>
  );

  const LeagueAddress = () => (
    <section className='my-8 flex flex-col space-y-8'>
      <div className='w-full text-center text-gray-600'>
        <p>
          Set your Affiliate Mailing &amp; Playing Address - this will also
          dictate your League&apos;s country, location radius and time zone.
        </p>
      </div>

      <div>
        <GooglePlacesAutocomplete
          key='mailingAddress'
          minLengthAutocomplete={3}
          apiKey='AIzaSyA8vejxIx686PpYxiXBqGpovVCZRurJBLQ'
        />
        <label
          htmlFor='mailingAddress'
          className='block py-2 text-xs font-normal text-sky-600'
        >
          <span>Affiliate Mailing Address</span>
        </label>
      </div>

      <div>
        <input
          className='focus:ring-primary-500 focus:border-primary-500 block w-full rounded-md border-gray-300 shadow-sm'
          type='text'
          placeholder='Saxon Woods Park'
        />
        <label
          htmlFor='playingFacilityName'
          className='block py-2 text-xs font-normal text-sky-600'
        >
          <span>Name of Playing Facility</span>
        </label>
      </div>

      <div>
        <GooglePlacesAutocomplete
          key='mailingAddress'
          minLengthAutocomplete={3}
          apiKey='AIzaSyA8vejxIx686PpYxiXBqGpovVCZRurJBLQ'
        />
        <label
          htmlFor='playingFacilityAddress'
          className='block py-2 text-xs font-normal text-sky-600'
        >
          <span>Location of Playing Facility</span>
        </label>
      </div>

      <div className='space-x-2 self-center'>
        <Button type='submit'>NEXT</Button>
      </div>
    </section>
  );

  const StripeSetup = () => (
    <section className='flex flex-col space-y-4'>
      <div className='w-full space-y-4 text-center text-gray-600'>
        <p>
          Create &amp; Verify Your Payout Account. Your Payout Account is the
          Account where we will deposit all revenues earned from TagX.
        </p>
        <NextImage
          className='mt-8'
          src='/images/stripe-branding.png'
          width='720'
          height='200'
          alt='stripe-branding'
        />
        <p className='text-xs text-gray-500'>
          Use our direct integration with Stripe™ to securely provide your
          information for us to process your payouts.
        </p>
        <Button type='submit'>Setup Payment Account</Button>
      </div>
    </section>
  );

  const [step, setStep] = React.useState(0);

  const steps = [
    <LeagueName key='leagueName' />,
    <LeagueLogo key='leagueLogo' />,
    <LeagueAddress key='leagueAddress' />,
    <StripeSetup key='stripeSetup' />,
  ];

  return (
    <LoginLayout pageTitle='TagX Affiliate Setup'>
      <div className={styles.affiliateSetup}>
        <div className='form-wrap setup m-auto flex w-full flex-col gap-5'>
          <TagxLogo className='logo m-auto h-10 w-36' />
          <StepsButtons currentStep={step} handleStepChange={setStep} />

          {step < 4 && (
            <>
              <FormProvider {...methods}>
                <form
                  className='flex flex-col gap-5'
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {steps[step]}
                </form>
              </FormProvider>
            </>
          )}
        </div>
      </div>
    </LoginLayout>
  );
}
