import React, { memo, forwardRef, useEffect } from 'react';
import { NotificationCartContainer, NotificationCartWrap } from './styles';
import NotificationEmpty from './NotificationEmpty';
import PropTypes from 'prop-types';

const NotificationCart = forwardRef(({ setShowNotificationDrop }, ref) => {
  const handleClick = (e) => {
    const NotificationBtn = document.getElementById('notification-btn');
    if (ref.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    if (!NotificationBtn?.contains(e.target)) setShowNotificationDrop(false);
  };

  useEffect(() => {
    // add when mounted
    document.addEventListener('click', handleClick);
    // return function to be called when unmounted
    console.log('useEffect :>> ');
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const HasContent = false;
  return (
    <NotificationCartContainer ref={ref} id="notification-cart">
      <NotificationCartWrap>
        {HasContent ? <NotificationContent /> : <NotificationEmpty />}
      </NotificationCartWrap>
    </NotificationCartContainer>
  );
});

const NotificationContent = () => {
  return <div></div>;
};

NotificationCart.displayName = 'NotificationCart';

NotificationCart.propTypes = {
  setShowNotificationDrop: PropTypes.func
};

export default memo(NotificationCart);
