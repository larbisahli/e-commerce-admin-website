import React from 'react';
import PropTypes from 'prop-types';
import { getAppCookies, verifyToken } from '@/middleware/utils';

const Products = ({ token, userInfo }) => {
    return <div>Products under Category</div>
}

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


Products.propTypes = {
    token: PropTypes.string,
    userInfo: PropTypes.object
};

export default Products