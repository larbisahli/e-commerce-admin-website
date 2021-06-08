import React, { memo, forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import MenuTransition from './MenuTransition';

const EventDrop = forwardRef(({children, state, setState, btnId}, ref) => {
  const handleClick = (e) => {
    const NodeBtn = document.getElementById(btnId);

    if (ref?.current?.contains(e.target)) {
      // Inside click
      return;
    }
    // Close if Outside click except drop btn
    if (!NodeBtn?.contains(e.target)) setState(false)
  };

  useEffect(() => {
    // Add when mounted
    document.addEventListener('click', handleClick);
    // Return function to be called when unmounted
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
         <MenuTransition
            ref={ref}
            Show={state}
            unMount={true}
          >
              {children}
          </MenuTransition>
    
  );
});

EventDrop.displayName = 'EventDrop';

EventDrop.propTypes = {
  setState: PropTypes.func,
  state: PropTypes.bool,
  children: PropTypes.object,
  btnId: PropTypes.string
};

export default memo(EventDrop);
