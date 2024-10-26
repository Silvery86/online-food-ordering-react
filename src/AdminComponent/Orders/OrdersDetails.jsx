import React from 'react'
import { useParams } from 'react-router-dom';

export const OrdersDetails = () => {
    const { id } = useParams();
    console.log("Order Id .....",id)
  return (
    <div>OrdersDetails</div>
  )
}
