import React, { memo } from 'react';
import {
  Container
} from './styles/MiniGuideStyle';
import {DashboardSvg,DollarSvg,InvoiceSvg,BookmarkSvg} from '@/components/svg/index'
import ItemLink from './ItemLink'

const MiniGuide = () => {
  return (
    <Container>
        <ItemLink mode={1} href='/dashboard' label="Dashboard">
            <DashboardSvg width={24} height={24}/>
        </ItemLink>
        <ItemLink mode={1} href='/orders' label="Orders">
            <DollarSvg width={24} height={24}/>
        </ItemLink>
        <ItemLink mode={1} href='/invoices' label="Invoices">
            <InvoiceSvg width={24} height={24}/>
        </ItemLink>
        <ItemLink mode={1} href='/categories' label="Categories">
            <BookmarkSvg width={24} height={24}/>
        </ItemLink>
    </Container>
    )
};

export default memo(MiniGuide);
