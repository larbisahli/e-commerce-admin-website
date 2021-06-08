import React from 'react';
import { CardContainer } from '@/styles/index'
import {
  AnalyticCardsContainer,
  AnalyticsCardIconContainer,
  AnalyticsCardIconWrapper,
  AnalyticsCardTextContainer
} from '@/styles/Pages/dashboard'
import { ChartSvg } from '@/components/svg'

const Dashboard = () => {
  return (
    <div>
      <AnalyticCardsContainer>
        <AnalyticsCard />
        <AnalyticsCard />
        <AnalyticsCard />
        <AnalyticsCard />
      </AnalyticCardsContainer>
    </div>
  )
};

const AnalyticsCard = () => {
  return (
    <CardContainer style={{ margin: '0 1.5em', padding: '5px' }}>
      <AnalyticsCardIconContainer>
        <AnalyticsCardIconWrapper>
          <ChartSvg width={18} height={18} />
        </AnalyticsCardIconWrapper>
        <AnalyticsCardTextContainer>
          Hello
        </AnalyticsCardTextContainer>
      </AnalyticsCardIconContainer>
    </CardContainer>
  )
}

export default Dashboard;
