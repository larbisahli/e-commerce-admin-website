import styled from 'styled-components';
import { DisFlex_AIC_JCC } from '@/styles/index';
import { SpinSpinner } from '@/styles/keyframes';

export const Container = styled.div`
  background: #fafafa;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
`;

export const Wrapper = styled(DisFlex_AIC_JCC)`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 50%;
  position: absolute;
  flex-direction: column;

  .loader-container {
    position: relative;
  }

  .loader-wrapper {
    width: 100px;
    height: 102px;
    border-radius: 100%;
    position: absolute;
    top: 45%;
    left: calc(50% - 50px);
    animation: ${SpinSpinner} 5s infinite linear;
  }

  .circle {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .circle .inner {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: 5px solid rgba(0, 255, 170, 0.7);
    border-right: none;
    border-top: none;
    background-clip: padding;
    box-shadow: inset 0px 0px 10px rgba(0, 255, 170, 0.15);
    background: rgba(0, 255, 170, 0.008);
  }

  .circle:nth-of-type(0) {
    transform: rotate(0deg);
  }

  .circle:nth-of-type(0) .inner {
    animation: ${SpinSpinner} 2s infinite linear;
  }

  .circle:nth-of-type(1) {
    transform: rotate(70deg);
  }

  .circle:nth-of-type(1) .inner {
    animation: ${SpinSpinner} 2s infinite linear;
  }

  .circle:nth-of-type(2) {
    transform: rotate(140deg);
  }

  .circle:nth-of-type(2) .inner {
    animation: ${SpinSpinner} 2s infinite linear;
  }
`;
