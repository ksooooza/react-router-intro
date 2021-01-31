import React, { useState, useEffect } from 'react'

import axios from "axios"

export default function Price() {
  const [price, setPrice] = useState(0)
  
  const apiCall = async () => {
    const data = await axios(`https://api.coindesk.com/v1/bpi/currentprice/${params.currency}.json`)
    setPrice(data.data.bpi[params.currency].rate_float);
  }

  useEffect(() => {
    apiCall()
  }, [])

  return (
    <div>
      <h2>{params.currency}</h2>
      <h2>{price}</h2>
    </div>
  )
}
