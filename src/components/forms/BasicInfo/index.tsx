import { yupResolver } from '@hookform/resolvers/yup';
import { LatLngExpression } from 'leaflet';
import dynamic from 'next/dynamic';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import DatePicker from 'react-datepicker';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import 'react-datepicker/dist/react-datepicker.css';
import styles from '@/components/forms/BasicInfo/BasicInfo.module.scss';

import { setDayBefore, setNextDay } from '@/helpers/dateMods';
import seriesNames from '@/mock-data/seriesNames';

import ContactDetails from './ContactDetails';
import SeriesCheckboxes from './SeriesCheckboxes';

import ContactDetailsProps from '@/types/contactDetails';
import SeriesProps from '@/types/series';

import CloseIcon from '~/icons/close.svg';
import ErrorIcon from '~/icons/error.svg';
import ContactIcon from '~/icons/grey/contact.svg';
import EventIcon from '~/icons/grey/event.svg';
import LocationIcon from '~/icons/grey/location.svg';
import RegIcon from '~/icons/grey/registration.svg';
import WarningIcon from '~/icons/grey/warning.svg';

const schema = yup
  .object({
    additionalEvents: yup.array(),
    contactDetails: yup.array(),
    eventEndDate: yup.date().required(),
    eventName: yup.string().required(),
    eventStartDate: yup.date().required(),
    eventStartTime: yup.date().required(),
    eventYear: yup.number().positive().integer().required(),
    facilityAddress: yup.array().required(),
    facilityName: yup.string().required(),
    facilityNotes: yup.string().nullable(),
    registrationEndDate: yup.date().required(),
    registrationStartDate: yup.date().required(),
    seriesMonth: yup.number().positive().integer().required(),
  })
  .required();

const formDefaultValues = {
  additionalEvents: [{}],
  contactDetails: [{}],
  eventEndDate: null,
  eventName: null,
  eventStartDate: null,
  eventStartTime: null,
  eventYear: null,
  facilityAddress: [{}],
  facilityName: null,
  facilityNotes: '',
  registrationEndDate: null,
  registrationStartDate: null,
  seriesMonth: null,
}

type Props = {
  setIsFormEdited: React.Dispatch<React.SetStateAction<boolean>>
}

