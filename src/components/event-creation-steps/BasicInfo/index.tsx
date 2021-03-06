import { yupResolver } from '@hookform/resolvers/yup';
import { LatLngTuple } from 'leaflet';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import DatePicker from 'react-datepicker';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import 'react-datepicker/dist/react-datepicker.css';
import styles from '@/components/forms/styles/FormGroup.module.scss';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getBasicInfo, updateBasicInfo } from '@/features/eventCreation/basicInfoSlice';
import { setCurrentStep, setIsEditedById } from '@/features/eventCreation/eventCreationSlice';
import {
  useAddEventMutation,
  useUpdateEventMutation
} from "@/services/eventCreationApi";
import { googleApiKey } from '@/static/geolocation';
import seriesNames from '@/static/seriesNames';
import { useIsFirstRender } from '@/utils/customHooks';
import { handleGetAddressByLatLng } from '@/utils/geoLocation';
import { objectDatesToString, objectStringsToDates, removeNullElements } from '@/utils/objectUtils';

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
    facilityNotes: yup.string(),
    registrationEndDate: yup.date().required(),
    registrationStartDate: yup.date().required(),
    seriesMonth: yup.number().positive().integer().required(),
  })
  .required();

type Props = {
  step: number,
  eventStatus: { id: number, status: string }
  editMode?: boolean;
}

const LeafletMap = dynamic(
  () => import('../../../components/leaflet/LeafletMap'),
  { loading: () => <p>A map is loading</p>, ssr: false }
);

