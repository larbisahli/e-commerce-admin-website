import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

import type { GuideIState } from '@/interfaces/index';

import { LoadingBarContainer } from './styles';

type Props = {
  setGuideState: React.Dispatch<React.SetStateAction<GuideIState>>;
};

const LoadingBar = ({ setGuideState }: Props) => {
  const Router = useRouter();
  const [Loading, setLoading] = useState<boolean>(false);
  const LoadingStateCache = useRef<boolean>(false);
  LoadingStateCache.current = Loading;

  const HandleGuide = () => {
    setGuideState((prev) => {
      const absWidth = window.innerWidth;
      if (prev.mode === 2) return prev;
      else if (prev.mode === 1 && absWidth >= 1330) return prev;
      else if (prev.mode === 1 && prev.show && absWidth <= 1330) {
        return {
          show: false,
          mode: 1
        };
      } else if (prev.mode === 0 && prev.show) {
        return {
          show: false,
          mode: 0
        };
      }
      return prev;
    });
  };

  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      if (!LoadingStateCache.current) setLoading(true);
    });
    Router.events.on('routeChangeComplete', () => {
      if (LoadingStateCache.current) {
        setLoading(false);
        HandleGuide();
      }
    });
    Router.events.on('routeChangeError', () => {
      if (LoadingStateCache.current) {
        setLoading(false);
        setGuideState((prev) => {
          return {
            show: false,
            mode: prev.mode
          };
        });
      }
    });
    return () => setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Router.events]);

  return <LoadingBarContainer Show={Loading}></LoadingBarContainer>;
};

export default LoadingBar;
