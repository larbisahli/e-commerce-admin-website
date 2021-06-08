import PropTypes from 'prop-types';
import { IconContainer, TextContainer, LinkWrapper } from './styles';
import { ActiveLink } from '@/components/index';

const ItemLink = ({ href, label, children, mode }) => {
  return (
    <ActiveLink activeClassName="link-active" href={href} passHref>
      <LinkWrapper Mode={mode} as="a">
        <IconContainer Mode={mode}>{children}</IconContainer>
        <TextContainer Mode={mode}>{label}</TextContainer>
      </LinkWrapper>
    </ActiveLink>
  );
};

ItemLink.propTypes = {
  href: PropTypes.string,
  label: PropTypes.string,
  mode: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default ItemLink;
