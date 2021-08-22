/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { memo, useState } from 'react';

import { ImageComponent } from '@/components/index';
import {
  DeleteSvg,
  EmptyBox,
  LoadingSvg,
  Refresh,
  SaveSvg,
  WarningSvg
} from '@/components/svg';
import { Request } from '@/graphql/index';
import { UpdateImageOrderMutation } from '@/graphql/mutations/index';

const HostUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.ADMIN_API_URL
    : 'http://localhost:5001';

const Gallery = ({ token, Notify, thumbnail, gallery, MutateProduct }) => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <div className="bg-white shadow">
      <div
        className="relative flex justify-center items-center px-4 py-3 
           text-gray-800 bg-gray-100 text-right sm:px-6"
      >
        <span className="text-md">Product Thumbnail</span>
        <div className="absolute right-0 flex justify-center items-center">
          <span
            className={classNames(
              'font-medium',
              'p-1',
              'rounded-full',
              'mr-3',
              'text-xs',
              'border',
              'border-solid',
              {
                'text-green-800': !pid,
                'bg-green-300': !pid,
                'border-green-500': !pid,
                'text-yellow-800': pid,
                'bg-yellow-300': pid,
                'border-yellow-500': pid
              }
            )}
          >
            {pid ? 'Update Mode' : 'Create Mode'}
          </span>
          <div
            className="rounded-md cursor-pointer mr-3 border border-solid border-gray-500 bg-green-400 hover:bg-green-500"
            onClick={() => MutateProduct()}
            role="button"
          >
            <Refresh width={20} height={20} />
          </div>
        </div>
      </div>
      {/* Thumbnail */}
      <div className="flex justify-center items-center p-2">
        {thumbnail[0]?.image && (
          <ProductCard
            index={thumbnail[0]?.display_order}
            url={thumbnail[0]?.image}
            image_uid={thumbnail[0]?.image_uid}
            token={token}
            Notify={Notify}
            MutateProduct={MutateProduct}
          />
        )}
        {thumbnail?.length === 0 && (
          <span className="text-gray-500 self-center justify-self-center m-6">
            <EmptyBox width={30} height={30} />
          </span>
        )}
      </div>
      <div
        className="flex justify-center items-center px-4 py-3 
          text-gray-800 bg-gray-100 text-right sm:px-6"
      >
        <span className="text-md">Product Gallery</span>
      </div>
      {/* Gallery */}
      <div className="flex flex-wrap justify-center items-center">
        {gallery?.map(({ image_uid, image, display_order }) => {
          return (
            <ProductCard
              index={display_order}
              key={image_uid}
              url={image}
              image_uid={image_uid}
              token={token}
              Notify={Notify}
              MutateProduct={MutateProduct}
            />
          );
        })}
        {gallery?.length === 0 && (
          <span className="text-gray-500 m-6 self-center justify-self-center">
            <EmptyBox width={30} height={30} />
          </span>
        )}
      </div>
    </div>
  );
};

