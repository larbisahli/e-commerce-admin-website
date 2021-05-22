import styled, { css } from 'styled-components';
import {
  AbsolutePosition,
  DisFlex_AIC,
  RelativePosition,
  DisFlex_AIC_JCC
} from '@/styles/index';

export const Nav = styled(DisFlex_AIC)`
  height: 56px;
  border-bottom: 1px solid var(--border-color);
  justify-content: space-between;
  background: var(--Navigation-bg);
  padding: 0.5rem 1em 0.5em 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  /* MEDIA */
`;

export const LeftContainer = styled(DisFlex_AIC)`
  span {
    color: #333;
    margin-left: 15px;
    font-size: 1.4em;
    font-weight: 500;
    letter-spacing: 0.5px;
    text-transform: capitalize;
  }
`;

export const MenuContainer = styled(DisFlex_AIC_JCC)`

  width:80px;
  height: 100%;
  
  .menu-btn {
    cursor: pointer;
    border: 1px solid #cfcfcfab;
    border-radius: 2px;

    &:hover {
      border: 1px solid #87be6dbe;
    }
  }
`

export const RightContainer = styled(DisFlex_AIC)``;

export const ProfileContainer = styled(RelativePosition)``;

export const ProfileWrapper = styled(DisFlex_AIC)`
  cursor: pointer;
  padding-right: 10px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  border-left: none;

  &:hover {
    border: 1px solid #87be6dbe;
    border-left: none;
    .profile-img-wrap {
      img {
        border: 1px solid #87be6dbe !important;
      }
    }
  }

  span {
    color: #333;
    margin-left: 8px;
    font-size: 0.93em;
    font-weight: 500;
  }

  .profile-img-wrap {
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    width: 40px;
    height: 40px;

    img {
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.08) !important;
    }
  }
`;

export const NotificationContainer = styled(RelativePosition)`
  .notify-container{
    display:block;
    position: absolute;
    align-self: flex-start;
    z-index: 3;
    margin: 2px 0 0 12px;
    right: 1px;
    color: #fff;
    width: 17px;
    height: 17px;
    border-radius: 50%;
    line-height: 17px;
    font-size: .7rem;
    font-weight: 600;
    text-align: center;
    cursor: pointer;
    background-color: #fa5252;
    box-shadow: 0 0 0 1px var(--Navigation-bg);
  }
`;

export const NotificationWrapper = styled.div`
  cursor: pointer;
  border: 1px solid #cfcfcfab;
  border-radius: 50%;

  &:hover {
    border: 1px solid #87be6dbe;
  }
`;

const NotificationCart_Container = styled(AbsolutePosition)`
  display: none;
  top: 50px;
  background: #fff;
  z-index: 100;
  right: 0;
  width: 300px;
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
    width: 12px;
    height: 12px;
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

export const NotificationCartContainer = styled(NotificationCart_Container)`
  ${(props) => props.isMobileMode && SRcAX}
`;

export const NotificationCartWrap = styled(RelativePosition)`
  z-index: 1;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  max-height: 452px;
  border-radius: 5px;

  ${(props) => {
    if (props.isMobileMode && !props.isMobile) {
      return css`
        max-height: calc(100vh - (56px + 69px)) !important;
      `;
    } else if (props.isMobileMode && props.isMobile) {
      return css`
        max-height: calc(100% - 69px) !important;
        ${'' /* // browser default navbar that has url */
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
  width: 440px;
  flex-direction: column;
  text-align: center;

  @media screen and (max-width: 735px) {
    width: 90%;
  }

  span {
    max-width: 50%;
    margin: 10px 0;
    font-size: 0.9em;
    line-height: 1.2em;
  }
`;

export const CartHeader = styled.div`
  font-weight: 500;
  text-transform: uppercase;
  color: var(--green-txt);
`;

export const ProfileCartContainer = styled(AbsolutePosition)`
  display: none;
  top: 50px;
  background: #fff;
  z-index: 100;
  left: 0;
  width: 100px;
  color: #4c4c4c;
  padding: 15px 8px 8px 8px;
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
    width: 12px;
    height: 12px;
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
