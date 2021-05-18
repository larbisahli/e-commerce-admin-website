import React, { useState, useRef } from 'react';
import {
  Nav,
  LeftContainer,
  RightContainer,
  ProfileContainer,
  NotificationContainer,
  NotificationCart,
  NotificationCartWrap,
  NotificationWrapper,
  ProfileCart,
  ProfileWrapper
} from './styles';
import BellSvg from '../../assets/svg/bell.svg';
import Image from 'next/image';
import { RippleEffect } from '@/components/index';
import { Menuburger } from '@/components/svg/index';
import { MenuTransition } from '@/components/index';
import NotificationEmpty from './NotificationEmpty';

const Navbar = ({}) => {
  const ProfileDropNodeRef = useRef(null);
  const NotificationDropNodeRef = useRef(null);

  const [ShowNotificationDrop, setShowNotificationDrop] = useState(false);
  const [ShowProfileDrop, setShowProfileDrop] = useState(false);

  const OnEnterNotification = () => {
    let NotifyNode = document.getElementById('notification-cart');
    if (NotifyNode) NotifyNode.style.display = 'block';
  };

  const OnExitNotification = () => {
    let NotifyNode = document.getElementById('notification-cart');
    if (NotifyNode) NotifyNode.style.display = 'none';
  };

  const HandleToggleNotificationEvent = (e) => {
    const target = e.target;
    const NotificationCart = document.getElementById('notification-cart');
    const NotificationBtn = document.getElementById('noti-btn');

    if (
      !NotificationCart?.contains(target) &&
      !NotificationBtn?.contains(target)
    ) {
      setShowNotificationDrop(false);
      document.removeEventListener('click', HandleToggleNotificationEvent);
    }
  };

  const HandleToggleNotification = () => {
    setShowNotificationDrop((prev) => !prev);
    document.addEventListener('click', HandleToggleNotificationEvent);
  };

  // --------- PROFILE AREA --------- //

  const OnEnterProfile = () => {
    let NotifyNode = document.getElementById('profile-drop');
    if (NotifyNode) NotifyNode.style.display = 'block';
  };

  const OnExitProfile = () => {
    let NotifyNode = document.getElementById('profile-drop');
    if (NotifyNode) NotifyNode.style.display = 'none';
  };

  const HandleToggleProfileEvent = (e) => {
    const target = e.target;
    const ProfileCart = document.getElementById('profile-drop');
    const ProfileBtn = document.getElementById('profile-btn');

    if (!ProfileCart?.contains(target) && !ProfileBtn?.contains(target)) {
      setShowProfileDrop(false);
      document.removeEventListener('click', HandleToggleProfileEvent);
    }
  };

  const HandleToggleProfile = () => {
    setShowProfileDrop((prev) => !prev);
    document.addEventListener('click', HandleToggleProfileEvent);
  };

  return (
    <Nav>
      <LeftContainer>
        {false && <Menuburger menuIsOpen={false} />}
        <span>{`dashboard`}</span>
      </LeftContainer>
      <RightContainer>
        <NotificationContainer>
          <NotificationWrapper id="noti-btn" onClick={HandleToggleNotification}>
            <RippleEffect Style={{ padding: '8px', borderRadius: '50%' }}>
              <BellSvg />
            </RippleEffect>
          </NotificationWrapper>
          <MenuTransition
            ref={NotificationDropNodeRef}
            Show={ShowNotificationDrop}
            onEnterFunc={OnEnterNotification}
            onExitedFunc={OnExitNotification}
          >
            <NotificationCart
              ref={NotificationDropNodeRef}
              id="notification-cart"
            >
              <NotificationCartWrap>
                {false ? (
                  <NotificationContent
                    setCartItems={setCartItems}
                    Results={cartItems}
                    IsMobile={IsMobile}
                  />
                ) : (
                  <NotificationEmpty />
                )}
              </NotificationCartWrap>
            </NotificationCart>
          </MenuTransition>
        </NotificationContainer>
        <ProfileContainer>
          <RippleEffect
            Id="profile-btn"
            onClick={HandleToggleProfile}
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
          <MenuTransition
            ref={ProfileDropNodeRef}
            Show={ShowProfileDrop}
            onEnterFunc={OnEnterProfile}
            onExitedFunc={OnExitProfile}
          >
            <ProfileCart ref={ProfileDropNodeRef} id="profile-drop">
              <span>Sign out</span>
            </ProfileCart>
          </MenuTransition>
        </ProfileContainer>
      </RightContainer>
    </Nav>
  );
};

const NotificationContent = () => {
  return <div></div>;
};

export default Navbar;
