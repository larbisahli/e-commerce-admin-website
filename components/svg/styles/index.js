import styled, { css } from 'styled-components';
import { RelativePosition } from '@/styles/index';
// import { NavLinkContainer } from '@/containers/Navigation/styles';
// import { SubMenuItem } from '@/containers/Navigation/Menu/styles';

export const MenuburgerContainer = styled(RelativePosition)`
  display: inline-block;
  width: 17px;
  height: 15px;
  cursor: pointer;
  transition: 0.5s ease-in-out;
`;

const BurgerClosed = css`
  &:nth-child(1) {
    top: 0;
  }

  &:nth-child(2) {
    top: 5px;
  }

  &:nth-child(3) {
    top: 10px;
  }
`;

const BurgerOpened = css`
  &:nth-child(1) {
    top: 7px;
    width: 18px;
    transform: rotate(135deg);
  }

  &:nth-child(2) {
    left: -30px;
    top: 6px;
    opacity: 0;
  }

  &:nth-child(3) {
    top: 3px;
    width: 18px;
    transform: rotate(-135deg);
  }
`;
const XSpan = styled(RelativePosition)`
  display: block;
  left: 0;
  height: 2px;
  width: 100%;
  background: #f1f1f1;
  opacity: 1;
  transition: 0.25s all ease-in-out;
`;

export const BurgerXSpan = styled(XSpan)`
  ${(props) => {
    if (props.menuIsOpen) {
      return BurgerOpened;
    } else {
      return BurgerClosed;
    }
  }}
`;
// --------- Arrow -----------

const ArrowRotate = css`
  transform: rotate(-180deg);
  transition: transform 0.25s ease;
`;

const Arrow = styled(RelativePosition)`
  width: 14px;
  transform: rotate(0deg);
  transition: transform 0.25s ease;

  & > path {
    fill: currentColor;
    transition: fill 0.1s ease-out;

    /* ${NavLinkContainer}:hover & {
      fill: var(--nav-link-hover-fg) !important;
    } */
  }
`;

export const NavArrow = styled(Arrow)`
  ${(props) => props.Rotate && ArrowRotate}
`;

// -------------

export const G1 = styled.g`
  /* ${SubMenuItem}:hover & {
    fill: #000;
  } */
`;

export const G2 = styled.g`
  /* ${SubMenuItem}:hover & {
    fill: #000;
  } */
`;

export const ChevronSvg = styled.svg`
  transform: rotate(-90deg);
  ${(props) =>
    props.Rotate &&
    css`
      transform: rotate(90deg);
    `}
`;
