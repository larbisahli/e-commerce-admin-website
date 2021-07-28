import cookie from 'cookie';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import { useRouter } from 'next/router';
import path from 'path'
import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { Slide, toast, ToastContainer } from 'react-toastify';

import {
  CustomersAnalyticCard,
  NewOrdersAnalyticCard,
  RevenueAnalyticCard,
  SalesChart
} from '@/components/index';
import { UserStoreContext } from '@/context/UserStore';

// import { getAppCookies, verifyToken } from '@/middleware/utils';
import Add from '../assets/svg/add.svg';

// const IsProduction = process.env.NODE_ENV === 'production';

function Dashboard({ token, userInfo }) {
  const router = useRouter();

  console.log('==>', { token, userInfo })

  const [, setUserStore] = useContext(UserStoreContext);

  const notify = () =>
    toast.dark(`Welcome back ${userInfo?.first_name ?? ''}`, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

  useEffect(() => {
    if (userInfo) {
      notify();
      const { account_uid, email, first_name, last_name, privileges } =
        userInfo;
      setUserStore((prev) => {
        return {
          ...prev,
          account_uid,
          email,
          first_name,
          last_name,
          privileges
        };
      });
    } else {
      router.push('/');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUserStore, userInfo]);

  return (
    <div className="mb-20">
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
      <section className="flex justify-end items-center mx-3">
        <Link href="/product/factory">
          <a>
            <div
              className="flex justify-center items-center py-2 px-3 bg-blue-600 hover:bg-blue-700 
          text-white rounded-sm hover:shadow-inner shadow-lg"
            >
              <div className="pr-1">
                <Add width={18} height={18} />
              </div>
              <span>Add New Products</span>
            </div>
          </a>
        </Link>
      </section>
      <section
        style={{ backgroundColor: '#acebfd' }}
        className="m-3 rounded-lg card-container"
      >
        <SalesChart />
      </section>
      <section className="sm:flex justify-center items-center flex-wrap">
        <CustomersAnalyticCard />
        <RevenueAnalyticCard />
        <NewOrdersAnalyticCard />
      </section>
    </div>
  );
}

function verifyToken(jwtToken, PublicKEY) {
  try {
    return jwt.verify(jwtToken, PublicKEY, {
      algorithm: ['RS256']
    });
  } catch (error) {
    console.log('verifyToken Error:>>', error);
    return null;
  }
}

function getAppCookies(req) {
  const token = cookie.parse(req?.headers?.cookie || '')['DGALA-TOKEN'] ?? null;
  return { token };
}

export async function getServerSideProps(context) {
  try {

    let basePath = process.cwd()

    if (process.env.NODE_ENV === "production") {
      basePath = path.join(process.cwd(), ".next/server/chunks")
    }

    const MiddlewareDirectory = path.join(basePath, 'middleware')

    console.log(`postsDirectory::>`, { MiddlewareDirectory, basePath, env: process.env.NODE_ENV })

    const PublicKEY = fs.readFileSync(path.join(MiddlewareDirectory, "jwtRS256.key.pub"), 'utf8');

    const { req } = context;
    const { token } = getAppCookies(req);
    const userInfo = token ? verifyToken(token, PublicKEY) : null;

    if (!userInfo) {
      return {
        redirect: {
          permanent: false,
          destination: '/'
        }
      };
    }

    return {
      props: {
        token,
        userInfo
      }
    };
  } catch (err) {
    console.log(`err`, err)
  }

  return {
    props: {
      token: '123',
      userInfo: '321'
    }
  };
}

Dashboard.propTypes = {
  token: PropTypes.string,
  userInfo: PropTypes.object
};

export default Dashboard;
