import dynamic from 'next/dynamic';
// import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';

import { ArrowAnalyticsSvg } from '@/components/svg';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  // eslint-disable-next-line react/display-name
  loading: () => <div></div>,
  ssr: false
});

// const IsProduction = process.env.NODE_ENV === 'production';
// const LocalHostUrl = IsProduction ? '' : 'http://localhost:5000';

const SalesChart = () => {
  // const [DataSet, setDataSet] = useState();

  const DataSet = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const mediaQueryMatches = useMediaQuery('max-width', 735);

  useEffect(() => {
    console.log('mediaQueryMatches :>> ', mediaQueryMatches);
  }, [mediaQueryMatches]);

  const data = (canvas) => {
    const ctx = canvas.getContext('2d');
    const height = 300;

    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    // gradient.addColorStop(1, 'rgba(54, 162, 235, 0.05)');
    // gradient.addColorStop(0.75, 'rgba(54, 162, 235, 0.1)');
    // gradient.addColorStop(0.5, 'rgba(54, 162, 235, 0.2)');
    // gradient.addColorStop(0.25, 'rgba(54, 162, 235, 0.3)');
    // gradient.addColorStop(0, 'rgba(54, 162, 235, 0.4)');

    gradient.addColorStop(1, 'rgba(92, 150, 0, 0.1)');
    gradient.addColorStop(0.75, 'rgba(92, 150, 0, 0.2)');
    gradient.addColorStop(0.5, 'rgba(63, 150, 0, 0.4)');
    gradient.addColorStop(0.25, 'rgba(63, 150, 0, 0.5)');
    gradient.addColorStop(0, 'rgba(62, 150, 0, 0.6)');

    return {
      labels: DataSet,
      datasets: [
        {
          label: 'Sales',
          data: [2, 4, 3, 6, 7, 8, 10],
          backgroundColor: gradient,
          borderColor: '#17a5ce',
          borderWidth: 3,
          fill: true,
          pointColor: '#fff',
          pointBackgroundColor: '#17a5ce',
          pointHighlightFill: '#fff',
          cubicInterpolationMode: 'monotone',
          tension: 0.4
        }
      ]
    };
  };

  return (
    <div className="flex justify-center flex-col">
      <div className="p-5 flex justify-between items-center">
        <div className="flex justify-center flex-col">
          <span className="text-xl">Total Sales</span>
          <span className="text-2xl py-2 font-medium">$43.594</span>
          <div className="text-sm flex justify-center items-center">
            <span className="font-light">Since last week</span>
            <div className="text-green-500 px-0.5">
              <ArrowAnalyticsSvg width={13} height={13} />
            </div>
            <span className="text-green-500">10.4%</span>
          </div>
        </div>
        <div className="">
          <button className="py-2 px-3 rounded-tl rounded-bl border border-solid border-gray-400">
            Month
          </button>
          <button className="py-2 px-3 rounded-tr rounded-br border border-solid border-gray-400 bg-blue-300 border-l-0">
            Week
          </button>
        </div>
      </div>
      <div className="p-3 border-blue-200 border-t border-solid sales-chart-size-response">
        <Line
          height={80}
          width={300}
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            color: '#222',
            animations: {
              easing: 'easeInOutQuad',
              duration: 520,
              radius: {
                duration: 400,
                easing: 'linear',
                loop: (context) => context.active
              }
            },
            hoverRadius: 8,
            hoverBackgroundColor: '#17a5ce',
            plugins: {
              legend: {
                display: false,
                labels: {
                  font: {
                    size: 14
                  }
                }
              },
              title: {
                display: false,
                text: 'chartjs',
                color: '#222'
              }
            },
            scales: {
              y: {
                display: false,
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Quiz Takers Count',
                  color: '#fff'
                },
                ticks: {
                  color: '#ffff',
                  precision: 0,
                  stepSize: 1
                }
              },
              x: {
                ticks: {
                  color: '#222'
                }
              }
            },
            interaction: {
              intersect: false,
              mode: 'index'
            },
            elements: {
              point: {
                radius: mediaQueryMatches ? 2 : 3,
                display: true
              }
            }
          }}
        />
      </div>
    </div>
  );
};

SalesChart.propTypes = {};

export default memo(SalesChart);
