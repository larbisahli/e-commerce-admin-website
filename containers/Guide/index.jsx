import React, { memo, Fragment } from 'react';
import {Container, Bg, Wrapper, ContentContainer} from './styles'
import ItemLink from './ItemLink'
import {DashboardSvg,DollarSvg,InvoiceSvg,BookmarkSvg,BellSvg} from '@/components/svg/index'
import dynamic from 'next/dynamic';
import 'simplebar/dist/simplebar.min.css';

const SimpleBarReact = dynamic(() => import('simplebar-react'), {
  // eslint-disable-next-line react/display-name
  loading: () => <div></div>
});

// mode:0 < 735px
// mode:1 > 735px < 1500px
// node:2 > 1500px

const Guide = () => {
  return (
    <Fragment>
      <Bg></Bg>
      <Container>
        <Wrapper>
          <ContentContainer>
          <SimpleBarReact
                style={{ maxHeight: '100%', padding: '.9em 0 1.15em 0' }}
                autoHide={true} >
              <ItemLink mode={2} href='/dashboard' label="Dashboard">
                  <DashboardSvg width={20} height={20}/>
              </ItemLink>
              <ItemLink mode={2} href='/orders' label="Orders">
                  <DollarSvg width={20} height={20}/>
              </ItemLink>
              <ItemLink mode={2} href='/invoices' label="Invoices">
                  <InvoiceSvg width={20} height={20}/>
              </ItemLink>
              <ItemLink mode={2} href='/categories' label="Categories">
                  <BookmarkSvg width={20} height={20}/>
              </ItemLink>
              <ItemLink mode={2} href='/notifications' label="Notifications">
                  <BellSvg width={20} height={20}/>
              </ItemLink>
              {/* <div className="line"></div> */}
            </SimpleBarReact>
          </ContentContainer>
        </Wrapper>
      </Container>
    </Fragment>
    );
};

export default memo(Guide);
