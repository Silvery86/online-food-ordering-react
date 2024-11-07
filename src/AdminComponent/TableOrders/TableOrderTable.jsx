import { Box, Card, CardHeader, Chip, IconButton, CircularProgress, TextField, TableCell, TablePagination, TableBody, TableRow, Table, TableHead, TableContainer, Menu, MenuItem, Typography, Button, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTableOrdersByRestaurantId, updateTableOrderStatus } from '../../component/State/OrderTable/Action';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import dayjs from 'dayjs';

export const TableOrderTable = () => {
    //Date call API
    const dispatch = useDispatch();
    const restaurant = useSelector(state => state.restaurant);
    const menu = useSelector(state => state.menu);
    const tableOrder = useSelector(state => state.tableOrder)
    const jwt = localStorage.getItem("jwt");
    const navigate = useNavigate();
    useEffect(() => {
        if (restaurant.usersRestaurant?.id !== null) {
            setIsLoading(true);
            dispatch(fetchTableOrdersByRestaurantId({
                restaurantId: restaurant.usersRestaurant?.id,
                token: jwt
            })).finally(() => setIsLoading(false));
        }
    }, [dispatch, restaurant.usersRestaurant?.id, jwt, tableOrder.tableOrders?.status]);
    const tableOrderByRestaurant = tableOrder.tableOrders
    console.log("Table order....", tableOrderByRestaurant)
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

    const [anchorEl, setAnchorEl] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [selectedAction, setSelectedAction] = useState('');

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleActionClick = (action) => {
        setSelectedAction(action);
        setOpenModal(true);
        handleMenuClose();
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };

    const handleConfirm = ({ id }) => {
        if (selectedAction === 'confirm') {
            dispatch(updateTableOrderStatus(id, "CONFIRMED", jwt));
            window.location.reload()
          
        } else if (selectedAction === 'cancel') {
            dispatch(updateTableOrderStatus(id, "CANCELLED", jwt));
            window.location.reload()
           
        }
        setOpenModal(false);
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
                ) : tableOrderByRestaurant.length > 0 ? (
                    <Box m={2} sx={{ width: '100%', overflow: 'auto' }}>
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center'>ID</TableCell>
                                        <TableCell align='center'>Ngày đặt bàn</TableCell>
                                        <TableCell align='center'>Nhà hàng</TableCell>
                                        <TableCell align='center'>Số điện thoại</TableCell>
                                        <TableCell align='center'>Số người</TableCell>
                                        <TableCell align='center'>Ghi chú</TableCell>
                                        <TableCell align='center'>Trạng thái</TableCell>
                                        <TableCell align='center' width={100}>Xác nhận</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableOrderByRestaurant
                                        .sort((a, b) => b.id - a.id)
                                        .filter((item) =>
                                            item.name.toLowerCase().includes(search.toLowerCase())
                                        )
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => (
                                            <TableRow key={row.id} hover>
                                                <TableCell align='center'>{row.id}</TableCell>
                                                <TableCell align='center'>{dayjs(row.orderDate).format('DD/MM/YYYY')}</TableCell>
                                                <TableCell align='center'>{row.name}</TableCell>
                                                <TableCell align='center'>{row.phone}</TableCell>
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
                                                <TableCell align='center'>
                                                    <IconButton color="primary" onClick={handleMenuClick}>
                                                        <DomainVerificationIcon />
                                                    </IconButton>
                                                    <Menu
                                                        anchorEl={anchorEl}
                                                        open={Boolean(anchorEl)}
                                                        onClose={handleMenuClose}
                                                    >
                                                        <MenuItem onClick={() => handleActionClick('confirm')}>Xác nhận đặt hàng</MenuItem>
                                                        <MenuItem onClick={() => handleActionClick('cancel')}>Hủy đơn hàng</MenuItem>
                                                    </Menu>

                                                    <Modal
                                                        open={openModal}
                                                        onClose={handleModalClose}
                                                        aria-labelledby="confirmation-modal"
                                                        aria-describedby="confirmation-modal-description"
                                                    >
                                                        <Box sx={{
                                                            position: 'absolute',
                                                            top: '50%',
                                                            left: '50%',
                                                            transform: 'translate(-50%, -50%)',
                                                            width: 400,
                                                            bgcolor: 'background.paper',
                                                            border: '2px solid #000',
                                                            boxShadow: 24,
                                                            p: 4,
                                                            textAlign: 'center'
                                                        }}>
                                                            <Typography id="confirmation-modal-description" sx={{ mb: 2 }}>
                                                                {selectedAction === 'confirm' ? 'Bạn có chắc muốn xác nhận đặt bàn này?' : 'Bạn có chắc muốn hủy đặt bàn này?'}
                                                            </Typography>
                                                            <Box>
                                                                <Button variant="contained" color="primary" onClick={() => handleConfirm({ id: row.id })} sx={{ mr: 1 }}>
                                                                    Xác nhận
                                                                </Button>
                                                                <Button variant="outlined" color="secondary" onClick={() => handleConfirm({ id: row.id })}>
                                                                    Hủy bỏ
                                                                </Button>
                                                            </Box>
                                                        </Box>
                                                    </Modal>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15]}
                            component="div"
                            count={tableOrderByRestaurant.length}
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
    );
};