const ProductCard = memo(
  ({ token, Notify, index, url, image_uid, MutateProduct }) => {
    const [ShowMessageBox, setShowMessageBox] = useState(false);
    const [order, setOrder] = useState(index);
    const [Loading, setLoading] = useState(false);

    const HandleDelete = (e) => {
      e.preventDefault();

      if (image_uid) {
        fetch(`${HostUrl}/api/upload`, {
          method: 'DELETE',
          withCredentials: true,
          credentials: 'include',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ image_uid })
        })
          .then((r) => r.json())
          .then(({ success }) => {
            if (success) {
              Notify(`Image successfully deleted.`, true);
              MutateProduct();
            } else {
              Notify(`Ops, something went wrong.`, false);
            }
          })
          .catch((error) => {
            console.log('error :>> ', error);
            // LOGS
          });
      }

      setShowMessageBox(false);
    };

    const SubmitSort = async (e) => {
      e.preventDefault();

      if (Loading) return;

      if (order > 0) {
        setLoading(true);

        await Request({
          token,
          mutation: UpdateImageOrderMutation,
          variables: {
            image_uid,
            display_order: order
          }
        })
          .then(({ UpdateImageOrder }) => {
            const display_order = UpdateImageOrder?.display_order;
            const message = `Successfully updated image order to position ${display_order}`;
            Notify(message, display_order);
          })
          .catch(({ response }) => {
            const ErrorMessage =
              response?.message ?? response?.errors[0]?.message;
            Notify(ErrorMessage, !response);
          });
      } else {
        Notify('The Order value should not be 0!', false);
      }
      setLoading(false);
    };

    return (
      <div className="card-container m-3 flex-col product-card-wrapper">
        <div className="">
          <div className="relative">
            <ImageComponent
              quality={95}
              width={250}
              height={250}
              alt="product-image"
              className="bg-blue-100 rounded-t"
              url={url}
            />
            {index > 0 && (
              <>
                <div className="flex justify-start items-center pr-1 pl-1">
                  <label
                    htmlFor="order"
                    className="whitespace-nowrap pr-1 text-sm font-medium text-gray-700"
                  >
                    Order:
                  </label>
                  <input
                    required
                    type="number"
                    id="order"
                    min={1}
                    value={order}
                    onChange={(e) => setOrder(() => Number(e.target.value))}
                    className="mt-1 focus:border-indigo-500 w-12
                            shadow-sm border-2 border-solid border-gray-300 rounded"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500 pl-1">
                  Sort your image using order value.
                </p>
              </>
            )}

            <div className="flex justify-center rounded-b border-gray-300 border-solid items-center">
              <button
                className="flex items-center w-full justify-center text-sm p-2 pb-1 bg-red-600 hover:bg-red-700"
                onClick={(e) => {
                  e.preventDefault();
                  setShowMessageBox(true);
                }}
              >
                <DeleteSvg width={25} height={25} />
              </button>
              {index > 0 && (
                <>
                  <div
                    style={{
                      height: '100%',
                      width: '2px',
                      background: 'gray'
                    }}
                  ></div>
                  <button
                    className="flex items-center w-full justify-center text-sm p-2 pb-1 bg-green-600 hover:bg-green-700"
                    onClick={SubmitSort}
                  >
                    {Loading ? (
                      <LoadingSvg width={25} height={25} />
                    ) : (
                      <SaveSvg width={25} height={25} />
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        {ShowMessageBox && (
          <DeleteConfirmation
            setShowMessageBox={setShowMessageBox}
            HandleDelete={HandleDelete}
          />
        )}
      </div>
    );
  }
);

ProductCard.displayName = 'ProductCard';

const DeleteConfirmation = ({ setShowMessageBox, HandleDelete }) => {
  return (
    <div className="z-40 w-full h-full fixed inset-0">
      <div className="z-50 md:w-1/2 w-3/4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 mx-auto my-0 max-w-full ">
        <div className="bg-white rounded shadow-lg border flex flex-col justify-center items-center overflow-hidden px-10 py-10">
          <WarningSvg width={56} height={56} />
          <div className="text-center py-6 text-2xl text-gray-700">
            Are you sure ?
          </div>
          <div className="text-center font-light text-gray-700 mb-8">
            Do you really want to delete this image? This process cannot be
            undone.
          </div>
          <div className="flex justify-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowMessageBox(false);
              }}
              className="bg-gray-300 text-gray-900 rounded hover:bg-gray-200 px-6 py-2 focus:outline-none mx-1"
            >
              Cancel
            </button>
            <button
              onClick={HandleDelete}
              className="bg-red-500 text-gray-200 rounded hover:bg-red-400 px-6 py-2 focus:outline-none mx-1"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-black opacity-50"></div>
    </div>
  );
};

export default memo(Gallery);
