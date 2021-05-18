import React, { memo, useEffect, useState, forwardRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

const MenuTransition = forwardRef(
  (
    {
      children,
      disTran = false,
      Show = false,
      onEnterFunc = () => void 0,
      onExitedFunc = () => void 0,
      unMount = false
    },
    ref
  ) => {
    const [disable, setdisable] = useState(false);

    useEffect(() => {
      if (disTran && Show) {
        setdisable(true);
      } else {
        setdisable(false);
      }
    }, [Show, disTran]);

    return (
      <CSSTransition
        nodeRef={ref}
        in={Show}
        timeout={disable ? 0 : 200}
        unmountOnExit={unMount}
        onEnter={onEnterFunc}
        onExited={onExitedFunc}
        classNames={{
          enter: 'menu-enter',
          enterActive: 'menu-enter-active',
          exist: 'menu-exit',
          exitActive: 'menu-exit-active'
        }}
      >
        {children}
      </CSSTransition>
    );
  }
);

MenuTransition.displayName = 'MenuTransition';

MenuTransition.propTypes = {
  disTran: PropTypes.bool,
  Show: PropTypes.bool,
  children: PropTypes.element.isRequired,
  onEnterFunc: PropTypes.func,
  onExitedFunc: PropTypes.func,
  unMount: PropTypes.bool
};

export default memo(MenuTransition);
