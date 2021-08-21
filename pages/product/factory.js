import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState
} from 'react';
import { Tab, TabList, TabPanel } from 'react-tabs';
import { toast } from 'react-toastify';
import useSWR, { mutate } from 'swr';

import {
  Attribute,
  Form,
  GalleryUploadByDnD,
  GalleryUploadByUrl
} from '@/containers/index';
import Gallery from '@/containers/Product/Gallery';
import { UserStoreContext } from '@/context/UserStore';
import { GetCategoriesQuery, GetProductQuery } from '@/graphql/queries/index';
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
        ...action.product
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

  const { data: AvailableCategories } = useSWR([token, GetCategoriesQuery]);

  const { data: CurrentProduct, error: ProductError } = useSWR(
    pid ? [token, GetProductQuery, ProductVariable] : null
  );

  const Categories = AvailableCategories?.Categories;
  const Product = CurrentProduct?.Product;

  const [, setUserStore] = useContext(UserStoreContext);
  const [ProductState, dispatchProduct] = useReducer(reducer, initialState);

  const [ThumbnailUrl, setThumbnailUrl] = useState(null);
  const [ImagesUrl, setImagesUrl] = useState([]);

  const [images, setImages] = useState([]);
  const [ThumbnailImage, setThumbnailImage] = useState([]);

  const Notify = useCallback((Message, success) => {
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
  }, []);

  // ------- User Info -------
  useEffect(() => {
    if (userInfo) {
      const { account_uid, email, first_name, last_name, username, profile_img, privileges } =
        userInfo;
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
        type: 'insert',
        value: account_uid,
        field: 'account_uid'
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
        type: 'insert',
        value: cid ?? Default_cid,
        field: 'category_uid'
      });
    }
  }, [cid, Categories, dispatchProduct]);

  // ------- Product -------
  useEffect(() => {
    if (Product) {
      dispatchProduct({
        type: 'populate',
        product: Product
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
      if (Product?.quiz_description !== ProductState?.quiz_description)
        return true;
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
              Notify={Notify}
              Categories={Categories}
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
            <Attribute token={token} Notify={Notify} />
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
    console.log(`getServerSideProps error :>`, error);
    return {
      props: {
        error
      }
    };
  }
}

NewProduct.propTypes = {
  token: PropTypes.string,
  userInfo: PropTypes.object
};

export default NewProduct;
