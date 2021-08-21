import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';

import {
  CustomersAnalyticCard,
  NewOrdersAnalyticCard,
  RevenueAnalyticCard,
  SalesChart
} from '@/components/index';
import { UserStoreContext } from '@/context/UserStore';
import { getAppCookies, verifyToken } from '@/middleware/utils';

import Add from '../assets/svg/add.svg';
function Dashboard({ userInfo }) {
  const router = useRouter();

  const [, setUserStore] = useContext(UserStoreContext);

  useEffect(() => {
    if (userInfo) {
      const { account_uid, email, first_name, last_name, username, profile_img, privileges } = userInfo;
      setUserStore((prev) => {
        return {
          ...prev,
          account_uid,
          email,
          first_name,
          last_name,
          privileges,
          username,
          profile_img
        };
      });
    } else {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUserStore, userInfo]);

  return (
    <div className="mb-20">
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
      <section className="sm:flex justify-center items-center flex-wrap">
        <CustomersAnalyticCard />
        <RevenueAnalyticCard />
        <NewOrdersAnalyticCard />
      </section>
      <section
        style={{ backgroundColor: '#f0f7ff' }}
        className="m-3 rounded-lg card-container"
      >
        <SalesChart />
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const { req } = context;
    const { token } = getAppCookies(req);
    const userInfo = token ? verifyToken(token) : null;

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
  } catch (error) {
    console.log(`getServerSideProps error :>`, error);
    return {
      props: {
        error
      }
    };
  }
}

Dashboard.propTypes = {
  token: PropTypes.string,
  userInfo: PropTypes.object
};

export default Dashboard;
