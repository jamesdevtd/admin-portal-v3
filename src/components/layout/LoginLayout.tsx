import React from 'react';

import styles from './LoginLayout.module.scss';

import TagxLogo from '~/svg/tagx.svg';

type Props = {
  children: React.ReactNode;
  pageTitle?: string;
};

const LoginLayout = (props: Props) => {
  return (
    <div
      className={styles.layoutLogin}
    >
      <div className='col-branding'>
        <img
          src='/images/backgrounds/admin-bg.png'
          alt='affiliate signup background'
        />
        <TagxLogo className='logo' />
        <div cy-marker='page-title' className='text'>
          {props.pageTitle && (
            <h2>
              {props.pageTitle}
            </h2>
          )}
        </div>
      </div>
      <div className='col-form'>
        <div>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
