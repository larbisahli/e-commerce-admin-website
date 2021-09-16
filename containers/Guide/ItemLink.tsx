import { ReactNode } from 'react';

import { ActiveLink } from '@/components/index';

import { IconContainer, LinkWrapper, TextContainer } from './styles';

type Props = {
  children: ReactNode | ReactNode[];
  href: string;
  label: string;
  mode: number;
};

const ItemLink = ({ children, href, label, mode }: Props) => {
  return (
    <ActiveLink
      activeClassName="link-active"
      includes={href.split('/')[1]}
      href={href}
      passHref
    >
      <LinkWrapper Mode={mode} as="a">
        <IconContainer Mode={mode}>{children}</IconContainer>
        <TextContainer Mode={mode}>{label}</TextContainer>
      </LinkWrapper>
    </ActiveLink>
  );
};

export default ItemLink;
