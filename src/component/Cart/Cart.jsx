import { Box, Button, Card, Divider, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Snackbar, TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody, Avatar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import { findCart } from '../State/Cart/Action';
import { formatCurrency } from '../util/currencyFormat';
import { stateDistrictMapping } from '../assets/data/stateDistrictMapping';
import background_full from '../assets/images/background/background-full.webp'
import { createOrder } from '../State/Order/Action';

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    outline: "none",
    boxShadow: 24,
    p: 4,
};
const Cart = () => {
    const [districtOptions, setDistrictOptions] = useState([]);
    const [open, setOpen] = useState(false);

    const jwt = localStorage.getItem("jwt")
    const auth = useSelector(store => store.auth);
    const cart = useSelector(store => store.cart);
    const dispatch = useDispatch();
    const [isInitialized, setIsInitialized] = useState(false);
    useEffect(() => {
        // Dispatch an action to fetch the cart items if not initialized
        if (!isInitialized) {
            dispatch(findCart(jwt)); // Assuming jwt is defined
            setIsInitialized(true);

        }
    }, [isInitialized, dispatch]);
    console.log("Cart", cart)
    const SHIPPING_RATE = 20000;
    const invoiceSubtotal = cart.cartItems.reduce((total, item) => total + (item.food.price * item.quantity), 0)
    const invoiceTotal = SHIPPING_RATE + invoiceSubtotal;
    const validationSchema = Yup.object({
        shippingName: Yup.string().required("Vui lòng nhập tên người nhận"),
        shippingPhone: Yup.string()
            .required("Vui lòng nhập số điện thoại")
            .matches(/^[0-9]{10}$/, "Số điện thoại phải có 10 chữ số"),
        streetAddress: Yup.string().required("Vui lòng nhập địa chỉ giao hàng"),
        state: Yup.string().required("Vui lòng chọn quận"),
        district: Yup.string().required("Vui lòng chọn phường"),
        city: Yup.string().required("Vui lòng chọn thành phố"),
    });
    const formik = useFormik({
        initialValues: {
            shippingName: auth.user?.fullName || "",
            shippingPhone: auth.user?.phone || "",
            streetAddress: "",
            state: "",
            district: "",
            city: "Hà Nội",
        },
        validationSchema,
        onSubmit: (values) => {
            const totalPrice = cart.cartItems.reduce((total, item) => total + (item.food.price * item.quantity), 0);
            const data = {
                jwt: jwt,
                order: {
                    restaurantId: cart.cartItems[0].food?.restaurant.id,
                    deliveryAddress: {
                        fullName: auth.user?.fullName,
                        streetAddress: values.streetAddress,
                        district: values.district,
                        state: values.state,
                        city: values.city,
                    },
                    totalPrice,
                    shippingName: values.shippingName,
                    shippingPhone: values.shippingPhone,
                },
            }

            // Pass the formatted date along with the other form values            
            console.log("Order data", data)
            dispatch(createOrder(data));
        },
    });

    const handleStateChange = (event) => {
        const selectedState = event.target.value;
        formik.setFieldValue("state", selectedState);
        setDistrictOptions(stateDistrictMapping[selectedState] || []);
    };
    return (
        <>
            <main className='lg:flex justify-between relative'>
                <section className='lg:w-[70%] space-y-6 lg:min-h-screen'>
                    <TableContainer >
                        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Ảnh</TableCell>
                                    <TableCell align="center">Tên món</TableCell>
                                    <TableCell align="center">Giá</TableCell>
                                    <TableCell align="center">Số lượng</TableCell>
                                    <TableCell align="right">Tổng</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart.cartItems.map((item) => <CartItem item={item} />)}
                                <TableRow>
                                    <TableCell rowSpan={3} />
                                    <TableCell colSpan={3}><p className='font-semibold'>Tổng cộng</p></TableCell>
                                    <TableCell align="right">{formatCurrency(invoiceSubtotal)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={3}><p className='font-semibold'>Phí vận chuyển</p></TableCell>
                                    <TableCell align="right">{formatCurrency(SHIPPING_RATE)}</TableCell>
                                </TableRow>
                                <TableRow>

                                    <TableCell colSpan={3}><p className='font-bold'>Thanh toán</p></TableCell>
                                    <TableCell align="right"><p className='font-bold'>{formatCurrency(invoiceTotal)}</p></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </section>
                <Divider orientation='vertical' flexItem />
                <section className='lg:w-[30%] space-y-6 lg:min-h-screen px-2 filter'>
                    <div className='sticky box mt-8'>
                        <Typography align='center' >Thông tin giao hàng</Typography>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="shippingName"
                                        name="shippingName"
                                        label="Người nhận hàng"
                                        fullWidth
                                        variant="outlined"
                                        value={formik.values.shippingName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.shippingName && Boolean(formik.errors.shippingName)}
                                        helperText={formik.touched.shippingName && formik.errors.shippingName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="shippingPhone"
                                        name="shippingPhone"
                                        label="Điện thoại người nhận"
                                        fullWidth
                                        variant="outlined"
                                        value={formik.values.shippingPhone}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.shippingPhone && Boolean(formik.errors.shippingPhone)}
                                        helperText={formik.touched.shippingPhone && formik.errors.shippingPhone}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="streetAddress"
                                        name="streetAddress"
                                        label="Địa chỉ giao hàng"
                                        fullWidth
                                        variant="outlined"
                                        value={formik.values.streetAddress}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.streetAddress && Boolean(formik.errors.streetAddress)}
                                        helperText={formik.touched.streetAddress && formik.errors.streetAddress}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="state-label">Quận</InputLabel>
                                        <Select
                                            labelId="state-label"
                                            id="state"
                                            name="state"
                                            value={formik.values.state}
                                            onChange={handleStateChange}
                                            error={formik.touched.state && Boolean(formik.errors.state)}
                                        >
                                            <MenuItem value=""><em>Vui lòng chọn quận</em></MenuItem>
                                            {Object.keys(stateDistrictMapping).map((state) => (
                                                <MenuItem key={state} value={state}>{state}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="district-label">Phường</InputLabel>
                                        <Select
                                            labelId="district-label"
                                            id="district"
                                            name="district"
                                            value={formik.values.district}
                                            onChange={formik.handleChange}
                                            error={formik.touched.district && Boolean(formik.errors.district)}
                                        >
                                            <MenuItem value=""><em>Vui lòng chọn phường</em></MenuItem>
                                            {districtOptions.map(district => (
                                                <MenuItem key={district} value={district}>{district}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="City"
                                        fullWidth
                                        variant="outlined"
                                        value="TP. Hà Nội"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button fullWidth variant='contained' type="submit" color='error'>
                                        {"Thanh toán với VNPAY"}
                                    </Button>
                                </Grid>

                            </Grid>

                        </form>

                    </div>

                </section>
                <div className="home__cover absolute top-0 left-0 right-0 bottom-0 -z-10">
                    <img
                        src={background_full || "../assets/images/default.jpg"}
                        alt=""
                        className="object-cover w-full h-full"
                    />
                </div>
            </main>
        </>
    );
};

export default Cart;
