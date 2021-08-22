import Image from 'next/image';
import React, { memo, useEffect, useState } from 'react';

import { Logs } from '@/lib/index';

const ImageComponent = (props) => {
  const [Base64Placeholder, setBase64Placeholder] = useState(
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8+utrPQAJNQNlcqdyCgAAAABJRU5ErkJggg=='
  );

  useEffect(() => {
    async function toBase64() {
      const arr = props.url?.split('.');
      const IS_PROD = process.env.NODE_ENV === 'production';
      const URI = IS_PROD ? process.env.MEDIA_URL : process.env.MEDIA_URL_DEV;
      const URL = arr ? `${URI}${arr[0]}_placeholder.${arr[1]}` : '';

      try {
        const data = await fetch(URL);
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
          setBase64Placeholder(res);
          return res;
        }).catch(error=>{
          Logs({ message: 'ImageComponent /u', error });
        })
      } catch (error) {
        Logs({ message: 'ImageComponent /d', error });
      }
    }

    if (props.url) toBase64();
  }, [props.url]);

  return (
    <Image
      // object-fit: cover;
      {...props}
      blurDataURL={Base64Placeholder}
      placeholder="blur"
      alt={props.alt ?? 'product-image'}
      className="object-cover"
      src={`${process.env.MEDIA_URL}${props.url ?? '/'}`}
    />
  );
};

export default memo(ImageComponent);
