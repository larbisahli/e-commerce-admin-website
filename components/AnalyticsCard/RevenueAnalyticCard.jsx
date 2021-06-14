import React, {useEffect, memo} from 'react'
import Card from './Card'
import { RevenueSvg } from '@/components/svg'

const RevenueAnalyticCard = ()=>{

    useEffect(() => {
        // api call
    }, [])

    return <Card color='#1b998b' bg='rgba(27,153,139,.3)' label='Revenue' value='$43,594' percentile={28.4} date="Feb 1 - Apr 1">
        <RevenueSvg width={25} height={25} />
    </Card>
}

export default memo(RevenueAnalyticCard)