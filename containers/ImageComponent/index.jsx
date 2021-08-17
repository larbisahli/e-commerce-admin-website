import Image from 'next/image';
import React, { memo, useEffect, useState } from 'react'

const ImageComponent = (props) => {

    const [Base64Placeholder, setBase64Placeholder] = useState(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8+utrPQAJNQNlcqdyCgAAAABJRU5ErkJggg=='
    );

    useEffect(() => {
        async function toBase64() {
            const arr = props.url?.split('.');
            const IS_PROD = process.env.NODE_ENV === 'production'
            const URL = IS_PROD ? process.env.MEDIA_URL : process.env.MEDIA_URL_DEV

            try {
                const data = await fetch(`${URL}${arr[0]}_placeholder.${arr[1]}`);
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
            } catch (error) {
                console.log(`Error placeholder fetch :>`, { error })
            }
        }

        if (props.url) toBase64();
    }, [props.url]);

    return (
        <Image
            {...props}
            blurDataURL={Base64Placeholder}
            placeholder="blur"
            alt={props.alt ?? 'product-image'}
            src={`${process.env.MEDIA_URL}${props.url}`}
        />
    );
}

export default memo(ImageComponent);
