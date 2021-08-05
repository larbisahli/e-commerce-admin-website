import styled from 'styled-components';
import { DisFlex_AIC_JCC } from '../index';
import { WavesMovement, LogInSpinner } from '@/styles/keyframes';

export const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: linear-gradient(
    60deg,
    rgba(36, 64, 99, 1) 0%,
    rgba(36, 64, 99, 1) 100%
  );

  .waves-container {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 10;
  }

  .footer {
    height: 40px;
    width: 100%;
    background: rgb(230, 230, 230);
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      font-size: 0.8em;
      color: #333;
    }

    .h-line {
      margin: 0px 10px;
      height: 16px;
      width: 1px;
      background: rgb(100, 100, 100);
    }
  }

  .waves {
    position: relative;
    width: 100%;
    height: 15vh;
    min-height: 100px;
    max-height: 150px;
  }

  .content {
    position: relative;
    height: 20vh;
    text-align: center;
    background-color: white;
  }

  .parallax > use {
    animation: ${WavesMovement} 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
  }
  .parallax > use:nth-child(1) {
    animation-delay: -2s;
    animation-duration: 7s;
  }
  .parallax > use:nth-child(2) {
    animation-delay: -3s;
    animation-duration: 10s;
  }
  .parallax > use:nth-child(3) {
    animation-delay: -4s;
    animation-duration: 13s;
  }
  .parallax > use:nth-child(4) {
    animation-delay: -5s;
    animation-duration: 20s;
  }
`;

export const FormContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1140px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const FormWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  display: flex;
  background: #ffffff;
  box-shadow: 0 0 3px #999999;
  height: 350px;
  border-radius: 3px;
  z-index: 99;

  .col-left,
  .col-right {
    padding: 30px;
    display: flex;
  }

  .col-left {
    width: 60%;
    clip-path: polygon(0 0, 0% 100%, 100% 0);
    background: #44c7f5;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  .col-right {
    padding: 20px;
    width: 50%;
    margin-left: -10%;
  }

  @media (max-width: 575.98px) {
    flex-direction: column;
    box-shadow: none;
    border-radius: 0;
    height: 100vh;

    .col-left,
    .col-right {
      width: 100%;
      margin: 0;
      clip-path: none;
      border-radius: 0;
    }

    .col-right {
      padding: 30px;
    }
  }

  .login-text {
    position: relative;
    width: 100%;
    color: #ffffff;
    /* color: #111; */
  }

  .login-text h2 {
    margin: 0 0 15px 0;
    font-size: 30px;
    font-weight: 700;
  }

  .login-text p {
    margin: 0 0 20px 0;
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    /* color: #333; */
  }

  .forget-pass {
    position: absolute;
    bottom: 0;
    color: #44c7f5;
    font-size: 0.7em;
    text-decoration: none;
    align-self: flex-start;
    margin-left: 20px;
    margin-bottom: 5px;
  }

  /* Loader */
`;

export const Form = styled(DisFlex_AIC_JCC)`
  flex-direction: column;
  width: 100%;
  height: 100%;

  h1 {
    font-size: 1.5em;
    font-weight: 700;
    color: #444;
    align-self: flex-start;
    margin-bottom: 5px;
  }

  span {
    font-size: 0.85em;
    margin-top: 10px;
    color: #777;
    align-self: flex-start;
  }

  .input {
    width: 100%;
    margin: 4px 0;
    padding: 10px;
    padding-left: 15px;
    font-size: 0.9em;
    letter-spacing: 0.15px;
    border: none;
    outline: none;
    font-family: 'Montserrat', sans-serif;
    background-color: #ecf0f3;
    transition: 0.25s ease;
    border-radius: 5px;
    box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;

    &:focus {
      box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9;
    }
  }

  button {
    position: relative;
    display: inline-block;
    width: 100%;
    margin-top: 5px;
    height: 30px;
    font-weight: 700;
    outline: none;
    font-size: 1em;
    letter-spacing: 1px;
    cursor: pointer;
    background: transparent;
    border: 1px solid #44c7f5;
    border-radius: 30px;
    box-shadow: inset 0 0 0 0 #44c7f5;
    transition: 0.3s;

    span {
      color: #44c7f5;
    }

    .spinner {
      display: block;
      width: 15px;
      height: 15px;
      position: absolute;
      border: 2px solid #44c7f5;
      border-top-color: rgba(255, 255, 255, 0.3);
      border-radius: 100%;
      top: 25%;
      left: 61%;
      animation: ${LogInSpinner} 0.6s infinite linear;
      transition: top 0.3s 0.3s ease, opacity 0.3s 0.3s ease,
        border-radius 0.3s ease;
      box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 575.98px) {
      .spinner {
        left: 56%;
      }
    }

    &:hover {
      box-shadow: inset 250px 0 0 0 #44c7f5;

      span {
        color: #ffffff;
      }
      .spinner {
        border: 2px solid #ffff;
        border-top-color: #44c7f5;
      }
    }
  }

  /* Radio btn */

  .checkbox-container {
    margin: 10px 0;
    font-size: 0.7em;
    align-self: flex-start;

    label {
      color: #777;
    }

    /* Base for label styling */
    [type='checkbox']:not(:checked),
    [type='checkbox']:checked {
      position: absolute;
      left: 0;
      opacity: 0.01;
    }
    [type='checkbox']:not(:checked) + label,
    [type='checkbox']:checked + label {
      position: relative;
      padding-left: 2.3em;
      font-size: 1.05em;
      line-height: 1.7;
      cursor: pointer;
    }

    /* checkbox aspect */
    [type='checkbox']:not(:checked) + label:before,
    [type='checkbox']:checked + label:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 1.5em;
      height: 1.5em;
      border: 1px solid #aaa;
      background-color: #ecf0f3;
      border-radius: 50%;
      transition: all 0.275s;
      box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
    }

    /* checked mark aspect */
    [type='checkbox']:not(:checked) + label:after,
    [type='checkbox']:checked + label:after {
      content: '';
      position: absolute;
      top: 3px;
      left: 3px;
      width: 1em;
      height: 1em;
      background: #01b7ff;
      border-radius: 50%;
      transition: all 0.2s;
    }

    /* checked mark aspect changes */
    [type='checkbox']:not(:checked) + label:after {
      opacity: 0;
      transform: scale(0) rotate(45deg);
    }

    [type='checkbox']:checked + label:after {
      opacity: 1;
      transform: scale(1) rotate(0);
    }

    /* Disabled checkbox */
    [type='checkbox']:disabled:not(:checked) + label:before,
    [type='checkbox']:disabled:checked + label:before {
      box-shadow: none;
      border-color: #bbb;
      background-color: #e9e9e9;
    }

    [type='checkbox']:disabled:checked + label:after {
      color: #777;
    }

    [type='checkbox']:disabled + label {
      color: #aaa;
    }

    /* Accessibility */
    [type='checkbox']:checked:focus + label:before,
    [type='checkbox']:not(:checked):focus + label:before {
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1),
        0 0 0 6px rgba(0, 183, 255, 0.2);
    }
  }
`;
