import { yupResolver } from '@hookform/resolvers/yup';
import { LatLngTuple } from 'leaflet';
import moment from 'moment';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import formStyles from './AffiliateDetails.module.scss';
import styles from '@/components/forms/styles/FormGroup.module.scss';

import { googleApiKey } from '@/static/geolocation';

// import DatePicker from '../forms/fields/DatePicker';
import { AffiliateProps } from '@/types/affiliate';
import ContactDetailsProps from '@/types/contactDetails';

import ChevronIcon from '~/icons/chevron-down.svg';

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    phone: yup.string().required(),
    createdBy: yup.string().required(),
    createdDate: yup.string().required(),
  })
  .required();

type Props = {
  items: ContactDetailsProps[];
  affiliateDetails: AffiliateProps;
  handleUpdateContactItem: (val: ContactDetailsProps) => void;
};

const AffiliateDetails = ({ items, affiliateDetails, handleUpdateContactItem }: Props) => {
  const [expand, setExpand] = useState(true);
  const item = items?.[0];
  const defaultValues = {
    firstName: item?.firstName ?? '',
    lastName: item?.lastName ?? '',
    email: item?.email ?? '',
    phone: item?.phone ?? '',
    createdBy: affiliateDetails.createdBy ?? '',
    createdDate: affiliateDetails.createdDate ?? '',
    isBlocked: affiliateDetails.isBlocked ?? '',
    primaryPlayingFacilityAddress: affiliateDetails.primaryPlayingFacilityAddress ?? '',
    primaryPlayingFacilityAddressString: affiliateDetails.primaryPlayingFacilityAddressString ?? '',
    affiliateCode: affiliateDetails.affiliateCode ?? '',
  }
  const {
    register,
    setValue,
    clearErrors,
    trigger,
    control,
    formState,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: defaultValues
  });
  const tomorrow = moment().add(1, 'day').toDate();
  const [createdDate, setCreatedDate] = useState<Date>(tomorrow);
  const latLongPlaceholder: LatLngTuple = [40.7959138, -73.9247479];
  const [addressPlaceHolder, setAddressPlaceHolder] = useState('');
  const [coordinates, setCoordinates] = useState<number[]>(latLongPlaceholder
  );
  const handleLocationInput = async (address: string) => {
    const results = await geocodeByAddress(address);
    // console.log('handleLocationInput: ', results);
    // console.log('formatted_address: ', results[0].formatted_address);
    setValue('primaryPlayingFacilityAddressString', results[0].formatted_address);
    const latLng = await getLatLng(results[0]);
    setValue('primaryPlayingFacilityAddress', [latLng.lat, latLng.lng]);
    setCoordinates([latLng.lat, latLng.lng]);
  };
  return (
    <div className="">
      <div className={`affiliate-group ${formStyles.affiliate} ${expand ? formStyles['expanded'] : formStyles['collapsed']}`} >
        <h3 onClick={(e) => {
          e.preventDefault();
          setExpand(!expand);
        }}>
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
              {formState.errors.firstName ?
                <span className='error'>League Name is required</span> :
                <label>First Name</label>
              }
            </div>
            <div className='col'>
              <input
                type='text'
                {...register('lastName')}
                onChange={() => clearErrors('lastName')}
              />
              {formState.errors.lastName ?
                <span className='error'>Primary Playing Facility is required</span> :
                <label>Last Name</label>
              }
            </div>
            <div className='col'>
              <input
                type='text'
                {...register('email')}
                onChange={() => clearErrors('email')}
              />
              {formState.errors.email ?
                <span className='error'>Primary Playing Facility is required</span> :
                <label>Email</label>
              }
            </div>
            <div className='col'>
              <label className="form-check">
                <input type="checkbox" {...register('isBlocked')} />
                Block User
              </label>
            </div>
            <div className='col'>
              <input
                type='text'
                {...register('phone')}
                onChange={() => clearErrors('phone')}
              />
              {formState.errors.phone ?
                <span className='error'>Primary Playing Facility is required</span> :
                <label>Mobile Phone</label>
              }
            </div>
            <div className="col location-group">
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
                <label>Mailing Address</label>
              }
            </div>
            <div className='col'>
              <Controller
                name='createdDate'
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <DatePicker
                    selected={field?.value ? moment(field?.value).toDate() : null}
                    // LOGIC: Reg start date min should be current date.
                    minDate={tomorrow}
                    // LOGIC: Reg End Date must take place one day before Event Start Date
                    // maxDate={moment(startDate).subtract(1, 'day').toDate()}
                    onChange={(e) => field.onChange(e)}
                    onCalendarClose={() => {
                      // NOTE: state setter fx can't detect field.value actual onChange event
                      // NOTE: hence setter is called under onCalendarClose
                      if (field.value) {
                        setCreatedDate(moment(field.value).toDate());
                      }
                    }}
                    className='datepicker-group'
                    placeholderText=''
                    dateFormat='MMMM d, yyyy'
                  />
                )}
              />
              {formState.errors.createdDate ?
                <span className='error'>Registration Start Date is required</span> :
                <label>Registration Start Date</label>
              }
            </div>
            <div className='col'>
              <input
                type='text'
                {...register('createdBy')}
                onChange={() => clearErrors('createdBy')}
              />
              {formState.errors.createdBy ?
                <span className='error'>Primary Playing Facility is required</span> :
                <label>Created By</label>
              }
            </div>
            <div className='col'>
              <input
                type='text'
                {...register('affiliateCode')}
                onChange={() => clearErrors('affiliateCode')}
              />
              {formState.errors.affiliateCode ?
                <span className='error'>Primary Playing Facility is required</span> :
                <label>Affiliate Code</label>
              }
            </div>
          </div>
          <div className='flex flex-col items-end'>
            <div className='col'>
            </div>
            <div className='col'>
              <button className='deny-button btn cancel'>DENY LEAGUE</button>
              <button className='btn bg-blue-brand text-white'>APPROVE LEAGUE</button>
            </div>
          </div>
        </div>
      </div >
    </div>
  );
};

export default AffiliateDetails;