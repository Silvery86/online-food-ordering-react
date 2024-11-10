import { Box, Card, CardHeader, Chip, IconButton, CircularProgress, TextField, TableCell, TablePagination, TableBody, TableRow, Table, TableHead, TableContainer, Menu, MenuItem, Typography, Button, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTableOrdersByRestaurantId, fetchTableOrdersByUserId, updateTableOrderStatus } from '../../component/State/OrderTable/Action';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import dayjs from 'dayjs';

export const TableOrders = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const tableOrder = useSelector(state => state.tableOrder)
    const jwt = localStorage.getItem("jwt");
    const navigate = useNavigate();
       useEffect(() => {
        if (auth.user !== null && auth.user.id !== null) {
            console.log("Auth....",auth.user.id)
            setIsLoading(true);
            dispatch(fetchTableOrdersByUserId({
                userId: auth.user.id,
                token: jwt
            })).finally(() => setIsLoading(false));
        }
    }, [dispatch,auth.user?.id, jwt, tableOrder.tableOrders?.status]);
    const tableOrderByUser = tableOrder.tableOrders
    // Table render
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };    
    return (
        <Box>
            <Card>
                <CardHeader
                    title="Danh sách đặt bàn"
                    sx={{ pt: 2, alignItems: 'center', textAlign: 'center' }}
                />
                <Box m={2}>
                    <TextField
                        label="Tìm kiếm đặt bàn"
                        variant="outlined"
                        fullWidth
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Box>
                {isLoading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                        <CircularProgress />
                    </Box>
                ) : tableOrderByUser.length > 0 ? (
                    <Box m={2} sx={{ width: '100%', overflow: 'auto' }}>
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ display: "none" }} align='center'>ID</TableCell>
                                        <TableCell align='center'>Ngày đặt bàn</TableCell>
                                        <TableCell align='center'>Thời gian đặt</TableCell>
                                        <TableCell align='center'>Nhà hàng</TableCell>
                                        <TableCell align='center'>Số điện thoại</TableCell>
                                        <TableCell align='center'>Số người</TableCell>
                                        <TableCell align='center'>Ghi chú</TableCell>
                                        <TableCell align='center'>Trạng thái</TableCell>                                       
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableOrderByUser
                                        .sort((a, b) => b.id - a.id)
                                        .filter((item) =>
                                            item.restaurant.name.toLowerCase().includes(search.toLowerCase())
                                        )
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => (
                                            <TableRow key={row.id} hover>
                                                <TableCell style={{ display: "none" }} align='center'>{row.id}</TableCell>
                                                <TableCell align='center'>{dayjs(row.orderDate).format('DD/MM/YYYY')}</TableCell>
                                                <TableCell align='center'>{row.orderTime}</TableCell>
                                                <TableCell align='center'>{row.restaurant.name}</TableCell>
                                                <TableCell align='center'>{row.restaurant.contactInformation.mobile}</TableCell>
                                                <TableCell align='center'>{row.numberOfPersons}</TableCell>
                                                <TableCell align='center'>{row.note}</TableCell>
                                                <TableCell align='center'>
                                                    {(() => {
                                                        switch (row.status) {
                                                            case 'WAIT_FOR_CONFIRMATION':
                                                                return <Chip label="Chờ xác nhận" color="error" />;
                                                            case 'CONFIRMED':
                                                                return <Chip label="Đã xác nhận" color="success" />;
                                                            case 'CANCELLED':
                                                                return <Chip label="Đã hủy" color="error" />;
                                                            default:
                                                                return <Chip label="Không xác định" />;
                                                        }
                                                    })()}
                                                </TableCell>
                                               
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15]}
                            component="div"
                            count={tableOrderByUser.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Box>
                ) : (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                        Không có món ăn nào
                    </Box>
                )}
            </Card>
        </Box>
    )
}
