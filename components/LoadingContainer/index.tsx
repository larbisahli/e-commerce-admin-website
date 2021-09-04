import React from 'react';

import { LoadingSvg } from '@/components/svg';

type Props = {
  WithProgressBar?: boolean;
  Progress?: number;
};

export default function LoadingContainer({ WithProgressBar, Progress }: Props) {
  return (
    <div className="fixed z-50 w-full bg-black bg-opacity-10 rounded-lg inset-0 flex justify-center items-center">
      <div className="flex min-w-1/4 justify-center flex-col items-center">
        <LoadingSvg width={80} height={80} />
        {WithProgressBar && (
          <div className="relative pt-1 w-full">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-black bg-green-200">
                  Task in progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-black">
                  {`${Progress.toFixed(1)}%`}
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
              <div
                style={{ width: `${Progress}%` }}
                className="shadow-none flex transition-all duration-100 ease-linear flex-col text-center whitespace-nowrap text-white justify-center bg-green-800"
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
