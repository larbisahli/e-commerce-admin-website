import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { memo, useContext, useRef, useState } from 'react';

import { MenuTransition, RippleEffect } from '@/components/index';
import { BellSvg } from '@/components/svg';
import { Menuburger } from '@/components/svg/index';
import { UserStoreContext } from '@/context/UserStore';
import type { GuideIState } from '@/interfaces/index';

import NotificationEmpty from './NotificationEmpty';
import {
  LeftContainer,
  MenuContainer,
  Nav,
  NotificationCartContainer,
  NotificationCartWrap,
  NotificationContainer,
  NotificationWrapper,
  ProfileCartContainer,
  ProfileContainer,
  ProfileWrapper,
  RightContainer
} from './styles';

type Props = {
  GuideState: {
    show: boolean;
    mode: number;
  };
  setGuideState: React.Dispatch<React.SetStateAction<GuideIState>>;
};

const Navbar = ({ GuideState, setGuideState }: Props) => {
  const { asPath } = useRouter();

  const ProfileDropNodeRef = useRef<HTMLDivElement>(null);
  const NotificationDropNodeRef = useRef<HTMLDivElement>(null);

  const { UserStore } = useContext(UserStoreContext);

  const [ShowNotificationDrop, setShowNotificationDrop] =
    useState<boolean>(false);
  const [ShowProfileDrop, setShowProfileDrop] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<boolean>(false);

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
              <Menuburger
                menuIsOpen={
                  (GuideState.mode === 1 || GuideState.mode === 0) &&
                  GuideState.show
                }
              />
            </RippleEffect>
          </div>
        </MenuContainer>
        <div className="page-title-container">
          <div className="ptc-slash"></div>
          {asPath.split('/')[1].split('?')[0]}
        </div>
      </LeftContainer>
      <RightContainer>
        <NotificationContainer>
          <div className="notify-container"></div>
          <NotificationWrapper id="notification-btn">
            <RippleEffect Style={{ padding: '8px', borderRadius: '50%' }}>
              <BellSvg width={24} height={24} fill="#f1f1f1" />
            </RippleEffect>
          </NotificationWrapper>
          {/* Start Notification DropDown */}
          <MenuTransition
            ref={NotificationDropNodeRef}
            Show={ShowNotificationDrop}
            unMount={true}
            setShow={setShowNotificationDrop}
            Id="notification-btn"
          >
            <NotificationCartContainer ref={NotificationDropNodeRef}>
              <NotificationCartWrap>
                <NotificationEmpty />
              </NotificationCartWrap>
            </NotificationCartContainer>
          </MenuTransition>
          {/* End Notification DropDown */}
        </NotificationContainer>
        <ProfileContainer>
          <RippleEffect
            Id="profile-btn"
            Style={{ margin: '0 1em 0 1em', borderRadius: '999px' }}
          >
            <ProfileWrapper>
              <div className="profile-img-wrap">
                <Image
                  src={
                    imgSrc
                      ? '/static/images/avatar.png'
                      : `${process.env.MEDIA_URL}${
                          UserStore?.profile_img ?? '/'
                        }`
                  }
                  onError={() => {
                    setImgSrc(true);
                  }}
                  width={40}
                  height={40}
                  alt=""
                  quality={95}
                />
              </div>
              <span>{UserStore?.username ?? ''}</span>
            </ProfileWrapper>
          </RippleEffect>
          {/* Start Profile DropDown */}
          <MenuTransition
            ref={ProfileDropNodeRef}
            Show={ShowProfileDrop}
            unMount={true}
            setShow={setShowProfileDrop}
            Id="profile-btn"
          >
            <ProfileCartContainer ref={ProfileDropNodeRef}>
              <span>Sign out</span>
            </ProfileCartContainer>
          </MenuTransition>
          {/* End Profile DropDown */}
        </ProfileContainer>
      </RightContainer>
    </Nav>
  );
};

export default memo(Navbar);
