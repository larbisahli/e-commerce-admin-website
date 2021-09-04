import React, { Fragment, memo, useCallback, useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';

import {
  AddSvg,
  BellSvg,
  CategorySvg,
  DashboardSvg,
  DollarSvg,
  InvoiceSvg,
  StoreSvg
} from '@/components/svg';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import type { GuideIState } from '@/interfaces/index';

import ItemLink from './ItemLink';
import { Bg, Container, ContentContainer, Wrapper } from './styles';

type Props = {
  GuideState: GuideIState;
  setGuideState: React.Dispatch<React.SetStateAction<GuideIState>>;
};

const Guide = ({ GuideState, setGuideState }: Props) => {
  const { mode, show } = GuideState;

  const [QueryMatches1330, setQueryMatches1330] = useState<boolean>(false);
  const MediaQueryMatchesMin1330 = useMediaQuery('min-width', 1330);
  const MediaQueryMatchesMax1330 = useMediaQuery('max-width', 1330);

  const HandleCloseGuide = useCallback(
    (event) => {
      const GuideContainer = document.getElementById('guide-container');
      if (GuideContainer?.isSameNode(event.target)) {
        GuideContainer?.removeEventListener('click', HandleCloseGuide);
        setGuideState((prev) => {
          return {
            show: false,
            mode: prev.mode
          };
        });
      }
    },
    [setGuideState]
  );

  useEffect(() => {
    const GuideContainer = document.getElementById('guide-container');
    const absWidth = window.innerWidth;
    if (mode === 1 && absWidth <= 1330 && show) {
      GuideContainer?.addEventListener('click', HandleCloseGuide);
    } else if (mode === 0 && show) {
      GuideContainer?.addEventListener('click', HandleCloseGuide);
    }
  }, [show, HandleCloseGuide, mode]);

  useEffect(() => {
    const absWidth = window.innerWidth;
    if (
      (MediaQueryMatchesMin1330 && !MediaQueryMatchesMax1330) ||
      absWidth >= 1330
    ) {
      setQueryMatches1330(true);
    } else {
      setQueryMatches1330(false);
    }
  }, [MediaQueryMatchesMin1330, MediaQueryMatchesMax1330]);

  return (
    <Fragment>
      <Bg Mode={mode} Show={show}></Bg>
      <Container
        id="guide-container"
        Mode={mode}
        Show={show}
        QueryMatches={QueryMatches1330}
      >
        <Wrapper>
          <ContentContainer>
            <SimpleBar
              style={{
                maxHeight: '100%',
                padding: '.9em 0 1.15em 0',
                overflowX: 'hidden'
              }}
              autoHide={true}
            >
              <ItemLink mode={2} href="/dashboard" label="Dashboard">
                <DashboardSvg width={20} height={20} />
              </ItemLink>
              <div className="line"></div>
              <ItemLink mode={2} href="/categories" label="Categories">
                <CategorySvg width={20} height={20} />
              </ItemLink>
              <ItemLink mode={2} href="/store" label="Store">
                <StoreSvg width={20} height={20} />
              </ItemLink>
              <ItemLink mode={2} href="/product/factory" label="New Product">
                <AddSvg width={20} height={20} />
              </ItemLink>
              <div className="line"></div>
              <ItemLink mode={2} href="/notifications" label="Notifications">
                <BellSvg width={20} height={20} />
                <span style={{ display: 'block' }} className="num-notify">
                  2
                </span>
              </ItemLink>
              <ItemLink mode={2} href="/orders" label="Orders">
                <DollarSvg width={20} height={20} />
                <span style={{ display: 'block' }} className="num-notify">
                  4
                </span>
              </ItemLink>
              <ItemLink mode={2} href="/invoices" label="Invoices">
                <InvoiceSvg width={20} height={20} />
              </ItemLink>
            </SimpleBar>
          </ContentContainer>
        </Wrapper>
      </Container>
    </Fragment>
  );
};

export default memo(Guide);
