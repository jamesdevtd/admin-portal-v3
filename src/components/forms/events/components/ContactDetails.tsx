import React from 'react';

import styles from './ContactDetails.module.scss';

type Props = {
  firstName: string;
  lastName: string;
  email: string;
  mobilePhone: string;
};

const defaultProps = {
  firstName: 'Jonathan',
  lastName: 'Rabinowitsky',
  email: 'jtherabbit2022@gmail.com',
  mobilePhone: '+0001(914) 428 3195',
};
export default function ContactDetails(props: Props) {
  return (
    <div className={`${styles.contactDetails}`}>
      <h3>
        {props.firstName} {props.lastName}
      </h3>
      <div className='contact-fields'>
        <div className='fields-group'>
          <input type='text' />
          <label>
            First Name <span className='req'>*</span>
          </label>
        </div>
        <div className='fields-group'>
          <input type='text' />
          <label>
            Last Name <span className='req'>*</span>
          </label>
        </div>
        <div className='fields-group'>
          <input type='email' />
          <label>
            Email <span className='req'>*</span>
          </label>
        </div>
        <div className='fields-group'>
          <input type='email' />
          <label>
            Mobile Phone <span className='req'>*</span>
          </label>
        </div>
      </div>
    </div>
  );
}

ContactDetails.defaultProps = defaultProps;
