import React, { useState, useEffect, useRef } from 'react';
import { LoadingBarContainer } from './styles';
import { useRouter } from 'next/router';

const LoadingBar = () => {
  const Router = useRouter();
  const [Loading, setLoading] = useState(false);
  const LoadingStateCache = useRef(false);
  LoadingStateCache.current = Loading;

  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      if (!LoadingStateCache.current) setLoading(true);
    });
    Router.events.on('routeChangeComplete', () => {
      if (LoadingStateCache.current) setLoading(false);
    });
    Router.events.on('routeChangeError', () => {
      if (LoadingStateCache.current) setLoading(false);
    });
    return () => {
      setLoading(false);
    };
  }, []);

  return <LoadingBarContainer Show={Loading}></LoadingBarContainer>;
};

export default LoadingBar;
