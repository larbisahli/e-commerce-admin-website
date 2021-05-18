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
  margin-top: 5em;
  width: 100%;
  flex: 1 0 auto;
  overflow: hidden;
  margin-right: auto;
  margin-left: auto;
  max-width: 1150px;

  /* background: red; */

  @media screen and (max-width: 1150px) {
    max-width: 95vw;
    font-size: 0.95rem;
  }

  @media screen and (max-width: 735px) {
    max-width: 100%;
    font-size: 0.88rem;
  }
`;
