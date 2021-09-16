import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';

import { UserType } from '@/interfaces/index';
import { Notify } from '@/lib/Notify';
import {
  Container,
  Form,
  FormContainer,
  FormWrapper
} from '@/styles/Pages/index';

import { getAppCookies, verifyToken } from '../middleware/utils';

interface ResType {
  success: boolean;
  message: string;
  userInfo: UserType;
}

const HomePage = () => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const rememberMe = useRef<HTMLInputElement>(null);
  const Router = useRouter();

  const [Loading, setLoading] = useState<boolean>(false);

  const LogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const HostUrl =
      process.env.NODE_ENV === 'production'
        ? process.env.ADMIN_API_URL
        : 'http://127.0.0.1:5001';

    if (email.current.value && password.current.value) {
      try {
        const res = await fetch(`${HostUrl}/api/login`, {
          credentials: 'include',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            email: email.current.value,
            password: password.current.value,
            remember_me: rememberMe.current.checked
          })
        });

        const { success, message, userInfo }: ResType = await res.json();

        if (success) Router.push('/dashboard');

        const NotifyMessage = success
          ? `Welcome back ${userInfo?.first_name ?? ''} ${
              userInfo?.last_name ?? ''
            }`
          : message;

        Notify(NotifyMessage, success);
      } catch (err) {
        console.log('err :>> ', err);
      }
    }
    setLoading(false);
    email.current.value = '';
    password.current.value = '';
    rememberMe.current.checked = false;
  };

  return (
    <Container>
      <FormContainer>
        <FormWrapper>
          <Form as="form" onSubmit={LogIn}>
            <div className="form-login-header">Dropgala admin</div>
            <div className="login-form-wrapper">
              <span>
                Username or email address<span style={{ color: 'red' }}>*</span>
              </span>
              <input
                required
                className="input"
                name="email"
                type="email"
                placeholder="Email"
                ref={email}
                autoComplete="email"
              />
              <span>
                Password<span style={{ color: 'red' }}>*</span>
              </span>
              <input
                required
                className="input"
                name="password"
                type="password"
                placeholder="Password"
                ref={password}
              />
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  className="check-btn"
                  name="remember_me"
                  id="remember_me"
                  ref={rememberMe}
                />
                <label htmlFor="remember_me">Remember me</label>
              </div>
              <button>
                {Loading && <i className="spinner"></i>}
                <span>Log in</span>
              </button>
            </div>
            <div className="forget-pass">
              <Link href="/" passHref>
                <a>Forget Password?</a>
              </Link>
            </div>
          </Form>
        </FormWrapper>
      </FormContainer>
      {/* <!--Waves Container--> */}
      <div className="waves-container">
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(255,255,255,0.5)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(255,255,255,0.4)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(255,255,255,0.3)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="7"
              fill="rgb(230, 230, 230)"
            />
          </g>
        </svg>
        <div className="footer">
          <p>© dropgala 2021 All rights reserved</p>
          <span className="h-line"></span>
          <Link href="/" passHref>
            <a>
              <p>Contact Us</p>
            </a>
          </Link>
          <span className="h-line"></span>
          <Link href="/" passHref>
            <a>
              <p>Terms</p>
            </a>
          </Link>
          <span className="h-line"></span>
          <Link href="/" passHref>
            <a>
              <p>Privacy</p>
            </a>
          </Link>
        </div>
      </div>
      {/* <!--Waves end--> */}
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { token }: { token: string } = getAppCookies(context);
    const userInfo = verifyToken(token);

    if (userInfo) {
      return {
        redirect: {
          permanent: false,
          destination: '/dashboard'
        }
      };
    }

    return {
      props: {}
    };
  } catch (error) {
    console.log(`getServerSideProps error :>`, error);
    return {
      props: {
        error
      }
    };
  }
};

export default HomePage;
