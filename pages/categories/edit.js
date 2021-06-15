import React from 'react';
import PropTypes from 'prop-types';
import { getAppCookies, verifyToken } from '@/middleware/utils';
import { useRouter } from 'next/router'
import ArrowLeft from '../../assets/svg/arrow-left.svg'

const EditCategory = ({ token, userInfo }) => {
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
                        <span className="uppercase text-sm">Edit name category</span>
                    </div>
                    <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="block">
                            {/* --NAME-- */}
                            <div className="mb-4">
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                    Category name
                                </label>
                                <input
                                    type="text"
                                    name="first_name"
                                    id="first_name"
                                    autoComplete="given-name"
                                    className="mt-1 focus:border-indigo-500 block w-full 
                                    shadow-sm border-2 border-solid border-gray-300 rounded-md p-1"
                                />
                            </div>
                            {/* --DESCRIPTION-- */}
                            <div className="mb-4">
                                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="about"
                                        name="about"
                                        rows={4}
                                        className="shadow-sm border-2 focus:border-indigo-500 mt-1 
                                        block w-full border-solid border-gray-300 rounded-md p-1"
                                        placeholder="This category is awesome"
                                        defaultValue={''}
                                    />
                                </div>
                                <p className="mt-2 text-xs text-gray-500">
                                    Brief description about the category (important for SEO).
                                </p>
                            </div>
                            {/* --PUBLISH-- */}
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        className="h-4 w-4"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="comments" className="font-medium text-gray-700">
                                        Publish
                                    </label>
                                    <p className="text-gray-500 text-xs">
                                        Publish a category and the products under it.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
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


EditCategory.propTypes = {
    token: PropTypes.string,
    userInfo: PropTypes.object
};

export default EditCategory