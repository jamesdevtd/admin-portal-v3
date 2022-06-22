import { GetServerSideProps } from 'next';
import { useEffect, useRef, useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { IoWarningOutline } from 'react-icons/io5';
import { RiArrowGoBackLine } from 'react-icons/ri';

import styles from './AffiliateSettings.module.scss';

import { GeneralInfo } from '@/components/affiliate-settings/GeneralInfo';
// import SubmitButton from '@/components/buttons/SubmitButton';
import ContentWrap from '@/components/layout/ContentWrap';
import Layout from '@/components/layout/Layout';

// import ButtonLink from '@/components/links/ButtonLink';
import { useAppSelector } from '@/app/hooks';
import { getIsEdited } from '@/features/affiliateDetails/affiliateDetailsSlice';


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

export default function AffiliateSettings() {
  const isFormEdited = useAppSelector(getIsEdited);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const affiliateFormRef = useRef<any>();
  const [redBar, setRedBar] = useState(true);

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
      {redBar && (
        <div className='bg-red-warning fixed w-full z-10 text-center text-white flex items-center justify-center'>
          <IoWarningOutline /> WARNING: YOU ARE CURRENTLY IMPERSONATING AFFILIATE. <a href="#" className='ml-1 underline hover:text-off-white'>CLICK HERE TO EXIT IMPERSONATION MODE</a>
        </div>
      )}
      <div className={`${redBar ? 'pt-4' : ''}`}>
        <Layout>
          <ContentWrap className={styles.Events}>
            <header className='content-header'>
              <FiSettings className='text-blue-brand' />
              <h2>Affiliate Settings</h2>
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
                <GeneralInfo /* ref={affiliateFormRef} */ />
              </div>
            </div>
          </ContentWrap>

          {/* <div className={`${styles.footerNav} ${isFormEdited ? '' : 'hidden'}`}>
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
          </div> */}
        </Layout>
      </div>
    </div>
  );
}
