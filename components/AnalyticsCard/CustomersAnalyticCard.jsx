import React, {useEffect,memo} from 'react'
import Card from './Card'
import { ChartSvg } from '@/components/svg'

const CustomersAnalyticCard = ()=>{

    useEffect(() => {
        // api call
    }, [])

    return <Card color='#61dafb' bg='rgba(97,218,251,.3)' label='Customers' value='324k' percentile={20} date="Feb 1 - Apr 1">
        <ChartSvg width={25} height={25} />
    </Card>
}

export default memo(CustomersAnalyticCard)