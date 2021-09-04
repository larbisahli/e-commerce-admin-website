/* eslint-disable no-unused-vars */
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer
} from 'react';
import { Tab, TabList, TabPanel } from 'react-tabs';
import useSWR, { mutate } from 'swr';

import { LoadingContainer } from '@/components/index';
import {
  Attribute,
  Form,
  GalleryUploadByDnD,
  GalleryUploadByUrl
} from '@/containers/index';
import Gallery from '@/containers/Product/Gallery';
import { UserStoreContext } from '@/context/UserStore';
import { GetCategoriesQuery, GetProductQuery } from '@/graphql/queries/index';
import type {
  AuthPageProps,
  CategoryType,
  ProductType
} from '@/interfaces/index';
import { Notify } from '@/lib/Notify';
import { getAppCookies, verifyToken } from '@/middleware/utils';

import ArrowLeft from '../../assets/svg/arrow-left.svg';

const Tabs: React.ComponentType<any> = dynamic(
  import('react-tabs').then((mod) => mod.Tabs),
  { ssr: false }
);

// An enum with all the types of actions to use in our reducer
enum ProductActions {
  INSERT = 'INSERT',
  POPULATE = 'POPULATE',
  RESET = 'RESET'
}

// An interface for our actions
interface ProductAction {
  type: ProductActions;
  payload: {
    field?: string;
    value?: string | number | boolean | null | string[];
    product?: ProductType;
  };
}

// default state
const initialState = {
  category_uid: '',
  account_uid: '',
  title: '',
  price: 0,
  discount: 0,
  warehouse_location: 'singapore',
  product_description: '',
  short_description: '',
  inventory: 1,
  product_weight: 0,
  is_new: true,
  note: '',
  thumbnail: null,
  gallery: null
};

function ProductReducer(state: ProductType, action: ProductAction) {
  const { type, payload } = action;
  switch (type) {
    case ProductActions.INSERT:
      return {
        ...state,
        [payload.field]: payload.value
      };
    case ProductActions.POPULATE:
      return {
        ...payload.product
      };
    case ProductActions.RESET:
      return { ...initialState };
    default:
      return state;
  }
}

const ProductFactory = ({ token, userInfo }: AuthPageProps) => {
  const router = useRouter();
  const { cid, pid } = router.query;

  const ProductVariable = useMemo(() => {
    return { product_uid: pid };
  }, [pid]);

  const { data: AvailableCategories } = useSWR<
    { Categories: CategoryType[] },
    any
  >([token, GetCategoriesQuery]);

  const { data: CurrentProduct, error: ProductError } = useSWR<
    { Product: ProductType },
    any
  >(pid ? [token, GetProductQuery, ProductVariable] : null);

  const Categories = AvailableCategories?.Categories;
  const Product = CurrentProduct?.Product;

  const [, setUserStore] = useContext(UserStoreContext);
  const [ProductState, dispatchProduct] = useReducer(
    ProductReducer,
    initialState
  );

  // ------- User Info -------
  useEffect(() => {
    if (userInfo) {
      const {
        account_uid,
        email,
        first_name,
        last_name,
        username,
        profile_img,
        privileges
      } = userInfo;
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
      dispatchProduct({
        type: ProductActions.INSERT,
        payload: {
          value: account_uid,
          field: 'account_uid'
        }
      });
    } else {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUserStore, userInfo]);

  // ------- Default Category -------
  useEffect(() => {
    const Default_cid = Categories && Categories[0]?.category_uid;
    if (cid || Default_cid) {
      dispatchProduct({
        type: ProductActions.INSERT,
        payload: {
          value: cid ?? Default_cid,
          field: 'category_uid'
        }
      });
    }
  }, [cid, Categories, dispatchProduct]);

  // ------- Product -------
  useEffect(() => {
    if (Product) {
      dispatchProduct({
        type: ProductActions.POPULATE,
        payload: { product: Product }
      });
    } else if (pid && ProductError) {
      Notify('Product Not Available', false);
      router.push({
        pathname: '/product/factory'
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Product, ProductError, dispatchProduct, pid]);

  const MutateProduct = useCallback(() => {
    mutate([token, GetProductQuery, ProductVariable]);
  }, [token, ProductVariable]);

  //  Input Change
  const HasChange = useMemo(() => {
    if (Product) {
      if (Product?.category_uid !== ProductState?.category_uid) return true;
      if (Product?.title !== ProductState?.title) return true;
      if (Product?.price !== ProductState?.price) return true;
      if (Product?.discount !== ProductState?.discount) return true;
      if (Product?.warehouse_location !== ProductState?.warehouse_location)
        return true;
      if (Product?.product_description !== ProductState?.product_description)
        return true;
      if (Product?.short_description !== ProductState?.short_description)
        return true;
      if (Product?.inventory !== ProductState?.inventory) return true;
      if (Product?.product_weight !== ProductState?.product_weight) return true;
      if (Product?.is_new !== ProductState?.is_new) return true;
      if (Product?.note !== ProductState?.note) return true;
    }
    return false;
  }, [Product, ProductState]);

  const thumbnail = Product?.thumbnail;
  const gallery = Product?.gallery;

  return (
    <div className="form-container">
      {pid && !Product && <LoadingContainer />}
      <div className="form-wrapper">
        <section className="flex justify-between items-center md:ml-0 ml-2 mb-9">
          <button
            className="flex justify-center items-center 
            bg-green-400 py-2 px-3  rounded-sm hover:shadow-inner shadow-lg hover:bg-green-500"
            onClick={() => router.back()}
          >
            <div>
              <ArrowLeft width={20} height={20} />
            </div>
            <span className="px-1 text-base text-white">Back</span>
          </button>
        </section>
        <Tabs>
          <TabList>
            <Tab>Product Details</Tab>
            <Tab>Product Gallery</Tab>
            <Tab>Product Attributes</Tab>
          </TabList>
          <TabPanel>
            <Form
              ProductState={ProductState}
              dispatchProduct={dispatchProduct}
              token={token}
              Categories={Categories}
              HasChange={HasChange}
              MutateProduct={MutateProduct}
            />
          </TabPanel>
          <TabPanel>
            <Tabs forceRenderTabPanel={true}>
              <div className="bg-white pt-2">
                <TabList>
                  <Tab>Drag & Drop</Tab>
                  <Tab>Upload By URL</Tab>
                  {(thumbnail || gallery) && <Tab>Product Gallery</Tab>}
                </TabList>
              </div>
              <TabPanel>
                <GalleryUploadByDnD
                  token={token}
                  MutateProduct={MutateProduct}
                />
              </TabPanel>
              <TabPanel>
                <GalleryUploadByUrl
                  token={token}
                  MutateProduct={MutateProduct}
                />
              </TabPanel>
              {(thumbnail || gallery) && (
                <TabPanel>
                  <Gallery
                    token={token}
                    thumbnail={thumbnail}
                    gallery={gallery}
                    MutateProduct={MutateProduct}
                  />
                </TabPanel>
              )}
            </Tabs>
          </TabPanel>
          <TabPanel forceRender>
            <Attribute token={token} />
          </TabPanel>
        </Tabs>
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

export default ProductFactory;
