import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef } from 'react';

import { UserStoreContext } from '@/context/UserStore';
import { getAppCookies, verifyToken } from '@/middleware/utils';

import ArrowLeft from '../../../assets/svg/arrow-left.svg';

const NewCategory = ({ token, userInfo }) => {
  const router = useRouter();
  const subCategoryNameRef = useRef(null);
  const subCategoryDescriptionRef = useRef(null);
  const IsActiveRef = useRef(null);
  const [, setUserStore] = useContext(UserStoreContext);

  console.log(`======>`, { token });

  useEffect(() => {
    const { account_uid, email, first_name, last_name, privileges } = userInfo;
    setUserStore((prev) => {
      return { ...prev, account_uid, email, first_name, last_name, privileges };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUserStore, userInfo]);

  const SubmitForm = async (e) => {
    e.preventDefault();
    console.log(`subCategoryNameRef`, subCategoryNameRef.current.value);
    console.log(
      `subCategoryDescriptionRef`,
      subCategoryDescriptionRef.current.value
    );
    console.log(`IsActiveRef`, IsActiveRef.current.checked);
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <section className="flex justify-between items-center md:ml-0 ml-2 mb-3">
          <button
            className="flex justify-center items-center 
            bg-green-400 py-2 px-3 rounded-sm hover:shadow-inner shadow-lg hover:bg-green-500"
            onClick={() => router.back()}
          >
            <div>
              <ArrowLeft width={20} height={20} />
            </div>
            <span className="px-1 text-base text-white">Back</span>
          </button>
        </section>
        <form className="m-auto" onSubmit={SubmitForm}>
          <div className="shadow overflow-hidden md:rounded-lg card-container rounded-none">
            <div className="flex justify-center items-center px-4 py-3 text-gray-800 bg-gray-50 text-right sm:px-6">
              <span className="uppercase text-sm">
                Create a new Sub-category
              </span>
            </div>
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="block">
                {/* --NAME-- */}
                <div className="mb-4">
                  <label
                    htmlFor="sub_category_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Sub-category name
                  </label>
                  <input
                    type="text"
                    name="sub_category_name"
                    id="sub_category_name"
                    ref={subCategoryNameRef}
                    className="mt-1 focus:border-indigo-500 block w-full 
                                    shadow-sm border-2 border-solid border-gray-300 rounded-md p-1"
                  />
                </div>
                {/* --DESCRIPTION-- */}
                <div className="mb-4">
                  <label
                    htmlFor="sub_category_description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="sub_category_description"
                      name="sub_category_description"
                      rows={4}
                      ref={subCategoryDescriptionRef}
                      className="shadow-sm border-2 focus:border-indigo-500 mt-1 
                                        block w-full border-solid border-gray-300 rounded-md p-1"
                      placeholder="This sub-category is awesome"
                      defaultValue={''}
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Brief description about the sub-category (important for
                    SEO).
                  </p>
                </div>
                {/* --PUBLISH-- */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      name="is_active"
                      id="is_active"
                      type="checkbox"
                      className="h-4 w-4"
                      ref={IsActiveRef}
                      defaultChecked={true}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="is_active"
                      className="font-medium text-gray-700"
                    >
                      Publish
                    </label>
                    <p className="text-gray-500 text-xs">
                      Publish a sub-category and the products under it.
                    </p>
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
    </div>
  );
};

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

NewCategory.propTypes = {
  token: PropTypes.string,
  userInfo: PropTypes.object
};

export default NewCategory;
