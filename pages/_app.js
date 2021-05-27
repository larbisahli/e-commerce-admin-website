import React, { Fragment, useEffect, useState } from 'react';
import GlobalStyle from '@/styles/Globals';
import Head from 'next/head';
import PropTypes from 'prop-types';
import '../styles/tailwind.css';
import { Guide, MiniGuide, Navbar } from '@/containers/index';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { PageContainer } from '@/styles/index';
import 'simplebar/dist/simplebar.min.css';

function App({ Component, pageProps }) {
  const [GuideState, setGuideState] = useState({
    show: false,
    mode: null
  });

  const [InitUseEffect, setInitUseEffect] = useState(false)

  console.log(`GuideState`, GuideState);

  const MediaQueryMatches800 = useMediaQuery('max-width', 800);
  const MediaQueryMatches1330 = useMediaQuery('max-width', 1330);

  useEffect(() => {
    document.documentElement.lang = 'en';
    setInitUseEffect(true)
  }, []);

  useEffect(() => {
    // 800px >= mode: 1
    // 1330px >= mode: 2
    if (InitUseEffect) {
      let mode = 0;
      let show = false;

      if (MediaQueryMatches800 && !MediaQueryMatches1330) {
        mode = 0;
        show = false;
      }
      if (!MediaQueryMatches800 && MediaQueryMatches1330) {
        mode = 1;
        show = false;
      }
      if (!MediaQueryMatches800 && !MediaQueryMatches1330) {
        mode = 2;
        show = true;
      }

      setGuideState(() => {
        return {
          show,
          mode
        };
      });
    }
  }, [MediaQueryMatches800, MediaQueryMatches1330, InitUseEffect]);

  return (
    <Fragment>
      <GlobalStyle />
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
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#2d89ef" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Navbar setGuideState={setGuideState} />
      <Guide GuideState={GuideState} setGuideState={setGuideState} />
      <MiniGuide GuideState={GuideState} />
      <PageContainer Mode={GuideState.mode} Show={GuideState.show} id="page-container">
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
