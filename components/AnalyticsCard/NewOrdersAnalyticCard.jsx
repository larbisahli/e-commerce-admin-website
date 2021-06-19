import React, { memo, useEffect } from 'react';

import { ChartSvg } from '@/components/svg';

import Card from './Card';

const NewOrdersAnalyticCard = () => {
  useEffect(() => {
    // api call
  }, []);

  return (
    <Card
      color="#61dafb"
      bg="rgba(97,218,251,.3)"
      label="New Orders"
      value={12}
      percentile={20}
      date="Feb 1 - Apr 1"
    >
      <ChartSvg width={25} height={25} />
    </Card>
  );
};

export default memo(NewOrdersAnalyticCard);
