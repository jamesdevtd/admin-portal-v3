import * as React from 'react';

import LoginLayout from '@/components/layout/LoginLayout';
import ButtonLink from '@/components/links/ButtonLink';

import TagX from '~/svg/tagx.svg';
import Trophy from '~/svg/trophy.svg';

export default function AffiliateSetupSuccessPage() {
  const AffiliateSetupSuccess = () => (
    <section className='flex flex-col space-y-4'>
      <div className='w-full space-y-4 text-center text-gray-600'>
        <h3 className='text-lg font-title'>
          Congratulations on beginning your journey as a{' '}
          <strong>TagX Affiliate.</strong>
        </h3>
      </div>
      <Trophy className='h-32 w-32 self-center rounded-full py-5 transition duration-500 ease-in-out' />
    </section>
  );

  return (
    <LoginLayout pageTitle='TagX Affiliate Setup'>
      <div className='col-span-1 bg-white'>
        <div className='m-auto flex w-max flex-col space-y-4'>
          <TagX className='logo h-12 w-96 self-center' />
          <div className='m-auto flex w-96 flex-col space-y-8'>
            <AffiliateSetupSuccess />
            <div className='self-center'>
              <ButtonLink href='/dashboard'>
                Login to your Affiliate Dashboard
              </ButtonLink>
            </div>
          </div>
          <p className='self-center text-xs'>
            Press <strong>Enter</strong>
          </p>
        </div>
      </div>
    </LoginLayout>
  );
}
