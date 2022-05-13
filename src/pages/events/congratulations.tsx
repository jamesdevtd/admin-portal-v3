import { useRef } from 'react';

import styles from "./Events.module.scss";

import { Congratulations } from '@/components/event-creation-steps/Congratulations';
import ContentWrap from '@/components/layout/ContentWrap';
import Layout from '@/components/layout/Layout';
import RootEventsMenu from '@/components/navigation/RootEventsMenu';

import { useAppSelector } from '@/app/hooks';
import {
  getCurrentStep,
  getStepById
} from '@/features/eventCreation/eventCreationSlice';

import CalendarIcon from '~/icons/blue/calendar.svg';

// TODO: get event ID from store
const id = 1;

export default function Events() {

  const currentStep = useAppSelector(getCurrentStep);
  const isFormEdited = useAppSelector(getStepById(currentStep))?.isEdited;

  const eventStatus = { id: id, status: 'draft' };
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const eventFormRef = useRef<any>();

  const submitEventsForm = () => {
    if (eventFormRef && eventFormRef.current) {
      eventFormRef.current.submitForm();
    }
  };

  return (
    <div className={`page-event event-id-${id} ${isFormEdited ? 'is-edited' : ''}`}>

      <Layout>

        <ContentWrap className={styles.Events}>

          <header className='content-header'>
            <CalendarIcon />
            <h2>NY Sevens | Open Series 9</h2>
            <button className='btn ml-auto'>My Event</button>
          </header>

          <div className='content-main'>
            <div className='inner-sidebar'>
              <RootEventsMenu />
            </div>

            <div className="inner-content">
              <Congratulations />
            </div>
          </div>

        </ContentWrap>
      </Layout>

    </div>
  );
}