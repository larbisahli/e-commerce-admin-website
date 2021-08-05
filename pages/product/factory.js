import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { Tab, TabList, TabPanel } from 'react-tabs';
import { toast } from 'react-toastify';
import useSWR, { mutate } from 'swr';

import {
  Form,
  GalleryUploadByDnD,
  GalleryUploadByUrl
} from '@/containers/index';
import Gallery from '@/containers/Product/Gallery';
import { UserStoreContext } from '@/context/UserStore';
import { GetCategoriesQuery } from '@/graphql/queries/category';
import { GetProductQuery } from '@/graphql/queries/product';
import { getAppCookies, verifyToken } from '@/middleware/utils';

import ArrowLeft from '../../assets/svg/arrow-left.svg';

const Tabs = dynamic(
  import('react-tabs').then((mod) => mod.Tabs),
  { ssr: false }
);

const initialState = {
  category_uid: '',
  account_uid: '',
  quiz_description: '',
  title: '',
  price: 0,
  discount: 0,
  warehouse_location: 'singapore',
  product_description: '',
  short_description: '',
  inventory: 1,
  product_weight: 0,
  available_sizes: [],
  available_colors: [],
  is_new: true,
  note: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'insert':
      return {
        ...state,
        [action.field]: action.value
      };
    case 'populate':
      return {
        ...action.product,
      };
    case 'AddSize':
      return {
        ...state,
        available_sizes: [...state.available_sizes, action.value]
      };
    case 'AddColor':
      return {
        ...state,
        available_colors: [...state.available_colors, action.value]
      };
    case 'RemoveSize':
      return {
        ...state,
        available_sizes: [...state.available_sizes.filter((value) => value !== action.value)]
      };
    case 'RemoveColor':
      return {
        ...state,
        available_colors: [...state.available_colors.filter((value) => value !== action.value)]
      };
    case 'reset':
      return { ...initialState };
    default:
      return state;
  }
}

const NewProduct = ({ token, userInfo }) => {
  const router = useRouter();
  const { cid, pid } = router.query;

  const ProductVariable = useMemo(() => {
    return { product_uid: pid };
  }, [pid]);

  const { data } = useSWR([token, GetCategoriesQuery]);

  const { data: StoredProduct } = useSWR(pid ? [
    token,
    GetProductQuery,
    ProductVariable
  ] : null);

  const [, setUserStore] = useContext(UserStoreContext);
  const [ProductState, dispatchProduct] = useReducer(reducer, initialState);

  const [ThumbnailUrl, setThumbnailUrl] = useState(null);
  const [ImagesUrl, setImagesUrl] = useState([]);

  const [images, setImages] = useState([]);
  const [ThumbnailImage, setThumbnailImage] = useState([]);

  console.log('======== :>> ', { data, StoredProduct, ProductState });

  const Notify = (Message, success) => {
    const Options = {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    };
    if (success) {
      toast.success(Message, Options);
    } else {
      toast.error(Message, Options);
    }
  };

  // ------- User Info -------
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
      dispatchProduct({
        type: 'insert',
        value: account_uid,
        field: 'account_uid'
      });
    } else {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUserStore, userInfo]);

  // ------- Category -------
  useEffect(() => {
    const Default_cid = data?.Categories[0]?.category_uid;
    if (cid || Default_cid) {
      dispatchProduct({
        type: 'insert',
        value: cid ?? Default_cid,
        field: 'category_uid'
      });
    }
  }, [cid, data, dispatchProduct]);

  // ------- Product -------
  useEffect(() => {
    const Product = StoredProduct?.Product;

    if (Product) {
      dispatchProduct({
        type: 'populate',
        product: Product
      });
    } else if (pid && Product === null) {
      Notify('Product Not Available', false);
      router.push({
        pathname: '/product/factory'
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [StoredProduct, dispatchProduct, pid]);


  const MutateProduct = useCallback(() => {
    mutate([
      token,
      GetProductQuery,
      ProductVariable
    ])
  },
    [token, ProductVariable],
  )

  //  Input Change
  const HasChange = useMemo(() => {
    if (StoredProduct) {
      if (StoredProduct?.Product?.category_uid !== ProductState?.category_uid) return true;
      if (StoredProduct?.Product?.quiz_description !== ProductState?.quiz_description) return true;
      if (StoredProduct?.Product?.title !== ProductState?.title) return true;
      if (StoredProduct?.Product?.price !== ProductState?.price) return true;
      if (StoredProduct?.Product?.discount !== ProductState?.discount) return true;
      if (StoredProduct?.Product?.warehouse_location !== ProductState?.warehouse_location) return true;
      if (StoredProduct?.Product?.product_description !== ProductState?.product_description) return true;
      if (StoredProduct?.Product?.short_description !== ProductState?.short_description) return true;
      if (StoredProduct?.Product?.inventory !== ProductState?.inventory) return true;
      if (StoredProduct?.Product?.product_weight !== ProductState?.product_weight) return true;
      if (StoredProduct?.Product?.available_sizes !== JSON.stringify(ProductState?.available_sizes)) return true
      if (StoredProduct?.Product?.available_colors !== JSON.stringify(ProductState?.available_colors)) return true
      if (StoredProduct?.Product?.is_new !== ProductState?.is_new) return true;
      if (StoredProduct?.Product?.note !== ProductState?.note) return true;
    }
    return false;
  }, [StoredProduct, ProductState]);

  const thumbnail = StoredProduct?.Product?.thumbnail
  const gallery = StoredProduct?.Product?.gallery

  return (
    <div className="form-container">
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
            <Tab>Products Gallery</Tab>
          </TabList>
          <TabPanel>
            <Form
              ProductState={ProductState}
              dispatchProduct={dispatchProduct}
              token={token}
              Notify={Notify}
              Categories={data?.Categories}
              HasChange={HasChange}
              MutateProduct={MutateProduct}
            />
          </TabPanel>
          <TabPanel>
            <Tabs forceRenderTabPanel>
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
                  images={images}
                  setImages={setImages}
                  ThumbnailImage={ThumbnailImage}
                  setThumbnailImage={setThumbnailImage}
                  Notify={Notify}
                  title={ProductState.title}
                  MutateProduct={MutateProduct}
                />
              </TabPanel>
              <TabPanel>
                <GalleryUploadByUrl
                  token={token}
                  ThumbnailUrl={ThumbnailUrl}
                  setThumbnailUrl={setThumbnailUrl}
                  ImagesUrl={ImagesUrl}
                  setImagesUrl={setImagesUrl}
                  Notify={Notify}
                  title={ProductState.title}
                  MutateProduct={MutateProduct}
                />
              </TabPanel>
              <TabPanel>
                <Gallery
                  token={token}
                  thumbnail={thumbnail}
                  gallery={gallery}
                  MutateProduct={MutateProduct} />
              </TabPanel>
            </Tabs>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

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
    console.log(`getServerSideProps error :>`, error)
    return {
      props: {
        error
      }
    }
  }
}

NewProduct.propTypes = {
  token: PropTypes.string,
  userInfo: PropTypes.object
};

export default NewProduct;
