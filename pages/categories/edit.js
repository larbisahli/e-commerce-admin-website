import classNames from 'classnames';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import useSWR, { mutate } from 'swr';

import { LoadingSvg } from '@/components/svg';
import { UserStoreContext } from '@/context/UserStore';
import { Request } from '@/graphql/index';
import { UpdateCategoryMutation } from '@/graphql/mutations/index';
import { GetCategoryQuery } from '@/graphql/queries/index';
import { getAppCookies, verifyToken } from '@/middleware/utils';
import { Logs } from '@/utils/index'

import ArrowLeft from '../../assets/svg/arrow-left.svg';

const EditCategory = ({ token, userInfo }) => {
  const router = useRouter();
  const { cid } = router.query;

  const [, setUserStore] = useContext(UserStoreContext);

  const variables = useMemo(() => {
    return { category_uid: cid };
  }, [cid]);

  const { data, error } = useSWR([token, GetCategoryQuery, variables]);

  const [Loading, setLoading] = useState(false);

  const [{ category_name, category_description, is_active }, setState] =
    useState({
      category_name: '',
      category_description: '',
      is_active: false
    });

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
    if (data?.Category?.category_name) {
      setState({
        category_name: data?.Category?.category_name,
        category_description: data?.Category?.category_description,
        is_active: data?.Category?.is_active
      });
    } else if (error) {
      Logs({ message: 'useEffect /edit', error })
    }
  }, [data, error]);

  useEffect(() => {
    const { account_uid, email, first_name, last_name, username, profile_img, privileges } = userInfo;
    setUserStore((prev) => {
      return { ...prev, account_uid, email, first_name, last_name, username, profile_img, privileges };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUserStore, userInfo]);

  const HandleInputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setState((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const SubmitForm = async (e) => {
    e.preventDefault();

    try {
      if (cid && category_name && category_description && !Loading) {
        setLoading(true);

        await Request({
          token,
          mutation: UpdateCategoryMutation,
          variables: {
            category_uid: cid,
            category_name,
            category_description,
            is_active
          }
        })
          .then(({ UpdateCategory }) => {
            const CategoryName = UpdateCategory?.category_name;

            if (CategoryName) {
              Notify(
                `Category '${CategoryName}' successfully updated!`,
                UpdateCategory
              );
              mutate([token, GetCategoryQuery, variables]);
            }
          })
          .catch(({ response }) => {
            const ErrorMessage =
              response?.message ?? response?.errors[0]?.message;
            Notify(ErrorMessage, !response);
          });
      } else {
        Notify('Fields should not be empty!', false);
      }
    } catch (error) {
      Logs({ message: 'SubmitForm /edit', error })
      Notify('Ops something went wrong.', false);
    }
    setLoading(false);
  };

  const HasChange = useMemo(() => {
    if (data) {
      if (data?.Category?.category_name !== category_name) return true;
      if (data?.Category?.category_description !== category_description)
        return true;
      if (data?.Category?.is_active !== is_active) return true;
    }
    return false;
  }, [data, category_name, category_description, is_active]);

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <section className="flex justify-between items-center md:ml-0 ml-2 mb-3">
          <button
            className="flex justify-center items-center 
            bg-green-400 py-2 px-3  rounded-sm hover:shadow-inner shadow-lg hover:bg-green-500"
            onClick={() => router.back()}
          >
            <div>
              <ArrowLeft width={20} height={20} />
            </div>
            <span className="px-1 text-base text-white">Back</span>
          </button>
        </section>
        <form className="m-auto" onSubmit={SubmitForm}>
          {Loading && (
            <div
              className="absolute bg-black bg-opacity-10 rounded-lg inset-0 flex 
            justify-center items-center"
            >
              <LoadingSvg width={80} height={80} />
            </div>
          )}
          <div className="shadow overflow-hidden md:rounded-lg card-container rounded-none">
            <div className="relative flex justify-center items-center px-4 py-3 text-gray-800 bg-gray-50 text-right sm:px-6">
              <span className="uppercase text-sm">Edit name category</span>
              <span className="absolute font-medium right-0 p-1 rounded-full mr-3 text-xs border border-solid text-yellow-800 bg-yellow-300 border-yellow-500">
                Edit Mode
              </span>
            </div>
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="block">
                {/* --NAME-- */}
                <div className="mb-4">
                  <label
                    htmlFor="category_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category name
                  </label>
                  <input
                    type="text"
                    id="category_name"
                    name="category_name"
                    value={category_name}
                    onChange={HandleInputChange}
                    className="mt-1 focus:border-indigo-500 block w-full 
                                    shadow-sm border-2 border-solid border-gray-300 rounded-md p-1"
                  />
                </div>
                {/* --DESCRIPTION-- */}
                <div className="mb-4">
                  <label
                    htmlFor="category_description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="category_description"
                      name="category_description"
                      rows={4}
                      value={category_description}
                      onChange={HandleInputChange}
                      className="shadow-sm border-2 focus:border-indigo-500 mt-1 
                                        block w-full border-solid border-gray-300 rounded-md p-1"
                      placeholder="This category is awesome"
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
                      id="is_active"
                      name="is_active"
                      checked={is_active}
                      onChange={HandleInputChange}
                      type="checkbox"
                      className="h-4 w-4"
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
                      Publish a category and the products under it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className={classNames(
                  'inline-flex',
                  'justify-center',
                  'py-2',
                  'px-4',
                  'border',
                  'border-transparent',
                  'shadow-sm',
                  'text-sm',
                  'font-medium',
                  'rounded-md',
                  'text-white',
                  'focus:outline-none',
                  'bg-gray-400',
                  {
                    'bg-green-600': HasChange,
                    'hover:bg-green-700': HasChange,
                    'focus:ring-2': HasChange,
                    'focus:ring-offset-2': HasChange,
                    'focus:ring-green-500': HasChange,
                    'cursor-pointer': HasChange,
                    'cursor-not-allowed': !HasChange
                  }
                )}
                disabled={!HasChange}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const { req } = context;
    const { token } = getAppCookies(req);
    const userInfo = token ? verifyToken(token) : null;

    if (!userInfo) {
      return {
        redirect: {
          permanent: false,
          destination: '/'
        }
      };
    }

    return {
      props: {
        token,
        userInfo
      }
    };
  } catch (error) {
    console.log(`getServerSideProps error :>`, error);
    return {
      props: {
        error
      }
    };
  }
}

EditCategory.propTypes = {
  token: PropTypes.string,
  userInfo: PropTypes.object
};

export default EditCategory;
