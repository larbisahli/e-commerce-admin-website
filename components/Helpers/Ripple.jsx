import React from 'react';

import { RippleDiv, RippleStyle } from './styles';

const Ripple = () => {
  return (
    <RippleStyle>
      <RippleDiv></RippleDiv>
      <RippleDiv></RippleDiv>
      <RippleDiv></RippleDiv>
    </RippleStyle>
  );
};

export default Ripple;
