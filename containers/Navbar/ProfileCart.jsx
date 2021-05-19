import React, { memo, forwardRef, useEffect } from 'react';
import {
    ProfileCartContainer
} from './styles';
import PropTypes from 'prop-types';

const ProfileCart = forwardRef(({setShowProfileDrop},ref) => {

  const handleClick = e => {
    const NotificationBtn = document.getElementById('profile-btn');
    if (ref.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    if(!NotificationBtn?.contains(e.target)) setShowProfileDrop(false) 
    };

    useEffect(() => {
        // add when mounted
        document.addEventListener("click", handleClick);
        // return function to be called when unmounted
        console.log('useEffect :>> ');
        return () => {
        document.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <ProfileCartContainer ref={ref} id="profile-drop"><span>Sign out</span></ProfileCartContainer>
    );
  });

ProfileCart.displayName = 'ProfileCart';

ProfileCart.propTypes = {
    setShowProfileDrop: PropTypes.func,
};


export default memo(ProfileCart)