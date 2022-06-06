import { GetServerSideProps } from 'next';
import { useEffect, useRef } from 'react';
import { RiArrowGoBackLine } from 'react-icons/ri';

import styles from './LeagueDetails.module.scss';

import SubmitButton from '@/components/buttons/SubmitButton';
import ContentWrap from '@/components/layout/ContentWrap';
import Layout from '@/components/layout/Layout';
import { GeneralInfo } from '@/components/league-details/GeneralInfo';
import ButtonLink from '@/components/links/ButtonLink';

import { useAppSelector } from '@/app/hooks';
import { getIsEdited } from '@/features/affiliateDetails/affiliateDetailsSlice';

import CalendarIcon from '~/icons/blue/calendar.svg';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const id = params?.id || 1;
    // TODO: get current event Data on server before loading and store to redux using use next-redux-wrapper
    // const eventData = ....
    // By returning { props: eventData }, the Events component
    // will receive `eventData` as a prop at build time
    return { props: { id } };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return { props: { errors: err.message } };
  }
};

export default function Events() {
  const isFormEdited = useAppSelector(getIsEdited);
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
            <span className='ml-auto flex items-center'>
              <RiArrowGoBackLine />
              Back to previous screen
            </span>
          </header>

          <div className='content-main'>
            {/* <div className='inner-sidebar'>
              <EventsMenu />
            </div> */}

            <div className='inner-content'>
              <GeneralInfo ref={affiliateFormRef} />
            </div>
          </div>
        </ContentWrap>

        <div className={`${styles.footerNav} ${isFormEdited ? '' : 'hidden'}`}>
          <div className='wrap'>
            <ButtonLink variant='grey' href='/league'>
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
      </Layout>
    </div>
  );
}
