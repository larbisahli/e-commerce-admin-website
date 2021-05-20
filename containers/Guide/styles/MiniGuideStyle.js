import styled from 'styled-components';
import {
  DisFlex,
  DisFlex_AIC,
  DisFlex_AIC_JCC
} from '@/styles/index';

export const Container = styled(DisFlex)`
  position: fixed;
  left: 0;
  top: 56px;
  bottom: 0;
  font-size: 1.05em;
  background-color: var(--Navigation-bg);
  color: #222;
  padding: 10px 0;
  flex-direction: column;
  border-right: 1px solid #ddd;

  /* @media screen and (max-width: 810px) {
        display: none !important;
    } */
`;

export const LinkWrapper = styled(DisFlex_AIC_JCC)`
  flex-flow: column nowrap;
  margin-top: 4px;
  width: 80px;
  height: 80px;
  padding: 16px 0 14px;
  outline: 0;
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  &:hover {
    background: #e9e9e9c9;
  }

  &:active {
    background: #cececec9;
  }

  /* &--active {
            color: var(--guide-active-txt-color);
            background-color: var(--bgc-hover);
        } */
`;

export const IconContainer = styled(DisFlex_AIC)``;

export const TextContainer = styled(DisFlex)`
  padding-top: 5px;
  font-size:.8em;
  font-weight: 500;
`;
