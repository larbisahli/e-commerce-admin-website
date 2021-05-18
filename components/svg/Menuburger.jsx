import React, { memo } from 'react';
import { MenuburgerContainer, BurgerXSpan } from './styles';
import PropTypes from 'prop-types';

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
