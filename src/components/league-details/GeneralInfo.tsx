import { yupResolver } from '@hookform/resolvers/yup';
import { LatLngTuple } from 'leaflet';
import Image from 'next/image';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import 'react-datepicker/dist/react-datepicker.css';
import GeneralInfoStyles from './GeneralInfo.module.scss';
import styles from '@/components/forms/styles/FormGroup.module.scss';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getAffiliateDetails, updateAffiliateDetails } from '@/features/affiliateDetails/affiliateDetailsSlice';
// TODO: clear the step handlers below since they are just carried over from event creation component
// import { setCurrentStep, setIsEditedById } from '@/features/eventCreation/eventCreationSlice';
import { googleApiKey } from '@/static/geolocation';
import { useIsFirstRender } from '@/utils/customHooks';
import { objectDatesToString, objectStringsToDates, removeNullElements } from '@/utils/objectUtils';

import AffiliateDetails from './AffiliateDetails';

import ContactDetailsProps from '@/types/contactDetails';

import CloseIcon from '~/icons/close.svg';
import ErrorIcon from '~/icons/error.svg';
import LogoThumb from '~/images/mock/logo-thumb.png'

const schema = yup
  .object({
    leagueName: yup.string().required(),
    primaryPlayingFacilityName: yup.string().required(),
    createdDate: yup.date().required(),
    facilityAddress: yup.array().required(),
    facilityName: yup.string().required(),
  })
  .required();

type Props = {
  step?: string
}