export const BasicInfo = forwardRef(({ step, eventStatus, editMode, ...props }: Props, ref) => {

  const dispatch = useAppDispatch();
  // TODO: user RTK query to get data from DB, then parse to match UI schema
  const basicInfo = useAppSelector(getBasicInfo);

  // RTK queries
  const [addEvent] = useAddEventMutation();
  const [updateEvent] = useUpdateEventMutation();

  const isFirstRender = useIsFirstRender();
  // console.log('BasicInfo render...:', basicInfo);
  // console.log('isFirstRender:', isFirstRender);

  // TODO: get savedCoordinates from store set to null If none;
  // sample to test:  [-27.444320, 153.039660];
  const [savedCoordinates, setSavedCoordinates] = useState<LatLngTuple | null>(null);
  const [addressPlaceHolder, setAddressPlaceHolder] = useState(basicInfo.facilityAddressString || '');
  const [isFormReady, setIsFormReady] = useState(false);

  // TODO: set in store or get current user location
  const latLongPlaceholder: LatLngTuple = [40.7959138, -73.9247479];

  const tomorrow = moment().add(1, 'day').toDate();

  const [monthId, setMonthId] = useState<number>(basicInfo.seriesMonth || 12);

  const [yearSelected, setYearSelected] = useState<number>(basicInfo.eventYear || moment().year());
  const [seriesSelected, setSeriesSelected] = useState<number>(basicInfo.seriesMonth || 0);


  const [minStartDate, setMinStartDate] = useState<Date>(tomorrow);
  const [regStartDate, setRegStartDate] = useState<Date>(moment().toDate());
  const [startDate, setStartDate] = useState<Date>(tomorrow);

  const [hasErrors, setHasErrors] = useState(false);
  const [hideErrorBox, setHideErrorBox] = useState(false);

  const [contactItems, setContactItems] = useState<ContactDetailsProps[]>(
    basicInfo?.contactDetails.length ? basicInfo.contactDetails : []);
  const [coordinates, setCoordinates] = useState<number[]>(
    basicInfo?.facilityAddress.length ? basicInfo.facilityAddress : latLongPlaceholder
  );

  const [availableSeries, setAvailableSeries] = useState<SeriesProps[]>(seriesNames);


  const setIsFormEdited = () => {
    dispatch(setIsEditedById(step));
  }

  const handleNextStep = () => {
    dispatch(setCurrentStep(step + 1));
  }

  const eventDateElements = {
    eventStartDate: basicInfo.eventStartDate || null,
    eventEndDate: basicInfo.eventEndDate || null,
    eventStartTime: basicInfo.eventStartTime || null,
    registrationEndDate: basicInfo.registrationEndDate || null,
    registrationStartDate: basicInfo.registrationStartDate || null
  }

  const stringsToDates = { ...objectStringsToDates(eventDateElements) };

  const formDefaultValues = {
    ...{
      additionalEvents: basicInfo.additionalEvents || [] as SeriesProps[],
      contactDetails: basicInfo.contactDetails || [] as ContactDetailsProps[],
      eventName: basicInfo.eventName || '',
      eventYear: basicInfo.eventYear || null,
      facilityAddress: basicInfo.facilityAddress || [] as number[],
      facilityAddressString: basicInfo.facilityAddressString || '',
      facilityName: basicInfo.facilityName || '',
      facilityNotes: basicInfo.facilityNotes || '',
      seriesMonth: basicInfo.seriesMonth || null,
      eventStartDate: null,
      eventEndDate: null,
      eventStartTime: null,
      registrationEndDate: null,
      registrationStartDate: null
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
    if (formState.isDirty) {
      setIsFormEdited();
    }
    Object.keys(formState.errors).length ? setHasErrors(true) : setHasErrors(false);
  }, [formState.errors, formState.isDirty]);

  // CHANGE HANDLERS
  useEffect(() => {
    if (yearSelected && !isFirstRender) {
      handleYearChange(yearSelected);
    }
  }, [yearSelected]);

  useEffect(() => {
    if (seriesSelected && !isFirstRender) {
      handleSelectSeries(seriesSelected);
    }
  }, [seriesSelected]);
  useEffect(() => {
    if (contactItems.length && !isFirstRender) {
      setValue('contactDetails', contactItems);
    }
  }, [contactItems]);




  useEffect(() => {
    // handl async loading of of address placeholder if data is present from event 
    (async () => {
      if (savedCoordinates) {
        const address = await handleGetAddressByLatLng(savedCoordinates);
        setAddressPlaceHolder(address);
        setCoordinates(savedCoordinates);
        setIsFormReady(true);
      } else {
        // console.log('no saved address coordinates');
        setIsFormReady(true);
      }
    })();

  }, [savedCoordinates]);

  const handleYearChange = (year: number) => {
    console.log('init handleYearChange');



    clearEventsDatesFields();
    const currentDate = moment().date();
    const currentMonth = moment().month();

    // LOGIC: If selected year is current & today is 7th or later 
    // then you can't select current month
    if (moment().year() === year && currentDate >= 7) {
      setAvailableSeries(seriesNames.slice(currentMonth + 1));
      return;
    }

    // LOGIC: If selected year is current then you can only select starting from current month 
    if (moment().year() === year && currentDate < 7) {
      setAvailableSeries(seriesNames.slice(currentMonth));
      return;
    }

    if (!isFirstRender) {
      setAvailableSeries(seriesNames);
    }

  }

  const handleSelectSeries = (id: number) => {
    console.log('init handleSelectSeries');
    setMonthId(id);
    clearEventsDatesFields();

    // LOGIC: If selected year & month is current AND today's date is 7 or greater 
    // THEN minimun Event Start date is next month's day 1
    const month = id - 1;
    const currentDate = moment().date();
    if (moment().year() === yearSelected && moment().month() === month && currentDate >= 7) {
      setMinStartDate(moment().set('year', yearSelected).set('month', month + 1).set('date', 1).toDate());
      return;
    }

    // LOGIC: If selected year & month is current, THEN min. event start date is a day after tomorrow.
    if (moment().year() === yearSelected && moment().month() === month) {
      setMinStartDate(moment().add(1, 'day').toDate());
      return;
    }
    // LOGIC: If year selected is NOT current year, THEN min. event start date is day 1 of month selected.
    setMinStartDate(moment().set('year', yearSelected).set('month', month).set('date', 1).toDate());

  };

  const clearEventsDatesFields = () => {
    setValue('eventStartDate', null);
    setValue('eventEndDate', null);
    setValue('registrationStartDate', null);
    setValue('registrationEndDate', null);
    setMinStartDate(tomorrow);
    setRegStartDate(moment().toDate());
    setStartDate(tomorrow);
  }

  const handleAdditionalEvents = (val: SeriesProps[]) => {
    setValue('additionalEvents', val);
  };

  const handleAddContactItem = (val: ContactDetailsProps) => {
    setContactItems([...contactItems, val]);
    setIsFormEdited();
  };

  const handleRemoveContactItem = (val: ContactDetailsProps) => {
    const newItems = contactItems.filter(item => item.id !== val.id);
    setContactItems(newItems);
  };

  const handleUpdateContactItem = (val: ContactDetailsProps) => {
    // console.log('handleUpdateContactItem: ', val);
    const newItems = contactItems.map(item => item.id === val.id ? val : item);
    setContactItems(newItems);
  };


  const handleLocationInput = async (address: string) => {
    const results = await geocodeByAddress(address);
    // console.log('handleLocationInput: ', results);
    // console.log('formatted_address: ', results[0].formatted_address);
    setValue('facilityAddressString', results[0].formatted_address);
    const latLng = await getLatLng(results[0]);
    setValue('facilityAddress', [latLng.lat, latLng.lng]);
    setCoordinates([latLng.lat, latLng.lng]);
    setIsFormEdited();
  };


  // TODO: convert dataForApi to actual form data after testing with dev API
  const dataForApi = {
    "additionalSeries": [6, 7],
    "contacts": [
      {
        "emailId": "test@email.com",
        "firstName": "string",
        "lastName": "string",
        "mobilePhoneNumber": "string",
        "title": "string"
      }
    ],
    "divisions": [
      {
        "competitionLevel": "COMPETITIVE",
        "eventId": 0,
        "free": true,
        "makeup": "MENS",
        "numberOfPools": 1,
        "playerFeeAmount": 0,
        "playerFeeCurrency": "string",
        "pools": [
          {
            "numberOfTeams": 4,
            "poolName": "sample 1"
          }
        ],
        "teamsCapacity": 4,
        "type": "YOUTH"
      }
    ],
    "endDate": "2022-06-13T23:33:17.886Z",
    "leagueId": 1,
    "location": {
      "city": "new city",
      "continent": "string",
      "country": "string",
      "latitude": 23,
      "line1": "string",
      "line2": "string",
      "longitude": 23,
      "state": "string"
    },
    "locationName": "sample",
    "locationNotes": "string",
    "name": "Darth Vader's event",
    "registrationEndDate": "2022-06-13T23:33:17.886Z",
    "registrationStartDate": "2022-06-13T23:33:17.886Z",
    "series": 5,
    "startDate": "2022-06-13T23:33:17.886Z",
    "status": "DRAFT",
    "year": "2022"
  }

  const handleSubmitToApi = async () => {
    if (editMode) {
      console.log('FORM is in Create new event mode');
      await addEvent(dataForApi);
      console.log("New Event Added Successfully");
    } else {
      // TODO: apply below if form is in editMode
      console.log('FORM is in EDIT event MODE');
      await updateEvent(dataForApi);
      // navigate("/");
    }
    handleNextStep();
  }

  const onSubmit = (data: unknown) => {
    //TODO: send Redux state basicInfo to API through redux middleware
    console.log('POST: sending data...');
    console.log(data);
    handleSubmitToApi();

  };

  const submitForm = () => {
    setHideErrorBox(false);
    let formValues = getValues();
    // console.log('submitForm:getValues()', formValues);
    const convertedDates = objectDatesToString(formValues);
    formValues = { ...formValues, ...convertedDates };
    const cleanedData = { ...eventStatus, ...formValues, ...removeNullElements(formValues) };
    console.log('submitForm:parsedValues :', cleanedData);
    dispatch(updateBasicInfo(cleanedData));
    handleSubmit(onSubmit,
      () => { console.log('Submit Failed - has Form Errors', formState.errors); }
    )();
  };

  useImperativeHandle(ref, () => ({ submitForm }));

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
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setYearSelected(parseInt(e.target.value));
                setValue('seriesMonth', 0);
                clearErrors('eventYear');
              }}
            >
              <option value='' hidden></option>
              <option value='2022'>2022</option>
              <option value='2023'>2023</option>
              <option value='2024'>2024</option>
            </select>
            {formState.errors.eventYear ?
              <span className='error'>Event Year is required</span> :
              <label>Year</label>
            }
          </div>

          <div className='col'>
            <select
              {...register('seriesMonth')}
              // value={monthId}
              // defaultValue={formDefaultValues.seriesMonth || 0}
              defaultValue={monthId}
              onChange={(e) => {
                setSeriesSelected(Number(e.target.value));
                clearErrors('seriesMonth');
              }}
            >
              <option value='' hidden></option>
              {availableSeries.map((item) => {
                // const isDefault = item.id === formDefaultValues.seriesMonth;
                return <option key={item.month} value={item.month}>{item.name}</option>
              })}
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
                  selected={field.value}
                  minDate={minStartDate}
                  maxDate={moment(minStartDate).endOf('year').toDate()}
                  onChange={(e) => {
                    field.onChange(e);
                    setValue('eventStartTime', null);
                    setValue('eventEndDate', null);
                    setValue('registrationStartDate', null);
                    setValue('registrationEndDate', null);
                    clearErrors('eventStartDate');
                  }}
                  onCalendarClose={() => {
                    // NOTE: state setter fx can't detect field.value actual onChange event
                    // NOTE: hence setter is called under onCalendarClose
                    if (field.value) {
                      setStartDate(moment(field.value).toDate());
                    }
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
                  selected={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    clearErrors('eventStartTime');
                  }}
                  className='datepicker-group'
                  openToDate={startDate}
                  showTimeSelect
                  showTimeSelectOnly
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
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  minDate={startDate}
                  maxDate={moment(startDate).add(1, 'month').date(13).toDate()}
                  onChange={(e) => {
                    field.onChange(e);
                    clearErrors('eventEndDate');
                  }}
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
                  // LOGIC: Reg start date min should be current date.
                  minDate={moment().toDate()}
                  // LOGIC: Reg End Date must take place one day before Event Start Date
                  maxDate={moment(startDate).subtract(1, 'day').toDate()}
                  onChange={(e) => field.onChange(e)}
                  onCalendarClose={() => {
                    // NOTE: state setter fx can't detect field.value actual onChange event
                    // NOTE: hence state setter is called under onCalendarClose
                    if (field.value) {
                      setValue('registrationEndDate', null);
                      setRegStartDate(field.value);
                    }
                  }}
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
                  selected={field.value}
                  minDate={regStartDate}
                  // LOGIC: Reg End Date must take place one day before Event Start Date
                  maxDate={moment(startDate).subtract(1, 'day').toDate()}
                  onChange={(e) => field.onChange(e)}
                  className='datepicker-group'
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
          seriesMonth={monthId}
          items={seriesNames}
          handleAdditionalEvents={handleAdditionalEvents}
          initCheckedItems={basicInfo.additionalEvents}
        />
      </div>

      {isFormReady &&
        <div className={styles.formGroup}>
          <LocationIcon />
          <div className='label'>
            <span>Location</span>
          </div>
          <div className='location-group'>
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
                      instanceId: 'facilityAddressId',  // FIX: for ???Warning: Prop `id` did not match???
                      className: 'autocomplete-field',
                      defaultInputValue: addressPlaceHolder,
                      // TODO: trace type for the any below
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onChange: (e: any) => {
                        handleLocationInput(e.value.description);
                      }
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
            <div className='col map-col'>
              <LeafletMap
                // TODO: Optimize this form to prevent reloading of Leaflet Map on other formState changes 
                coordinates={coordinates}
                style={{ height: '250px', width: '250px' }} />
            </div>
          </div>
        </div>
      }

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
          handleRemoveContactItem={handleRemoveContactItem}
          handleUpdateContactItem={handleUpdateContactItem}
          items={contactItems}
        />
      </div>


    </form >
  );
});
