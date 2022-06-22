import moment from 'moment';
import Image from 'next/image';
import { useState } from 'react';
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-google-places-autocomplete';
import { useFormContext } from 'react-hook-form';

import formStyles from './AffiliateDetails.module.scss';
import styles from '@/components/forms/styles/FormGroup.module.scss';

import { googleApiKey } from '@/static/geolocation';

// import DatePicker from '../forms/fields/DatePicker';
import ChevronIcon from '~/icons/chevron-down.svg';
import LogoThumb from '~/images/mock/logo-thumb.png';

const AffiliateDetails = () => {
  const [expand, setExpand] = useState(false);
  const today = moment().toDate();
  const {
    register,
    setValue,
    clearErrors,
    control,
    formState,
    getValues,
  } = useFormContext();
  const addressPlaceHolder = getValues('primaryPlayingFacilityAddressString');
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
    <div
      className={`${formStyles['tab-container']} ${formStyles.affiliate} ${expand ? formStyles['expanded'] : formStyles['collapsed']
        }`}
    >
      <h3
        onClick={(e) => {
          e.preventDefault();
          setExpand(!expand);
        }}
      >
        League Information
        <ChevronIcon />
      </h3>
      <div className={`togglelable ${styles.formGroup}`}>
        <div className='fields-group full-width'>
          <div className='col full-width'>
            <input
              type='text'
              {...register('leagueName')}
              onChange={() => clearErrors('leagueName')}
            />
            {formState.errors.leagueName ? (
              <span className='error'>League Name is required</span>
            ) : (
              <label>Name of League</label>
            )}
          </div>
          <div className='col full-width'>
            <input
              type='text'
              {...register('primaryPlayingFacilityName')}
              onChange={() => clearErrors('primaryPlayingFacilityName')}
            />
            {formState.errors.primaryPlayingFacilityName ? (
              <span className='error'>
                Primary Playing Facility is required
              </span>
            ) : (
              <label>Name of Primary Playing Facility</label>
            )}
          </div>
        </div>
        <div className='fields-group'>
          <div className='col location-group'>
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
              <label>Address of Primary Playing Facility</label>
            )}
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
      </div>
    </div>
  );
};

export default AffiliateDetails;
