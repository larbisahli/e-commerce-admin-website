import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

import { LoadingBarContainer } from './styles';

const LoadingBar = () => {
  const Router = useRouter();
  const [Loading, setLoading] = useState<boolean>(false);
  const LoadingStateCache = useRef<boolean>(false);
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
  }, [Router.events]);

  return <LoadingBarContainer Show={Loading}></LoadingBarContainer>;
};

export default LoadingBar;
