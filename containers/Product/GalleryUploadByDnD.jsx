/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-undef */
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { memo, useEffect, useState } from 'react';
import ImageUploading from 'react-images-uploading';

import { LoadingContainer } from '@/components/index';
import { DeleteSvg, EditSvg } from '@/components/svg';
import { replace } from '@/utils/index';

let QDcurrent = 0;

const HostUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.ADMIN_API_URL
    : 'http://localhost:5001';

const GalleryUploadByDnD = ({
  token,
  images,
  setImages,
  ThumbnailImage,
  setThumbnailImage,
  Notify,
  title,
  MutateProduct
}) => {
  const router = useRouter();
  const { pid } = router.query;

  const [Loading, setLoading] = useState(false);
  const [Progress, setProgress] = useState(0);

  const onImageChange = (imageList) => {
    setImages(imageList);
  };

  const onThumbnailChange = (imageList) => {
    setThumbnailImage(imageList);
  };

  const Form_Data = (image, title, index) => {
    const formData = new FormData();
    formData.append('image', image?.data_url);
    formData.append('title', title);
    formData.append('product_uid', pid);
    formData.append('index', index);
    return formData;
  };

  // ------------- Thumbnail Image ---------------
  const SubmitThumbnail = async (e) => {
    e.preventDefault();

    if (!ThumbnailImage[0]) {
      Notify(`No image specified.`, false);
    }
    if (!pid) {
      Notify(
        `You must submit your product details in order to upload images.`,
        false
      );
    }

    if (!Loading && ThumbnailImage[0] && pid) {
      setLoading(() => true);
      setProgress(0);

      try {
        const response = await fetch(`${HostUrl}/api/upload`, {
          method: 'POST',
          withCredentials: true,
          credentials: 'include',
          headers: {
            Authorization: 'Bearer ' + token
          },
          body: Form_Data(ThumbnailImage[0], title, 0)
        });

        const { success, error } = await response.json();

        if (!success || error) {
          console.error(error);
          Notify(error?.message ?? 'Ops, something happened', false);
          setLoading(() => false);
          // LOGS
        }

        if (success) {
          Notify(`🚀 Thumbnail successfully uploaded`, true);
          setLoading(() => false);
          setProgress(100);
          setThumbnailImage([]);
          MutateProduct();
        }
      } catch (error) {
        console.log('error :>> ', { message: error?.message, error });
        // LOGS
      }
    }
  };

  // ----------- Gallery Images -------------
  const SubmitImages = async (e) => {
    e.preventDefault();

    if (!images[0]) {
      Notify(`No image specified.`, false);
      return;
    }
    if (!pid) {
      Notify(
        `You must submit your product details in order to upload images.`,
        false
      );
      return;
    }

    let FetchArray = [];

    if (!Loading && images[0] && pid) {
      setLoading(() => true);
      setProgress(0);

      for (let i = 0; i < images.length; i++) {
        FetchArray.push(
          fetch(`${HostUrl}/api/upload`, {
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            headers: {
              Authorization: 'Bearer ' + token
            },
            body: Form_Data(images[i], title, i + 1)
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
          let count = null;
          const ErrorImages = [];

          data.forEach(({ success, error }, index) => {
            if (success) count++;
            if (error) {
              ErrorImages.push(images[index]);
              Notify(
                `Couldn't upload ${images[index]?.file?.name ?? 'an image'}`,
                false
              );
              // LOGS
            }
          });

          if (count) {
            Notify(`🚀 ${count} Gallery Images successfully uploaded!`, true);
          }
          setLoading(() => false);
          setImages([...ErrorImages]);
          MutateProduct();
        })
        .catch((err) => {
          console.log(err);
          Notify(`🚀 Ops, something happened`, false);
          setLoading(() => false);
        });
    }
  };

  // --------- Sort ----------

  useEffect(() => {
    const draggable = document.querySelectorAll(`.drag-img-dnd`);
    draggable.forEach((draggable) => {
      draggable.addEventListener('dragstart', () => {
        draggable.classList.add('img-dragging');
        QDcurrent = +draggable.id;
      });
      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('img-dragging');
        QDcurrent = 0;
      });
    });
  }, []);

  const onDragOver = (event) => {
    const CurrentTarget = event.currentTarget;
    const results = replace(images, +CurrentTarget.id, QDcurrent);
    setImages(() => results);
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
              {/* -- DRAG&DROP-- */}
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center w-full">
                  {/* --thumbnail upload-- */}
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 rounded-md">
                    <ImageUploading
                      value={ThumbnailImage}
                      onChange={onThumbnailChange}
                      maxNumber={1}
                      maxFileSize={1400000}
                      dataURLKey="data_url"
                      acceptType={['jpg', 'png', 'jpeg', 'webp']}
                      // imgExtension={['.jpg', '.png', '.jpeg', '.webp']}
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                        errors
                      }) => (
                        <div
                          {...dragProps}
                          className={classNames(
                            'w-full',
                            'h-full',
                            'rounded-md',
                            {
                              'bg-green-100': isDragging
                            }
                          )}
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
                            <div
                              role="button"
                              className="flex cursor-pointer justify-center items-center"
                              onClick={onImageUpload}
                            >
                              <div className="flex text-sm text-gray-600 justify-center items-center">
                                <div
                                  className="rounded-md hover:underline font-medium text-indigo-600 
                                  hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 
                                  focus-within:ring-indigo-500"
                                >
                                  <span>Upload image</span>
                                </div>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                            </div>
                            <span className="text-xs text-gray-500">
                              PNG, JPG, webp (make sur it&#39;s high-resolution
                              and less than 1MB)
                            </span>
                          </div>
                          <div className="flex justify-center flex-wrap items-center">
                            {imageList.map((image, index) => (
                              <div
                                key={index}
                                className="card-container rounded m-2"
                              >
                                <div style={{ width: '100px' }}>
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    className="rounded-t"
                                    src={image['data_url'] ?? image}
                                    alt=""
                                    width="100"
                                    height="100"
                                  />
                                </div>
                                <div className="flex justify-center rounded-b border-gray-300 border-solid items-center">
                                  <div
                                    role="button"
                                    className="rounded-bl cursor-pointer text-xs bg-red-400 w-full p-1 text-center hover:bg-red-500 text-white"
                                    onClick={() => onImageRemove(index)}
                                  >
                                    <DeleteSvg width={15} height={15} />
                                  </div>
                                  <div
                                    style={{
                                      height: '100%',
                                      width: '2px',
                                      background: 'gray'
                                    }}
                                  ></div>
                                  <div
                                    role="button"
                                    className="rounded-br cursor-pointer text-xs bg-green-400 w-full p-1 text-center hover:bg-green-500 text-white"
                                    onClick={() => onImageUpdate(index)}
                                  >
                                    <EditSvg
                                      fill="#fff"
                                      width={15}
                                      height={15}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          {errors?.maxFileSize && (
                            <ErrorMessage label="Selected file size exceeds 1.4MB" />
                          )}
                          {errors?.acceptType && (
                            <ErrorMessage label="Your selected file type is not allow use (PNG, JPG, JPEG, webp)." />
                          )}
                        </div>
                      )}
                    </ImageUploading>
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
              {/* -- DRAG&DROP -- */}
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <ImageUploading
                  multiple
                  value={images}
                  onChange={onImageChange}
                  maxFileSize={1400000}
                  maxNumber={20}
                  dataURLKey="data_url"
                  acceptType={['jpg', 'png', 'jpeg', 'webp']}
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                    errors
                  }) => (
                    <div
                      {...dragProps}
                      className={classNames('w-full', 'h-full', 'rounded-md', {
                        'bg-green-100': isDragging
                      })}
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
                        <div
                          role="button"
                          className="flex cursor-pointer justify-center items-center"
                          onClick={onImageUpload}
                        >
                          <div className="flex text-sm text-gray-600 justify-center items-center">
                            <div
                              className="rounded-md hover:underline font-medium text-indigo-600 
                                  hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 
                                  focus-within:ring-indigo-500"
                            >
                              <span>Upload multiple images</span>
                            </div>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">
                          PNG, JPG, JPEG, webp (make sur it&#39;s
                          high-resolution and less than 1MB)
                        </span>
                        <div
                          role="button"
                          className="text-red-700 text-sm cursor-pointer hover:underline"
                          onClick={onImageRemoveAll}
                        >
                          Remove all images
                        </div>
                      </div>
                      <div className="rounded border-solid border-gray-300 border">
                        <div className="flex justify-center items-center px-4 py-3 text-gray-800 bg-gray-100 text-right sm:px-6">
                          <span className="text-sm">
                            Gallery Images (Move to sort)
                          </span>
                        </div>
                        <div className="flex flex-wrap">
                          {imageList.map((image, index) => (
                            <div
                              id={index}
                              draggable={true}
                              onDragEnter={onDragOver}
                              key={index}
                              className="card-container rounded m-2 drag-img-dnd"
                            >
                              <div
                                style={{ width: '100px', height: '100px' }}
                                className="group relative cursor-move"
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  className="rounded-t"
                                  src={image['data_url']}
                                  alt=""
                                  style={{ width: '100px', height: '100px' }}
                                />
                                <span className="absolute cursor-move border border-solid border-green-500 inset-0 opacity-0 group-hover:opacity-100"></span>
                                <span
                                  style={{ width: '18px', height: '18px' }}
                                  className="absolute rounded text-center text-white bg-black top-0 right-0"
                                >
                                  {index + 1}
                                </span>
                              </div>
                              <div className="flex justify-center rounded-b border-gray-300 border-solid items-center">
                                <div
                                  role="button"
                                  className="rounded-bl cursor-pointer text-xs bg-red-400 w-full p-1 text-center hover:bg-red-500 text-white"
                                  onClick={() => onImageRemove(index)}
                                >
                                  <DeleteSvg width={15} height={15} />
                                </div>
                                <div
                                  style={{
                                    height: '100%',
                                    width: '2px',
                                    background: 'gray'
                                  }}
                                ></div>
                                <div
                                  role="button"
                                  className="rounded-br cursor-pointer text-xs bg-green-400 w-full p-1 text-center hover:bg-green-500 text-white"
                                  onClick={() => onImageUpdate(index)}
                                >
                                  <EditSvg fill="#fff" width={15} height={15} />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {errors?.maxFileSize && (
                        <ErrorMessage label="Selected file size exceeds 1.4MB" />
                      )}
                      {errors?.acceptType && (
                        <ErrorMessage label="Your selected file type is not allow use (PNG, JPG, JPEG, webp)." />
                      )}
                      {errors?.maxNumber && (
                        <ErrorMessage label="Number of selected images exceed maxNumber of 20 pictures." />
                      )}
                    </div>
                  )}
                </ImageUploading>
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
    </form>
  );
};

const ErrorMessage = ({ label }) => {
  return (
    <div className="flex items-center m-1 font-medium py-1 px-2 rounded-md text-red-700 bg-red-100 border border-red-300 ">
      <div slot="avatar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-alert-octagon w-5 h-5 mx-2"
        >
          <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <div className="text-sm font-normal  max-w-full flex-initial">
        {label}
      </div>
    </div>
  );
};

export default memo(GalleryUploadByDnD);
