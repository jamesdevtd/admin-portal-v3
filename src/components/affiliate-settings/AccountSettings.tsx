import { useState } from 'react';

import accountStyles from './AccountSettings.module.scss';
import tabStyles from './AffiliateDetails.module.scss';
import styles from '@/components/forms/styles/FormGroup.module.scss';

import NextImage from '../NextImage';

import UserDetails from '@/types/userDetails';

import ChevronIcon from '~/icons/chevron-down.svg';

type Props = {
  // TODO: replace 'any' with actual event interface i.e. EventProps in /types/event.ts
  users: UserDetails[];
};

const AccountSettings = ({ users }: Props) => {
  const [expand, setExpand] = useState(false);

  return (
    <div
      className={`${tabStyles['tab-container']} ${tabStyles.affiliate} ${expand ? tabStyles['expanded'] : tabStyles['collapsed']
        }`}
    >
      <h3
        onClick={(e) => {
          e.preventDefault();
          setExpand(!expand);
        }}
      >
        Account Settings
        <ChevronIcon />
      </h3>
      <div className='togglelable box-bg'>
        <section className='flex flex-col'>
          <div className='w-full space-y-4 text-gray-600'>
            <div className='max-w-sm w-full'>
              <NextImage
                className='mt-8 w-full max-w-sm'
                src='/images/stripe-branding.png'
                alt='stripe-branding'
                height={88}
                width={354}
              />
            </div>
            <p className='text-xs text-gray-500'>
              Payout Method
            </p>
            <div className={`${styles.formGroup} ${accountStyles.formGroup}`}>
              <div className="fields-group">
                <div className='col'>
                  <input type='text' name='paymentmethod' value="**** **** **** 1432" readOnly />
                  <a href='#' className='text-blue-brand max-w-fit'>Change Payment Method</a>
                </div>
              </div>
            </div>
            <p className='text-gray-light'>Our direct integration with Stripe™ to securely provide your information for us to process your payouts.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AccountSettings;
