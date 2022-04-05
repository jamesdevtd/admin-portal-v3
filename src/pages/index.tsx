import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';

export default function HomePage() {
  return (
    <Layout>
      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-row items-center justify-center gap-5 text-center'>
            <ButtonLink href='/login' className='mt-4 uppercase' variant='grey'>
              Login Demo
            </ButtonLink>
            <ButtonLink href='/signup' className='mt-4 uppercase'>
              Sign Up Demo
            </ButtonLink>
          </div>
        </section>
      </main>
    </Layout>
  );
}
