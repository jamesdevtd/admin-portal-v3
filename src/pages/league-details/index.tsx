import { GetServerSideProps } from 'next';
import { useEffect, useRef } from 'react';
import { RiArrowGoBackLine } from 'react-icons/ri';

import styles from "./LeagueDetails.module.scss";

import ContentWrap from '@/components/layout/ContentWrap';
import Layout from '@/components/layout/Layout';
import { GeneralInfo } from '@/components/league-details/GeneralInfo';

import { useAppSelector } from '@/app/hooks';
import {
  getCurrentStep,
  getStepById
} from '@/features/eventCreation/eventCreationSlice';

import CalendarIcon from '~/icons/blue/calendar.svg';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const id = params?.id || 1
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

export default function Events({ id = 1 }: Props) {

  const currentStep = useAppSelector(getCurrentStep);
  const isFormEdited = useAppSelector(getStepById(currentStep))?.isEdited;

  const eventStatus = { id: id, status: 'draft' };
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const affiliateFormRef = useRef<any>();

  useEffect(() => {
    // TODO: create actual API request or redux middleware 
    // EXAMPLE:
    // const loadEventData = async () => {
    //   const { data } = await axios.get(`/api/events/${id}`);
    //   console.log(data);
    // };

  }, []);


  const submitEventsForm = () => {
    if (affiliateFormRef && affiliateFormRef.current) {
      affiliateFormRef.current.submitForm();
    }
  };

  return (
    <div className={`page-event ${isFormEdited ? 'is-edited' : ''}`}>

      <Layout>

        <ContentWrap className={styles.Events}>
          <header className='content-header'>
            <CalendarIcon />
            <h2>League Details</h2>
            <span className='flex items-center ml-auto'>
              <RiArrowGoBackLine />
              Back to previous screen
            </span>
          </header>

          <div className='content-main'>
            {/* <div className='inner-sidebar'>
              <EventsMenu />
            </div> */}

            <div className="inner-content">
              <GeneralInfo ref={affiliateFormRef} />
            </div>
          </div>
        </ContentWrap>

      </Layout>
    </div>
  );
}

