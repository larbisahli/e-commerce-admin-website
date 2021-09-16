import React, { Fragment, useEffect, useState } from 'react';

import { LoadingBar } from '@/components/index';
import { Guide, MiniGuide, Navbar } from '@/containers/index';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import type { GuideIState } from '@/interfaces/index';

const NavGuide = () => {
  const [GuideState, setGuideState] = useState<GuideIState>({
    show: false,
    mode: null
  });
  const [InitUseEffect, setInitUseEffect] = useState<boolean>(false);

  const MediaQueryMatches800 = useMediaQuery('max-width', 800);
  const MediaQueryMatches1330 = useMediaQuery('max-width', 1330);

  useEffect(() => {
    setInitUseEffect(true);
  }, []);

  useEffect(() => {
    const PageContainer = document.getElementById('page-container');
    if (GuideState.mode === 1) {
      // margin-left: 90px;
      PageContainer.style.marginLeft = '90px';
    } else if (GuideState.mode === 2) {
      // margin-left: 240px;
      PageContainer.style.marginLeft = '240px';
    }
  }, [GuideState.mode]);

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
      <LoadingBar setGuideState={setGuideState}></LoadingBar>
      <Navbar GuideState={GuideState} setGuideState={setGuideState} />
      <Guide GuideState={GuideState} setGuideState={setGuideState} />
      <MiniGuide GuideState={GuideState} />
    </Fragment>
  );
};

export default NavGuide;
