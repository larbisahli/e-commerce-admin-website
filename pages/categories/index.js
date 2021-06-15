import React from 'react';
import PropTypes from 'prop-types';
import { getAppCookies, verifyToken } from '@/middleware/utils';
import Image from 'next/image'
import { SubCategorySvg, ProductSvg, EditSvg } from '@/components/svg'
import Add from '../../assets/svg/add.svg'
import Link from 'next/link'

const Categories = ({ token, userInfo }) => {
  return <div
    className="m-auto categories-cart-container mb-20">
    <section className="flex justify-end items-center mx-3 mb-3">
      <Link href="/categories/create">
        <a>
          <div className="flex justify-center items-center py-2 px-3 
        bg-blue-600 hover:bg-blue-700 text-white rounded-sm hover:shadow-inner shadow-lg">
            <div className="pr-1">
              <Add width={18} height={18} />
            </div>
            <span>Add New Category</span>
          </div>
        </a>
      </Link>
    </section>
    <section className="flex flex-wrap">
      <CategoryCard label="Category-1" />
      <CategoryCard label="Category-2" />
      <CategoryCard label="Category-3" />
      <CategoryCard label="Category-4" />
      <CategoryCard label="Category-5" />
      <CategoryCard label="Category-6" />
      <CategoryCard label="Category-7" />
      <CategoryCard label="Category-8" />
    </section>
  </div>
};

const CategoryCard = ({ label }) => {
  return (
    <div className="card-container rounded-lg m-3 flex-col category-card-wrapper">
      <div style={{ height: "120px" }} className="flex justify-center items-center flex-col">
        <div className="bg-blue-100 rounded-full p-3">
          <Image quality={95} width={35} height={35} src="/static/svg/briefcase.svg" />
        </div>
        <span className="text-base uppercase pt-2 font-normal">{label}</span>
      </div>
      <div style={{ height: "60px" }} className="flex justify-between items-center border-gray-200 border-solid border-t">
        {/* ------ */}
        <Link href={{
          pathname: '/categories/sub-categories',
          query: { cid: '1234-5678' },
        }}>
          <a className="flex justify-center items-center w-full h-full flex-col py-1 
        border-gray-200 border-solid border-r px-1 hover:bg-blue-50 rounded-bl-md">
            <div className="py-1">
              <SubCategorySvg width={25} height={25} />
            </div>
            <span className="font-light text-xs">Sub-categories</span>
          </a>
        </Link>
        {/* ------ */}
        <Link href={{
          pathname: '/categories/products',
          query: { cid: '1234-5678' },
        }}
        >
          <a className="flex justify-center items-center w-full h-full flex-col py-1 px-1 hover:bg-blue-50">
            <div className="py-1">
              <ProductSvg width={25} height={25} />
            </div>
            <span className="font-light text-xs">Products</span>
          </a>
        </Link>
        {/* ------ */}
        <Link
          href={{
            pathname: '/categories/edit',
            query: { cid: '1234-5678' },
          }}
        >
          <a href="/"
            className="flex justify-center items-center w-full h-full flex-col py-1 
        border-gray-200 border-solid border-l px-1 hover:bg-blue-50 rounded-br-md">
            <div className="py-1">
              <EditSvg width={25} height={25} />
            </div>
            <span className="font-light text-xs">Edit</span>
          </a>
        </Link>
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
