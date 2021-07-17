/* eslint-disable react/prop-types */
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { Children } from 'react';

const ActiveLink = ({ children, activeClassName, includes, ...props }) => {
  const { asPath } = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || '';

  // eslint-disable-next-line no-useless-escape
  let re = new RegExp(`\\b${includes}\\b`, 'gi');

  const className =
    asPath === props.href || asPath === props.as || re.test(asPath)
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null
      })}
    </Link>
  );
};

ActiveLink.propTypes = {
  activeClassName: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};

export default ActiveLink;
