import Image, { ImageProps } from 'next/image';
import React, { memo, useEffect, useState } from 'react';

import { Logs } from '@/lib/index';

interface Props extends ImageProps {
  src: string;
}

const ImageComponent = (props: Props) => {
  const [Base64Placeholder, setBase64Placeholder] = useState<string>(
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8+utrPQAJNQNlcqdyCgAAAABJRU5ErkJggg=='
  );

  useEffect(() => {
    async function toBase64() {
      const arr: string[] = props.src?.split('.');
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
        })
          .then((res: string) => {
            setBase64Placeholder(res);
            return res;
          })
          .catch((error) => {
            Logs({ message: 'ImageComponent /u', error });
          });
      } catch (error) {
        Logs({ message: 'ImageComponent /d', error });
      }
    }

    if (props.src) toBase64();
  }, [props.src]);

  return (
    <Image
      {...props}
      blurDataURL={Base64Placeholder}
      placeholder="blur"
      alt={props.alt ?? 'product-image'}
      className="object-cover"
      src={`${process.env.MEDIA_URL}${
        props.src ?? '/static/images/no-image-placeholder.svg'
      }`}
    />
  );
};

export default memo(ImageComponent);
