import React, { memo } from 'react';

import { BurgerXSpan, MenuburgerContainer } from './styles';

type Props = {
  menuIsOpen: boolean;
};

const defaultProps = {
  menuIsOpen: false
};
function Menuburger({ menuIsOpen }: Props & typeof defaultProps) {
  return (
    <MenuburgerContainer>
      <BurgerXSpan menuIsOpen={menuIsOpen}></BurgerXSpan>
      <BurgerXSpan menuIsOpen={menuIsOpen}></BurgerXSpan>
      <BurgerXSpan menuIsOpen={menuIsOpen}></BurgerXSpan>
    </MenuburgerContainer>
  );
}

export default memo(Menuburger);
