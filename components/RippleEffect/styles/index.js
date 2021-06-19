import styled from 'styled-components';

import { AbsolutePosition, RelativePosition } from '@/styles/index';
import { GoogleRipple } from '@/styles/keyframes';

export const GoogleRippleEffect = styled(RelativePosition)`
  &:active,
  &:focus {
    outline: none;
  }
  overflow: hidden;
  cursor: pointer;
  border-radius: 4px;
`;

export const GoogleRippleEffect_wrapper = styled(AbsolutePosition)`
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

export const GoogleRippleEffect_circle = styled.div.attrs((props) => {
  return {
    style: { top: `${props.y}px`, left: `${props.x}px` }
  };
})`
  position: absolute;
  border: 1px solid transparent;
  border-radius: 50%;
  pointer-events: none;
  animation: ${GoogleRipple} 0.4s;
  top: 0px;
  left: 0px;
  background: #ffffff46;
  background: #acaaaaa2;
  transition: all 0.14s linear;
`;
