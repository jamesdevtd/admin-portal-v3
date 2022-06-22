import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete, { geocodeByPlaceId } from 'react-google-places-autocomplete';
import { FormProvider, useForm } from 'react-hook-form';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';

import styles from './styles.module.scss';
import groupStyles from '@/components/forms/styles/FormGroup.module.scss';

import Button from '@/components/buttons/Button';
import ImageDropCrop from '@/components/forms/fields/ImageDropCropInline';
import Input from '@/components/forms/fields/Input';
import LoginLayout from '@/components/layout/LoginLayout';
import NextImage from '@/components/NextImage';

import { useAppSelector } from '@/app/hooks';
import { getCroppedImage, getCropperModal, getIsCropped } from '@/features/onboardingSteps/onboardingStepsSlice';
import { GET, PATCH, POST } from '@/services/rest.service';
import { continents } from '@/static/geolocation';
import { formatLatLong } from '@/utils/customHooks';

import StepsButtons from './stepsButtons/StepsButtons';

import TagxLogo from '~/svg/tagx.svg';

interface Continents {
  code: string;
  name: string;
}

export default function AffiliateSetupPage() {
  const imgObject = useAppSelector(getCroppedImage);
  const isCroppedSelector = useAppSelector(getIsCropped);
  const cropperModal = useAppSelector(getCropperModal);
  const [isCropped, setIsCropped] = useState<boolean>(false);
  const [mailingAddress, setMailingAddress] = useState<any>('');
  const [venueAddress, setVenueAddress] = useState<any>('');
  const [isCropperModalOpen, setIsCropperModalOpen] = useState<boolean>(false);
  const [allContinents, setAllContinents] = useState<Continents[]>([]);
  useEffect(() => {
    setAllContinents(continents);
  }, [])


  useEffect(() => {
    setIsCropped(isCroppedSelector);
  }, [isCroppedSelector]);
  useEffect(() => {
    setIsCropperModalOpen(cropperModal.isOpen);
  }, [cropperModal]);

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
  const { handleSubmit, reset, setError, getValues, setValue } = methods;
  const [league, setLeague] = useState<any>({});

  const [step, setStep] = useState<number>(0);
  useEffect(() => {
    async function setLeagueIfExist() {
      const response: any = await GET('/league', {});
      if (response.length >= 1) {
        const tempLeague = response[0];
        tempLeague.image = [tempLeague.image];
        setLeague(tempLeague);
        setMailingAddress({ label: `${tempLeague?.mailingLocation?.line1 ?? ''} ${tempLeague?.mailingLocation?.line2 ?? ''} ${tempLeague?.mailingLocation?.state ?? ''} ${tempLeague?.mailingLocation?.country ?? ''}` });
        setVenueAddress({ label: `${tempLeague?.venueLocation?.line1 ?? ''} ${tempLeague?.venueLocation?.line2 ?? ''} ${tempLeague?.venueLocation?.state ?? ''} ${tempLeague?.venueLocation?.country ?? ''}` });
        reset(tempLeague);
        if (tempLeague.venueName !== '' && tempLeague.venueName !== null) {
          setStep(3);
        }
        else if (tempLeague.image !== '') {
          setStep(2);
        }
        else if (tempLeague.name !== '') {
          setStep(1);
        }
      }
    };
    setLeagueIfExist();
  }, [reset]);

  const filterAddress = (address: any, search: string[]) => {
    const all = {} as any;
    search?.map((s: string) => {
      const data = address?.address_components?.filter((r: any) => r.types.indexOf(s) !== -1);
      all[s] = { long_name: data?.[0].long_name, short_name: data?.[0].short_name };
    });
    return all;
  }
  const getMailAddress = async (Address: any) => {
    return geocodeByPlaceId(Address.value.place_id)
      .then((results: any) => {
        const address = results?.[0];
        const filteredAddress = filterAddress(address, ['country', 'administrative_area_level_1', 'administrative_area_level_2']);
        const getContinent: Continents[] = allContinents?.filter((c: Continents) => c.code === filteredAddress?.country?.short_name);
        return {
          city: filteredAddress?.administrative_area_level_2?.long_name,
          state: filteredAddress?.administrative_area_level_1?.long_name,
          country: filteredAddress?.country?.long_name,
          continent: getContinent?.[0]?.name,
          // id: mailingAddress?.value?.place_id,
          line1: mailingAddress?.value?.structured_formatting?.main_text || null,
          line2: mailingAddress?.value?.structured_formatting?.secondary_text || null,
          latitude: formatLatLong(address?.geometry?.location?.lat()) || null,
          longitude: formatLatLong(address?.geometry?.location?.lng()) || null,
        }
      })
      .catch(error => console.error(error));
  }

  useEffect(() => {
    async function getAdd(Address: any, isMail = false as boolean) {
      if (isMail) {
        const add: any = await getMailAddress(Address);
        setValue("mailingLocation", add);
      }
      else {
        const add: any = await getMailAddress(Address);
        setValue("venueLocation", add);
      }
    }
    if (mailingAddress?.value) {
      getAdd(mailingAddress, true);
    }
    if (venueAddress?.value) {
      getAdd(venueAddress);
    }
  }, [mailingAddress, venueAddress]);





  //#region  //*=========== Form Submit ===========
  const onSubmit = async (_data: unknown) => {
    if (step < 3) {
      if (league.id) {
        const payload = {} as any;
        payload.id = league.id;
        if (step === 1) {
          const imageContentType: RegExpMatchArray | null = imgObject.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/);
          payload.imageContentType = imageContentType?.[0];
          payload.image = imgObject.replace(/^data:image\/[a-z]+;base64,/, "");
        }
        else if (step === 2) {
          const { mailingLocation, venueLocation, venueName } = getValues();
          payload.mailingLocation = mailingLocation;
          payload.venueLocation = venueLocation;
          payload.venueName = venueName;
        }
        PATCH(`/league/${league.id}`, payload)
          .then((res: any) => {
            setLeague(res);
            setStep(step + 1);
          })
          .catch((err) => {
            setMessage('Something went wrong, please try again later.');
          });
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
      GET(`/league/${league.id}/payout?returnUrl=/affiliate-setup-success&refreshUrl=/affiliate-setup`, {})
        // TO-DO need to type cast response
        .then((res: any) => router.push(res.onboardingUrl))
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
      {!isCropped &&
        <div className='w-full text-center text-gray-600'>
          <p className="logo-text">
            Awesome! Now it’s about branding. <br />
            Upload a logo that can be used for your League. <br />
            No worries if you don&apos;t have one yet, you can always add your
            logo later.
          </p>
        </div>
      }

      {isCropped &&
        <div className='w-full text-center text-dark-blue text-lg'>
          <h1>Looking Good!</h1>
        </div>
      }
      <div className={`${groupStyles.formGroup}`}>
        <div className="main-event-img">
          <ImageDropCrop getValues={getValues} />
        </div>
        {!isCropperModalOpen && !isCropped &&
          <div className='w-full text-center'>
            <div className='text-gray-600'>
              <FiPlusCircle className='fill-green-400 text-xl inline text-white' />
              HI-RESOLUTION
            </div>
            <div className='text-gray-600'>
              <FiMinusCircle className='fill-red-400 text-xl inline text-white' />
              NO OFFENSIVE IMAGERY OR ICONS
            </div>
          </div>
        }
        {!isCropperModalOpen &&
          <div className='space-x-2 self-center'>
            {/* <Button variant='outline' type='submit'>
            SKIP
          </Button> */}
            <Button type='submit'>NEXT</Button>
          </div>
        }
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

      <div className='relative location-group'>
        <div className="fields-group">
          <GooglePlacesAutocomplete
            key='mailingAddress'
            minLengthAutocomplete={3}
            apiKey={process.env.NEXT_PUBLIC_GOOGLEAPIKEY}
            selectProps={{
              className: 'autocomplete-field',
              defaultInputValue: mailingAddress?.label,
              onChange: setMailingAddress
            }}
          />
          <label
            htmlFor='mailingAddress'
            className='block py-2 text-xs font-normal text-sky-600'
          >
            <span>Affiliate Mailing Address</span>
            <span className='absolute right-0 text-gray-brand'>This can be changed at a later date.</span>
          </label>
          <span className='icon map'></span>
        </div>
      </div>

      <div className='relative'>
        <Input
          className='focus:ring-primary-500 focus:border-primary-500 block w-full rounded-md border-gray-300 shadow-sm'
          label=""
          id="venueName"
          type='text'
          placeholder='Saxon Woods Park'
          validation={{
            required: 'Venue Name is required.'
          }} />
        <label
          htmlFor='playingFacilityName'
          className='block py-2 text-xs font-normal text-sky-600'
        >
          <span>Name of Playing Facility</span>
          <span className='absolute right-0 text-gray-brand'>This can be changed at a later date.</span>
        </label>
      </div>

      <div className='relative location-group'>
        <div className="fields-group">
          <GooglePlacesAutocomplete
            key='venueAddress'
            minLengthAutocomplete={3}
            apiKey={process.env.NEXT_PUBLIC_GOOGLEAPIKEY}
            selectProps={{
              className: 'autocomplete-field',
              defaultInputValue: venueAddress?.label,
              onChange: setVenueAddress
            }}
          />
          <label
            htmlFor='playingFacilityAddress'
            className='block py-2 text-xs font-normal text-sky-600'
          >
            <span>Location of Playing Facility</span>
            <span className='absolute right-0 text-gray-brand'>This can be changed at a later date.</span>
          </label>
          <span className='icon map'></span>
        </div>
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
