import { MutableRefObject } from 'react';
import styled, { css } from 'styled-components';

import {
  AbsolutePosition,
  DisFlex_AIC,
  DisFlex_AIC_JCC,
  RelativePosition
} from '@/styles/index';
import { NotificationPulse } from '@/styles/keyframes';

export const Nav = styled(DisFlex_AIC)`
  height: 56px;
  border-bottom: 1px solid var(--guide-border-color);
  justify-content: space-between;
  background: var(--Navigation-bg);
  padding: 0.5em 1em 0.5em 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;
  font-size: 1em;

  @media screen and (max-width: 1330px) {
    font-size: 0.85em;
  }

  @media screen and (max-width: 800px) {
    font-size: 0.7em;
    padding: 0;
  }
`;

export const LeftContainer = styled(DisFlex_AIC)`
  .page-title-container {
    color: #f1f1f1;
    margin-left: 0.938em;
    font-size: 1.4em;
    font-weight: 500;
    letter-spacing: 0.5px;
    text-transform: capitalize;
    display: flex;
    align-items: center;

    .ptc-slash {
      margin-right: 5px;
      height: 25px;
      border-radius: 10px;
      width: 2px;
      background: #888;
    }

    @media screen and (max-width: 800px) {
      margin-left: 0;
    }
  }
`;

export const MenuContainer = styled(DisFlex_AIC_JCC)`
  width: 5.625em;
  height: 100%;

  .menu-btn {
    cursor: pointer;
    border: 1px solid var(--nav-border-color);
    border-radius: 3px;

    &:hover {
      border: 1px solid #87be6dbe;
    }
  }
`;

export const RightContainer = styled(DisFlex_AIC)``;

export const ProfileContainer = styled(RelativePosition)``;

export const ProfileWrapper = styled(DisFlex_AIC)`
  cursor: pointer;
  border-radius: 999px;
  border: 1px solid var(--nav-border-color);
  padding: 0.125em;
  padding-right: 0.938em;

  &:hover {
    border: 1px solid #87be6dbe;
  }

  span {
    color: #f1f1f1;
    margin-left: 0.5;
    font-size: 0.93em;
    font-weight: 500;
    padding: 0 5px;
  }

  .profile-img-wrap {
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;

    img {
      border-radius: 50%;
      width: 2.5em;
      height: 2.5em;
    }
  }
`;

export const NotificationContainer = styled(RelativePosition)`
  .notify-container {
    background: rgba(255, 82, 82, 1);
    position: absolute;
    right: 8px;
    top: 8px;
    z-index: 5;
    border-radius: 50%;
    height: 9px;
    width: 9px;
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 82, 82, 1);
    animation: ${NotificationPulse} 2s infinite;
    border: 1px solid #000;
  }
`;

export const NotificationWrapper = styled.div`
  cursor: pointer;
  border: 1px solid var(--nav-border-color);
  border-radius: 50%;

  &:hover {
    border: 1px solid #87be6dbe;
  }

  .svg-bell-responsive {
    width: 1.5em;
    height: 1.5em;
  }
`;

const NotificationCart_Container = styled(AbsolutePosition)`
  display: block;
  top: 50px;
  background: #fff;
  z-index: 100;
  right: 0;
  width: 18.75em;
  color: #4c4c4c;
  border: 1px solid #9bbad3a4;
  border-radius: 4px;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    height: 100%;
    width: 100%;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08),
      0px 0px 15px 5px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  &::after {
    content: '';
    position: absolute;
    width: 0.75em;
    height: 0.75em;
    background: #fff;
    border-top-left-radius: 2px;
    z-index: 0;
    transform: translateX(-50%) translateY(-45%) rotate(45deg);
    top: 0;
    right: 3%;
    box-shadow: -1px -1px 1px 0px #9bbad3a4;
  }
`;

const SRcAX = css`
  position: fixed;
  top: 56px;
  right: 0;
  left: 0;
  bottom: 0;
  margin-top: 0;
  width: 100%;
`;

interface NCCType {
  isMobileMode?: boolean;
  ref?: MutableRefObject<HTMLDivElement>;
}

export const NotificationCartContainer = styled(
  NotificationCart_Container
)<NCCType>`
  ${(props) => props.isMobileMode && SRcAX}
`;

interface NCWType {
  isMobileMode?: boolean;
  isMobile?: boolean;
}

export const NotificationCartWrap = styled(RelativePosition)<NCWType>`
  z-index: 1;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  max-height: 28.25em;
  border-radius: 5px;

  ${(props) => {
    if (props.isMobileMode && !props.isMobile) {
      return css`
        max-height: calc(100vh - (56px + 69px)) !important;
      `;
    } else if (props.isMobileMode && props.isMobile) {
      return css`
        max-height: calc(100% - 4.313em) !important;
        ${
          '' /* // browser default navbar that has url */
        }/* max-height: calc(100vh - (2*56px + 69px)) !important; */
      `;
    }
  }}
`;

export const NoResultsContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 370px;
  background: #fff;
  border-radius: 5px;
`;

export const NoResultsWrapper = styled(DisFlex_AIC_JCC)`
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  color: gray;
  transform: translate(-50%, -50%);
  width: 27.5em;
  flex-direction: column;
  text-align: center;

  @media screen and (max-width: 735px) {
    width: 90%;
  }

  span {
    max-width: 50%;
    margin: 0.625em 0;
    font-size: 0.9em;
    line-height: 1.2em;
  }
`;

export const CartHeader = styled.div`
  font-weight: 500;
  text-transform: uppercase;
  color: var(--green-txt);
`;

interface PCCType {
  ref?: MutableRefObject<HTMLDivElement>;
}

export const ProfileCartContainer = styled(AbsolutePosition)<PCCType>`
  display: block;
  top: 50px;
  background: #fff;
  z-index: 100;
  left: 0;
  width: 6.25em;
  color: #4c4c4c;
  padding: 0.625em 0.5em 0.5em 0.5em;
  border: 1px solid #9bbad3a4;
  border-radius: 4px;
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    height: 100%;
    width: 100%;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08),
      0px 0px 15px 5px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  &::after {
    content: '';
    position: absolute;
    width: 0.75em;
    height: 0.75em;
    background: #fff;
    border-top-left-radius: 2px;
    z-index: 0;
    transform: translateX(-50%) translateY(-45%) rotate(45deg);
    top: 0;
    right: 3%;
    box-shadow: -1px -1px 1px 0px #9bbad3a4;
  }

  span {
  }
`;
