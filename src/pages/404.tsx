import * as React from 'react';
import { MdOutlineSportsRugby } from 'react-icons/md';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';

export default function NotFoundPage() {
  return (
    <Layout>
      <Seo templateTitle='Not Found' />

      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
            <MdOutlineSportsRugby
              size={60}
              className='drop-shadow-glow animate-flicker text-sky-500'
            />
            <h1 className='mt-8 text-4xl text-sky-500 md:text-6xl'>
              To play Rugby, <br />
              you need 3 things <br />A good pass, <br />A good tackle and
              <br />A damn good excuse.
            </h1>
            <ArrowLink className='mt-4 md:text-lg' href='/'>
              So until we come up with an excuse for sending you here,
              let&apos;s head back home.
            </ArrowLink>
          </div>
        </section>
      </main>
    </Layout>
  );
}
