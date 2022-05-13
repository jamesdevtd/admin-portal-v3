import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { FormProvider, useForm } from 'react-hook-form';
import { FiMinusCircle } from 'react-icons/fi';

import styles from './styles.module.scss';

import Button from '@/components/buttons/Button';
import DropzoneInput from '@/components/forms/fields/DropzoneInput';
import Input from '@/components/forms/fields/Input';
import LoginLayout from '@/components/layout/LoginLayout';
import NextImage from '@/components/NextImage';

import { GET, PATCH, POST } from '@/services/rest.service';

import StepsButtons from './stepsButtons/StepsButtons';

import TagxLogo from '~/svg/tagx.svg';

export default function AffiliateSetupPage() {
  const router = useRouter();
  // useEffect(() => {
  //   getSession().then(session => {
  //     if(!session) {
  //       setUsername('Guest');  
  //     } else {
  //       setUsername('Sean Paul');  
  //     }
  //   });  
  // }, []);
  //#region  //*=========== Form ===========
  const methods = useForm({
    mode: 'onTouched',
  });
  //#endregion  //*======== Form ===========
  const [message, setMessage] = useState<string>('');
  const { handleSubmit, reset, setError } = methods;
  const [league, setLeague] = useState<any>({});

  const [step, setStep] = useState<number>(0);
  useEffect(() => {
    async function name() {
      const response: any = await GET('/league', {});
      if (response.length >= 1) {
        const tempLeague = response[0];
        tempLeague.image = [tempLeague.image];
        setLeague(tempLeague);
        reset(tempLeague);
        if (tempLeague.image !== '') {
          setStep(1);
        }
      }
    };
    name();
  }, [reset]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imageProcess = async (payload: any) => {
    return new Promise((resolve) => {
      let imageContentType: RegExpMatchArray | null = null;
      const file = payload?.image ? payload?.image[0] : null;
      if (file) {
        const reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          const imageData: string = reader.result.toString();
          imageContentType = imageData.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/);
          payload.imageContentType = imageContentType?.[0];
          payload.image = imageData.replace(/^data:image\/[a-z]+;base64,/, "");
        };
      }
      return resolve(payload);
    });
  }

  //#region  //*=========== Form Submit ===========
  const onSubmit = async (_data: unknown) => {
    if (step < 3) {
      if (league.id) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let payload: any = _data;
        payload.id = league.id;
        if (step === 1) {
          imageProcess(payload)
            .then((res: any) => {
              payload = res;
              // // eslint-disable-next-line no-console
              // console.log('here', res.imageContentType);
            });
        }

        // setTimeout(() => {
        const req: any = {
          id: payload.id,
          image: payload.image,
          imageContentType: payload.imageContentType,
        };
        PATCH(`/league/${league.id}`, req)
          .then((res: any) => {
            setLeague(res);
            setStep(step + 1);
          })
          .catch((err) => {
            setMessage('Something went wrong, please try again later.');
          });
        // }, 1000);
      }
      else {
        POST('/league', _data)
          .then((res: any) => {
            setLeague(res);
            setStep(step + 1);
          })
          .catch(() => {
            setError('name', { type: 'custom', message: 'Something went wrong, please try again later.' });
          });
      }
    } else {
      // eslint-disable-next-line no-console
      console.log(_data);
    }
    if (step === 3) {
      const STRIPE_KEY =
        'sk_test_51Gkb7wKjMQt5gygn6rh0ly9yvQuckS9CjXxITZ7syp9Z9JTeo3QytjOh3MRfocKFhRJHNrskjX1o5jDmgFndpUpm00ArGvnnx1';
      const APP_BASE_URL = 'http://localhost:3000';
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
        validation={{
          required: 'League Name is required.',
          maxLength: {
            value: 35,
            message: "Max 35 Character allowed."
          },
          pattern: {
            value: /^[a-zA-Z0-9 ]*$/,
            message: "Special Character not allowed."
          },
        }}
      />
      <div className='space-x-2 self-center'>
        {/* <Button variant='outline' type='submit'>
          SKIP
        </Button> */}
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
        id='image'
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
        // selectProps={{
        //   inputValue: this.state.address,
        //   onInputChange: (newInputValue, meta) => {
        //     this.setAddress(newInputValue);
        //   },
        //   // className: 'form-control',
        //   onChange: res => {
        //     geocodeByPlaceId(res.value.place_id)
        //       .then(results => {
        //         this.props.change_location({ lat: results[0].geometry.location.lat(), long: results[0].geometry.location.lng(), address: results[0].formatted_address });
        //       })
        //       .catch(error => console.error(error));
        //   },
        // }}
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

  const steps = [
    <LeagueName key='leagueName' />,
    <LeagueLogo key='leagueLogo' />,
    <LeagueAddress key='leagueAddress' />,
    <StripeSetup key='stripeSetup' />,
  ];

  return (
    <LoginLayout pageTitle='TagX Affiliate Setup'>
      <div className={styles.affiliateSetup}>
        <div className='form-wrap setup m-auto flex w-full flex-col gap-5 overflow-x-hidden'>
          <TagxLogo className='logo m-auto h-10 w-36' />
          <StepsButtons currentStep={step} handleStepChange={setStep} />

          {step < 4 && (
            <>
              <FormProvider {...methods}>
                <form
                  className='flex flex-col gap-5'
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {message && (
                    <div className='form-group'>
                      <span className='text-red-500'>{message}</span>
                    </div>
                  )}
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
