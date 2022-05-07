import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import 'react-datepicker/dist/react-datepicker.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from './Review.module.scss';
import groupStyles from '@/components/forms/styles/FormGroup.module.scss';

import { useAppDispatch } from '@/app/hooks';
import { setCurrentStep, setIsEditedById } from '@/features/eventCreation/eventCreationSlice';

import CalendarIcon from '~/icons/blue/calendar.svg';
import CloseIcon from '~/icons/close.svg';
import ErrorIcon from '~/icons/error.svg';
import DescriptionIcon from '~/icons/grey/description.svg';
import EventImgSrc from '~/images/mock/event-photo.png';
import FlagSrc from '~/images/mock/flag-us.png'
import LogoSrc from '~/images/mock/league-logo.png'

const schema = yup
  .object({
    mainEventImage: yup.string().required(),
    description: yup.string().required()
  })
  .required();

type Props = {
  step: number,
  eventStatus: { id: number, status: string }
}


export const Review = forwardRef(({ step, eventStatus, ...props }: Props, ref) => {

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [hasErrors, setHasErrors] = useState(false);
  const [hideErrorBox, setHideErrorBox] = useState(false);
  const [editorState, setEditorState] = useState('');

  const formDefaultValues = {
    mainEventImage: 'imasdal;sdk',
    description: 'descasdaslkdj'
  };

  const {
    handleSubmit,
    getValues,
    formState,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: formDefaultValues
  });


  const setIsFormEdited = () => {
    dispatch(setIsEditedById(step));
  }
  const handleNextStep = () => {
    dispatch(setCurrentStep(4.5));
    router.push('/events/congratulations', undefined, { shallow: true });
  }

  useEffect(() => {
    if (formState.isDirty) {
      setIsFormEdited();
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

  const onEditorStateChange = (editorState: any) => {
    // setEditorState(editorState);
    // console.log('editorState: ', editorState);
  };

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
          <Image src={EventImgSrc} alt="event image" />
        </div>
        <div className="text">
          <h3>
            NY SEVENS
          </h3>
          <h4 className='event-name'>
            <div className="logo">
              <Image src={LogoSrc} />
            </div>
            <b>HomeBush</b> | Series 9
          </h4>
          <div className="date">
            <CalendarIcon />
            <span>Sat, Sep 14, 2022 at 4:00 PM EST</span>
          </div>
          <div className="location">
            <CalendarIcon />
            <span>Randall&apos;s Island Manhattan, NY</span>
          </div>
          <div className="fee">
            <CalendarIcon />
            <CalendarIcon />
            <span>Fee- $25</span>
          </div>
          <div className="division">
            <span>Adult Mens Social, Adult Coed Social</span>
          </div>
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
        <p className='instructions'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus laoreet non curabitur gravida. Aliquet nibh praesent tristique magna sit amet purus gravida quis. Diam maecenas sed enim ut sem. Ac placerat vestibulum lectus mauris. Mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et. Faucibus a pellentesque sit amet. Duis tristique sollicitudin nibh sit amet commodo. Non enim praesent elementum facilisis leo vel fringilla est. Malesuada fames ac turpis egestas integer eget aliquet. Sit amet consectetur adipiscing elit pellentesque. Libero volutpat sed cras ornare arcu dui vivamus arcu. Non enim praesent elementum facilisis leo vel fringilla. In aliquam sem fringilla ut morbi. Aenean euismod elementum nisi quis eleifend. Elit eget gravida cum sociis natoque. Consequat semper viverra nam libero justo.</p>

      </div>

      <div className={`${groupStyles.formGroup} ${styles.formGroup}`}>
        <DescriptionIcon />
        <div className='label'>
          <span>Events</span>
        </div>
        <p className='instructions'>When publishing this Event, the following Events will be created automatically and saved as Drafts - you can update Basic Info for each below, and can access additional options and public page settings from the Event Draft page.</p>

      </div>

    </div >
  );
});
