import React, { forwardRef, memo, ReactElement, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

type Props = {
  children: ReactElement;
  Id: string;
  Show: boolean;
  unMount: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

type DropProps = {
  children: ReactElement;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  Id: string;
};

const defaultProps = {
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
  ({ children, Id, Show, setShow, unMount }, ref) => {
    const Class: CN = {
      enter: 'menu-enter',
      enterActive: 'menu-enter-active',
      exist: 'menu-exit',
      exitActive: 'menu-exit-active'
    };

    useEffect(() => {
      const button = document.getElementById(Id);
      // button event listener
      button.addEventListener('click', () => setShow((prev) => !prev));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <CSSTransition
        nodeRef={ref}
        in={Show}
        timeout={200}
        unmountOnExit={unMount}
        // onEnter={() => current && (current.style.display = 'block')}
        // onExited={() => current && (current.style.display = 'none')}
        classNames={Class}
      >
        <EventDrop ref={ref} Id={Id} setShow={setShow}>
          {children}
        </EventDrop>
      </CSSTransition>
    );
  }
);

const EventDrop = memo(
  forwardRef<HTMLElement, DropProps>(({ children, setShow, Id }, ref) => {
    function handleClick(e: MouseEvent) {
      const NodeBtn = document.getElementById(Id);
      const { current }: any = ref;
      const target = e.target as Node;

      // Inside click
      if (current?.contains(target)) return;
      // Close if Outside click except drop btn
      if (!NodeBtn?.contains(target)) setShow(false);
    }

    useEffect(() => {
      // Add when mounted
      document.addEventListener('click', handleClick);
      // Return function to be called when unmounted
      return () => {
        document.removeEventListener('click', handleClick);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return children;
  })
);

EventDrop.displayName = 'EventDrop';
MenuTransition.displayName = 'MenuTransition';

export default memo(MenuTransition);
