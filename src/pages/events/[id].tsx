import { GetServerSideProps } from 'next';
import { useEffect, useRef } from 'react';

import styles from "./Events.module.scss";

import SubmitButton from '@/components/buttons/SubmitButton';
import { BasicInfo } from '@/components/forms/BasicInfo';
import { EventOptions } from '@/components/forms/EventOptions';
import { EventPublicPage } from '@/components/forms/EventPublicPage';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';

import { useAppSelector } from '@/app/hooks';
import {
  getCurrentStep,
  getStepById
} from '@/features/eventCreation/eventCreationSlice';

import EventsMenu from './EventsMenu';

import CalendarIcon from '~/icons/blue/calendar.svg';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const id = params?.id
    // TODO: get current event Data on server before loading and store to redux using use next-redux-wrapper 
    // const eventData = ....
    // By returning { props: eventData }, the Events component
    // will receive `eventData` as a prop at build time
    return { props: { id } }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return { props: { errors: err.message } }
  }
}

type Props = {
  id: number
}

export default function Events({ id }: Props) {

  const currentStep = useAppSelector(getCurrentStep);
  const isFormEdited = useAppSelector(getStepById(currentStep))?.isEdited;

  const eventStatus = { id: id, status: 'draft' };
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const eventFormRef = useRef<any>();

  useEffect(() => {
    // TODO: create actual API request or redux middleware 
    // EXAMPLE:
    // const loadEvents = async () => {
    //   const { data } = await axios.get(`/api/events/${id}`);
    //   console.log(data);
    // };

  }, []);


  const submitEventsForm = () => {
    if (eventFormRef && eventFormRef.current) {
      eventFormRef.current.submitForm();
    }
  };

  return (
    <div className={`page-event event-id-${id} ${isFormEdited ? 'is-edited' : ''}`}>
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
                <EventPublicPage ref={eventFormRef} step={3} />
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

