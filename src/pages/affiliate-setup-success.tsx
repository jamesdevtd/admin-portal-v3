import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';

import TagX from '~/svg/tagx.svg';
import Trophy from '~/svg/trophy.svg';

export default function AffiliateSetupSuccessPage() {
  const AffiliateSetupSuccess = () => (
    <section className='flex flex-col space-y-4'>
      <div className='w-full space-y-4 text-center text-gray-600'>
        <p>
          Congratulations on beginning your journey as a{' '}
          <strong>TagX Affiliate.</strong>
        </p>
      </div>
      <Trophy className='h-32 w-32 self-center rounded-full border-2 border-sky-600 fill-sky-600 py-5 transition duration-500 ease-in-out' />
    </section>
  );

  return (
    <Layout>
      <main>
        <section className='h-screen bg-white'>
          <div className='grid h-full grid-flow-col'>
            <div className='col-span-3 bg-[url("/images/affiliate-bg.jpg")] bg-cover'>
              <TagX className='logo absolute top-2 left-5 h-10 w-20' />
              <h1 className='m-16 text-white'>TagX Affiliate Setup</h1>
            </div>
            <div className='col-span-1 bg-white'>
              <div className='m-32 flex w-max flex-col space-y-4'>
                <TagX className='logo h-12 w-96 self-center' />
                <div className='m-32 flex w-96 flex-col space-y-8'>
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
          </div>
        </section>
      </main>
    </Layout>
  );
}
