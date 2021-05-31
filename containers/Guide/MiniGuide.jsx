import React, { memo, useEffect, useState } from 'react';
import { Container } from './styles/MiniGuideStyle';
import {
  DashboardSvg,
  DollarSvg,
  InvoiceSvg,
  BookmarkSvg,
  BellSvg
} from '@/components/svg/index';
import ItemLink from './ItemLink';
import PropTypes from 'prop-types';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import dynamic from 'next/dynamic';

const SimpleBarReact = dynamic(() => import('simplebar-react'), {
  // eslint-disable-next-line react/display-name
  loading: () => <div></div>
});

const MiniGuide = ({ GuideState }) => {
  const { mode, show } = GuideState;

  const [QueryMatches1330, setQueryMatches1330] = useState(false);
  const MediaQueryMatchesMin1330 = useMediaQuery('min-width', 1330);
  const MediaQueryMatchesMax1330 = useMediaQuery('max-width', 1330);

  useEffect(() => {
    const absWidth = window.innerWidth
    if(MediaQueryMatchesMin1330  && !MediaQueryMatchesMax1330 || absWidth >= 1330){
      setQueryMatches1330(true)
    }else{
      setQueryMatches1330(false)
    }
  }, [MediaQueryMatchesMin1330, MediaQueryMatchesMax1330])

  return (
    <Container Mode={mode} Show={show} QueryMatches={QueryMatches1330}>
      <SimpleBarReact
              style={{ maxHeight: '100%', padding: '.9em 0 1.15em 0', overflowX: 'hidden' }}
              autoHide={true}
            >
        <ItemLink mode={1} href="/dashboard" label="Dashboard">
          <DashboardSvg width={24} height={24} />
        </ItemLink>
        <ItemLink mode={1} href="/categories" label="Categories">
          <BookmarkSvg width={24} height={24} />
        </ItemLink>
        <ItemLink mode={1} href="/notifications" label="Notifications">
          <BellSvg width={20} height={20} />
        </ItemLink>
        <ItemLink mode={1} href="/orders" label="Orders">
          <DollarSvg width={24} height={24} />
        </ItemLink>
        <ItemLink mode={1} href="/invoices" label="Invoices">
          <InvoiceSvg width={24} height={24} />
        </ItemLink>
      </SimpleBarReact>
    </Container>
  );
};

MiniGuide.propTypes = {
  GuideState: PropTypes.shape({
    show: PropTypes.bool,
    mode: PropTypes.number
  })
};

export default memo(MiniGuide);
