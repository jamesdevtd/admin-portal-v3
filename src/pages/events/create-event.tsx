import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import styles from "./Events.module.scss";

import SubmitButton from '@/components/buttons/SubmitButton';
import { BasicInfo } from '@/components/event-creation-steps/BasicInfo';
import { EventOptions } from '@/components/event-creation-steps/EventOptions';
import { EventPublicPage } from '@/components/event-creation-steps/EventPublicPage';
import { Review } from '@/components/event-creation-steps/Review';
import CropperModal from '@/components/forms/fields/ImageDropCrop/CropperModal';
import ContentWrap from '@/components/layout/ContentWrap';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import EventsMenu from '@/components/navigation/EventsMenu';

import { useAppSelector } from '@/app/hooks';
import {
  getCurrentStep,
  getStepById
} from '@/features/eventCreation/eventCreationSlice';

import CalendarIcon from '~/icons/blue/calendar.svg';


export default function CreateEvent() {

  const currentStep = useAppSelector(getCurrentStep);
  const isFormEdited = useAppSelector(getStepById(currentStep))?.isEdited;
  const router = useRouter();

  // TODO: get iniitial eventStatus from API
  const eventStatus = { id: 0, status: 'draft' };

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const eventFormRef = useRef<any>();

  useEffect(() => {
    // TODO: use existing event Data variable after API endpoints are all tested OK

  }, []);


  const submitEventsForm = () => {
    if (eventFormRef && eventFormRef.current) {
      eventFormRef.current.submitForm();
    }
  };

  return (
    <div className={`page-event ${isFormEdited ? 'is-edited' : ''}`}>

      <Layout>

        <ContentWrap className={styles.Events}>
          <header className='content-header'>
            <CalendarIcon />
            <h2>New Open Series</h2>
            <button className='btn draft'>Draft</button>
            <button className='btn ml-auto' onClick={() => router.push('/events')}>Cancel</button>
          </header>

          <div className='content-main'>
            <div className='inner-sidebar'>
              <EventsMenu />
            </div>

            <div className="inner-content">
              {currentStep === 1 &&
                <BasicInfo ref={eventFormRef} step={1} eventStatus={eventStatus} />
              }
              {currentStep === 2 &&
                <EventOptions ref={eventFormRef} step={2} />
              }
              {currentStep === 3 &&
                <EventPublicPage ref={eventFormRef} step={3} eventStatus={eventStatus} />
              }
              {currentStep === 4 &&
                <Review ref={eventFormRef} step={4} eventStatus={eventStatus} />
              }
            </div>
          </div>
        </ContentWrap>

      </Layout>

      <div className={`${styles.footerNav} ${isFormEdited ? '' : 'hidden'}`}>
        <div className='wrap'>
          <ButtonLink variant='grey' href='/events'>
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

      <CropperModal />

    </div>
  );
}

