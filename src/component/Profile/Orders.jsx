import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserOrders } from '../State/Order/Action';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import { formatCurrency } from '../util/currencyFormat';
import { StatusSwithcher } from './StatusSwithcher';
import { useTheme } from '@emotion/react';

function createData(dateTime, totalPrice, address, shippingPhone, status, orderItems) {
  return {
    dateTime,
    totalPrice,
    address,
    shippingPhone,
    status,
    orderItems: orderItems,
  };
}
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.dateTime}
        </TableCell>
        <TableCell align="right">{row.totalPrice}</TableCell>
        <TableCell align="right">{row.address}</TableCell>
        <TableCell align="right">{row.shippingPhone}</TableCell>
        <TableCell align="center"><StatusSwithcher status={row.status}/></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 60, paddingTop: 0}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Chi tiết đơn hàng
              </Typography>
              <Table size="large" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align='left'>Ảnh</TableCell>
                    <TableCell align='left'>Tên món</TableCell>
                    <TableCell align='center'>Đơn giá</TableCell>
                    <TableCell align="center">Số lượng</TableCell>
                    <TableCell align="right">Tổng</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.orderItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell component="th" scope="row" align='center'>
                        <img
                          className="w-[6rem] h-[6rem] object-cover rounded-xl"
                          src={item.food.images[0]}
                          alt={item.food.name}
                        />
                      </TableCell>
                      <TableCell align='left'>{item.food.name}</TableCell>
                      <TableCell align="center">{formatCurrency(item.food.price)}</TableCell>
                      <TableCell align="center">
                        {item.quantity}
                      </TableCell>
                      <TableCell align='right'>
                          {formatCurrency(item.totalPrice)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    totalPrice: PropTypes.string.isRequired,
    shippingPhone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    orderItems: PropTypes.isRequired,
    dateTime: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};



const Orders = () => {
  const auth = useSelector(store => store.auth);
  const cart = useSelector(store => store.cart);
  const order = useSelector(store => store.order);
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrders(jwt))
  }, [auth.jwt || jwt])

  const orderList = order.orders
  // console.log("Oder:", orderList)
  const rows = orderList.map((item) =>
    createData(
      dayjs(item.createdAt).format('DD/MM/YYYY H:m'),
      formatCurrency(item.totalPrice),
      `${item.deliveryAddress.streetAddress} - ${item.deliveryAddress.district} - ${item.deliveryAddress.state}`,
      item.shippingPhone ?? item.customer.phone,
      item.orderStatus,
      item.items
    ))
    const theme = useTheme()
  return (
    <div className='flex w-full items-center flex-col h-[100%]'>     
      <div className='space-y-5 w-full'>
        <TableContainer component={Paper}>
        <h1 
        style={{color : theme.palette.primary.main}}
        className='hidden md:block text-xl text-center py-7 font-semibold'>Đơn Hàng Của Bạn</h1>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Thời gian</TableCell>
                <TableCell align="center">Thanh toán</TableCell>
                <TableCell align="center">Địa chỉ giao hàng</TableCell>
                <TableCell align="center">Điện thoại</TableCell>
                <TableCell align="center">Trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>      
      </div>
    </div>
  )
}

export default Orders