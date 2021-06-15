import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAppCookies, verifyToken } from '@/middleware/utils';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { RevenueAnalyticCard, NewOrdersAnalyticCard, CustomersAnalyticCard, SalesChart } from '@/components/index'
import Add from '../assets/svg/add.svg'
import Link from 'next/link'

const IsProduction = process.env.NODE_ENV === 'production';

const Dashboard = ({ token, userInfo }) => {
  console.log(`======>`, { token, userInfo })

  const notify = () => toast.dark(`Welcome back ${userInfo?.first_name ?? ''}`, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  useEffect(() => {
    notify()
  }, [])

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
        <Link href="/dashboard">
          <a>
            <div className="flex justify-center items-center py-2 px-3 bg-blue-600 hover:bg-blue-700 
          text-white rounded-sm hover:shadow-inner shadow-lg">
              <div className="pr-1">
                <Add width={18} height={18} />
              </div>
              <span>Add New Products</span>
            </div>
          </a>
        </Link>
      </section>
      <section style={{ backgroundColor: '#acebfd' }} className="m-3 rounded-lg card-container">
        <SalesChart />
      </section>
      <section className="sm:flex justify-center items-center flex-wrap">
        <CustomersAnalyticCard />
        <RevenueAnalyticCard />
        <NewOrdersAnalyticCard />
      </section>
    </div>
  )
};


export async function getServerSideProps(context) {
  const { req } = context;
  const { token } = getAppCookies(req);
  const userInfo = token ? verifyToken(token) : null;

  // if (!userInfo) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: '/'
  //     }
  //   };
  // }

  return {
    props: {
      token,
      userInfo
    }
  };
}

Dashboard.propTypes = {
  token: PropTypes.string,
  userInfo: PropTypes.object
};

export default Dashboard;
