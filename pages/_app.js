import '../styles/tailwind.css';
import 'simplebar/dist/simplebar.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tabs/style/react-tabs.css';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { SWRConfig } from 'swr';

import { NavGuide } from '@/containers/index';
import { UserStoreProvider } from '@/context/UserStore';
import { fetcher } from '@/graphql/index';
import GlobalStyle from '@/styles/Globals';
import { PageContainer } from '@/styles/index';

function App({ Component, pageProps }) {
  const { asPath } = useRouter();

  const Notify = (Message, success) => {
    const Options = {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    };
    if (success) {
      toast.success(Message, Options);
    } else {
      toast.error(Message, Options);
    }
  };

  useEffect(() => {
    document.documentElement.lang = 'en';
  }, []);

  const onError = (error) => {
    // if (error.status !== 403 && error.status !== 404) {
    //   // We can send the error to Sentry,
    //   // or show a notification UI.
    // }
    const ErrorMessage = error?.response?.message;
    // const ErrorStatus = error?.response?.status
    Notify(ErrorMessage, false);
  };

  const onErrorRetry = (error, key, config, revalidate, { retryCount }) => {
    // Never retry on 404.
    if (error.status === 404) return;

    // Never retry for a specific key.
    if (key === '/api/user') return;

    // Only retry up to 5 times.
    if (retryCount >= 5) return;

    // Retry after 10 seconds.
    setTimeout(() => revalidate({ retryCount }), 10000);
  };

  return (
    <Fragment>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        className="text-sm"
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
      <GlobalStyle />
      <NextSeo nofollow={true} noindex={true} />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/static/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <SWRConfig value={{ onError, onErrorRetry, fetcher }}>
        <UserStoreProvider>
          {asPath !== '/' && <NavGuide />}
          <PageContainer id="page-container">
            <Component {...pageProps} />
          </PageContainer>
        </UserStoreProvider>
      </SWRConfig>
    </Fragment>
  );
}

App.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object
};

const FixNum = (num) => Number((num / 1000).toFixed(6));

export function reportWebVitals(metric) {
  switch (metric.name) {
    case 'FCP':
      console.log('First Contentful Paint (s): ', FixNum(metric.startTime));
      break;
    case 'LCP':
      console.log('Largest Contentful Paint (s): ', FixNum(metric.startTime));
      break;
    case 'CLS':
      console.log('Cumulative Layout Shift (s): ', FixNum(metric.startTime));
      break;
    case 'FID':
      console.log('First Input Delay (s): ', FixNum(metric.startTime));
      break;
    case 'TTFB':
      console.log('Time to First Byte (s): ', FixNum(metric.startTime));
      break;
    case 'Next.js-hydration':
      console.log('Next.js hydration (s): ', FixNum(metric.startTime));
      break;
    default:
      console.log(`${metric.name} (S)`, FixNum(metric.startTime));
      break;
  }
}

export default App;
