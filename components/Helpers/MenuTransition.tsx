import React, { forwardRef, memo, ReactNode, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

type Props = {
  children: ReactNode;
  disTran?: boolean;
  Show: boolean;
  unMount: boolean;
};

const defaultProps = {
  disTran: false,
  Show: false,
  unMount: false
};

interface CN {
  enter: string;
  enterActive: string;
  exist: string;
  exitActive: string;
}

const MenuTransition = forwardRef<HTMLElement, Props & typeof defaultProps>(
  ({ children, disTran, Show, unMount }, ref) => {
    const [disable, setdisable] = useState<boolean>(false);

    useEffect(() => {
      if (disTran && Show) {
        setdisable(true);
      } else {
        setdisable(false);
      }
    }, [Show, disTran]);

    const { current }: any = ref;

    const Class: CN = {
      enter: 'menu-enter',
      enterActive: 'menu-enter-active',
      exist: 'menu-exit',
      exitActive: 'menu-exit-active'
    };

    return (
      <CSSTransition
        nodeRef={ref}
        in={Show}
        timeout={disable ? 0 : 200}
        unmountOnExit={unMount}
        onEnter={() => current && (current.style.display = 'block')}
        onExited={() => current && (current.style.display = 'none')}
        classNames={Class}
      >
        {children}
      </CSSTransition>
    );
  }
);

MenuTransition.displayName = 'MenuTransition';

export default memo(MenuTransition);
