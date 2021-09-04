import React, { memo, ReactNode, useCallback, useState } from 'react';

import {
  GoogleRippleEffect,
  GoogleRippleEffect_circle,
  GoogleRippleEffect_wrapper
} from './styles';

type Props = {
  children: ReactNode;
  onClick?: () => void;
  Style?: Object;
  Id?: string | null;
};

interface IState {
  y: number;
  x: number;
  show: boolean;
}

const RippleEffect = ({
  children,
  onClick = () => void 0,
  Style = {},
  Id = null
}: Props) => {
  const [{ y, x, show }, setRipple] = useState<IState>({
    y: 0,
    x: 0,
    show: false
  });

  const HandleRipple = useCallback((e) => {
    var rect = e.target.getBoundingClientRect();

    var offset = {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX
    };

    setRipple({
      y: e.pageY - offset.top,
      x: e.pageX - offset.left,
      show: true
    });

    setTimeout(() => {
      setRipple({
        y: 0,
        x: 0,
        show: false
      });
    }, 400);
  }, []);

  return (
    <GoogleRippleEffect
      id={Id}
      onMouseDown={HandleRipple}
      style={{ ...Style }}
      onClick={onClick}
    >
      <GoogleRippleEffect_wrapper>
        {show && <GoogleRippleEffect_circle x={x} y={y} />}
      </GoogleRippleEffect_wrapper>
      {React.Children.map(children, (child) => {
        const item = child as React.ReactElement;
        return React.cloneElement(item);
      })}
    </GoogleRippleEffect>
  );
};

export default memo(RippleEffect);
