import styled from 'styled-components';
import { DisFlex, DisFlex_AIC, DisFlex_AIC_JCC } from '../index';

export const HighlightsTextContainer = styled(DisFlex_AIC)`
  margin: 0 auto 0.8em auto;
  /* border-bottom: 1px solid #bfbfbf; */
  height: 32px;
  font-size: 1.05em;
  font-weight: 600;
  line-height: 1em;
  width: 99%;
  padding-bottom: 10px;

  span {
    width: max-content;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--dark-coffee);
  }
`;

export const HighlightsSvg = styled.div`
  margin-right: 8px;
`;

export const ExploreCarouselContainer = styled.div`
  margin: 50px auto 20px auto;
  width: 100%;
`;

export const ProductsListingContainer = styled.section`
  margin: 24px 0;
`;

export const ProductsListingWrapper = styled(DisFlex)`
  flex-flow: row wrap;
  padding: 0 16px;
  align-items: center;

  @media screen and (max-width: 935px) {
    justify-content: center;
  }
`;

export const ProductAdsContainer = styled.div`
  width: 100%;
  margin: 15px 0 25px 0;
`;

export const ViewMoreContainer = styled(DisFlex_AIC_JCC)`
  margin: 2em auto 3em auto;
  button {
    cursor: pointer;
    transition: background-color 0.25s ease-in-out;
    padding: 7px 16px;
    background-color: var(--general-bgc);
    border: 1px solid #a7a7a7;
    border-radius: 4px;
    font-weight: 500;
    line-height: 1.5;
    overflow: visible;
    text-transform: none;

    &:hover {
      background-color: #f0f1f1;
      transform: translateY(0);
      box-shadow: none;
    }
  }
`;
