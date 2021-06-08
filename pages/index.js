import React, { useState, useRef } from 'react';
import { PageLoading } from '@/containers/index';
import { useRouter } from 'next/router';
import { getAppCookies, verifyToken } from '../middleware/utils';
import {
  Container,
  FormContainer,
  FormWrapper,
  Form
} from '@/styles/Pages/index';

const Home = () => {
  const email = useRef(null);
  const password = useRef(null);
  const rememberMe = useRef(null);
  const Router = useRouter();

  const [Loading, setLoading] = useState(false);

  const LogIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    const HostUrl =
      process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

    if (email.current.value && password.current.value) {
      try {
        const res = await fetch(`${HostUrl}/api/login`, {
          withCredentials: true,
          credentials: 'include',
          body: JSON.stringify({
            email: email.current.value,
            password: password.current.value
          }),
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        });

        const { message, success, token } = await res.json();

        if (success && token) {
          // setInfoMessage(() => {
          //   return {
          //     msg:
          //       'Successfully logged in, you will be redirected to the admin dashboard.',
          //     show: true,
          //     isError: false,
          //     success
          //   };
          // });
          Router.push('/dashboard');
        } else {
          // setInfoMessage(() => {
          //   return {
          //     msg: message,
          //     show: true,
          //     isError: !success,
          //     success
          //   };
          // });
        }
      } catch (err) {
        console.log('err :>> ', err);
      }
    }
    setLoading(false);
    email.current.value = '';
    password.current.value = '';
  };

  // return <div>{Loading && <PageLoading />}</div>;

  return (
    <Container>
      <FormContainer>
        <FormWrapper>
          <div className="col-left">
            <div className="login-text">
              <h2>Welcome Back !</h2>
              <p>dropgala admin panel</p>
            </div>
          </div>
          <div className="col-right">
            <Form as="form">
              <h1>Login</h1>
              <span>
                Username or email address<span style={{ color: 'red' }}>*</span>
              </span>
              <input
                className="input"
                name="email"
                type="email"
                placeholder="Username or Email"
                ref={email}
                autoComplete="email"
              />
              <span>
                Password<span style={{ color: 'red' }}>*</span>
              </span>
              <input
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
                <label htmlFor="remember_me">Remember me for 7 days</label>
              </div>
              <button>Submit</button>
            </Form>
          </div>
          <div className="forget-pass">
            <a href="/">Forget Password?</a>
          </div>
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
          <a href="/">
            <p>Contact Us</p>
          </a>
          <span className="h-line"></span>
          <a href="/">
            <p>Terms</p>
          </a>
          <span className="h-line"></span>
          <a href="/">
            <p>Privacy</p>
          </a>
        </div>
      </div>
      {/* <!--Waves end--> */}
    </Container>
  );
};

export async function getServerSideProps(context) {
  const { req } = context;
  const { token } = getAppCookies(req);
  const profile = token ? verifyToken(token.split(' ')[1]) : null;

  if (token || profile) {
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
}

export default Home;
