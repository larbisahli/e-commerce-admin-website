/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { memo, useState } from 'react';

import { LoadingContainer } from '@/components/index';
import { Request } from '@/graphql/index';
import {
  CreateProductMutation,
  UpdateProductMutation
} from '@/graphql/mutations/index';
import { Logs } from '@/utils/index'

const Form = ({
  ProductState,
  dispatchProduct,
  token,
  Notify,
  Categories,
  HasChange,
  MutateProduct
}) => {
  const router = useRouter();
  const { pid } = router.query;

  const [Loading, setLoading] = useState(false);

  const {
    category_uid,
    account_uid,
    title,
    price,
    discount,
    shipping_price,
    warehouse_location,
    product_description,
    short_description,
    inventory,
    product_weight,
    is_new,
    note
  } = ProductState;

  const HandleInputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    dispatchProduct({
      type: 'insert',
      value: target.type === 'number' ? Number(value) : value,
      field: name
    });
  };

  const SubmitProductDetails = async (e) => {
    e.preventDefault();

    try {
      if (title && price && product_description && !Loading) {
        setLoading(true);

        await Request({
          token,
          mutation: pid ? UpdateProductMutation : CreateProductMutation,
          variables: {
            [pid ? 'product_uid' : 'account_uid']: pid ? pid : account_uid,
            category_uid,
            title,
            price,
            discount,
            shipping_price,
            warehouse_location,
            product_description,
            short_description,
            inventory,
            product_weight,
            is_new,
            note
          }
        })
          .then(({ UpdateProduct, CreateProduct }) => {
            const product_uid =
              CreateProduct?.product_uid ?? UpdateProduct?.product_uid;

            const message = pid
              ? `🚀 Product successfully updated!`
              : `🚀 Product successfully created!`;
            Notify(message, product_uid);

            if (product_uid && !UpdateProduct) {
              router.push({
                pathname: '/product/factory',
                query: { pid: product_uid }
              });

              dispatchProduct({
                type: 'reset'
              });
            } else {
              MutateProduct();
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
      Logs({ message: 'SubmitProductDetails Form.jsx', error })
      Notify('Ops something went wrong.', false);
    }
    setLoading(false);
  };

  const Supported_Countries = [
    {
      country: 'singapore'
    }
  ];

  // const discounted_price = original_price - (original_price * discount / 100)
  const discounted_price = price - (price * discount) / 100;

  return (
    <form className="m-auto" onSubmit={SubmitProductDetails}>
      {Loading && <LoadingContainer />}
      <div
        style={{
          borderTop: '0',
          borderTopLeftRadius: '0',
          borderTopRightRadius: '0'
        }}
        className="shadow overflow-hidden md:rounded-lg card-container rounded-none"
      >
        <div className="relative flex justify-center items-center px-4 py-3 text-gray-800 bg-gray-100 text-right sm:px-6">
          <span className="uppercase text-sm">Create a new Product</span>
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
            {pid ? 'Edit Mode' : 'Create Mode'}
          </span>
        </div>
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="block">
            {/* ******************* title ******************* */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
                <span style={{ color: 'red' }} title="required">
                  *
                </span>
              </label>
              <textarea
                required
                id="title"
                name="title"
                value={title}
                onChange={HandleInputChange}
                rows={3}
                className="shadow-sm border-2 focus:border-indigo-500 mt-1 
                                      block w-full border-solid border-gray-300 rounded-md p-1"
                placeholder="My product title"
              />
            </div>
            {/* ******************* price ******************* */}
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price <span className="text-sm text-gray-500">(USD)</span>
                <span style={{ color: 'red' }} title="required">
                  *
                </span>
              </label>
              <input
                required
                type="number"
                name="price"
                id="price"
                min={0}
                step={0.01}
                value={price}
                onChange={HandleInputChange}
                className="mt-1 focus:border-indigo-500 block w-full 
                                  shadow-sm border-2 border-solid border-gray-300 rounded-md p-1"
              />
            </div>
            {/* ******************* discount ******************* */}
            <div className="mb-4">
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-700"
              >
                Discount
                <span className="text-sm text-gray-500">(%)</span>
              </label>
              <input
                type="number"
                name="discount"
                max={100}
                min={0}
                step={0.01}
                id="discount"
                value={discount}
                onChange={HandleInputChange}
                className="mt-1 focus:border-indigo-500 block w-full 
                                  shadow-sm border-2 border-solid border-gray-300 rounded-md p-1"
              />
              <p className="mt-2 text-xs text-gray-500">
                Product discount percentage number.
                <br /> Final price:
                <span className="mt-2 text-xs text-green-500">
                  {`$${discounted_price.toFixed(1)}`}
                </span>
              </p>
            </div>
            {/* ******************* warehouse_location ******************* */}
            <div className="mb-4">
              <label
                htmlFor="warehouse_location"
                className="block text-sm font-medium text-gray-700"
              >
                Warehouse Location{' '}
                <span style={{ color: 'red' }} title="required">
                  *
                </span>
              </label>
              {/* eslint-disable-next-line jsx-a11y/no-onchange */}
              <select
                id="warehouse_location"
                name="warehouse_location"
                value={warehouse_location}
                onChange={HandleInputChange}
                className="mt-1 block py-2 px-3 border border-solid border-gray-300 bg-white 
                                  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 
                                  focus:border-indigo-500 sm:text-sm w-2/4"
              >
                {Supported_Countries?.map(({ country }, index) => {
                  return (
                    <option key={index} value={index}>
                      {country}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* ******************* inventory ******************* */}
            <div className="mb-4">
              <label
                htmlFor="inventory"
                className="block text-sm font-medium text-gray-700"
              >
                Inventory
              </label>
              <input
                type="number"
                name="inventory"
                id="inventory"
                value={inventory}
                onChange={HandleInputChange}
                className="mt-1 focus:border-indigo-500 block w-full 
                                  shadow-sm border-2 border-solid border-gray-300 rounded-md p-1"
              />
              <p className="mt-2 text-xs text-gray-500">Product quantity.</p>
            </div>
            {/* ******************* product_weight ******************* */}
            <div className="mb-4">
              <label
                htmlFor="product_weight"
                className="block text-sm font-medium text-gray-700"
              >
                Product Weight
                <span className="text-sm text-gray-500">(g)</span>
                <span style={{ color: 'red' }} title="required">
                  *
                </span>
              </label>
              <input
                required
                type="number"
                name="product_weight"
                id="product_weight"
                step={0.01}
                min={0}
                value={product_weight}
                onChange={HandleInputChange}
                className="mt-1 focus:border-indigo-500 block w-full 
                                  shadow-sm border-2 border-solid border-gray-300 rounded-md p-1"
              />
              <p className="mt-2 text-xs text-gray-500">
                Product weight in Gram.
              </p>
            </div>
            {/* ******************* product_description ******************* */}
            <div className="mb-4">
              <label
                htmlFor="product_description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
                <span style={{ color: 'red' }} title="required">
                  *
                </span>
              </label>
              <div className="mt-1">
                <textarea
                  required
                  id="product_description"
                  name="product_description"
                  rows={5}
                  value={product_description}
                  onChange={HandleInputChange}
                  className="shadow-sm border-2 focus:border-indigo-500 mt-1 
                                      block w-full border-solid border-gray-300 rounded-md p-1"
                  placeholder="This product is awesome"
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Detailed description about the product (product details).
              </p>
            </div>
            {/* ******************* short_description ******************* */}
            <div className="mb-4">
              <label
                htmlFor="short_description"
                className="block text-sm font-medium text-gray-700"
              >
                Short Description
                <span style={{ color: 'red' }} title="required">
                  *
                </span>
              </label>
              <div className="mt-1">
                <textarea
                  required
                  id="short_description"
                  name="short_description"
                  rows={3}
                  maxLength={160}
                  value={short_description}
                  onChange={HandleInputChange}
                  className="shadow-sm border-2 focus:border-indigo-500 mt-1 
                                      block w-full border-solid border-gray-300 rounded-md p-1"
                  placeholder="This product is awesome"
                />
              </div>
              <p className="flex mt-2 flex-col text-xs text-gray-500">
                <span>
                  Short description about the product (important for SEO).
                </span>
                <span className="text-green-600">{` (${
                  short_description?.length ?? 0
                }/160 max)`}</span>
              </p>
            </div>
            {/* ******************* category ******************* */}
            <div className="mt-3 mb-5 border-t-2 border-solid border-gray-200 pt-2">
              <label
                htmlFor="category_uid"
                className="block text-sm font-medium text-gray-700"
              >
                Category{' '}
                <span style={{ color: 'red' }} title="required">
                  *
                </span>
              </label>
              {/* eslint-disable-next-line jsx-a11y/no-onchange */}
              <select
                id="category_uid"
                name="category_uid"
                value={category_uid}
                onChange={HandleInputChange}
                className="mt-1 block py-2 px-3 border border-solid border-gray-300 bg-white 
                                  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 
                                  focus:border-indigo-500 sm:text-sm w-2/4"
              >
                {Categories?.map(({ category_uid, category_name }) => {
                  return (
                    <option key={category_uid} value={category_uid}>
                      {category_name}
                    </option>
                  );
                })}
              </select>
              <p className="flex items-center mt-1 text-xs text-gray-500">
                <span>Select a category where this product belongs too.</span>
              </p>
            </div>
            {/* ******************* is_new ******************* */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="is_new"
                  name="is_new"
                  value={is_new}
                  checked={is_new}
                  onChange={HandleInputChange}
                  type="checkbox"
                  className="h-4 w-4"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="is_new" className="font-medium text-gray-700">
                  Unused
                </label>
                <p className="text-gray-500 mt-0 text-xs">
                  New product or used product.
                </p>
              </div>
            </div>
            {/* ******************* note ******************* */}
            <div className="mb-4 mt-4">
              <label
                htmlFor="note"
                className="block text-sm font-medium text-gray-700"
              >
                My Hidden Note
              </label>
              <div className="mt-1">
                <textarea
                  id="note"
                  name="note"
                  rows={3}
                  maxLength={160}
                  value={note ?? ''}
                  onChange={HandleInputChange}
                  className="shadow-sm border-2 focus:border-indigo-500 mt-1 
                                      block w-full border-solid border-gray-300 rounded-md p-1"
                  placeholder="My note about this product"
                />
              </div>
              <p className="flex mt-2 flex-col text-xs text-gray-500">
                <span>
                  Write a note that is only visible to you. (not required)
                </span>
              </p>
            </div>
          </div>
        </div>
        {/* ******************* submit ******************* */}
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

              {
                'bg-green-600': pid && HasChange,
                'hover:bg-green-700': pid && HasChange,
                'focus:ring-2': pid && HasChange,
                'focus:ring-offset-2': pid && HasChange,
                'focus:ring-green-500': pid && HasChange,
                'cursor-pointer': pid && HasChange,
                'cursor-not-allowed': pid && !HasChange,
                'bg-gray-400': pid && !HasChange,
                'focus:ring-indigo-500': !pid,
                'hover:bg-indigo-700': !pid,
                'bg-indigo-600': !pid
              }
            )}
            disabled={pid && !HasChange}
          >
            {pid ? 'Save' : 'Submit'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default memo(Form);