export const GeneralInfo = forwardRef(({ ...props }: Props, ref) => {

  const dispatch = useAppDispatch();
  const affiliateDetails = useAppSelector(getAffiliateDetails);
  const [contactItems, setContactItems] = useState<ContactDetailsProps[]>(
    affiliateDetails?.contactDetails.length ? affiliateDetails.contactDetails : []);

  const isFirstRender = useIsFirstRender();

  const latLongPlaceholder: LatLngTuple = [40.7959138, -73.9247479];

  const [addressPlaceHolder, setAddressPlaceHolder] = useState(affiliateDetails.primaryPlayingFacilityAddressString || '');
  const [coordinates, setCoordinates] = useState<number[]>(
    affiliateDetails?.primaryPlayingFacilityAddress.length ? affiliateDetails.primaryPlayingFacilityAddress : latLongPlaceholder
  );

  const [hasErrors, setHasErrors] = useState(false);
  const [hideErrorBox, setHideErrorBox] = useState(false);

  // TODO: clear the step handlers below since they are just carried over from event creation component
  // console.log('availableSeries: ', availableSeries);
  // const setIsFormEdited = () => {
  //   dispatch(setIsEditedById(step));
  // }

  // const handleNextStep = () => {
  //   dispatch(setCurrentStep(step + 1));
  // }

  const eventDateElements = {
    createdDate: affiliateDetails.createdDate || null,
  }

  const stringsToDates = { ...objectStringsToDates(eventDateElements) };

  const formDefaultValues = {
    ...{
      contactDetails: affiliateDetails.contactDetails || [] as ContactDetailsProps[],
      leagueName: affiliateDetails.leagueName || '',
      primaryPlayingFacilityName: affiliateDetails.primaryPlayingFacilityName || '',
      primaryPlayingFacilityAddress: affiliateDetails.primaryPlayingFacilityAddress || [] as number[],
      primaryPlayingFacilityAddressString: affiliateDetails.primaryPlayingFacilityAddressString || '',
      createdDate: null,
    },
    ...stringsToDates
  };

  // TODO assidng default dates on component mount if present is redux store
  // console.log('formDefaultValues: ', formDefaultValues);

  const {
    handleSubmit,
    register,
    clearErrors,
    getValues,
    setValue,
    control,
    formState,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: formDefaultValues
  });

  useEffect(() => {
    // TODO: clear the setIsFormEdited carried over from event creation component if not needed here
    // if (formState.isDirty) {
    //   setIsFormEdited();
    // }
    Object.keys(formState.errors).length ? setHasErrors(true) : setHasErrors(false);
  }, [formState.errors, formState.isDirty]);


  const onSubmit = (data: unknown) => {
    // TODO: send Redux state affiliateDetails to API through redux middleware
    console.log('POST: sending data...');
    console.log(data);
    // TODO: this is causing TS build error, remove this if not needed here.
    // handleNextStep();
  };

  const submitForm = () => {
    setHideErrorBox(false);
    let formValues = getValues();
    // console.log('submitForm:getValues()', formValues);
    const convertedDates = objectDatesToString(formValues);
    formValues = { ...formValues, ...convertedDates };
    const cleanedData = { ...formValues, ...removeNullElements(formValues) };
    console.log('submitForm:parsedValues :', cleanedData);
    dispatch(updateAffiliateDetails(cleanedData));
    handleSubmit(onSubmit,
      () => { console.log('Submit Failed - has Form Errors', formState.errors); }
    )();
  };

  useImperativeHandle(ref, () => ({ submitForm }));

  const handleLocationInput = async (address: string) => {
    const results = await geocodeByAddress(address);
    // console.log('handleLocationInput: ', results);
    // console.log('formatted_address: ', results[0].formatted_address);
    setValue('primaryPlayingFacilityAddressString', results[0].formatted_address);
    const latLng = await getLatLng(results[0]);
    setValue('primaryPlayingFacilityAddress', [latLng.lat, latLng.lng]);
    setCoordinates([latLng.lat, latLng.lng]);
    // setIsFormEdited();
  };

  const handleUpdateContactItem = (val: ContactDetailsProps) => {
    // console.log('handleUpdateContactItem: ', val);
    const newItems = contactItems.map(item => item.id === val.id ? val : item);
    setContactItems(newItems);
  };

  return (
    <>
      <form
        {...ref}
        {...props}
        onSubmit={handleSubmit(onSubmit)}
        className={`main-form ${hasErrors ? 'has-errors' : ''}`}
      >
        {(hasErrors && !hideErrorBox) &&
          <div className={styles.errorBox}>
            <div className="wrap">
              <ErrorIcon />
              <span>Please Complete All Required Fields </span>
              <button onClick={() => setHideErrorBox(true)}><CloseIcon /></button>
            </div>
          </div>
        }

        <div className={`${styles.formGroup} ${GeneralInfoStyles.formGroup}`}>
          <div className='label'>
            <span>General Information</span>
          </div>
          <div className='fields-group'>
            <div className='col'>
              <input
                type='text'
                {...register('leagueName')}
                onChange={() => clearErrors('leagueName')}
              />
              {formState.errors.leagueName ?
                <span className='error'>League Name is required</span> :
                <label>League Name</label>
              }
            </div>
            <div className='col'>
              <input
                type='text'
                {...register('primaryPlayingFacilityName')}
                onChange={() => clearErrors('primaryPlayingFacilityName')}
              />
              {formState.errors.primaryPlayingFacilityName ?
                <span className='error'>Primary Playing Facility is required</span> :
                <label>Name of Primary Playing Facility</label>
              }
            </div>
          </div>

          <div className="location-group">
            <div className="fields-group">
              <div className='col'>
                <GooglePlacesAutocomplete
                  apiKey={googleApiKey}
                  selectProps={{
                    instanceId: 'facilityAddressId',  // FIX: for “Warning: Prop `id` did not match”
                    className: 'autocomplete-field',
                    defaultInputValue: addressPlaceHolder,
                    // TODO: trace type for the any below
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange: (e: any) => {
                      handleLocationInput(e.value.description);
                    }
                  }}
                  {...register('primaryPlayingFacilityAddress')}
                />
                {formState.errors.primaryPlayingFacilityAddress ?
                  <span className='error'>Playing Facility Address is required</span> :
                  <label>Playing Facility Address</label>
                }
              </div>
            </div>
          </div>

          <div className='flex flex-row logo-group'>
            <div className='col'>
              <h3>League Logo</h3>
              <div className="logo m-4">
                <Image src={LogoThumb} alt='test' />
              </div>
            </div>
            <div className='col'>
              <h3>Series Permissions</h3>
              <label className="form-check">
                <input type="checkbox" />
                Pro Series - Sanctioned Event
              </label>
              <label className='form-check'>
                <input type="checkbox" />
                Pro Series - Non Sanctioned Event
              </label>
              <label className='form-check'>
                <input type="checkbox" />
                Regional World Championship Qualifier Event
              </label>
            </div>
          </div>
          <div className='flex flex-row equipment-group'>
            <div className='col'>
              <h3>Equipment Status</h3>
              <label className="form-check">
                <input type="checkbox" />
                Payment for Equipment has been received
              </label>
              <span>(required before League can be approved)</span>
            </div>
          </div>
        </div>
        <AffiliateDetails items={contactItems} affiliateDetails={affiliateDetails} handleUpdateContactItem={handleUpdateContactItem} />
      </form >
    </>
  );
});
