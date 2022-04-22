import { useEffect, useRef, useState } from 'react';

import styles from "./Events.module.scss";

import SubmitButton from '@/components/buttons/SubmitButton';
import { BasicInfo } from '@/components/forms/BasicInfo';
import { EventOptions } from '@/components/forms/EventOptions';
import { EventPublicPage } from '@/components/forms/EventPublicPage';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  selectCurrentStep,
  setCurrentStep,
} from '@/features/eventCreationSteps/eventCreationStepsSlice';

import EventsMenu from './EventsMenu';

import CalendarIcon from '~/icons/blue/calendar.svg';

export default function Events() {
  const [isFormEdited, setIsFormEdited] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector(selectCurrentStep);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const eventFormRef = useRef<any>();

  useEffect(() => {
    //
  }, []);

  const submitEventsForm = () => {
    if (eventFormRef && eventFormRef.current) {
      eventFormRef.current.submitForm();
    }
  };

  const handleNextStep = (val: number) => {
    dispatch(setCurrentStep(Number(val)));
  }

  return (
    <div className='relative'>
      <Layout>

        <div className={styles.Events}>

          <header className='content-header'>
            <CalendarIcon />
            <h2>New Open Series</h2>
            <button className='btn draft'>Draft</button>
            <button className='btn ml-auto'>Cancel</button>
          </header>

          <div className='content-main'>
            <div className='inner-sidebar'>
              <EventsMenu currentStep={currentStep} handleNextStep={handleNextStep} />
            </div>

            <div className="inner-content">
              {currentStep === 0 &&
                <BasicInfo ref={eventFormRef}
                  setIsFormEdited={setIsFormEdited}
                  handleNextStep={handleNextStep} />
              }
              {currentStep === 1 &&
                <EventOptions ref={eventFormRef}
                  setIsFormEdited={setIsFormEdited}
                  handleNextStep={handleNextStep} />
              }
              {currentStep === 2 &&
                <EventPublicPage ref={eventFormRef}
                  setIsFormEdited={setIsFormEdited}
                  handleNextStep={handleNextStep} />
              }
            </div>
          </div>

        </div>


      </Layout>

      <div className={`${styles.footerNav} ${isFormEdited ? '' : 'hidden'}`}>
        <div className='wrap'>
          <ButtonLink variant='grey' href='/dashboard'>
            Cancel
          </ButtonLink>
          <SubmitButton
            formId='basicInfo'
            clickHander={submitEventsForm}
            className='test-class'
          >
            Save &amp; Continue
          </SubmitButton>
        </div>
      </div>
    </div>
  );
}
