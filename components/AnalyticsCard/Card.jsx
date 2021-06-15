import React from 'react'
import { ArrowAnalyticsSvg } from '@/components/svg'
import PropTypes from 'prop-types';

const Card = ({ children, color, bg, label, value, percentile, date }) => {
  return (
    <div className="card-container rounded-lg m-3 px-4 p-1">
      <div className="flex justify-start ms:justify-center items-center">
        <div className="w-16 h-16 rounded flex justify-center items-center m-7" style={{ color, backgroundColor: bg }}>
          {children}
        </div>
        <div className="flex justify-center flex-col py-2 px-3">
          <span className="py-1 text-xl">{label}</span>
          <span className="py-1 text-2xl">{value}</span>
          <div className="text-xs py-1">
            <span>{date}</span>
          </div>
          <div className="text-xs flex justify-center items-center">
            <div className="text-green-500 pr-0.5">
              <ArrowAnalyticsSvg width={13} height={13} />
            </div>
            <span className="text-green-500 text-sm">{`${percentile}%`}</span>
            <span className="px-1">Since last month</span>
          </div>
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
    children: PropTypes.element,
    color: PropTypes.string,
    bg: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.number,
    date: PropTypes.string,
    percentile: PropTypes.number,
};

export default Card