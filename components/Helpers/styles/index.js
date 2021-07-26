import styled from 'styled-components';

import { AbsolutePosition, RelativePosition } from '@/styles/index';
import { FadeOpacity, TransRipple } from '@/styles/keyframes';

export const RippleStyle = styled(RelativePosition)`
  width: 100%;
  height: 100%;
`;

export const RippleDiv = styled(AbsolutePosition)`
  top: 8px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #d8d8d8;
  animation: ${TransRipple} 0.25s ease alternate infinite;

  &:nth-child(1) {
    left: 8px;
  }

  &:nth-child(2) {
    left: 15px;
    animation-delay: 0.1s;
  }

  &:nth-child(3) {
    left: 22px;
    animation-delay: 0.2s;
  }
`;

export const AppleSpinner = styled(RelativePosition)`
  width: 45px;
  height: 45px;
  display: inline-block;
  margin-left: 50%;
  margin-right: 50%;
  padding: 10px;
`;

export const AppleSpinnerDiv = styled(AbsolutePosition)`
  width: 6%;
  height: 16%;
  background: #555;
  left: 49%;
  top: 43%;
  opacity: 0;
  border-radius: 50px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  animation: ${FadeOpacity} 1s linear infinite;
`;

export const Bar1 = styled(AppleSpinnerDiv)`
  transform: rotate(0deg) translate(0, -130%);
  animation-delay: 0s;
`;
export const Bar2 = styled(AppleSpinnerDiv)`
  transform: rotate(30deg) translate(0, -130%);
  animation-delay: -0.9167s;
`;
export const Bar3 = styled(AppleSpinnerDiv)`
  transform: rotate(60deg) translate(0, -130%);
  animation-delay: -0.833s;
`;
export const Bar4 = styled(AppleSpinnerDiv)`
  transform: rotate(90deg) translate(0, -130%);
  animation-delay: -0.7497s;
`;
export const Bar5 = styled(AppleSpinnerDiv)`
  transform: rotate(120deg) translate(0, -130%);
  animation-delay: -0.667s;
`;
export const Bar6 = styled(AppleSpinnerDiv)`
  transform: rotate(150deg) translate(0, -130%);
  animation-delay: -0.5837s;
`;
export const Bar7 = styled(AppleSpinnerDiv)`
  transform: rotate(180deg) translate(0, -130%);
  animation-delay: -0.5s;
`;
export const Bar8 = styled(AppleSpinnerDiv)`
  transform: rotate(210deg) translate(0, -130%);
  animation-delay: -0.4167s;
`;
export const Bar9 = styled(AppleSpinnerDiv)`
  transform: rotate(240deg) translate(0, -130%);
  animation-delay: -0.333s;
`;
export const Bar10 = styled(AppleSpinnerDiv)`
  transform: rotate(270deg) translate(0, -130%);
  animation-delay: -0.2497s;
`;
export const Bar11 = styled(AppleSpinnerDiv)`
  transform: rotate(300deg) translate(0, -130%);
  animation-delay: -0.167s;
`;
export const Bar12 = styled(AppleSpinnerDiv)`
  transform: rotate(330deg) translate(0, -130%);
  animation-delay: -0.0833s;
`;
