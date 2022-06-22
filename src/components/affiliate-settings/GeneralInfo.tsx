import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import React, {
  useEffect,
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

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  getAffiliateDetails,
  updateIsEdited,
} from '@/features/affiliateDetails/affiliateDetailsSlice';
import { staticStatements } from '@/static/affiliate';
import { googleApiKey } from '@/static/geolocation';
import {
  objectStringsToDates,
} from '@/utils/objectUtils';

import AccountSettings from './AccountSettings';
import AffiliateDetails from './AffiliateDetails';
import FeesDetails from './FeesDetails';

import ContactDetailsProps from '@/types/contactDetails';


const schema = yup.object().shape({
  leagueName: yup.string().required(),
  primaryPlayingFacilityName: yup.string().required(),
  createdDate: yup.date().required(),
  primaryPlayingFacilityAddress: yup.array().required(),
  primaryPlayingFacilityAddressString: yup.string().required(),
  // facilityName: yup.string().required(),
  // firstName: yup.string().required(),
  // lastName: yup.string().required(),
  // email: yup.string().required(),
  // phone: yup.string().required(),
  // createdBy: yup.string().required(),

  affiliateDetails: yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    phone: yup.string().required(),
    password: yup.string(),
  })

  // "affiliateDetails.firstName": yup.string().required(),
  // "affiliateDetails.lastName": yup.string().required(),
  // "affiliateDetails.email": yup.string().required(),
})
  .required();

export const GeneralInfo = () => {
  const dispatch = useAppDispatch();
  const affiliateDetails = useAppSelector(getAffiliateDetails);
  const today = moment().toDate();
  const addressPlaceHolder =
    affiliateDetails.primaryPlayingFacilityAddressString || '';

  const [hasErrors, setHasErrors] = useState(false);

  const eventDateElements = {
    createdDate: affiliateDetails.createdDate || null,
  };

  const stringsToDates = { ...objectStringsToDates(eventDateElements) };

  const formDefaultValues = {
    ...{
      affiliateDetails: {
        id: affiliateDetails.affiliateDetails.id || '',
        firstName: affiliateDetails.affiliateDetails.firstName || '',
        lastName: affiliateDetails.affiliateDetails.lastName || '',
        email: affiliateDetails.affiliateDetails.email || '',
        phone: affiliateDetails.affiliateDetails.phone || '',
        password: affiliateDetails.affiliateDetails.password || ''
      },
      contactDetails:
        affiliateDetails.contactDetails || ([] as ContactDetailsProps[]),
      leagueName: affiliateDetails.leagueName || '',
      primaryPlayingFacilityName:
        affiliateDetails.primaryPlayingFacilityName || '',
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
  });
  const {
    handleSubmit,
    register,
    clearErrors,
    getValues,
    setValue,
    formState,
  } = methods;

  useEffect(() => {
    console.log('value', getValues(), formState.errors);
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

  // useImperativeHandle(ref, () => ({ submitForm }));

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
          onSubmit={handleSubmit(onSubmit)}
          className={`main-form ${GeneralInfoStyles['main-form']} ${hasErrors ? 'has-errors' : ''
            }`}
        >
          <div className={`${styles.formGroup} ${GeneralInfoStyles.formGroup}`}>
            <div className='label'>
              <span>General Information</span>
              <button className='float-right btn bg-blue-brand text-white'>Update</button>
            </div>

            <div className="fields-group">
              <div className='col'>
                <input
                  type='text'
                  {...register('affiliateDetails.firstName')}
                  onChange={() => clearErrors('affiliateDetails.firstName')}
                />
                {formState.errors.affiliateDetails?.firstName ? (
                  <span className='error'>First Name is required</span>
                ) : (
                  <label>First Name</label>
                )}
              </div>
              <div className='col'>
                <input
                  type='text'
                  {...register('affiliateDetails.lastName')}
                  onChange={() => clearErrors('affiliateDetails.lastName')}
                />
                {formState.errors.affiliateDetails?.lastName ? (
                  <span className='error'>Last Name is required</span>
                ) : (
                  <label>Last Name</label>
                )}
              </div>
              <div className='col'>
                <input
                  type='password'
                  {...register('affiliateDetails.password')}
                  onChange={() => clearErrors('affiliateDetails.password')}
                />
                {formState.errors.affiliateDetails?.password ? (
                  <span className='error'>Password is required</span>
                ) : (
                  <div className='flex items-center'><label>Password</label> <a className='text-blue-brand underline ml-1' href="#">Reset Password</a></div>
                )}
              </div>
              <div className='col'>
                <input
                  type='text'
                  {...register('affiliateDetails.email')}
                  onChange={() => clearErrors('affiliateDetails.email')}
                />
                {formState.errors.affiliateDetails?.email ? (
                  <span className='error'>Email is required</span>
                ) : (
                  <label>Email</label>
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
                    <span className='error'>Mailing Address is required</span>
                  ) : (
                    <label>Mailing Address</label>
                  )}
                </div>
              </div>
            </div>
            <div className="fields-group">
              <div className='col'>
                <input
                  type='text'
                  {...register('affiliateDetails.phone')}
                  onChange={() => clearErrors('affiliateDetails.phone')}
                />
                {formState.errors.affiliateDetails?.phone ? (
                  <span className='error'>Mobile Phone is required</span>
                ) : (
                  <label>Mobile Phone</label>
                )}
              </div>
            </div>
          </div>
          <AffiliateDetails />
        </form>
      </FormProvider>
      {/* <ContactDetails contacts={affiliateDetails.contactDetails} /> */}
      <AccountSettings users={affiliateDetails.userAccounts} />
      <FeesDetails statements={staticStatements} />
    </>
  );
};
