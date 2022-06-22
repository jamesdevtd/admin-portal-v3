
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from "next-auth/react"
import { Provider } from 'react-redux';

import '../styles/globals.scss';
import '../styles/styles.scss';

import GenericLoader from '@/components/layout/GenericLoader';

import { store } from '../app/store';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider
      // Provider options are not required but can be useful in situations where
      // you have a short session maxAge time. Shown here with default values.
      session={pageProps.session}
    >
      <Provider store={store}>
        <GenericLoader />
        <Head>
          <link
            rel='icon'
            href='/favicon/favicon-16x16.png'
            type='image/png'
            sizes='16x16'
          />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
          />
        </Head>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>

  );
}

export default MyApp;
