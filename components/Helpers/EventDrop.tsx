import React, { forwardRef, memo, ReactNode, useEffect } from 'react';

import MenuTransition from './MenuTransition';

type Props = {
  children: ReactNode;
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  btnId: string;
};

const EventDrop = forwardRef<HTMLElement, Props>(
  ({ children, state, setState, btnId }, ref) => {
    function handleClick() {
      const NodeBtn = document.getElementById(btnId);

      const { current }: any = ref;
      const { target } = this;

      if (target instanceof Node && current?.contains(target)) {
        // Inside click
        return;
      }
      // Close if Outside click except drop btn
      if (target instanceof Node && !NodeBtn?.contains(target)) setState(false);
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

    return (
      <MenuTransition ref={ref} Show={state} unMount={true} disTran={false}>
        {children}
      </MenuTransition>
    );
  }
);

EventDrop.displayName = 'EventDrop';

export default memo(EventDrop);
