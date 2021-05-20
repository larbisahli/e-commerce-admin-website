import React, { memo } from 'react';
import {
  Container,
  IconContainer,
  TextContainer,
  LinkWrapper
} from './styles/MiniGuideStyle';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {DashboardSvg,DollarSvg,InvoiceSvg,BookmarkSvg} from '@/components/svg/index'

const MiniGuide = () => {
  return (
    <Container>
        <ItemLink href='/' label="Dashboard">
            <DashboardSvg width={24} height={24}/>
        </ItemLink>
        <ItemLink href='/' label="Orders">
            <DollarSvg width={24} height={24}/>
        </ItemLink>
        <ItemLink href='/' label="Invoices">
            <InvoiceSvg width={24} height={24}/>
        </ItemLink>
        <ItemLink href='/' label="Categories">
            <BookmarkSvg width={24} height={24}/>
        </ItemLink>
    </Container>
    )
};

const ItemLink = ({ href, label, children }) => {
  return (
        <Link href={href} passHref>
            <LinkWrapper as="a">
                <IconContainer>{children}</IconContainer>
                <TextContainer>{label}</TextContainer>
            </LinkWrapper>
        </Link>
    )
};

ItemLink.propTypes = {
  href: PropTypes.string,
  label: PropTypes.func,
  children: PropTypes.elementType
};

export default memo(MiniGuide);
