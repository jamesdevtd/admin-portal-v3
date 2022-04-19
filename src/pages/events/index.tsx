import { useEffect, useRef, useState } from 'react';

import styles from "./Events.module.scss";

import SubmitButton from '@/components/buttons/SubmitButton';
import { BasicInfo } from '@/components/forms/BasicInfo';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';

import EventsMenu from './EventsMenu';

import CalendarIcon from '~/icons/blue/calendar.svg';

export default function Events() {
  const [isFormEdited, setIsFormEdited] = useState<boolean>(false)
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
              <EventsMenu />
            </div>

            <div className="inner-content">
              <BasicInfo ref={eventFormRef} setIsFormEdited={setIsFormEdited} />
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
