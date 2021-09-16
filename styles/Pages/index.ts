import styled from 'styled-components';

import { WavesMovement } from '@/styles/keyframes';

import { DisFlex_AIC_JCC } from '../index';

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
  width: 100%;
  max-width: 600px;
  display: flex;
  background: #ffffff;
  border: 1px solid #eee;
  box-shadow: 0 0 3px #999999;
  height: 350px;
  border-radius: 2px;
  z-index: 99;

  .login-form-wrapper {
    margin: 20px auto;
    width: 90%;
  }

  .form-login-header {
    margin: 10px auto;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
    font-size: 1.5em;
    color: #222;
    margin-bottom: 5px;
    text-transform: uppercase;
    width: 90%;
  }

  @media (max-width: 575.98px) {
    flex-direction: column;
    box-shadow: none;
    border-radius: 0;
    height: 100vh;
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
    color: #44c7f5;
    font-size: 0.7em;
    text-decoration: none;
    align-self: flex-start;
    margin-top: 15px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    padding-left: 10px;
    padding-bottom: 10px;
  }

  /* Loader */
`;

export const Form = styled(DisFlex_AIC_JCC)`
  flex-direction: column;
  width: 100%;
  height: 100%;

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
    border-radius: 4px;
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
      transition: top 0.3s 0.3s ease, opacity 0.3s 0.3s ease,
        border-radius 0.3s ease;
      box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2);
    }

    &:hover {
      box-shadow: inset 10px 0 0 0 #44c7f5;
    }
  }

  /* Radio btn */

  .checkbox-container {
    margin: 10px 0;
    font-size: 0.7em;
    align-self: flex-start;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    label {
      color: #777;
      padding-left: 5px;
    }
  }
`;
