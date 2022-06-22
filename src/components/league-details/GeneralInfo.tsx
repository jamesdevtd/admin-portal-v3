import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-google-places-autocomplete';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import 'react-datepicker/dist/react-datepicker.css';
import GeneralInfoStyles from './GeneralInfo.module.scss';
import styles from '@/components/forms/styles/FormGroup.module.scss';

import ContactDetails from '@/components/league-details/ContactDetails';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  getAffiliateDetails,
  updateAffiliateDetails,
  updateIsEdited,
} from '@/features/affiliateDetails/affiliateDetailsSlice';
import { getStaticProps } from '@/features/eventCreation/divisionsSlice';
import { googleApiKey } from '@/static/geolocation';
import {
  objectDatesToString,
  objectStringsToDates,
  removeNullElements,
} from '@/utils/objectUtils';

import AffiliateDetails from './AffiliateDetails';
import FeesDetails from './FeesDetails';
import UserAccounts from './UserAccounts';

import { AffiliateProps } from '@/types/affiliate';
import ContactDetailsProps from '@/types/contactDetails';

import LogoThumb from '~/images/mock/logo-thumb.png';

const schema = yup
  .object({
    name: yup.string().required(),
    venueName: yup.string().required(),
    createdDate: yup.date().required(),
    primaryPlayingFacilityAddress: yup.array().required(),
    primaryPlayingFacilityAddressString: yup.string().required(),
    // facilityName: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    phone: yup.string().required(),
    createdBy: yup.string().required(),
  })
  .required();

type Props = {
  affiliate: AffiliateProps;
};


