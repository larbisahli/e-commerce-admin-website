import styled, { css } from 'styled-components';

export const RelativePosition = styled.div`
  position: relative;
`;

export const AbsolutePosition = styled.div`
  position: absolute;
`;

export const DisFlex = styled.div`
  display: flex;
`;

export const DisFlex_AIC = styled.div`
  display: flex;
  align-items: center;
`;
export const DisFlex_JCC = styled.div`
  display: flex;
  justify-content: center;
`;
export const DisFlex_AIC_JCC = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// <------- CSS --------->

export const DisNone = css`
  display: none;
`;

// <----- Image ----->

export const Blur4 = css`
  filter: blur(4px);
`;

export const Blur0 = css`
  filter: blur(0px);
`;

export const Visible = css`
  visibility: visible;
`;

export const PageContainer = styled.div`
  font-size: 1rem;
  margin-top: 56px;
  overflow: hidden;
  margin-left: 240px;
  padding-top: 50px;
  display: none;
  position: relative;
  transition: margin-left 80ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;

  @media screen and (max-width: 1330px) {
    margin-left: 90px !important;
  }

  @media screen and (max-width: 800px) {
    margin-left: 0 !important;
    font-size: 0.9rem;
  }
`;
