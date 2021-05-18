import styled, { css } from 'styled-components';
import { LoadingBarProgress } from '@/styles/keyframes';

export const LoadingBarContainer = styled.div`
  display: none;
  height: 3px;
  background: #27c4f5
    linear-gradient(to right, #27c4f5, #a307ba, #fd8d32, #70c050, #27c4f5);
  background-size: 200%;
  animation: ${LoadingBarProgress} 1.5s linear infinite;
  transform-origin: left;
  width: 100%;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 12;

  ${(props) =>
    props.Show &&
    css`
      display: block;
    `}
`;
