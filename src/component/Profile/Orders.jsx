import React, { useEffect } from 'react'
import OrderCard from './OrderCard'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserOrders } from '../State/Order/Action';

const Orders = () => {
  const auth = useSelector(store => store.auth);
  const cart = useSelector(store => store.cart);
  const order = useSelector(store => store.order);
  const navigate = useNavigate(); 
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getUserOrders(jwt))
  },[auth.jwt || jwt]) 
  console.log("Oder:",order)
  return (
    <div className='flex items-center flex-col'>
      <h1 className='text-xl text-center py-7 font-semibold'>Đơn Hàng Của Bạn</h1>
      <div className='space-y-5 w-full lg:w-1/2'>
      {
        order.orders.map((order) => order.items.map((item) => <OrderCard order={order} item={item}/>))
      }
      </div>
    </div>
  )
}

export default Orders