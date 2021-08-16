import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { memo, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { DeleteSvg, WarningSvg } from '@/components/svg';

const HostUrl =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5001';

const Gallery = ({ token, thumbnail, gallery, MutateProduct }) => {
  const router = useRouter();
  const { pid } = router.query;

  console.log('thumbnail, gallery :>> ', { thumbnail, gallery });

  return thumbnail || gallery ? (
    <div className="bg-white shadow">
      <div
        className="relative flex justify-center items-center px-4 py-3 
           text-gray-800 bg-gray-100 text-right sm:px-6"
      >
        <span className="text-md">Product Thumbnail</span>
        <span
          className={classNames(
            'absolute',
            'font-medium',
            'right-0',
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
      </div>
      {/* Thumbnail */}
      <div className="flex justify-center items-center p-2">
        {thumbnail[0]?.image && (
          <ProductCard
            url={thumbnail[0]?.image}
            image_uid={thumbnail[0]?.image_uid}
            token={token}
            MutateProduct={MutateProduct}
          />
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
        {gallery?.map(({ image_uid, image }) => {
          return (
            <ProductCard
              key={image_uid}
              url={image}
              image_uid={image_uid}
              token={token}
              MutateProduct={MutateProduct}
            />
          );
        })}
      </div>
    </div>
  ) : null;
};

const ProductCard = memo(({ url, image_uid, token, MutateProduct }) => {
  const [Base64Placeholder, setBase64Placeholder] = useState(
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8eftXPQAIMgMfS5tX7gAAAABJRU5ErkJggg=='
  );

  const [ShowMessageBox, setShowMessageBox] = useState(false);

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
    async function toBase64() {
      const arr = url?.split('.');
      const data = await fetch(
        `https://dropgala-test.fra1.digitaloceanspaces.com${arr[0]}_placeholder.${arr[1]}`
      );
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

  const HandleDelete = (e) => {
    e.preventDefault();
    console.log('image_uid :>> ', image_uid);

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
          console.log('<<: data :>> ', success);

          if (success) {
            Notify(`Image successfully deleted.`, true);
            MutateProduct();
          } else {
            Notify(`Ops, something went wrong.`, false);
          }
        })
        .catch((error) => {
          console.log('error :>> ', error);
        });
    }

    setShowMessageBox(false);
  };

  return (
    <div className="card-container m-3 flex-col product-card-wrapper">
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
          <button
            className="flex items-center w-full justify-center text-sm p-2 pb-1 bg-red-600 hover:bg-red-700"
            onClick={(e) => {
              e.preventDefault();
              setShowMessageBox(true);
            }}
          >
            <DeleteSvg width={25} height={25} />
          </button>
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
});

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
