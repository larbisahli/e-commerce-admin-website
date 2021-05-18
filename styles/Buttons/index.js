import styled from 'styled-components';

export const MenuBtn = styled.a`
  display: block;
  position: relative;
  box-sizing: border-box;
  margin-top: 17px;
  background: linear-gradient(
    to bottom,
    #cccccc33 0%,
    #cccccc33 4%,
    #d9d9d933 100%
  );
  color: #4c4c4c;
  height: 36px;
  padding: 0 10px;
  text-align: center;
  border-radius: 3px;
  cursor: pointer;
  user-select: none;
  text-transform: uppercase;
  box-shadow: 0 0 0 1px #00000040, 0 1px 3px #0000004d;
  font-weight: bold;
  line-height: 36px;
  border: none;
  text-decoration: none;
  transition: transform 0.2s ease-in-out 0s;
  transform: translateY(0);
  /*  */
  /* background-image: linear-gradient(#111, #111), linear-gradient(90deg, #ec6192, #ec4c34, #ffbd2b, #ebde56, #57c754, #53a1eb);
  padding: 1px;
  background-clip: content-box,border-box; */

  &:hover {
    transform: translateY(-1.5px);
    background: linear-gradient(
      to top,
      #cccccc8c 0%,
      #cccccc8c 4%,
      #d9d9d98c 100%
    );
    /* background-image: linear-gradient(
      to top,
      #cccccc8c 0%,
      #cccccc8c 4%,
      #d9d9d98c 100%
    ), linear-gradient(90deg, #ec6192, #ec4c34, #ffbd2b, #ebde56, #57c754, #53a1eb); */
  }
`;
