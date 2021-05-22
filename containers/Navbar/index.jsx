import React, { useState, useRef, memo } from 'react';
import {
  Nav,
  LeftContainer,
  RightContainer,
  MenuContainer,
  ProfileContainer,
  NotificationContainer,
  NotificationWrapper,
  ProfileWrapper
} from './styles';
import {BellSvg} from '@/components/svg';
import Image from 'next/image';
import { RippleEffect } from '@/components/index';
import { Menuburger } from '@/components/svg/index';
import { LoadingBar,MenuTransition } from '@/components/index';
import NotificationCart from './NotificationCart';
import ProfileCart from './ProfileCart';

const Navbar = () => {
  const ProfileDropNodeRef = useRef(null);
  const NotificationDropNodeRef = useRef(null);

  const [ShowNotificationDrop, setShowNotificationDrop] = useState(false);
  const [ShowProfileDrop, setShowProfileDrop] = useState(false);

  return (
    <Nav>
    <LoadingBar></LoadingBar>
      <LeftContainer>
        <MenuContainer>
          <div
            onClick={() => void 0}
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
        <span>{`dashboard`}</span>
      </LeftContainer>
      <RightContainer>
        <NotificationContainer>
        <div className="notify-container">
            <span>2</span>
          </div>
          <NotificationWrapper
            id="notification-btn"
            onClick={() => setShowNotificationDrop((prev) => !prev)}
          >
          
            <RippleEffect Style={{ padding: '8px', borderRadius: '50%' }}>
              <BellSvg width={24} height={24} isNav />
            </RippleEffect>
          </NotificationWrapper>
          <MenuTransition
            ref={NotificationDropNodeRef}
            Show={ShowNotificationDrop}
            unMount={true}
          >
            <NotificationCart
              ref={NotificationDropNodeRef}
              setShowNotificationDrop={setShowNotificationDrop}
            ></NotificationCart>
          </MenuTransition>
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
                  src="/images/profile.jpg"
                  width={40}
                  height={40}
                  quality={95}
                />
              </div>
              <span>{`Jane Doe`}</span>
            </ProfileWrapper>
          </RippleEffect>
          <MenuTransition ref={ProfileDropNodeRef} Show={ShowProfileDrop}>
            <ProfileCart
              setShowProfileDrop={setShowProfileDrop}
              ref={ProfileDropNodeRef}
            ></ProfileCart>
          </MenuTransition>
        </ProfileContainer>
      </RightContainer>
    </Nav>
  );
};

export default memo(Navbar);
