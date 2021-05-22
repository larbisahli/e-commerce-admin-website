import styled from 'styled-components';
import {
  DisFlex,
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
  border-right: 1px solid var(--border-color);

  .svg-active{
    fill: #626262;
  }

  .svg-active-stroke{
      stroke: #626262;
    }

  .link-active{
    color: #000;
    background: #cececec9;

    &:hover {
        background: #cececec9;
      }

    .svg-active{
      fill: #70bb00 !important;
    }

    .svg-active-stroke{
      stroke: #70bb00 !important;
    }
  }

  /* @media screen and (max-width: 810px) {
        display: none !important;
    } */
`;