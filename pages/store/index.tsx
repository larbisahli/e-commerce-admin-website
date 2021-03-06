import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import ReactPaginate from 'react-paginate';
import useSWR from 'swr';

import { ImageComponent } from '@/components/index';
import {
  EditSvg,
  EmptyBox,
  LoadingSvg,
  PaginationLArrowSvg,
  PaginationRArrowSvg
} from '@/components/svg';
import { StoreHead } from '@/containers/index';
import { UserStoreContext } from '@/context/UserStore';
import { Request } from '@/graphql/index';
import { GetProductsQuery, ProductCountQuery } from '@/graphql/queries/index';
import type { AuthPageProps } from '@/interfaces/index';
import { Logs } from '@/lib/index';
import { Notify } from '@/lib/Notify';
import { getAppCookies, verifyToken } from '@/middleware/utils';

import Add from '../../assets/svg/add.svg';

interface ProductType {
  Products: {
    product_uid: string;
    category_uid: string;
    account_uid: string;
    title: string;
    price: number;
    thumbnail: {
      image_uid: string;
      image: string;
    }[];
  }[];
}

interface ProductsCountType {
  ProductsCount: {
    count: number;
  };
}

const Store = ({ token, userInfo }: AuthPageProps) => {
  const router = useRouter();
  const { cid } = router.query;

  const { setUserStore } = useContext(UserStoreContext);

  const [Page, setPage] = useState<number>(0);
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState<number>(10);
  const [Count, setCount] = useState<number>(0);

  const pageCount = Math.ceil(Count / limit);

  const ProductVariable = useMemo(() => {
    return {
      account_uid: userInfo?.account_uid,
      category_uid: cid,
      page: Page,
      limit
    };
  }, [cid, Page, limit, userInfo]);

  const { data } = useSWR<ProductType, any>([
    token,
    GetProductsQuery,
    ProductVariable
  ]);

  const Products = data?.Products;

  const fetchData = useCallback(async () => {
    await Request({
      token,
      mutation: ProductCountQuery,
      variables: {}
    })
      .then(({ ProductsCount }: ProductsCountType) => {
        setCount(() => ProductsCount?.count ?? 0);
      })
      .catch(({ response }) => {
        const ErrorMessage = response?.message ?? response?.errors[0]?.message;
        Notify(ErrorMessage, !response);
      });
  }, [token]);

  useEffect(() => {
    if (userInfo) {
      setUserStore(userInfo);
    } else {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUserStore, userInfo]);

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      Logs({ message: 'useEffect /store', error });
      Notify('Ops something went wrong.', false);
    }
  }, [fetchData]);

  const handlePageClick = (data) => {
    let selected = data.selected;
    const page = selected + 1;
    setPage(() => page);
  };

  return (
    <div className="m-auto product-cart-container mb-20">
      <section className="flex justify-end items-center mx-3 mb-3">
        <Link
          href={
            cid
              ? {
                  pathname: '/product/factory',
                  query: { cid }
                }
              : {
                  pathname: '/product/factory'
                }
          }
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
      <div className="bg-white py-3 flex  flex-col justify-center border-t border-gray-200 rounded ">
        {/* ------- Search Header ------- */}
        <div className="pr-3 pl-3 border-b pt-3 border-solid border-gray-200 w-full flex-col-reverse sm:flex-row mb-3 flex items-center justify-between">
          <StoreHead></StoreHead>
        </div>
        {/* ------- Product Showcase ------- */}
        <div className="flex flex-wrap">
          {typeof Products !== 'undefined' ? (
            Products?.length > 0 ? (
              Products?.map((product) => {
                return (
                  <ProductCard key={product.product_uid} product={product} />
                );
              })
            ) : (
              <span className="text-gray-500 flex justify-center items-center p-32 w-full">
                <EmptyBox width={30} height={30} />
              </span>
            )
          ) : (
            <span className="text-gray-500 flex justify-center items-center p-32 w-full">
              <LoadingSvg width={30} height={30} />
            </span>
          )}
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
  const {
    product_uid,
    // account_uid,
    // category_uid,
    price,
    thumbnail,
    title
  } = product;

  const url = thumbnail[0]?.image;

  return (
    <div
      style={{ border: 'none' }}
      className="card-container m-3 flex-col product-card-wrapper"
    >
      <div className="">
        <div className="relative">
          <ImageComponent
            quality={95}
            width={250}
            height={250}
            alt={title}
            className="bg-blue-100 rounded-t"
            src={url}
          />
          {/* ------------ */}
          <div
            style={{ background: 'rgba(0, 0, 0, 0.8)' }}
            className="absolute right-0 bottom-12 flex justify-center items-center p-1 rounded-sm"
          >
            <span className="text-white text-base font-normal">{`$${price}`}</span>
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
                pathname: '/product/factory',
                query: { pid: product_uid }
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { token }: { token: string } = getAppCookies(context);
    const userInfo = verifyToken(token);

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
};

export default Store;
