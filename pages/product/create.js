import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Tab, TabList, TabPanel } from 'react-tabs';
import { Slide, toast, ToastContainer } from 'react-toastify';

import {
  Form,
  GalleryUploadByDnD,
  GalleryUploadByUrl
} from '@/containers/index';
import { UserStoreContext } from '@/context/UserStore';
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
  shipping_price: 0,
  warehouse_location: '',
  product_description: '',
  short_description: '',
  inventory: 0,
  product_weight: '',
  available_sizes: '',
  available_colors: '',
  size: '',
  color: '',
  is_new: true,
};

function reducer(state, action) {
  switch (action.type) {
    case 'insert':
      return {
        ...state,
        [action.field]: action.value
      };
    case 'populate':
      return { ...action.product }
    case 'reset':
      return { ...initialState };
    default:
      return state;
  }
}

const NewProduct = ({ token, userInfo }) => {
  const router = useRouter();

  const [, setUserStore] = useContext(UserStoreContext);
  const [ProductState, dispatchProduct] = useReducer(reducer, initialState);

  const [ThumbnailUrl, setThumbnailUrl] = useState(null);
  const [ImagesUrl, setImagesUrl] = useState([]);

  const [images, setImages] = useState([]);
  const [ThumbnailImage, setThumbnailImage] = useState([]);

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
      // ------
      dispatchProduct({
        type: 'insert',
        value: account_uid,
        field: 'account_uid'
      });
    } else {
      // router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUserStore, userInfo]);

  return (
    <div className="form-container">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        className="text-sm"
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
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
            />
          </TabPanel>
          <TabPanel>
            <Tabs forceRenderTabPanel>
              <div className="bg-white pt-2">
                <TabList>
                  <Tab>Drag & Drop</Tab>
                  <Tab>Upload By URL</Tab>
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
                />
              </TabPanel>
            </Tabs>
          </TabPanel>
        </Tabs>
      </div>
    </div>
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

NewProduct.propTypes = {
  token: PropTypes.string,
  userInfo: PropTypes.object
};

export default NewProduct;
