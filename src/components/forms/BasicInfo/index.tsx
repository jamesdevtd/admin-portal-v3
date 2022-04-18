import { yupResolver } from '@hookform/resolvers/yup';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import 'react-datepicker/dist/react-datepicker.css';
import styles from '@/components/forms/BasicInfo/BasicInfo.module.scss';

import seriesNames from '@/mock-data/seriesNames';

import ContactDetails from './ContactDetails';
import SeriesCheckBoxes from './SeriesCheckboxes';

import EventIcon from '~/icons/grey/event.svg';
import LocationIcon from '~/icons/grey/location.svg';
import RegIcon from '~/icons/grey/registration.svg';
import WarningIcon from '~/icons/grey/warning.svg';

const schema = yup
  .object({
    eventName: yup.string().required(),
    eventYear: yup.number().positive().integer().required(),
    seriesMonth: yup.number().positive().integer().required(),
    // eventStartDate: yup.date(),
    // eventStartTime: yup.date(),
    // eventEndDate: yup.date()
    // eventEndDate: yup.string().required()
    // TODO complete all fields schema for validation
  })
  .required();

const formDefaultValues = {
  eventName: '',
  eventYear: null,
  seriesMonth: null,
  eventStartDate: null,
  eventStartTime: null,
  eventEndDate: null,
  registrationStartDate: null,
  registrationEndDate: null,
  facilityName: null,
  facilityNotes: null,
}

type Props = {
  setIsFormEdited: React.Dispatch<React.SetStateAction<boolean>>
}

export const BasicInfo = forwardRef(({ setIsFormEdited, ...props }: Props, ref) => {
  const [startDate, setStartDate] = useState(new Date());
  const [minEndDate, setMinEndDate] = useState(new Date());
  const [startDateSelected, setStartDateSelected] = useState(false);
  const [seriesMonth, setSeriesMonth] = useState(0);
  const [hasErrors, setHasErrors] = useState(false)

  const {
    handleSubmit,
    register,
    clearErrors,
    control,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: formDefaultValues
  });

  useEffect(() => {
    if (isDirty) setIsFormEdited(true);
  }, [setIsFormEdited, isDirty]);

  useEffect(() => {
    if (Object.keys(errors).length) {
      setHasErrors(true);
    } else {
      setHasErrors(false);
    }
  }, [setHasErrors, errors]);

  const setNextDay = (date: Date) => {
    if (date !== null) {
      const nextDate = new Date(date.getTime());
      nextDate.setDate(nextDate.getDate() + 1);
      return nextDate;
    } else {
      return date;
    }
  }

  const setDayBefore = (date: Date) => {
    if (date !== null) {
      const prevDate = new Date(date.getTime());
      prevDate.setDate(prevDate.getDate() - 1);
      return prevDate;
    } else {
      return date;
    }
  }

  const handleSelectSeries = (val: number) => {
    setSeriesMonth(val)
  };

  const onSubmit = (data: unknown) => {
    //TODO: POST request to API
    console.log('POST: sending data...');
    console.log(data);
  };

  const submitForm = () => {
    handleSubmit(onSubmit)();
  };

  useImperativeHandle(ref, () => ({ submitForm }));

  return (
    <form
      {...ref}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
      className={hasErrors ? 'has-errors' : ''}
    >
      {hasErrors && (
        <div className={styles.errorBox}>
          <span>Please Complete All Required Fields </span>
        </div>
      )}
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
          <div>
            <input
              type='text'
              autoComplete='name'
              required
              {...register('eventName')}
              onChange={() => clearErrors('eventName')}
            />
            {errors.eventName ? (
              <span className='error'>Event Name is required</span>
            ) : (
              <label>Event Name</label>
            )}
          </div>

          <div>
            <select
              {...register('eventYear')}
              onChange={() => clearErrors('eventYear')}
            >
              <option value='' hidden></option>
              <option value='2022'>2022</option>
              <option value='2023'>2023</option>
              <option value='2023'>2024</option>
            </select>
            {errors.eventYear ? (
              <span className='error'>Event Year is required</span>
            ) : (
              <label>Year</label>
            )}
          </div>

          <div>
            <select
              {...register('seriesMonth', {
                onChange: (e) => {
                  handleSelectSeries(e.target.value);
                }
              })}
            >
              <option value='' hidden></option>
              {seriesNames.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.seriesMonth ? (
              <span className='error'>Series Month is required</span>
            ) : (
              <label>Series</label>
            )}
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
          <div>
            <Controller
              name='eventStartDate'
              control={control}
              defaultValue={null}
              render={() => (
                <DatePicker
                  selected={startDateSelected ? startDate : null}
                  minDate={new Date()}
                  onChange={(date: Date) => {
                    setStartDate(date);
                    setMinEndDate(setNextDay(date));
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
            <label htmlFor='eventStartDate'>Event Start Date</label>
          </div>
          <div>
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
            <label htmlFor='eventStartTime'>Event Start Time</label>
          </div>
          <div>
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
            <label htmlFor='eventEndDate'>Event End Date</label>
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
          <div>
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
            <label htmlFor='registrationStartDate'>
              Registration Start Date
            </label>
          </div>
          <div>
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
            <label htmlFor='registrationEndDate'>
              Registration End Date
            </label>
          </div>
        </div>
        <p className='instructions'>
          <strong>OPTIONAL:</strong> Based on these dates, additional Events
          can be created automatically. These Events will be created as
          Drafts, and will not be published automatically.{' '}
          <a href='#'>CREATE ADDITIONAL EVENTS</a>
        </p>

        <SeriesCheckBoxes seriesMonth={seriesMonth} items={seriesNames} />
      </div>

      <div className={styles.formGroup}>
        <LocationIcon />
        <div className='label'>
          <span>Location</span>
        </div>
        <div className='location-group'>
          <div className='col relative'>
            <img
              src='/images/map-placeholder.jpg'
              alt='map placeholder'
              className='block'
            />
          </div>
          <div className='col'>
            <div className='fields-group'>
              <div>
                <input
                  type='text'
                  onChange={() => clearErrors('facilityName')}
                />
                {errors.eventName ? (
                  <span className='error'>Facility Name is required</span>
                ) : (
                  <label>Name of Playing Facility</label>
                )}
              </div>
              <div>
                <input type='text' autoComplete='name' required />
                {errors.eventName ? (
                  <span className='error'>
                    Playing Facility Address is required
                  </span>
                ) : (
                  <label>Playing Facility Address</label>
                )}
                <span className='icon map'></span>
              </div>
              <div>
                <textarea required {...register('facilityNotes')} />
                <label>Notes</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.formGroup} border-none`}>
        <RegIcon />
        <div className='label'>
          <span>Contact Details (Optional)</span>
        </div>
        <p className='instructions'>
          Provide any additional contact information here - staff members,
          other managers, or anyone else that players in your Event should
          have access to for general questions and assistance.
        </p>
        <ContactDetails />
      </div>


    </form>
  );
});
