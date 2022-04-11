import { yupResolver } from '@hookform/resolvers/yup';
import React, { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import styles from './Events.module.scss';
import formStyles from '@/components/forms/events/form-groups/style.module.scss';

import seriesNames from '@/mock-data/seriesNames';

import EventsMenu from './components/EventsMenu';
import SeriesCheckBoxes from './components/SeriesCheckboxes';

import CalendarIcon from '~/icons/blue/calendar.svg';
import EventIcon from '~/icons/grey/event.svg';
import LocationIcon from '~/icons/grey/location.svg';
import RegIcon from '~/icons/grey/registration.svg';
import WarningIcon from '~/icons/grey/warning.svg';

const schema = yup
  .object({
    eventName: yup.string().required(),
    eventYear: yup.number().positive().integer().required(),
    seriesName: yup.string().required(),
  })
  .required();

export const Events = forwardRef((props, ref) => {
  const {
    handleSubmit,
    register,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const onSubmit = (data: unknown) => {
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
      className={`${styles.basicInfo} test`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <header className='content-header'>
        <CalendarIcon />
        <h2>New Open Series</h2>
        <button className='btn draft'>Draft</button>
        <button className='btn ml-auto'>Cancel</button>
      </header>

      <div className='content-main'>
        <div className='sidebar'>
          <EventsMenu />
        </div>

        <div className='main'>
          <h3>Basic Info</h3>

          <div className={`${formStyles.formGroup}`}>
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
                <select {...register('seriesName')}>
                  <option value='' hidden></option>
                  {seriesNames.map((name, i) => (
                    <option key={i} value={i}>
                      {name}
                    </option>
                  ))}
                </select>
                {errors.seriesName ? (
                  <span className='error'>Series Name is required</span>
                ) : (
                  <label>Series</label>
                )}
              </div>
            </div>
          </div>

          <div className={`${formStyles.formGroup}`}>
            <EventIcon />
            <div className='label'>
              <span>Event Dates</span>
            </div>
            <p className='instructions'>
              Specify the date your event will begin and end. This date must be
              at least XXX days after you&apos;ve completed Registration.
            </p>
            <div className='fields-group'>
              <div>
                <input
                  id='eventStartDate'
                  type='text'
                  autoComplete='name'
                  placeholder='September 14, 2022'
                  required
                  {...register('eventStartDate')}
                />
                <label htmlFor='eventStartDate'>Event Start Date</label>
              </div>
              <div>
                <input
                  id='eventStartTime'
                  type='text'
                  autoComplete='name'
                  placeholder='4:00 PM'
                  required
                  {...register('eventStartTime')}
                />
                <label htmlFor='eventStartTime'>Event Start Time</label>
              </div>
              <div>
                <input
                  id='eventEndDate'
                  type='text'
                  autoComplete='name'
                  placeholder='September 18, 2022'
                  required
                  {...register('eventEndDate')}
                />
                <label htmlFor='eventEndDate'>Event End Date</label>
              </div>
            </div>
          </div>

          <div className={`${formStyles.formGroup}`}>
            <RegIcon />
            <div className='label'>
              <span>Registration Dates</span>
            </div>
            <p className='instructions'>
              Specify dates your event will be open for registration.
              Registration will automatically close when the maximum number of
              confirmed teams is reached.
            </p>
            <div className='fields-group'>
              <div>
                <input
                  id='registrationStartDate'
                  type='text'
                  autoComplete='name'
                  placeholder='September 14, 2022'
                  required
                  {...register('registrationStartDate')}
                />
                <label htmlFor='registrationStartDate'>
                  Registration Start Date
                </label>
              </div>
              <div>
                <input
                  id='registrationEndDate'
                  type='text'
                  autoComplete='name'
                  placeholder='September 18, 2022'
                  required
                  {...register('registrationStartDate')}
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

            <SeriesCheckBoxes />
          </div>

          <div className={`${formStyles.formGroup}`}>
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

          <div className={`${formStyles.formGroup}`}>
            <RegIcon />
            <div className='label'>
              <span>Contact Details (Optional)</span>
            </div>
            <p className='instructions'>
              Provide any additional contact information here - staff members,
              other managers, or anyone else that players in your Event should
              have access to for general questions and assistance.
            </p>
            {/* TODO: <ContactDetails /> */}
          </div>
        </div>
      </div>
    </form>
  );
});