export const GeneralInfo = forwardRef(({ affiliate, ...props }: Props, ref) => {
  const dispatch = useAppDispatch();
  const affiliateDetails = useAppSelector(getAffiliateDetails);
  const divisionDetails = useAppSelector(getStaticProps);
  const today = moment().toDate();
  const [addressPlaceHolder, setAddressPlaceHolder] = useState(affiliateDetails.primaryPlayingFacilityAddressString);
  // const addressPlaceHolder = affiliateDetails.primaryPlayingFacilityAddressString || '';
  const { data: session } = useSession();

  const [hasErrors, setHasErrors] = useState(false);

  const eventDateElements = {
    createdDate: affiliateDetails.createdDate || null,
  };

  const stringsToDates = { ...objectStringsToDates(eventDateElements) };

  const formDefaultValues = {
    ...{
      contactDetails:
        affiliateDetails.affiliateDetails || ({} as ContactDetailsProps),
      name: affiliateDetails.name || '',
      venueName:
        affiliateDetails.venueName || '',
      primaryPlayingFacilityAddress:
        affiliateDetails.primaryPlayingFacilityAddress || ([] as number[]),
      primaryPlayingFacilityAddressString:
        affiliateDetails.primaryPlayingFacilityAddressString || '',
      createdDate: today as Date,
      equipmentStatus: affiliateDetails.equipmentStatus || false,
    },
    ...stringsToDates,
  };

  // TODO assidng default dates on component mount if present is redux store
  // console.log('formDefaultValues: ', formDefaultValues);
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: formDefaultValues,
    // defaultValues: useMemo(() => {
    //   console.log("User has changed", formDefaultValues);
    //   return formDefaultValues;
    // }, [formDefaultValues]),
  });
  const {
    handleSubmit,
    register,
    clearErrors,
    getValues,
    setValue,
    formState,
    reset,
  } = methods;
  useEffect(() => {
    const userDetails = {
      phone: "",
      firstName: session?.user?.name?.split(' ')?.[0] || "",
      lastName: session?.user?.name?.split(' ')?.[1] || "",
      email: session?.user?.email || "",
    };
    reset({
      ...{
        contactDetails:
          userDetails || ({} as ContactDetailsProps),
        name: affiliate.name || '',
        venueName:
          affiliate.venueName || '',
        primaryPlayingFacilityAddress: (affiliate.venueLocation?.latitude && affiliate.venueLocation?.longitude) ?
          [parseFloat(affiliate.venueLocation.latitude), parseFloat(affiliate.venueLocation.longitude)] : ([] as number[]),
        primaryPlayingFacilityAddressString: `${affiliate.venueLocation?.line1 || ''} ${affiliate.venueLocation?.line2 || ''} ${affiliate.venueLocation?.city || ''} ${affiliate.venueLocation?.state || ''} ${affiliate.venueLocation?.country || ''}`,
        createdDate: today as Date,
        equipmentStatus: affiliate.equipmentStatus || false,
      },
      ...userDetails,
      ...stringsToDates,
    });
    setAddressPlaceHolder(`${affiliate.venueLocation?.line1 || ''} ${affiliate.venueLocation?.line2 || ''} ${affiliate.venueLocation?.city || ''} ${affiliate.venueLocation?.state || ''} ${affiliate.venueLocation?.country || ''}`);
    // setValue("name", formDefaultValues.name);
  }, [affiliate])

  // console.log("affiliateDetails", formDefaultValues);

  useEffect(() => {
    Object.keys(formState.errors).length
      ? setHasErrors(true)
      : setHasErrors(false);
    if (formState.isDirty) dispatch(updateIsEdited({ isEdited: true }));
  }, [formState.errors, formState.isDirty]);

  const onSubmit = (data: unknown) => {
    // TODO: send Redux state affiliateDetails to API through redux middleware
    // console.log('POST: sending data...');
    // eslint-disable-next-line no-console
    console.log('POST: sending data...', data);
  };

  const submitForm = () => {

    let formValues = getValues();
    // console.log('submitForm:getValues()', formValues);
    const convertedDates = objectDatesToString(formValues);
    formValues = { ...formValues, ...convertedDates };
    const cleanedData = { ...formValues, ...removeNullElements(formValues) };
    // console.log('submitForm:parsedValues :', cleanedData);
    dispatch(updateAffiliateDetails(cleanedData));

    handleSubmit(onSubmit, () => {
      // eslint-disable-next-line no-console
      // console.log('Submit Failed - has Form Errors', formState.errors);
    })();

  };

  useImperativeHandle(ref, () => ({ submitForm }));

  const handleLocationInput = async (address: string) => {
    const results = await geocodeByAddress(address);
    // console.log('handleLocationInput: ', results);
    // console.log('formatted_address: ', results[0].formatted_address);
    setValue(
      'primaryPlayingFacilityAddressString',
      results[0].formatted_address
    );
    const latLng = await getLatLng(results[0]);
    setValue('primaryPlayingFacilityAddress', [latLng.lat, latLng.lng]);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          {...ref}
          {...props}
          onSubmit={handleSubmit(onSubmit)}
          className={`main-form ${GeneralInfoStyles['main-form']} ${hasErrors ? 'has-errors' : ''
            }`}
        >
          <div className={`${styles.formGroup} ${GeneralInfoStyles.formGroup}`}>
            <div className='label'>
              <span>General Information</span>
            </div>
            <div className='fields-group full-width'>
              <div className='col full-width'>
                <input
                  type='text'
                  {...register('name')}
                  onChange={() => clearErrors('name')}
                />
                {formState.errors.name ? (
                  <span className='error'>League Name is required</span>
                ) : (
                  <label>League Name</label>
                )}
              </div>
              <div className='col full-width'>
                <input
                  type='text'
                  {...register('venueName')}
                  onChange={() => clearErrors('venueName')}
                />
                {formState.errors.venueName ? (
                  <span className='error'>
                    Primary Playing Facility is required
                  </span>
                ) : (
                  <label>Name of Primary Playing Facility</label>
                )}
              </div>
            </div>

            <div className='location-group'>
              <div className='fields-group'>
                <div className='col'>
                  <GooglePlacesAutocomplete
                    apiKey={googleApiKey}
                    selectProps={{
                      instanceId: 'facilityAddressId', // FIX: for “Warning: Prop `id` did not match”
                      className: 'autocomplete-field',
                      defaultInputValue: addressPlaceHolder,
                      // TODO: trace type for the any below
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onChange: (e: any) => {
                        handleLocationInput(e.value.description);
                      },
                    }}
                    {...register('primaryPlayingFacilityAddress')}
                  />
                  {formState.errors.primaryPlayingFacilityAddress ? (
                    <span className='error'>
                      Playing Facility Address is required
                    </span>
                  ) : (
                    <label>Playing Facility Address</label>
                  )}
                </div>
              </div>
            </div>

            <div className='logo-group flex flex-row'>
              <div className='col'>
                <h3>League Logo</h3>
                <div className='logo m-4'>
                  <Image src={LogoThumb} alt='test' />
                </div>
              </div>
              <div className='col'>
                <h3>Series Permissions</h3>
                <label className='form-check'>
                  <input type='checkbox' />
                  Pro Series - Sanctioned Event
                </label>
                <label className='form-check'>
                  <input type='checkbox' />
                  Pro Series - Non Sanctioned Event
                </label>
                <label className='form-check'>
                  <input type='checkbox' />
                  Regional World Championship Qualifier Event
                </label>
              </div>
            </div>
            <div className='equipment-group flex flex-row'>
              <div className='col'>
                <h3>Equipment Status</h3>
                <label className='form-check'>
                  <input type='checkbox' {...register('equipmentStatus')} />
                  Payment for Equipment has been received
                </label>
                <span>(required before League can be approved)</span>
              </div>
            </div>
          </div>
          <AffiliateDetails />
        </form>
      </FormProvider>
      <ContactDetails contacts={affiliateDetails.contactDetails} />
      <UserAccounts users={affiliateDetails.userAccounts} />
      <FeesDetails divisions={affiliateDetails.divisionDetails} fees={affiliateDetails.subscriptionFee} />
    </>
  );
});
