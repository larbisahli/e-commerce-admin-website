import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { Slide, toast, ToastContainer } from 'react-toastify';

import {
  Container,
  Form,
  FormContainer,
  FormWrapper
} from '@/styles/Pages/index';

import { getAppCookies, verifyToken } from '../middleware/utils';

const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const rememberMe = useRef(null);
  const Router = useRouter();

  const [Loading, setLoading] = useState(false);
  const [Message, setMessage] = useState('');

  const notify = () =>
    toast.dark(Message, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

  const LogIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    const HostUrl =
      process.env.NODE_ENV === 'production' ? '' : 'http://127.0.0.1:5001';

    if (email.current.value && password.current.value) {
      try {
        const res = await fetch(`${HostUrl}/api/login`, {
          withCredentials: true,
          credentials: 'include',
          body: JSON.stringify({
            email: email.current.value,
            password: password.current.value,
            remember_me: rememberMe.current.checked
          }),
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        });

        const { success, message } = await res.json();
        console.log(`message`, { message });

        if (success) {
          Router.push('/dashboard');
        } else {
          setMessage(message);
          notify();
        }
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
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
      <FormContainer>
        <FormWrapper>
          <div className="col-left">
            <div className="login-text">
              <h2>Welcome Back !</h2>
              <p>dropgala admin panel</p>
            </div>
          </div>
          <div className="col-right">
            <Form as="form" onSubmit={LogIn}>
              <h1>Login</h1>
              <span>
                Username or email address<span style={{ color: 'red' }}>*</span>
              </span>
              <input
                required
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
                <label htmlFor="remember_me">Remember me for 7 days</label>
              </div>
              <button>
                {Loading && <i className="spinner"></i>}
                <span>Log in</span>
              </button>
            </Form>
          </div>
          <div className="forget-pass">
            <Link href="/" passHref>
              <a>Forget Password?</a>
            </Link>
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

export async function getServerSideProps(context) {
  const { req } = context;
  const { token } = getAppCookies(req);
  const userInfo = token ? verifyToken(token) : null;

  console.log(`/index userInfo`, userInfo);

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
}

export default Login;
