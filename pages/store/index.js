import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import { EditSvg, EyeSvg, PaginationLArrowSvg, PaginationRArrowSvg } from '@/components/svg';
import { StoreHead } from '@/containers/index';
import { UserStoreContext } from '@/context/UserStore';
import { getAppCookies, verifyToken } from '@/middleware/utils';

const Store = ({ token, userInfo }) => {
  const router = useRouter();
  const [, setUserStore] = useContext(UserStoreContext);

  console.log(`======>`, { token });

  useEffect(() => {
    if (userInfo) {
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
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUserStore, userInfo]);

  const handlePageClick = (data) => {
    let selected = data.selected;
    const page = selected + 1
    console.log(`data ==>`, { selected, page, offset: Math.ceil(selected * limit) })
    setOffset(() => Math.ceil(selected * limit))
  }

  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)

  return (
    <div className="m-auto product-cart-container mb-20">
      <div className="bg-white py-3 flex items-center flex-col justify-between border-t border-gray-200 rounded ">
        {/* ------- Search Header ------- */}
        <div className="pr-3 pl-3 border-b pt-3 border-solid border-gray-200 w-full flex-col-reverse sm:flex-row mb-3 flex items-center justify-between">
          <StoreHead></StoreHead>
        </div>
        {/* ------- Product Showcase ------- */}
        <div className="flex flex-wrap">
          <ProductCard label="Sub-category-1" />
          <ProductCard label="Sub-Category-2" />
          <ProductCard label="Sub-Category-3" />
          <ProductCard label="Sub-Category-4" />
          <ProductCard label="Sub-Category-5" />
          <ProductCard label="Sub-Category-6" />
          <ProductCard label="Sub-Category-7" />
          <ProductCard label="Sub-Category-8" />
        </div>
        {/* ------- Pagination Area ------- */}
        <div className="pr-3 pl-3 border-t pt-3 border-solid 
            border-gray-200 w-full flex-col-reverse 
              sm:flex-row flex items-center justify-between">
          <div className="">
            <p className="flex justify-center items-center text-sm text-gray-700">
              <div>Showing</div>
              <span className="font-medium pl-1 pr-1">{1}</span>
              <div>to</div>
              <span className="font-medium pl-1 pr-1">{10}</span>
              <div>of</div>
              <span className="font-medium pl-1 pr-1">{97}</span>
              <div>results</div>
            </p>
          </div>
          <div className="">
            <nav className="" id="react-paginate" aria-label="Pagination">
              <ReactPaginate
                previousLabel={<PaginationLArrowSvg width={20} height={20} />}
                nextLabel={<PaginationRArrowSvg width={20} height={20} />}
                breakLabel={'...'}
                breakClassName=''
                pageCount={5}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName=''
                activeClassName='pagination-active'
              />
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCard = () => {
  return (
    <div
      style={{ border: 'none' }}
      className="card-container m-3 flex-col product-card-wrapper"
    >
      <div className="">
        <div className="relative">
          <Image
            quality={95}
            width={250}
            height={250}
            alt=""
            className="bg-blue-100 rounded-t"
            src="/static/images/test-image.jpg"
          />
          {/* ------------ */}
          <div
            style={{ background: 'rgba(0, 0, 0, 0.8)' }}
            className="absolute right-0 bottom-12 flex justify-center items-center m-1 h-9 w-9 rounded-full"
          >
            <span className="text-white text-sm font-normal">$10</span>
          </div>
          {/* View */}
          <div
            style={{ background: 'rgba(0, 0, 0, 0.8)' }}
            className="pointer shadow absolute right-0 top-10 flex justify-center items-center 
            border-2 border-solid border-grey-300 
            hover:border-green-500 m-1 h-9 w-9 rounded-full"
          >
            <Link
              href={{
                pathname: '/categories/sub-categories/edit',
                query: { cid: '1234-5678', scid: '123-456' }
              }}
            >
              <a>
                <div className="">
                  <EyeSvg width={22} height={22} />
                </div>
              </a>
            </Link>
          </div>
          {/* Edit */}
          <div
            style={{ background: 'rgba(0, 0, 0, 0.8)' }}
            className="pointer shadow absolute right-0 top-0 flex justify-center items-center 
            border-2 border-solid border-grey-300 
            hover:border-green-500 m-1 h-9 w-9 rounded-full"
          >
            <Link
              href={{
                pathname: '/categories/sub-categories/edit',
                query: { cid: '1234-5678', scid: '123-456' }
              }}
            >
              <a>
                <div className="">
                  <EditSvg width={22} height={22} />
                </div>
              </a>
            </Link>
          </div>
          <div style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)', color: '#fff' }}
            className="absolute right-0 left-0 bottom-0 text-sm p-2 pb-1">
            <span
              className="cut-when-2lines"
              title="Authentic Saint Laurent Gold Velvet Pants Authentic Saint Laurent"
            >
              Authentic Saint Laurent Gold Velvet Pants Authentic Saint Laurent
            </span>
          </div>
        </div>
      </div>
    </div >
  );
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

ProductCard.propTypes = {
  label: PropTypes.string
};

Store.propTypes = {
  token: PropTypes.string,
  userInfo: PropTypes.object
};

export default Store;
