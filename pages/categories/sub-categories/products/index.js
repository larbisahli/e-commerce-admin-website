import React from 'react';
import PropTypes from 'prop-types';
import { getAppCookies, verifyToken } from '@/middleware/utils';
import Image from 'next/image'
import { ProductSvg, EditSvg } from '@/components/svg'
import Add from '../../../../assets/svg/add.svg'
import ArrowLeft from '../../../../assets/svg/arrow-left.svg'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Products = ({ token, userInfo }) => {
    const router = useRouter()

    return <div
        className="m-auto product-cart-container mb-20">
        <section className="flex justify-between items-center mx-3 mb-3">
            <button className="flex justify-center items-center 
            bg-green-400 py-2 px-3  rounded-sm hover:shadow-inner shadow-lg hover:bg-green-500" onClick={() => router.back()}>
                <div>
                    <ArrowLeft width={20} height={20} />
                </div>
                <span className="px-1 text-base text-white">Back</span>
            </button>
            <Link href={{
                pathname: '/categories/sub-categories/products/create',
                query: { cid: '1234-5678', scid: '123-000' },
            }}>
                <a>
                    <div className="flex justify-center items-center py-2 px-3 
        bg-blue-600 hover:bg-blue-700 text-white rounded-sm hover:shadow-inner shadow-lg">
                        <div className="pr-1">
                            <Add width={18} height={18} />
                        </div>
                        <span>Add New Product</span>
                    </div>
                </a>
            </Link>
        </section>
        <section className="flex flex-wrap ">
            <ProductCard label="Sub-category-1" />
            <ProductCard label="Sub-Category-2" />
            <ProductCard label="Sub-Category-3" />
            <ProductCard label="Sub-Category-4" />
            <ProductCard label="Sub-Category-5" />
            <ProductCard label="Sub-Category-6" />
            <ProductCard label="Sub-Category-7" />
            <ProductCard label="Sub-Category-8" />
        </section>
    </div>
};

const ProductCard = ({ label }) => {
    return (
        <div style={{ border: 'none' }} className="card-container rounded-md m-3 flex-col product-card-wrapper">
            <div className="">
                <div className="">
                    <Image quality={95} width={250} height={250} className="rounded-t-md bg-blue-100" src="/static/images/test-image.jpg" />
                </div>
                <div className="flex flex-col p-2 ">
                    <span>Product title</span>
                    <span className="text-sm font-light">$10</span>
                </div>
            </div>
            <div style={{ height: "40px" }} className="flex justify-between items-center border-gray-200 border-solid border-t">
                {/* ------ */}
                <Link
                    href={{
                        pathname: '/categories/sub-categories/edit',
                        query: { cid: '1234-5678', scid: '123-456' },
                    }}
                >
                    <a href="/"
                        className="flex justify-center items-center w-full h-full py-1 
                           border-gray-200 border-solid border-l px-1 hover:bg-blue-50 rounded-br-md rounded-bl-md">
                        <div className="py-1">
                            <EditSvg width={25} height={25} />
                        </div>
                        <span className="font-light text-xs">Edit</span>
                    </a>
                </Link>
            </div>
        </div>
    )
}

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

ProductCard.propTypes = {
    label: PropTypes.string,
};

Products.propTypes = {
    token: PropTypes.string,
    userInfo: PropTypes.object
};

export default Products