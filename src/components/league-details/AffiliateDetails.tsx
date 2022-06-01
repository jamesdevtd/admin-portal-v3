import moment from 'moment';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-google-places-autocomplete';
import { Controller, useFormContext } from 'react-hook-form';

import formStyles from './AffiliateDetails.module.scss';
import styles from '@/components/forms/styles/FormGroup.module.scss';

import { googleApiKey } from '@/static/geolocation';

// import DatePicker from '../forms/fields/DatePicker';
import ChevronIcon from '~/icons/chevron-down.svg';

const AffiliateDetails = () => {
  const [expand, setExpand] = useState(false);
  const today = moment().toDate();
  const {
    register,
    setValue,
    clearErrors,
    control,
    formState,
    watch,
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
  const watchEquipmentStatus = watch('equipmentStatus', false);

  return (
    <div
      className={`${formStyles['tab-container']} ${formStyles.affiliate} ${
        expand ? formStyles['expanded'] : formStyles['collapsed']
      }`}
    >
      <h3
        onClick={(e) => {
          e.preventDefault();
          setExpand(!expand);
        }}
      >
        Affiliate Details
        <ChevronIcon />
      </h3>
      <div className={`togglelable ${styles.formGroup}`}>
        <div className='fields-group'>
          <div className='col'>
            <input
              type='text'
              {...register('firstName')}
              onChange={() => clearErrors('firstName')}
            />
            {formState.errors.firstName ? (
              <span className='error'>First Name is required</span>
            ) : (
              <label>First Name</label>
            )}
          </div>
          <div className='col'>
            <input
              type='text'
              {...register('lastName')}
              onChange={() => clearErrors('lastName')}
            />
            {formState.errors.lastName ? (
              <span className='error'>Last Name is required</span>
            ) : (
              <label>Last Name</label>
            )}
          </div>
          <div className='col'>
            <input
              type='text'
              {...register('email')}
              onChange={() => clearErrors('email')}
            />
            {formState.errors.email ? (
              <span className='error'>Email is required</span>
            ) : (
              <label>Email</label>
            )}
          </div>
          <div className='col'>
            <label className='form-check'>
              <input type='checkbox' {...register('isBlocked')} />
              Block User
            </label>
          </div>
          <div className='col'>
            <input
              type='text'
              {...register('phone')}
              onChange={() => clearErrors('phone')}
            />
            {formState.errors.phone ? (
              <span className='error'>Mobile Phone is required</span>
            ) : (
              <label>Mobile Phone</label>
            )}
          </div>
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
              <span className='error'>Mailing Address is required</span>
            ) : (
              <label>Mailing Address</label>
            )}
          </div>
          <div className='col'>
            <Controller
              name='createdDate'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <DatePicker
                  selected={field?.value ? moment(field?.value).toDate() : null}
                  maxDate={today}
                  onChange={(e) => field.onChange(e)}
                  onCalendarClose={() => {
                    // NOTE: state setter fx can't detect field.value actual onChange event
                    // NOTE: hence setter is called under onCalendarClose
                    if (field.value) {
                      setValue('createdDate', field.value);
                      // setCreatedDate(moment(field.value).toDate());
                      // dispatch(updateAffiliateDetails({ createdDate: moment(field.value).toDate() }));
                    }
                  }}
                  className='datepicker-group'
                  placeholderText=''
                  dateFormat='MMMM d, yyyy'
                />
              )}
            />
            {formState.errors.createdDate ? (
              <span className='error'>Created Date is required</span>
            ) : (
              <label>Created Date</label>
            )}
          </div>
          <div className='col'>
            <input
              type='text'
              {...register('createdBy')}
              onChange={() => clearErrors('createdBy')}
            />
            {formState.errors.createdBy ? (
              <span className='error'>Created By is required</span>
            ) : (
              <label>Created By</label>
            )}
          </div>
          <div className='col'>
            <input
              type='text'
              {...register('affiliateCode')}
              onChange={() => clearErrors('affiliateCode')}
            />
            {formState.errors.affiliateCode ? (
              <span className='error'>Affiliate Code is required</span>
            ) : (
              <label>Affiliate Code</label>
            )}
          </div>
        </div>
        <div className='flex flex-col items-end'>
          <div className='col'></div>
          <div className='col'>
            <button className='deny-button btn cancel'>DENY LEAGUE</button>
            <button
              className='btn bg-blue-brand text-white'
              disabled={!watchEquipmentStatus}
            >
              APPROVE LEAGUE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateDetails;
