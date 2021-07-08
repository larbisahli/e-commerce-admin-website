/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { memo, useRef, useState } from 'react';

import { LoadingContainer } from '@/components/index';

import Add from '../../assets/svg/add.svg';
import Gallery from './Gallery'

const HostUrl =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5001';

const GalleryUploadByUrl = ({
  token,
  ThumbnailUrl,
  setThumbnailUrl,
  ImagesUrl,
  setImagesUrl,
  Notify,
}) => {

  const router = useRouter();
  const { pid } = router.query;

  const ThumbnailUrlRef = useRef(null);
  const ImageUrlRef = useRef(null);

  const [Loading, setLoading] = useState(false);
  const [Progress, setProgress] = useState(0);

  const AddThumbnail = () => {
    const url = ThumbnailUrlRef.current.value;
    if (url) {
      setThumbnailUrl(() => url);
      ThumbnailUrlRef.current.value = null;
    }
  };

  const AddImagesUrl = () => {
    const url = ImageUrlRef.current.value;
    if (url) {
      setImagesUrl((prev) => [...prev, url]);
      ImageUrlRef.current.value = null;
    }
  };

  const Form_Data = (image, title) => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    return formData;
  };

  // -------------- Thumbnail ---------------
  const SubmitThumbnail = async(e) => {
    e.preventDefault();

    if(!ThumbnailUrl){
      Notify(`No URL specified.`, false);
      return
    }

    if(!pid){
      Notify(`You must submit your product details in order to upload an image.`, false);
      return
    }


    if (!Loading && ThumbnailUrl && pid) {
      setLoading(() => true);
      setProgress(0);

      try{

        const response = await fetch(`${HostUrl}/api/upload`, {
        method: 'POST',
        withCredentials: true,
        credentials: 'include',
        headers: {
          Authorization: 'Bearer ' + token
        },
        body: Form_Data(ThumbnailUrl, title)
      })

      const {success, error} = await response.json() 

      if(error){
        console.error(error);
        Notify(error.message, false);
        setLoading(() => false);
      }

      if(success){
          Notify(`🚀 Thumbnail successfully uploaded`, true);
          setLoading(() => false);
          setProgress(100);
          setThumbnailUrl(null);
        }
      }catch(error){
        console.log('error :>> ',{message:error.message,error});
      }
        
    }
  };

  // --------------- Gallery ----------------
  const SubmitImages = async (e) => {
    e.preventDefault();

    if(!ImagesUrl[0]){
      Notify(`No URL specified.`, false);
    }
    if(!pid){
      Notify(`You must submit your product details in order to upload an image.`, false);
    }


    let FetchArray = [];

    if (!Loading && ImagesUrl[0] && pid) {
      setLoading(() => true);
      setProgress(0);

      for (let i = 0; i < ImagesUrl.length; i++) {
        FetchArray.push(
          fetch(`${HostUrl}/api/upload`, {
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            headers: {
              Authorization: 'Bearer ' + token
            },
            body: Form_Data(ImagesUrl[i],title)
          })
        );
      }

      let progress = 0;
      FetchArray.forEach((p) =>
        p.then(() => {
          progress++;
          setProgress((progress / FetchArray.length) * 100);
        })
      );

      await Promise.all(FetchArray)
        .then((response) => Promise.all(response.map((r) => r.json())))
        .then((data) => {
          console.log(`data`, { data });

          let count = null

          const ErrorImages = []

          data.forEach(({ success, error }, index) => {
              if (success) count++
              
              if(error) {
                ErrorImages.push(ImagesUrl[index])
                Notify(`Can't upload ${ImagesUrl[index]?.file?.name}`, false);
              }
          })

          if(count){
            Notify(`🚀 ${count} Gallery Images successfully uploaded`, true);
          }
          setLoading(() => false);
          console.log('ErrorImages :>> ', {ErrorImages});
          setImagesUrl([...ErrorImages]);
        })
        .catch((err) => {
          console.log(err);
          Notify(`🚀 Ops, something happened`, false);
          setLoading(() => false);
        });
    }
  };

  return (
    <form className="m-auto">
      {Loading && <LoadingContainer WithProgressBar Progress={Progress} />}
      <div
        style={{
          borderTop: '0',
          borderTopLeftRadius: '0',
          borderTopRightRadius: '0'
        }}
        className="shadow overflow-hidden md:rounded-lg card-container rounded-none"
      >
        <div className="flex justify-center items-center px-4 py-3 text-gray-800 bg-gray-100 text-right sm:px-6">
          <span className="uppercase text-sm">Add Product Images</span>
        </div>
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="block">
            {/* ******************* thumbnail ******************* */}
            <div className="">
              <div className="block text-sm font-medium text-gray-700 mb-1">
                Thumbnail Image
              </div>
              {/* -- Thumbnail URL -- */}
              <div>
                <input
                  type="text"
                  ref={ThumbnailUrlRef}
                  placeholder="www.example.com/img.png"
                  className="mt-1 focus:border-indigo-500 block w-full 
                      shadow-sm border-2 border-solid border-gray-300 rounded-md p-1"
                />
              </div>
              <div
                role="button"
                onClick={AddThumbnail}
                className="m-1 mb-4 flex justify-end"
              >
                <span className="bg-green-400 hover:bg-green-500 rounded-sm px-2 py-1 text-white cursor-pointer">
                  <Add width={18} height={18} />
                </span>
              </div>
              {/* -- Thumbnail Showcase -- */}
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center w-full">
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 rounded-md">
                    <div
                      className={classNames('w-full', 'h-full', 'rounded-md')}
                    >
                      <div className="flex justify-center items-center flex-col mb-3">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="text-xs text-gray-500">
                          (make sur Thumbnail are high-resolution)
                        </p>
                      </div>
                      <div className="flex justify-center flex-wrap items-center">
                        {ThumbnailUrl && (
                          <div className="card-container rounded m-2">
                            <div style={{ width: '100px' }}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                className="rounded-t"
                                src={ThumbnailUrl}
                                alt=""
                                width="100"
                                height="100"
                              />
                            </div>
                            <div className="flex justify-center rounded-b border-gray-300 border-solid items-center">
                              <div
                                role="button"
                                className="rounded-br cursor-pointer text-xs bg-red-400 w-full p-1 text-center hover:bg-red-500 text-white"
                                onClick={() => setThumbnailUrl(null)}
                              >
                                Remove
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ******************* Submit Thumbnail ******************* */}
              <div className="px-4 py-3 text-right sm:px-6">
                <button
                  onClick={SubmitThumbnail}
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </div>
            </div>
            {/* ******************* images_url ******************* */}
            <div className="pt-5 border-t-2 border-solid border-gray-200 mt-7">
              <div className="block text-sm font-medium text-gray-700 mb-1">
                Gallery Images
              </div>
              {/* -- Images URL -- */}
              <div className="">
                <div className="mb-4">
                  <input
                    type="text"
                    ref={ImageUrlRef}
                    placeholder="www.example.com/img.png"
                    className="mt-1 focus:border-indigo-500 block w-full 
                      shadow-sm border-2 border-solid border-gray-300 rounded-md p-1"
                  />
                  <div
                    role="button"
                    onClick={AddImagesUrl}
                    className="m-1 flex justify-end"
                  >
                    <span className="bg-green-400 hover:bg-green-500 rounded-sm px-2 py-1 text-white cursor-pointer">
                      <Add width={18} height={18} />
                    </span>
                  </div>
                </div>
                {/* -- Thumbnail Showcase -- */}
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center w-full">
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 rounded-md">
                      <div
                        className={classNames('w-full', 'h-full', 'rounded-md')}
                      >
                        <div className="flex justify-center items-center flex-col mb-3">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p className="text-xs text-gray-500">
                            (make sur Thumbnail are high-resolution)
                          </p>
                        </div>
                        <div className="flex justify-center flex-wrap items-center">
                          {ImagesUrl?.map((url, index) => (
                            <div
                              key={index}
                              className="card-container rounded m-2"
                            >
                              <div style={{ width: '100px' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  className="rounded-t"
                                  src={url}
                                  alt=""
                                  width="100"
                                  height="100"
                                />
                              </div>
                              <div className="flex justify-center rounded-b border-gray-300 border-solid items-center">
                                <div
                                  role="button"
                                  className="rounded-br cursor-pointer text-xs bg-red-400 w-full p-1 text-center hover:bg-red-500 text-white"
                                  onClick={() => {
                                    setImagesUrl((prev) =>
                                      prev.filter((_url) => _url !== url)
                                    );
                                  }}
                                >
                                  Remove
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ******************* Submit Images ******************* */}
                <div className="px-4 py-3 text-right sm:px-6">
                  <button
                    onClick={SubmitImages}
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Gallery/>
        </div>
      </div>
    </form>
  );
};

export default memo(GalleryUploadByUrl);
