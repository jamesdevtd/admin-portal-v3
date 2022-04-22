import { yupResolver } from '@hookform/resolvers/yup';
import { LatLngExpression } from 'leaflet';
import moment from 'moment';
import dynamic from 'next/dynamic';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './EventPublicPage.module.scss';

import seriesNames from '@/mock-data/seriesNames';

import ContactDetailsProps from '@/types/contactDetails';
import SeriesProps from '@/types/series';

import CloseIcon from '~/icons/close.svg';
import ErrorIcon from '~/icons/error.svg';

const schema = yup
  .object({
    additionalEvents: yup.array(),
    contactDetails: yup.array(),
    eventEndDate: yup.date().required().nullable(),
    eventName: yup.string().required(),
    eventStartDate: yup.date().required(),
    eventStartTime: yup.date().required(),
    eventYear: yup.number().positive().integer().required().nullable(),
    facilityAddress: yup.array().required(),
    facilityName: yup.string().required(),
    facilityNotes: yup.string().nullable(),
    registrationEndDate: yup.date().required(),
    registrationStartDate: yup.date().required(),
    seriesMonth: yup.number().positive().integer().required().nullable(),
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
  setIsFormEdited: React.Dispatch<React.SetStateAction<boolean>>,
  handleNextStep: (val: number) => void
}

export const EventPublicPage = forwardRef(({ setIsFormEdited, handleNextStep, ...props }: Props, ref) => {
  const [yearSelected, setYearSelected] = useState<number>(0);
  const [startDate, setStartDate] = useState(new Date());
  const [eventRange, setEventRange] = useState<Date[]>([new Date(), new Date()]);
  const [monthId, setMonthId] = useState<number>(1);
  const [hasErrors, setHasErrors] = useState(false);
  const [hideErrorBox, setHideErrorBox] = useState(false);
  const [contactItems, setContactItems] = useState<ContactDetailsProps[]>([]);
  const [coordinates, setCoordinates] = useState<LatLngExpression>([40.795817, -73.9247057]);
  const [availableSeries, setAvailableSeries] = useState(seriesNames);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.errors, formState.isDirty]);

  useEffect(() => {
    if (contactItems) {
      setValue('contactDetails', contactItems);
    }
    setAvaiableSeries(moment().year());
  }, []);

  const handleAdditionalEvents = (val: SeriesProps[]) => {
    setValue('additionalEvents', val);
  };

  const handleAddContactItem = (val: ContactDetailsProps) => {
    setContactItems([...contactItems, val]);
  };

  const clearSelectedDates = () => {
    setValue('seriesMonth', null);
    setValue('eventStartDate', null);
    setValue('registrationStartDate', null);
    setMonthId(1);
  }

  const setAvaiableSeries = (year: number) => {
    const d = new Date();
    const startMonthNumber = (year === d.getFullYear() && d.getDate() >= 7) ? d.getMonth() + 1 : null;
    if (startMonthNumber) {
      setAvailableSeries(seriesNames.slice(startMonthNumber));
    } else {
      setAvailableSeries(seriesNames);
    }
    clearSelectedDates();
  }

  const handleSelectSeries = (id: number) => {
    setMonthId(id);
  };

  // TODO: transfter googleApiKey to .env
  const googleApiKey = 'AIzaSyA8vejxIx686PpYxiXBqGpovVCZRurJBLQ';

  const handleLocationInput = async (address: string) => {
    const results = await geocodeByAddress(address);
    setValue('facilityAddress', results);
    const latLng = await getLatLng(results[0]);
    setCoordinates([latLng.lat, latLng.lng]);
  };

  const onSubmit = (data: unknown) => {
    //TODO: POST request to API
    console.log('POST: sending data...');
    console.log(data);
    handleNextStep(2);
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

      <h3>Event Public Page</h3>

      <div className={styles.formGroup}>
        <img
          src='/images/wip-placeholders/main-event-placeholder.png'
          alt='palceholder'
          className='img-placeholder'
        />
      </div>

      <div className={styles.formGroup}>
        <img
          src='/images/wip-placeholders/description-placeholder.png'
          alt='palceholder'
          className='img-placeholder'
        />
      </div>




    </form >
  );
});
