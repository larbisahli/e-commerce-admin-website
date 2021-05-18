import { css } from 'styled-components';

export const ElementsCollection = css`
  * {
    margin: 0;
    border: 0;
    padding: 0;
    background-color: transparent;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    font-style: inherit;
    font-weight: inherit;
    line-height: inherit;
    box-sizing: border-box;
  }

  html,
  body {
    display: block !important;
    font-family: 'Lato', -apple-system, sans-serif, Segoe UI, Roboto, Helvetica;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    letter-spacing: 0;
    background: var(--general-bg);
  }

  p {
    display: block;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-height: none;
    max-width: 100%;
    border-radius: none;
  }

  mark {
    background: #ffed75;
    color: #000;
  }

  a,
  a:hover,
  a:focus,
  a:active {
    text-decoration: none;
    /* color: inherit; */
  }

  button {
    background: transparent;
    padding: 0;
    border: 0;
    cursor: pointer;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    transition: transform 0.2s ease-in-out 0s;
    transform: translateY(0);

    &:hover {
      transform: translateY(-1.5px);
      box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
        0 3px 6px rgba(0, 0, 0, 0.08);
    }
  }

  div {
    -webkit-tap-highlight-color: transparent;
  }

  svg {
    display: inline-block;
    vertical-align: middle;
    transform-origin: center;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
`;
