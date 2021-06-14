import React, { Fragment, useEffect } from 'react';
import GlobalStyle from '@/styles/Globals';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { NavGuide } from '@/containers/index';
import { PageContainer } from '@/styles/index';
import '../styles/tailwind.css';
import 'simplebar/dist/simplebar.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
function App({ Component, pageProps }) {
  const { asPath } = useRouter();

  useEffect(() => {
    document.documentElement.lang = 'en';
  }, []);

  return (
    <Fragment>
      <GlobalStyle />
      <NextSeo nofollow={true} noindex={true} />
      <Head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
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
      {asPath !== '/' && <NavGuide />}
      <PageContainer id="page-container">
        <Component {...pageProps} />
      </PageContainer>
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
