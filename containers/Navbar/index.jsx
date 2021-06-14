import React, { useState, useRef, memo } from 'react';
import { BellSvg } from '@/components/svg';
import Image from 'next/image';
import { RippleEffect } from '@/components/index';
import { Menuburger } from '@/components/svg/index';
import { LoadingBar, EventDrop } from '@/components/index';
import PropTypes from 'prop-types';
import NotificationEmpty from './NotificationEmpty';
import {
  Nav,
  LeftContainer,
  RightContainer,
  MenuContainer,
  ProfileContainer,
  NotificationContainer,
  NotificationWrapper,
  ProfileWrapper,
  NotificationCartContainer,
  NotificationCartWrap,
  ProfileCartContainer
} from './styles';

const Navbar = ({ setGuideState }) => {
  const ProfileDropNodeRef = useRef(null);
  const NotificationDropNodeRef = useRef(null);

  const [ShowNotificationDrop, setShowNotificationDrop] = useState(false);
  const [ShowProfileDrop, setShowProfileDrop] = useState(false);

  const HandleGuide = () => {
    setGuideState((prev) => {
      const absWidth = window.innerWidth;
      if (prev.mode === 2) {
        return {
          show: !prev.show,
          mode: prev.mode === 2 ? 1 : 2
        };
      } else if (prev.mode === 1 && absWidth >= 1330) {
        return {
          show: !prev.show,
          mode: 2
        };
      } else if (prev.mode === 1 && absWidth <= 1330) {
        return {
          show: !prev.show,
          mode: 1
        };
      } else if (prev.mode === 0) {
        return {
          show: !prev.show,
          mode: 0
        };
      }
      return prev;
    });
  };

  return (
    <Nav>
      <LoadingBar></LoadingBar>
      <LeftContainer>
        <MenuContainer>
          <div
            onClick={HandleGuide}
            role="button"
            tabIndex={0}
            onKeyDown={() => void 0}
            className="menu-btn"
          >
            <RippleEffect Style={{ padding: '10px', borderRadius: '3px' }}>
              <Menuburger menuIsOpen={false} />
            </RippleEffect>
          </div>
        </MenuContainer>
        <div className="page-title-container">
          <div className="ptc-slash"></div>
          {`dashboard`}
        </div>
      </LeftContainer>
      <RightContainer>
        <NotificationContainer>
          <div className="notify-container"></div>
          <NotificationWrapper
            id="notification-btn"
            onClick={() => setShowNotificationDrop((prev) => !prev)}
          >
            <RippleEffect Style={{ padding: '8px', borderRadius: '50%' }}>
              <BellSvg width={24} height={24} isNav={true} />
            </RippleEffect>
          </NotificationWrapper>
          {/* Start Notification DropDown */}
          <EventDrop
            ref={NotificationDropNodeRef}
            btnId="notification-btn"
            setState={setShowNotificationDrop}
            state={ShowNotificationDrop}
          >
            <NotificationCartContainer ref={NotificationDropNodeRef}>
              <NotificationCartWrap>
                <NotificationEmpty />
              </NotificationCartWrap>
            </NotificationCartContainer>
          </EventDrop>
          {/* End Notification DropDown */}
        </NotificationContainer>
        <ProfileContainer>
          <RippleEffect
            Id="profile-btn"
            onClick={() => setShowProfileDrop((prev) => !prev)}
            Style={{ margin: '0 1em 0 1em', borderRadius: '999px' }}
          >
            <ProfileWrapper>
              <div className="profile-img-wrap">
                <Image
                  src="/static/images/profile.jpg"
                  width={40}
                  height={40}
                  quality={95}
                />
              </div>
              <span>{`Jane Doe`}</span>
            </ProfileWrapper>
          </RippleEffect>
          {/* Start Profile DropDown */}
          <EventDrop
            ref={ProfileDropNodeRef}
            btnId="profile-btn"
            setState={setShowProfileDrop}
            state={ShowProfileDrop}
          >
            <ProfileCartContainer ref={ProfileDropNodeRef}>
              <span>Sign out</span>
            </ProfileCartContainer>
          </EventDrop>
          {/* End Profile DropDown */}
        </ProfileContainer>
      </RightContainer>
    </Nav>
  );
};

Navbar.propTypes = {
  setGuideState: PropTypes.func
};

export default memo(Navbar);
