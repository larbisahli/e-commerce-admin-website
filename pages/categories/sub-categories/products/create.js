import React from 'react';
import PropTypes from 'prop-types';
import { getAppCookies, verifyToken } from '@/middleware/utils';
import { useRouter } from 'next/router'
import ArrowLeft from '../../../../assets/svg/arrow-left.svg'

const NewProduct = ({ token, userInfo }) => {
    const router = useRouter()

    return <div className="form-container">
        <div className="form-wrapper">
            <section className="flex justify-between items-center md:ml-0 ml-2 mb-3">
                <button className="flex justify-center items-center 
            bg-green-400 py-2 px-3  rounded-sm hover:shadow-inner shadow-lg hover:bg-green-500" onClick={() => router.back()}>
                    <div>
                        <ArrowLeft width={20} height={20} />
                    </div>
                    <span className="px-1 text-base text-white">Back</span>
                </button>
            </section>
            <form className="m-auto" action="#" method="POST">
                <div className="shadow overflow-hidden md:rounded-lg card-container rounded-none">
                    <div className="flex justify-center items-center px-4 py-3 text-gray-800 bg-gray-50 text-right sm:px-6">
                        <span className="uppercase text-sm">Create a new Product</span>
                    </div>
                    <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="block">
                            {/* --title-- */}
                            <div className="mb-4">
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                    Product Title
                                </label>
                                <textarea
                                    id="about"
                                    name="about"
                                    rows={3}
                                    className="shadow-sm border-2 focus:border-indigo-500 mt-1 
                                        block w-full border-solid border-gray-300 rounded-md p-1"
                                    placeholder="My product"
                                    defaultValue={''}
                                />
                            </div>
                            {/* --price-- */}
                            <div className="mb-4">
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                    Product Price <span className="text-sm text-gray-500">(USD)</span>
                                </label>
                                <input
                                    type="number"
                                    name="first_name"
                                    id="first_name"
                                    className="mt-1 focus:border-indigo-500 block w-full 
                                    shadow-sm border-2 border-solid border-gray-300 rounded-md p-1"
                                />
                            </div>
                            {/* --shipping_price-- */}
                            <div className="mb-4">
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                    Shipping Price <span className="text-sm text-gray-500">(USD)</span>
                                </label>
                                <input
                                    type="number"
                                    name="first_name"
                                    id="first_name"
                                    className="mt-1 focus:border-indigo-500 block w-full 
                                    shadow-sm border-2 border-solid border-gray-300 rounded-md p-1"
                                />
                            </div>
                            {/* --warehouse_location-- */}
                            <div className="mb-4">
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                    Warehouse Location
                                </label>
                                <textarea
                                    id="about"
                                    name="about"
                                    rows={3}
                                    className="shadow-sm border-2 focus:border-indigo-500 mt-1 
                                        block w-full border-solid border-gray-300 rounded-md p-1"
                                    placeholder="My street"
                                    defaultValue={''}
                                />
                            </div>
                            {/* --stock_count-- */}
                            <div className="mb-4">
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                    Stock Number
                                </label>
                                <input
                                    type="number"
                                    name="first_name"
                                    id="first_name"
                                    className="mt-1 focus:border-indigo-500 block w-full 
                                    shadow-sm border-2 border-solid border-gray-300 rounded-md p-1"
                                />
                            </div>
                            {/* --product_weight-- */}
                            <div className="mb-4">
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                    Product Weight <span className="text-sm text-gray-500">(KG)</span>
                                </label>
                                <input
                                    type="number"
                                    name="first_name"
                                    id="first_name"
                                    className="mt-1 focus:border-indigo-500 block w-full 
                                    shadow-sm border-2 border-solid border-gray-300 rounded-md p-1"
                                />
                            </div>
                            {/* --product_description-- */}
                            <div className="mb-4">
                                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="about"
                                        name="about"
                                        rows={5}
                                        className="shadow-sm border-2 focus:border-indigo-500 mt-1 
                                        block w-full border-solid border-gray-300 rounded-md p-1"
                                        placeholder="This product is awesome"
                                        defaultValue={''}
                                    />
                                </div>
                                <p className="mt-2 text-xs text-gray-500">
                                    Brief description about the product (product details).
                                </p>
                            </div>
                            {/* --short_description-- */}
                            <div className="mb-4">
                                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                    Short Description
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="about"
                                        name="about"
                                        rows={3}
                                        className="shadow-sm border-2 focus:border-indigo-500 mt-1 
                                        block w-full border-solid border-gray-300 rounded-md p-1"
                                        placeholder="This product is awesome"
                                        defaultValue={''}
                                    />
                                </div>
                                <p className="flex flex-col mt-2 text-xs text-gray-500">
                                    <span>Short description about the product (important for SEO).</span>
                                    <span className="text-green-600">{`Must be less than 160 characters | ${100}/160`}</span>
                                </p>
                            </div>
                            {/* --is_active-- */}
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="publish"
                                        name="is_active"
                                        type="checkbox"
                                        className="h-4 w-4"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="publish" className="font-medium text-gray-700">
                                        Publish
                                    </label>
                                    <p className="text-gray-500 text-xs">
                                        Publish the product.
                                    </p>
                                </div>
                            </div>
                            {/* --is_new-- */}
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="unused"
                                        name="is_new"
                                        type="checkbox"
                                        className="h-4 w-4"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="unused" className="font-medium text-gray-700">
                                        Unused
                                    </label>
                                    <p className="text-gray-500 text-xs">
                                        New product or used product.
                                    </p>
                                </div>
                            </div>
                            {/* --images_url-- */}
                            <div className="pt-3">
                                <label className="block text-sm font-medium text-gray-700">Cover photo</label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
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
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div >
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


NewProduct.propTypes = {
    token: PropTypes.string,
    userInfo: PropTypes.object
};

export default NewProduct