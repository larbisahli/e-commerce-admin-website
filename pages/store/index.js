import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import useSWR from 'swr';

import {
  EditSvg,
  EyeSvg,
  PaginationLArrowSvg,
  PaginationRArrowSvg
} from '@/components/svg';
import { StoreHead } from '@/containers/index';
import { UserStoreContext } from '@/context/UserStore';
import { Request } from '@/graphql/index';
import { ProductCountQuery, ProductPaginationMutation } from '@/graphql/queries/product';
import { getAppCookies, verifyToken } from '@/middleware/utils';

import Add from '../../assets/svg/add.svg';

const Store = ({ token, userInfo }) => {
  const router = useRouter();
  const { cid } = router.query;
  const [, setUserStore] = useContext(UserStoreContext);

  const [Page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [Count, setCount] = useState(0);

  const pageCount = Math.ceil((Count / limit))

  const ProductVariable = useMemo(() => {
    return {
      account_uid: userInfo?.account_uid,
      category_uid: cid,
      page: Page,
      limit
    };
  }, [cid, Page, limit, userInfo]);

  const { data, error } = useSWR([token, ProductPaginationMutation, ProductVariable]);

  console.log(`======>`, { data, error });

  async function fetchData() {
    await Request({
      token,
      mutation: ProductCountQuery,
      variables: {}
    })
      .then(({ ProductsCount }) => {
        setCount(() => ProductsCount?.count ?? 0)
      })
      .catch(({ response }) => {
        console.log(`Count response Error:>`, { response })
      });
  }

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log('count error :>> ', { error });
    }
  }, [])

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
    const page = selected + 1;
    console.log(`data ==>`, {
      selected,
      page,
    });
    setPage(() => page);
  };


  return (
    <div className="m-auto product-cart-container mb-20">
      <section className="flex justify-end items-center mx-3 mb-3">
        <Link
          href={{
            pathname: '/product/create',
            query: { cid }
          }}
        >
          <a>
            <div
              className="flex justify-center items-center py-2 px-3 
        bg-blue-600 hover:bg-blue-700 text-white rounded-sm hover:shadow-inner shadow-lg"
            >
              <div className="pr-1">
                <Add width={18} height={18} />
              </div>
              <span>Add New Product</span>
            </div>
          </a>
        </Link>
      </section>
      <div className="bg-white py-3 flex items-center flex-col justify-between border-t border-gray-200 rounded ">
        {/* ------- Search Header ------- */}
        <div className="pr-3 pl-3 border-b pt-3 border-solid border-gray-200 w-full flex-col-reverse sm:flex-row mb-3 flex items-center justify-between">
          <StoreHead></StoreHead>
        </div>
        {/* ------- Product Showcase ------- */}
        <div className="flex flex-wrap">
          {data?.Products?.map((product) => {
            return <ProductCard key={product.product_uid} product={product} />
          })}
        </div>
        {/* ------- Pagination Area ------- */}
        <div
          className="pr-3 pl-3 border-t pt-3 border-solid 
            border-gray-200 w-full flex-col-reverse 
              sm:flex-row flex items-center justify-between"
        >
          <div className="">
            <div className="flex justify-center items-center text-sm text-gray-700">
              <div>Showing</div>
              <span className="font-medium pl-1 pr-1">{1}</span>
              <div>to</div>
              <span className="font-medium pl-1 pr-1">{10}</span>
              <div>of</div>
              <span className="font-medium pl-1 pr-1">{97}</span>
              <div>results</div>
            </div>
          </div>
          <div className="">
            <nav className="" id="react-paginate" aria-label="Pagination">
              <ReactPaginate
                previousLabel={<PaginationLArrowSvg width={20} height={20} />}
                nextLabel={<PaginationRArrowSvg width={20} height={20} />}
                breakLabel={'...'}
                breakClassName=""
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName=""
                activeClassName="pagination-active"
              />
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const [Base64Placeholder, setBase64Placeholder] = useState(
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8eftXPQAIMgMfS5tX7gAAAABJRU5ErkJggg=='
  );

  const { product_uid, account_uid, category_uid, discount, inventory, price, thumbnail, title } = product
  const url = thumbnail?.image

  useEffect(() => {
    async function toBase64() {
      const arr = url?.split('.')
      const data = await fetch(`https://dropgala-test.fra1.digitaloceanspaces.com${arr[0]}_placeholder.${arr[1]}`);
      const blob = await data.blob();
      // eslint-disable-next-line no-undef
      return await new Promise((resolve) => {
        const reader = new window.FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result;
          return resolve(base64data);
        };
      }).then((res) => {
        console.log(`res`, res);
        setBase64Placeholder(res);
        return res;
      });
    }

    if (url) toBase64();
  }, [url]);

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
            blurDataURL={Base64Placeholder}
            placeholder="blur"
            alt=""
            className="bg-blue-100 rounded-t"
            unoptimized={true}
            src={`https://dropgala-test.fra1.digitaloceanspaces.com${url}`}
          />
          {/* ------------ */}
          <div
            style={{ background: 'rgba(0, 0, 0, 0.8)' }}
            className="absolute right-0 bottom-12 flex justify-center items-center m-1 h-9 w-9 rounded-full"
          >
            <span className="text-white text-sm font-normal">{`${price}`}</span>
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
          <div
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)',
              color: '#fff'
            }}
            className="absolute right-0 left-0 bottom-0 text-sm p-2 pb-1"
          >
            <span
              className="cut-when-2lines"
              title="Authentic Saint Laurent Gold Velvet Pants Authentic Saint Laurent"
            >
              {title}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
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
}

ProductCard.propTypes = {
  label: PropTypes.string
};

Store.propTypes = {
  token: PropTypes.string,
  userInfo: PropTypes.object
};

export default Store;