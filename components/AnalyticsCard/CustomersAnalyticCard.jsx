import React, { memo, useEffect } from 'react';

import { ChartSvg } from '@/components/svg';

import Card from './Card';

const CustomersAnalyticCard = () => {
  useEffect(() => {
    // api call
  }, []);

  return (
    <Card
      color="#61dafb"
      bg="rgba(97,218,251,.3)"
      label="Customers"
      value={340}
      percentile={20}
      date="Feb 1 - Apr 1"
    >
      <ChartSvg width={25} height={25} />
    </Card>
  );
};

export default memo(CustomersAnalyticCard);
