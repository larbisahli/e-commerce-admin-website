import React, { useState } from 'react'
import { PageLoading } from '@/containers/index';

// LOGIN PAGE

export default function Home() {

  const [PageIsLoading, setPageIsLoading] = useState(true)

  return <div>{/* {PageIsLoading && <PageLoading />} */}</div>;
}
