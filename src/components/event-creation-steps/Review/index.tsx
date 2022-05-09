import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './Review.module.scss';
import groupStyles from '@/components/forms/styles/FormGroup.module.scss';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getBasicInfo } from '@/features/eventCreation/basicInfoSlice';
import { getDivisions } from '@/features/eventCreation/divisionsSlice';
import { setCurrentStep, setIsEditedById } from '@/features/eventCreation/eventCreationSlice';
import { getEventPublicPage } from '@/features/eventCreation/eventPublicPageSlice';

import ClonedEvents from './ClonedEvents';
import OrderedFields from '../EventPublicPage/OrderedFields';

import CalendarIcon from '~/icons/blue/calendar-dark.svg';
import DivisionIcon from '~/icons/blue/division.svg';
import FeeIcon from '~/icons/blue/fee.svg';
import PinIcon from '~/icons/blue/map-pin.svg';
import CloseIcon from '~/icons/close.svg';
import ErrorIcon from '~/icons/error.svg';
import DescriptionIcon from '~/icons/grey/description.svg';
import EventImgSrc from '~/images/mock/event-photo.png';
import FlagSrc from '~/images/mock/flag-us.png'
import LogoSrc from '~/images/mock/league-logo.png'

type Props = {
  step: number,
  eventStatus: { id: number, status: string }
}


export const Review = forwardRef(({ step, eventStatus, ...props }: Props, ref) => {

  const dispatch = useAppDispatch();
  const eventPublic = useAppSelector(getEventPublicPage);
  const basicInfo = useAppSelector(getBasicInfo);
  const divisions = useAppSelector(getDivisions);
  const descHtml = eventPublic.fields.find(i => i.type === 'text')?.html;

  const router = useRouter();
  const [hasErrors, setHasErrors] = useState(false);
  const [hideErrorBox, setHideErrorBox] = useState(false);

  const {
    handleSubmit,
  } = useForm({
    mode: 'onSubmit',
  });


  const setIsFormEdited = () => {
    dispatch(setIsEditedById(step));
  }
  const handleNextStep = () => {
    dispatch(setCurrentStep(4.5));
    router.push('/events/congratulations', undefined, { shallow: true });
  }

  const onSubmit = (data: unknown) => {
    //TODO: POST request to API
    console.log('POST: sending data...');
    console.log(data);
    handleNextStep();
  };

  const submitForm = () => {
    setHideErrorBox(false);
    handleSubmit(onSubmit)();
  };

  useImperativeHandle(ref, () => ({ submitForm }));

  return (
    <div
      {...ref}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
      className={`main-form ${hasErrors ? 'has-errors' : ''}`}
    >
      {(hasErrors && !hideErrorBox) &&
        <div className={groupStyles.errorBox}>
          <div className="wrap">
            <ErrorIcon />
            <span>Please Complete All Required Fields </span>
            <button onClick={() => setHideErrorBox(true)}><CloseIcon /></button>
          </div>
        </div>
      }

      <h3>Review &amp; Publish</h3>

      <div className={styles.eventCard}>

        <div className="image">
          <span className="tag">open</span>
          <Image src={eventPublic?.croppedImages[0]?.src || EventImgSrc} alt="event image" layout='fill'
            objectFit='contain' />
        </div>
        <div className="text">
          <h3>
            {basicInfo?.eventName}
          </h3>
          <h4 className='event-name'>
            <div className="logo">
              <Image src={LogoSrc} />
            </div>
            <b>{divisions[0]?.pools[0].name}</b><span>|</span>Series {basicInfo?.seriesMonth}
          </h4>
          <div className="date">
            <CalendarIcon />
            <span>{moment(basicInfo?.eventStartDate).format("ddd, MMMM Do YYYY, h:mm:ss a")}</span>
          </div>
          <div className="location">
            <PinIcon />
            {basicInfo?.facilityName}
            {/* <span>Randall&apos;s Island Manhattan, NY</span> */}
          </div>
          <div className="fee">
            <FeeIcon />
            {divisions[0]?.playerFee?.isFree ?
              <span>Free - $0</span> :
              <span>Fee - ${divisions[0]?.playerFee?.fee}</span>
            }
          </div>
          {divisions.length &&
            <div className="divisions">
              <DivisionIcon />
              <ul>
                {divisions.map(i =>
                  <li key={i.id}>
                    {i.divisionType} {i.makeUp} {i.competitionLevel}{(divisions.length > 1 && i.id < divisions.length) ? ',  ' : ''}
                  </li>
                )}
              </ul>
            </div>
          }
          <div className="event-country">
            <Image src={FlagSrc} />
          </div>

        </div>
      </div>
      <div className={`${groupStyles.formGroup} ${styles.formGroup}`}>
        <DescriptionIcon />
        <div className='label'>
          <span>Description*</span>
        </div>
        <OrderedFields isReadOnly />

      </div>

      <div className={`${groupStyles.formGroup} ${styles.formGroup}`}>
        <DescriptionIcon />
        <div className='label'>
          <span>Events</span>
        </div>
        <p className='instructions'>When publishing this Event, the following Events will be created automatically and saved as Drafts - you can update Basic Info for each below, and can access additional options and public page settings from the Event Draft page.</p>
        <ClonedEvents />
      </div>

    </div >
  );
});
