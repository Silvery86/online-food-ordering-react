import { Box, Chip, Collapse, IconButton, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTheme } from '@emotion/react';
import { formatCurrency } from '../../component/util/currencyFormat';
import { StatusSwithcher } from '../../component/Profile/StatusSwithcher';
import { AddTask, Cancel, CheckCircle, Moped } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateOrderStatus } from '../../component/State/RestaurantOrder/Action';



export const OrderCard = ({ row, onStatusChange }) => {
    OrderCard.propTypes = {
        row: PropTypes.shape({
            totalPrice: PropTypes.string.isRequired,
            shippingPhone: PropTypes.string.isRequired,
            address: PropTypes.string.isRequired,
            orderItems: PropTypes.array.isRequired,
            dateTime: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
        }).isRequired,
        onStatusChange: PropTypes.func.isRequired,
    };
    const jwt = localStorage.getItem("jwt")

    const [open, setOpen] = React.useState(false);
    const theme = useTheme()

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
                <TableCell align="center"><StatusSwithcher status={row.status} /></TableCell>
                <TableCell align="center">
                    <div>
                        {(() => {
                            switch (row.status) {
                                case "PAID":
                                    return (
                                        <div>
                                            <IconButton onClick={() => onStatusChange(row.id, "PREPARED")}>
                                                <AddTask color='success' />
                                            </IconButton>
                                            <IconButton onClick={() => onStatusChange(row.id, "CANCEL")}>
                                                <Cancel color='error' />
                                            </IconButton>
                                        </div>
                                    );
                                case "PREPARED":
                                    return (
                                        <div>
                                            <IconButton onClick={() => onStatusChange(row.id, "OUT_FOR_DELIVERY")}>
                                                <Moped color='success' />
                                            </IconButton>
                                            <IconButton onClick={() => onStatusChange(row.id, "CANCEL")}>
                                                <Cancel color='error' />
                                            </IconButton>
                                        </div>
                                    );
                                case "OUT_FOR_DELIVERY":
                                    return (
                                        <div>
                                            <IconButton onClick={() => onStatusChange(row.id, "DELIVERED")}>
                                                <CheckCircle color='success' />
                                            </IconButton>
                                        </div>
                                    );
                                case "DELIVERED":
                                    return (
                                        <div>
                                            <IconButton>
                                                <CheckCircle color='success' />
                                            </IconButton>
                                        </div>
                                    );
                                case "CANCEL":
                                    return (
                                        <div>
                                            <IconButton>
                                                <Cancel color='error' />
                                            </IconButton>
                                        </div>
                                    );
                                default:
                                    return (
                                       <></>
                                    );
                            }
                        })()}
                    </div>

                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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
