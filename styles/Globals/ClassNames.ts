import { css } from 'styled-components';

export const Gradients = css`
  .Meridian {
    background: #283c86;
    background: -webkit-linear-gradient(to right, #45a247, #283c86);
    background: linear-gradient(to right, #45a247, #283c86);
    background: linear-gradient(
      to right,
      rgba(69, 162, 71, 0.6),
      rgba(40, 60, 134, 0.6)
    );
  }

  .sexy-blue {
    background: #2193b0;
    background: -webkit-linear-gradient(to right, #6dd5ed, #2193b0);
    background: linear-gradient(to right, #6dd5ed, #2193b0);
  }

  .sakura {
    background: #d9a7c7;
    background: -webkit-linear-gradient(to left, #fffcdc, #d9a7c7);
    background: linear-gradient(to left, #fffcdc, #d9a7c7);
  }

  .Scooter {
    background: #36d1dc;
    background: -webkit-linear-gradient(to right, #5b86e5, #36d1dc);
    background: linear-gradient(to right, #5b86e5, #36d1dc);
  }

  .tranquil {
    background: #eecda3;
    background: -webkit-linear-gradient(to left, #ef629f, #eecda3);
    background: linear-gradient(to left, #ef629f, #eecda3);
  }

  .gradient-default {
    background: #ff7e5f;
    background: -webkit-linear-gradient(to left, #feb47b, #ff7e5f);
    background: linear-gradient(to left, #feb47b, #ff7e5f);
  }

  .honey-dew {
    background: #43c6ac;
    background: -webkit-linear-gradient(to right, #f8ffae, #43c6ac);
    background: linear-gradient(to right, #f8ffae, #43c6ac);
    background: linear-gradient(
      to right,
      rgba(248, 255, 174, 0.8),
      rgba(67, 198, 172, 0.8)
    );
  }
`;

export const Selectors = css`
  .selected {
    color: var(--orangy-100) !important;
  }

  .separator {
    width: 100%;
    height: 1px;
    margin-top: 8px;
    margin-bottom: 7px;
    background: #e6e6e6;
  }

  .menu-enter {
    opacity: 0;
    transform: translateY(20px);
  }

  .menu-enter-active {
    opacity: 1;
    transform: translateY(0px);
    transition: opacity 200ms, transform 200ms;
  }

  .menu-exit {
    opacity: 1;
  }

  .menu-exit-active {
    opacity: 0;
    transition: opacity 150ms;
    transform: translateY(0px);
    transition: opacity 200ms, transform 200ms;
  }

  .simplebar-scrollbar::before {
    background-color: #838383 !important;
  }

  .slide-removal {
    animation: scale-removal 400ms;

    @keyframes scale-removal {
      0% {
        transform: scale(1);
      }
      30% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(0);
      }
    }
  }

  .blur4 {
    filter: blur(4px);
  }

  .blur0 {
    filter: blur(0px);
  }

  .cart-img {
    border-radius: var(--cart-radius);
    transition: filter 100ms;
  }
`;
