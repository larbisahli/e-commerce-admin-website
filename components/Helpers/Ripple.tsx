import React from 'react';

import { RippleDiv, RippleStyle } from './styles';

export default function Ripple() {
  return (
    <RippleStyle>
      <RippleDiv></RippleDiv>
      <RippleDiv></RippleDiv>
      <RippleDiv></RippleDiv>
    </RippleStyle>
  );
}
