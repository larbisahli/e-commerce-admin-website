import styled, { css } from 'styled-components';
import { DisFlex_AIC, DisFlex_AIC_JCC, DisFlex } from '@/styles/index';

export const Bg = styled.div`
  display: none;
  position: fixed;
  background-color: #00000057;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1;

  ${(props) => {
    if (props.Mode === 0) {
      if (props.Show) {
        return css`
          display: block !important;
        `;
      }
      return css`
        display: none !important;
      `;
    } else if (props.Mode === 1) {
      if (props.Show) {
        return css`
          display: block !important;
        `;
      }
      return css`
        display: none !important;
      `;
    }
  }}
`;

const MainContainer = styled.div`
  display: block;
  position: fixed;
  top: 56px;
  left: 0;
  bottom: 0;
  height: calc(100% - 56px);
  box-sizing: border-box;
  background-color: transparent;
  z-index: 5;
  width: fit-content;
  transition-property: transform;
  transition-duration: 250ms;
  transition-timing-function: ease-in-out;

  @media screen and (min-width: 1330px) {
    display: block;
  }

  @media screen and (max-width: 1330px) {
    display: none;
    width: 100%;
  }
`;

export const Container = styled(MainContainer)`
  ${(props) => {
    if (props.Mode === 0) {
      if (props.Show) {
        return css`
          display: block !important;
          transform: translateX(0%);
        `;
      }
      return css`
        display: block !important;
        transform: translateX(-100%);
      `;
    } else if (props.Mode === 1) {
      if (props.QueryMatches) {
        if (props.Show) {
          return css`
          display: block !important;
        `;
        }
        return css`
            display: none !important;
          `;
      } else {
        if (props.Show) {
          return css`
          display: block !important;
          transform: translateX(0%);
        `;
        }
        return css`
        display: block !important;
        transform: translateX(-100%);
      `;
      }
    }
    else if (props.Mode === 2) {
      if (props.Show) {
        return css`
          display: block !important;
        `;
      }
      return css`
        display: none !important;
      `;
    }
  }}
`;

export const Wrapper = styled(DisFlex)`
  position: absolute;
  flex-flow: column nowrap;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 3;
  outline: none;
  box-sizing: border-box !important;
  max-width: 240px;
  max-height: 100%;
  height: 100%;
  width: 240px;
  border-right: 1px solid var(--border-color);
  background-color: var(--Navigation-bg);
`;

export const ContentContainer = styled(DisFlex)`
  justify-content: flex-start;
  flex-flow: column nowrap;
  font-size: 0.88rem;
  padding-top: 10px;
  overflow: hidden;

  .line {
    margin: 10px 0;
    height: 0px !important;
    padding: .5px 0;
    background-color: var(--border-color);
  }

  .svg-active {
    fill: #626262;
  }

  .svg-active-stroke {
    stroke: #626262;
  }

  .link-active {
    color: var(--primary-fg);
    background: rgb(0 0 0 / 10%);

    &:hover {
      background: rgb(0 0 0 / 10%);
    }

    .svg-active {
      fill: var(--color-success-600) !important;
    }

    .svg-active-stroke {
      stroke: var(--color-success-600) !important;
    }
  }
`;

export const LinkWrapper = styled(DisFlex_AIC_JCC)`
  outline: 0;
  cursor: pointer;
  text-decoration: none;
  color: var(--secondary-fg);

  ${(props) => {
    if (props.Mode === 1) {
      return css`
        flex-flow: column nowrap;
        margin-top: 4px;
        width: 90px;
        height: 90px;
        padding: 16px 0 14px;
      `;
    } else {
      return css`
        padding: 8px 20px;
      `;
    }
  }}

  &:hover {
    background: #e9e9e9c9;
  }

  &:active {
    background: #cececec9;
  }
`;

export const IconContainer = styled(DisFlex_AIC)`
  width: 20px;
  height: 20px;

  ${(props) => {
    if (props.Mode === 2) {
      return css`
        margin-right: 24px;
      `;
    }
  }}
`;

export const TextContainer = styled(DisFlex)`
  text-transform: capitalize;
  letter-spacing: 0.8px;

  ${(props) => {
    if (props.Mode === 1) {
      return css`
        padding-top: 5px;
        font-size: 0.75em;
        font-weight: 500;
      `;
    } else {
      return css`
        flex: 1;
        font-size: 1.1em;
        ${'' /* background: red; */} 
      `;
    }
  }}
`;