export const BasicInfo = forwardRef(({ setIsFormEdited, ...props }: Props, ref) => {
  const [startDate, setStartDate] = useState(new Date());
  const [minEndDate, setMinEndDate] = useState(new Date());
  const [startDateSelected, setStartDateSelected] = useState(false);
  const [seriesMonth, setSeriesMonth] = useState<number>(0);
  const [hasErrors, setHasErrors] = useState(false);
  const [hideErrorBox, setHideErrorBox] = useState(false);
  const [contactItems, setContactItems] = useState<ContactDetailsProps[]>([]);
  const [coordinates, setCoordinates] = useState<LatLngExpression>([40.795817, -73.9247057]);

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
    if (formState.isDirty) {
      setIsFormEdited(true);
      console.log('FORM VALUES: ');
      console.log(getValues());
    }
    Object.keys(formState.errors).length ? setHasErrors(true) : setHasErrors(false);
    if (Object.keys(formState.errors).length) {
      console.log('FORM VALUES: ');
      console.log(getValues());
      console.log('FORM ERRORS: ');
      console.log(formState.errors);
    }
  });

  useEffect(() => {
    if (contactItems) {
      setValue('contactDetails', contactItems);
    }
  });

  const handleSelectSeries = (val: number) => {
    setSeriesMonth(val)
  };

  const handleAdditionalEvents = (val: SeriesProps[]) => {
    setValue('additionalEvents', val);
  };

  const handleAddContactItem = (val: ContactDetailsProps) => {
    setContactItems([...contactItems, val]);
  };

  // TODO: transfter googleApiKey to .env
  const googleApiKey = 'AIzaSyA8vejxIx686PpYxiXBqGpovVCZRurJBLQ';

  const handleLocationInput = async (address: string) => {
    const results = await geocodeByAddress(address);
    console.log('facilityAddress: ', results);
    setValue('facilityAddress', results);
    const latLng = await getLatLng(results[0]);
    console.log('latLng: ', latLng);
  };

  const onSubmit = (data: unknown) => {
    //TODO: POST request to API
    console.log('POST: sending data...');
    console.log(data);
  };

  const submitForm = () => {
    setHideErrorBox(false);
    handleSubmit(onSubmit)();
  };

  useImperativeHandle(ref, () => ({ submitForm }));

  const LeafletMap = dynamic(
    () => import('@/components/leaflet/LeafletMap'),
    { loading: () => <p>A map is loading</p>, ssr: false }
  );

  return (
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

      <h3>Basic Info</h3>

      <div className={styles.formGroup}>
        <WarningIcon />
        <div className='label'>
          <span>General</span>
        </div>
        <p className='instructions'>
          Name your event. Ex: An Example Name. Select the Series (Open 1 -
          January, Open 2 - February, etc.).
        </p>
        <div className='fields-group'>
          <div className='col'>
            <input
              type='text'
              {...register('eventName')}
              onChange={() => clearErrors('eventName')}
            />
            {formState.errors.eventName ?
              <span className='error'>Event Name is required</span> :
              <label>Event Name</label>
            }
          </div>

          <div className='col'>
            <select
              {...register('eventYear')}
              onChange={() => clearErrors('eventYear')}
            >
              <option value='' hidden></option>
              <option value='2022'>2022</option>
              <option value='2023'>2023</option>
              <option value='2023'>2024</option>
            </select>
            {formState.errors.eventYear ?
              <span className='error'>Event Year is required</span> :
              <label>Year</label>
            }
          </div>

          <div className='col'>
            <select
              {...register('seriesMonth')}
              onChange={(e) => {
                clearErrors('seriesMonth');
                handleSelectSeries(parseInt(e.target.value));
              }}
            >
              <option value='' hidden></option>
              {seriesNames.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {formState.errors.seriesMonth ?
              <span className='error'>Series Month is required</span> :
              <label>Series</label>
            }
          </div>
        </div>
      </div>

      <div className={styles.formGroup}>
        <EventIcon />
        <div className='label'>
          <span>Event Dates</span>
        </div>
        <p className='instructions'>
          Specify the dates you would like your Event to begin and end. Please note: End Time will be automatically generated based on the size of your Draw and Game Settings.
        </p>
        <div className='fields-group'>
          <div className='col'>
            <Controller
              name='eventStartDate'
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <DatePicker
                  selected={startDateSelected ? startDate : null}
                  minDate={new Date()}
                  onChange={(e) => {
                    field.onChange(e);
                    if (field.value) {
                      setStartDate(field.value);
                      setMinEndDate(setNextDay(field.value));
                    }
                  }}
                  onCalendarClose={() => {
                    setStartDateSelected(true);
                  }}
                  disabledKeyboardNavigation
                  className='datepicker-group'
                  placeholderText=''
                  dateFormat='MMMM d, yyyy'
                />
              )}
            />
            {formState.errors.eventStartDate ?
              <span className='error'>Event Start Date is required</span> :
              <label>Event Start Date</label>
            }
          </div>
          <div className='col'>
            <Controller
              name='eventStartTime'
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <DatePicker
                  onChange={(e) => field.onChange(e)}
                  className='datepicker-group'
                  showTimeSelect
                  showTimeSelectOnly
                  selected={field.value}
                  placeholderText=''
                  timeIntervals={15}
                  timeCaption='Time'
                  dateFormat='h:mm aa'
                />
              )}
            />
            {formState.errors.eventStartTime ?
              <span className='error'>Event Start Time is required</span> :
              <label>Event Start Time</label>
            }
          </div>
          <div className='col'>
            <Controller
              name='eventEndDate'
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <DatePicker
                  selected={field.value && minEndDate}
                  minDate={minEndDate}
                  onChange={(e) => field.onChange(e)}
                  className='datepicker-group'
                  placeholderText=''
                  dateFormat='MMMM d, yyyy'
                />
              )}
            />
            {formState.errors.eventEndDate ?
              <span className='error'>Event End Date is required</span> :
              <label>Event End Date</label>
            }
          </div>
        </div>
      </div>

      <div className={styles.formGroup}>
        <RegIcon />
        <div className='label'>
          <span>Registration Dates</span>
        </div>
        <p className='instructions'>
          Specify dates your event will be open for registration.
          Registration will automatically close when the maximum number of
          confirmed teams is reached.
        </p>
        <div className='fields-group border-none'>
          <div className='col'>
            <Controller
              name='registrationStartDate'
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  minDate={new Date()}
                  maxDate={setDayBefore(startDate)}
                  onChange={(e) => field.onChange(e)}
                  className='datepicker-group'
                  placeholderText=''
                  dateFormat='MMMM d, yyyy'
                />
              )}
            />
            {formState.errors.registrationStartDate ?
              <span className='error'>Registration Start Date is required</span> :
              <label>Registration Start Date</label>
            }
          </div>
          <div className='col'>
            <Controller
              name='registrationEndDate'
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <DatePicker
                  minDate={new Date()}
                  maxDate={setDayBefore(startDate)}
                  onChange={(e) => field.onChange(e)}
                  className='datepicker-group'
                  selected={field.value}
                  placeholderText=''
                  dateFormat='MMMM d, yyyy'
                />
              )}
            />
            {formState.errors.registrationEndDate ?
              <span className='error'>Registration End Date is required</span> :
              <label>Registration End Date</label>
            }
          </div>
        </div>
        <p className='instructions'>
          <strong>OPTIONAL:</strong> Based on these dates, additional Events
          can be created automatically. These Events will be created as
          Drafts, and will not be published automatically.{' '}
          <a href='#'>CREATE ADDITIONAL EVENTS</a>
        </p>

        <SeriesCheckboxes
          seriesMonth={seriesMonth}
          items={seriesNames}
          handleAdditionalEvents={handleAdditionalEvents}
        />
      </div>

      <div className={styles.formGroup}>
        <LocationIcon />
        <div className='label'>
          <span>Location</span>
        </div>
        <div className='location-group'>
          <div className='col map-col'>
            <LeafletMap
              coordinates={coordinates}
              style={{ height: '250px', width: '250px' }} />
          </div>
          <div className='col'>
            <div className='fields-group'>
              <div className='col'>
                <input
                  type='text'
                  {...register('facilityName')}
                  onChange={() => clearErrors('facilityName')}
                />
                {formState.errors.facilityName ? (
                  <span className='error'>Facility Name is required</span>
                ) : (
                  <label>Name of Playing Facility</label>
                )}
              </div>
              <div className='col'>
                <GooglePlacesAutocomplete
                  apiKey={googleApiKey}
                  selectProps={{
                    className: 'autocomplete-field',
                    // TODO: trace type for the any below
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange: (e: any) => {
                      handleLocationInput(e.value.description);
                    },
                  }}
                  {...register('facilityAddress')}
                />
                {formState.errors.facilityAddress ?
                  <span className='error'>Playing Facility Address is required</span> :
                  <label>Playing Facility Address</label>
                }
                <span className='icon map'></span>
              </div>
              <div className='col'>
                <textarea
                  {...register('facilityNotes')}
                />
                <label>Notes</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.formGroup} border-none`}>
        <ContactIcon />
        <div className='label'>
          <span>Contact Details (Optional)</span>
        </div>
        <p className='instructions'>
          Provide any additional contact information here - staff members,
          other managers, or anyone else that players in your Event should
          have access to for general questions and assistance.
        </p>
        <ContactDetails
          handleAddContactItem={handleAddContactItem}
          items={contactItems}
        />
      </div>


    </form >
  );
});
