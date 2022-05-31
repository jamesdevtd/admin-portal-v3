import Image from 'next/image';
import React from 'react';

import styles from './LoginLayout.module.scss';

import bgUrl from '~/images/backgrounds/admin-bg-2x.png';
import TagxLogo from '~/svg/tagx.svg';

type Props = {
  children: React.ReactNode;
  pageTitle?: string;
};

const LoginLayout = (props: Props) => {
  return (
    <div
      className={`${styles.layoutLogin} grid min-h-screen grid-cols-1 content-start md:grid-cols-2`}
    >
      <div className='col-branding relative h-60 md:h-screen'>
        <Image
          src={bgUrl}
          alt='admin login background'
          className='absolute block h-full w-full object-cover'
        // layout='raw'
        />
        <TagxLogo className='logo absolute top-5 left-5 h-9 w-11' />
        <div cy-marker='page-title' className='text relative m-16 max-w-xs'>
          {props.pageTitle && (
            <h2 className='font-title text-3xl font-bold text-white'>
              {props.pageTitle}
            </h2>
          )}
        </div>
      </div>
      <div className='col-form flex py-16 px-8 md:px-16 overflow-x-hidden'>
        <div className='m-auto flex w-full flex-col gap-5'>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
