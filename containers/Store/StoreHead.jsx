import React from 'react';

import { FilterSvg } from '@/components/svg';

const StoreHead = () => {
  return (
    <section className="mb-4 w-full">
      {/* Input container */}
      <div className="flex">
        {/* Filter btn */}
        <button
          type="button"
          className="bg-green-100 text-gray-600 rounded p-2 mr-5 md:mr-10 hover:bg-green-200 shadow-sm 
          flex justify-center items-center"
        >
          <span>Filters</span>
          <div className="pl-1">
            <FilterSvg width={15} height={15} />
          </div>
        </button>
        {/* Input Search */}
        <input
          type="text"
          style={{ background: '#fff', borderColor: '#dadada' }}
          className="rounded shadow-sm border-solid border-2 p-2 w-full"
          placeholder="Search for Products..."
          id="search-filter"
        />
      </div>
    </section>
  );
};

export default StoreHead;
