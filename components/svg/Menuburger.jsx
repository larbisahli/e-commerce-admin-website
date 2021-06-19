import PropTypes from 'prop-types';
import React, { memo } from 'react';

import { BurgerXSpan, MenuburgerContainer } from './styles';

function Menuburger({ menuIsOpen }) {
  return (
    <MenuburgerContainer>
      <BurgerXSpan menuIsOpen={menuIsOpen}></BurgerXSpan>
      <BurgerXSpan menuIsOpen={menuIsOpen}></BurgerXSpan>
      <BurgerXSpan menuIsOpen={menuIsOpen}></BurgerXSpan>
    </MenuburgerContainer>
  );
}

Menuburger.propTypes = {
  menuIsOpen: PropTypes.bool
};

Menuburger.defaultProps = {
  menuIsOpen: false
};

export default memo(Menuburger);
