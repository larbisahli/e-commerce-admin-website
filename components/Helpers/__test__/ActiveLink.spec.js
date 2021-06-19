/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect';

import { cleanup, render, screen } from '@testing-library/react';

import ActiveLink from '../ActiveLink';
export * from '@testing-library/react';

afterEach(cleanup);

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/store',
      pathname: '',
      query: '',
      asPath: '/store'
    };
  }
}));

describe('render ActiveLink:', () => {
  it('Has Href', () => {
    const { container } = render(
      <ActiveLink href={'/store'} activeClassName="selected">
        <a className="foo">
          <span>Store</span>
        </a>
      </ActiveLink>
    );
    const A_node = container.querySelector('A'); // === getByText('Store').closest('a')

    expect(A_node).toHaveAttribute('href', '/store');
  });

  it('Has `selected` className', () => {
    const { container } = render(
      <ActiveLink href={'/store'} activeClassName="selected">
        <a className="foo">
          <span>Store</span>
        </a>
      </ActiveLink>
    );

    const A_node = container.querySelector('A'); // === getByText('Store').closest('a')

    expect(A_node.classList.contains('foo')).toBe(true);
    expect(A_node).toHaveClass('selected');

    // console.log('===>', screen.getByText('Store'))
  });

  it('Has not `selected` className', () => {
    render(
      <ActiveLink href={'/about'} activeClassName="selected">
        <a className={'foo'}>
          <span>Store</span>
        </a>
      </ActiveLink>
    );
    expect(
      screen.getByText('Store').closest('a').classList.contains('foo')
    ).toBe(true);
    expect(screen.getByText('Store').closest('a')).not.toHaveClass('selected');
  });
});
