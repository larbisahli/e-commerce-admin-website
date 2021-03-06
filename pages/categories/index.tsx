import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

import { EditSvg, ProductSvg } from '@/components/svg';
import { UserStoreContext } from '@/context/UserStore';
import { GetCategoriesQuery } from '@/graphql/queries/index';
import type { AuthPageProps, CategoryType } from '@/interfaces/index';
import { getAppCookies, verifyToken } from '@/middleware/utils';

import Add from '../../assets/svg/add.svg';

interface CGType {
  Categories: CategoryType[];
}

interface CategoryCardProps {
  categoryName: string;
  categoryId: string;
}

const Categories = ({ token, userInfo }: AuthPageProps) => {
  const router = useRouter();
  const { setUserStore } = useContext(UserStoreContext);
  const { data } = useSWR<CGType, any>([token, GetCategoriesQuery]);

  const category = data?.Categories;

  useEffect(() => {
    if (userInfo) {
      setUserStore(userInfo);
    } else {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUserStore, userInfo]);

  category?.sort((a, b) => (a.display_order > b.display_order ? 1 : -1));

  return (
    <div className="m-auto categories-cart-container mb-20">
      <section className="flex justify-end items-center mx-3 mb-3">
        <Link href="/categories/create">
          <a>
            <div
              className="flex justify-center items-center py-2 px-3 
        bg-blue-600 hover:bg-blue-700 text-white rounded-sm hover:shadow-inner shadow-lg"
            >
              <div className="pr-1">
                <Add width={18} height={18} />
              </div>
              <span>Add New Category</span>
            </div>
          </a>
        </Link>
      </section>
      <section className="flex flex-wrap">
        {data?.Categories?.map(({ category_uid, category_name }) => {
          return (
            <CategoryCard
              key={category_uid}
              categoryName={category_name}
              categoryId={category_uid}
            />
          );
        })}
      </section>
    </div>
  );
};

const CategoryCard = ({ categoryName, categoryId }: CategoryCardProps) => {
  const [imgSrc, setImgSrc] = useState(false);

  return (
    <div className="card-container rounded-lg m-3 flex-col category-card-wrapper">
      <div
        style={{ height: '120px' }}
        className="flex justify-center items-center flex-col"
      >
        <div className="rounded-full">
          <Image
            quality={95}
            width={65}
            height={65}
            alt=""
            src={
              imgSrc
                ? `/static/svg/briefcase.svg`
                : `${process.env.MEDIA_URL}/svg/${categoryId}.svg`
            }
            onError={() => {
              setImgSrc(true);
            }}
          />
        </div>
        <span className="text-base uppercase pt-2 font-normal">
          {categoryName}
        </span>
      </div>
      <div
        style={{ height: '60px' }}
        className="flex justify-between items-center border-gray-200 border-solid border-t"
      >
        {/* ------ */}
        <Link
          href={{
            pathname: '/store',
            query: { cid: categoryId }
          }}
        >
          <a
            className="flex justify-center items-center w-full 
          h-full flex-col py-1 px-1 hover:bg-blue-50"
          >
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
            query: { cid: categoryId }
          }}
        >
          <a
            className="flex justify-center items-center w-full h-full flex-col py-1 
        border-gray-200 border-solid border-l px-1 hover:bg-blue-50 rounded-br-md"
          >
            <div className="py-1">
              <EditSvg
                width={25}
                height={25}
                className="custom-color-edit"
              ></EditSvg>
            </div>
            <span className="font-light text-xs">Edit</span>
          </a>
        </Link>
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

export default Categories;
