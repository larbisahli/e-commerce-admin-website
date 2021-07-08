import { useRouter } from 'next/router';
import React, { memo, useEffect, useState } from 'react';
import useSWR from 'swr';

import { LoadingContainer } from '@/components/index';
import { Request } from '@/graphql/index';
import { CreateProductMutation, UpdateProductMutation } from '@/graphql/mutations/product';
import { GetCategoriesQuery } from '@/graphql/queries/category';

const Form = ({ ProductState, dispatchProduct, token, Notify }) => {
  
  const router = useRouter();
  const { cid, pid } = router.query;

  const { data } = useSWR([token, GetCategoriesQuery]);
  
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
    available_sizes,
    available_colors,
    size,
    color,
    is_new
  } = ProductState;

  console.log(`<data>`, { data, cid, pid });

  useEffect(() => {
    const Default_cid = data?.Categories[0]?.category_uid;
    if (cid || Default_cid) {
      dispatchProduct({
        type: 'insert',
        value: cid ?? Default_cid,
        field: 'category_uid'
      });
    }
  }, [cid, data, dispatchProduct]);

  useEffect(() => {
    if(pid){
    //   dispatchProduct({
    //   type: 'populate',
    //   product: {},
    // });
    }
  }, [pid])

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
          mutation: pid ? UpdateProductMutation: CreateProductMutation,
          variables: {
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
            available_sizes,
            available_colors,
            size,
            color,
            is_new
          }
        })
          .then(({ CreateProduct }) => {
            const product_uid = CreateProduct?.product_uid;
            
            const message = pid? `🚀 Product successfully updated`:`🚀 Product successfully created`
            Notify(message, product_uid);

            if (product_uid) {
              dispatchProduct({
                type: 'reset'
              });
            }
          })
          .catch(({ response }) => {
            const ErrorMessage =
              response?.message ?? response?.errors[0]?.message;
            Notify(ErrorMessage, !response);
            // LOGS
          });
      } else {
        Notify('Fields should not be empty!', false);
      }
    } catch (err) {
      console.log(`Error =>`, err);
      Notify('Ops something went wrong.', false);
      // LOGS
    }
    setLoading(false);
  };

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
        <div className="flex justify-center items-center px-4 py-3 text-gray-800 bg-gray-100 text-right sm:px-6">
          <span className="uppercase text-sm">Create a new Product</span>
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
                placeholder="My product"
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
                id="discount"
                value={discount}
                onChange={HandleInputChange}
                className="mt-1 focus:border-indigo-500 block w-full 
                                  shadow-sm border-2 border-solid border-gray-300 rounded-md p-1"
              />
              <p className="mt-2 text-xs text-gray-500">
                Product discount percentage number.
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
              <textarea
                required
                id="warehouse_location"
                name="warehouse_location"
                rows={3}
                value={warehouse_location}
                onChange={HandleInputChange}
                className="shadow-sm border-2 focus:border-indigo-500 mt-1 
                                      block w-full border-solid border-gray-300 rounded-md p-1"
                placeholder="My street"
              />
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
                <span className="text-green-600">{` (${short_description.length}/160 max)`}</span>
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
                {data?.Categories?.map(({ category_uid, category_name }) => {
                  return (
                    <option key={category_uid} value={category_uid}>
                      {category_name}
                    </option>
                  );
                })}
                {/* <option value='368cb456-6c4b-4aac-8aab-33da7701e483'>OWO</option> */}
              </select>
              <p className="flex items-center mt-1 text-xs text-gray-500">
                <span>Select a category where this product belongs too.</span>
              </p>
            </div>
            {/* ******************* available_sizes ******************* */}
            <div className="mb-4">
              <label
                htmlFor="available_sizes"
                className="block text-sm font-medium text-gray-700"
              >
                Available Sizes
              </label>
              <textarea
                id="available_sizes"
                name="available_sizes"
                rows={2}
                value={available_sizes}
                onChange={HandleInputChange}
                placeholder="e.g: S, M, L, XL, XXL, XXXL, ...etc"
                className="shadow-sm border-2 focus:border-indigo-500 mt-1 
                                      block w-full border-solid border-gray-300 rounded-md p-1"
              />
              <p className="flex items-center mt-1 text-xs text-gray-500">
                <span>
                  Add multiple sizes available for this product, separate sizes
                  by comma(,) (not required).
                </span>
              </p>
            </div>
            {/* ******************* size ******************* */}
            <div className="mb-4">
              <label
                htmlFor="size"
                className="block text-sm font-medium text-gray-700"
              >
                Size
              </label>
              <input
                type="text"
                name="size"
                id="size"
                value={size}
                onChange={HandleInputChange}
                className="mt-1 focus:border-indigo-500 block w-full 
                                  shadow-sm border-2 border-solid border-gray-300 rounded-md p-1"
              />
              <p className="flex flex-col mt-2 text-xs text-gray-500">
                <span>Product size (not required).</span>
              </p>
            </div>
            {/* ******************* available_colors ******************* */}
            <div className="mb-4">
              <label
                htmlFor="available_colors"
                className="block text-sm font-medium text-gray-700"
              >
                Available Colors
              </label>
              <textarea
                id="available_colors"
                name="available_colors"
                rows={2}
                value={available_colors}
                onChange={HandleInputChange}
                className="shadow-sm border-2 focus:border-indigo-500 mt-1 
                                      block w-full border-solid border-gray-300 rounded-md p-1"
                placeholder="e.g: black, red, orange, green, ...etc"
              />
              <p className="flex items-center mt-1 text-xs text-gray-500">
                <span>
                  Add multiple colors available for this product, separate
                  colors by comma(,) (not required).
                </span>
              </p>
            </div>
            {/* ******************* color ******************* */}
            <div className="mb-4">
              <label
                htmlFor="size"
                className="block text-sm font-medium text-gray-700"
              >
                Color
              </label>
              <input
                type="text"
                name="color"
                id="color"
                value={color}
                onChange={HandleInputChange}
                className="mt-1 focus:border-indigo-500 block w-full 
                                  shadow-sm border-2 border-solid border-gray-300 rounded-md p-1"
              />
              <p className="flex flex-col mt-2 text-xs text-gray-500">
                <span>Product color (not required).</span>
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
          </div>
        </div>
        {/* ******************* submit ******************* */}
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
  );
};

export default memo(Form);
