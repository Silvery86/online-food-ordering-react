import { Avatar, AvatarGroup, Box, Card, CardHeader, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantsOrder } from '../../component/State/RestaurantOrder/Action';
import { Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


export const OrderTable = () => {
  const dispatch = useDispatch()
  const restaurant = useSelector(state => state.restaurant)
  const ingredients = useSelector(state => state.ingredients)
  const menu = useSelector(state => state.menu)
  const restaurantOrder = useSelector(state => state.restaurantOrder)
  const jwt = localStorage.getItem("jwt")
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchRestaurantsOrder({
      restaurantId: restaurant.usersRestaurant.id,
      jwt
    }))
  }, [dispatch])
  const handleProcessOrder = ({orderStatus,id}) => {
    if(orderStatus === "PENDING"){
      navigate(`/admin/restaurant/order/${id}`)
    }
  }
  console.log("Orders.....:", restaurantOrder)
  return (
    <Box>
      <Card>
        <CardHeader
          title={"Danh sách đơn hàng"}
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Ảnh</TableCell>
                <TableCell align="right">Khách hàng</TableCell>
                <TableCell align="right">Thanh toán</TableCell>
                <TableCell align="right">Liên hệ</TableCell>
                <TableCell align="right">Địa chỉ</TableCell>
                <TableCell align="right">Trạng thái</TableCell>
                <TableCell align="right">Chi tiết</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantOrder.orders.map((order) => (
                <TableRow
                  key={order.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {order.id}
                  </TableCell>
                  <TableCell align="center">
                    <AvatarGroup max={3}>
                      {order.items.map((item) => <Avatar src={item.food.images[0]} />)}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="right">{order.customer.fullName}</TableCell>
                  <TableCell align="right">{order.totalPrice}</TableCell>
                  <TableCell align="right">{order.customer.email}</TableCell>
                  <TableCell align="right">{order.deliveryAddress.streetAddress}</TableCell>
                  <TableCell align="right">{order.orderStatus}</TableCell>
                  <TableCell align="right">
                    {(() => {
                      switch (order.orderStatus) {
                        case "PENDING":
                          return (
                            <IconButton onClick={() => handleProcessOrder({
                              orderStatus:order.orderStatus,
                              id:order.id
                            })}>
                              <Visibility/>
                            </IconButton>
                          );
                        case "IN_PROGRESS":
                          return (
                            <IconButton component="a" href={`/admin/restaurant/order/${order.id}`}>
                              <Visibility />
                              <span style={{ marginLeft: 5 }}>View Progress</span>
                            </IconButton>
                          );
                        case "COMPLETED":
                          return (
                            <IconButton component="a" href={`/admin/restaurant/order/${order.id}`}>
                              <Visibility />
                              <span style={{ marginLeft: 5 }}>View Details</span>
                            </IconButton>
                          );
                        case "CANCELLED":
                          return (
                            <IconButton component="a" href={`/admin/restaurant/order/${order.id}`}>
                              <Visibility />
                              <span style={{ marginLeft: 5 }}>Order Cancelled</span>
                            </IconButton>
                          );
                        default:
                          return (
                            <IconButton>
                              <Visibility />
                            </IconButton>
                          );
                      }
                    })()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  )
}
