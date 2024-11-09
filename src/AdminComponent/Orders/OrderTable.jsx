import { Avatar, AvatarGroup, Box, Card, CardHeader, Chip, Collapse, Icon, IconButton, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantsOrder} from '../../component/State/RestaurantOrder/Action';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { formatCurrency } from '../../component/util/currencyFormat';
import dayjs from 'dayjs';
import { OrderCard } from './OrderCard';
import { updateOrderStatus } from '../../component/State/Order/Action';

function createData(id, dateTime, totalPrice, address, shippingPhone, status, orderItems) {
  return {
    id,
    dateTime,
    totalPrice,
    address,
    shippingPhone,
    status,
    orderItems: orderItems,
  };
}
export const OrderTable = () => {
  const dispatch = useDispatch()
  const restaurant = useSelector(state => state.restaurant)
  const ingredients = useSelector(state => state.ingredients)
  const menu = useSelector(state => state.menu)
  const order = useSelector(state => state.restaurantOrder)
  const jwt = localStorage.getItem("jwt")
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchRestaurantsOrder({
      restaurantId: restaurant.usersRestaurant.id,
      jwt
    }))
  }, [dispatch])

  const orderList = order.orders


  console.log("Orders.....:", orderList)
  const rows = Array.isArray(orderList)
    ? orderList.map((item) =>
      createData(
        item.id,
        dayjs(item.createdAt).format('DD/MM/YYYY H:m'),
        formatCurrency(item.totalPrice),
        `${item.deliveryAddress.streetAddress} - ${item.deliveryAddress.district} - ${item.deliveryAddress.state}`,
        item.shippingPhone ?? item.customer.phone,
        item.orderStatus,
        item.items,
      )
    )
    : [];
  function handleStatusChange(orderId, newStatus) {
    console.log("ID", orderId)
    console.log("Status", newStatus)  
    dispatch(updateOrderStatus(orderId,newStatus,jwt))
    // Your logic to update the status of the order
    console.log(`Order ID: ${orderId}, New Status: ${newStatus}`);
  }
  const theme = useTheme()
  return (
    <div className='flex w-full items-center flex-col'>

      <div className='space-y-5 w-full'>
        <TableContainer component={Paper}>
          <h1
            style={{ color: theme.palette.primary.main }}
            className='text-xl text-center py-7 font-semibold'>Đơn Hàng Của Bạn</h1>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Thời gian</TableCell>
                <TableCell align="right">Thanh toán</TableCell>
                <TableCell align="right">Địa chỉ giao hàng</TableCell>
                <TableCell align="right">Điện thoại</TableCell>
                <TableCell align="center">Trạng thái</TableCell>
                <TableCell align="center">Xử lý</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <OrderCard key={row.id} row={row} onStatusChange={handleStatusChange} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}
