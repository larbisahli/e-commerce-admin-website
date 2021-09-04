/* eslint-disable react/prop-types */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Children, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  activeClassName: string;
  includes: string;
  passHref: boolean;
  href: string | undefined;
  ref?: any;
  as?: any;
};

export default function ActiveLink({
  children,
  activeClassName,
  includes,
  ...props
}: Props) {
  const { asPath } = useRouter();
  const child: boolean | {} | React.ReactChild | React.ReactPortal | any =
    Children.only(children);
  const childClassName = child?.props.className || '';

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
}
