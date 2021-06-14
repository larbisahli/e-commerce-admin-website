import React from 'react';
import PropTypes from 'prop-types';
import { getAppCookies, verifyToken } from '@/middleware/utils';
import Image from 'next/image'
import { SubCategorySvg, ProductSvg, EditSvg } from '@/components/svg'

const Categories = ({ token, userInfo }) => {
  return <div
    className="flex flex-wrap m-auto categories-cart-container mb-20">
    <CategoryCard label="Category-1" />
    <CategoryCard label="Category-2" />
    <CategoryCard label="Category-3" />
    <CategoryCard label="Category-4" />
    <CategoryCard label="Category-5" />
    <CategoryCard label="Category-6" />
    <CategoryCard label="Category-7" />
    <CategoryCard label="Category-8" />
  </div>;
};

const CategoryCard = ({ label }) => {
  return (
    <div className="card-container m-3 flex-col category-card-wrapper">
      <div style={{ height: "120px" }} className="flex justify-center items-center flex-col">
        <div className="bg-blue-100 rounded-full p-3">
          <Image quality={95} width={35} height={35} src="/static/svg/briefcase.svg" />
        </div>
        <span className="text-base uppercase pt-2 font-normal">{label}</span>
      </div>
      <div style={{ height: "60px" }} className="flex justify-between items-center border-gray-200 border-solid border-t">
        {/* ------ */}
        <a href="/" className="flex justify-center items-center w-full h-full flex-col py-1 
        border-gray-200 border-solid border-r px-1 hover:bg-blue-50 rounded-bl-md">
          <div className="py-1">
            <SubCategorySvg width={25} height={25} />
          </div>
          <span className="font-light text-xs">Sub-categories</span>
        </a>
        {/* ------ */}
        <a href="/" className="flex justify-center items-center w-full h-full flex-col py-1 px-1 hover:bg-blue-50">
          <div className="py-1">
            <ProductSvg width={25} height={25} />
          </div>
          <span className="font-light text-xs">Products</span>
        </a>
        {/* ------ */}
        <a href="/"
          className="flex justify-center items-center w-full h-full flex-col py-1 
        border-gray-200 border-solid border-l px-1 hover:bg-blue-50 rounded-br-md">
          <div className="py-1">
            <EditSvg width={25} height={25} />
          </div>
          <span className="font-light text-xs">Edit</span>
        </a>
      </div>
    </div>
  )
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

CategoryCard.propTypes = {
  label: PropTypes.string,
};

Categories.propTypes = {
  token: PropTypes.string,
  userInfo: PropTypes.object
};


export default Categories;
