import { Box, Button, Card, Divider, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import AddressCard from './AddressCard';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import { getUser } from '../State/Authentication/Action';
import { findCart } from '../State/Cart/Action';
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

const initialValues = {
    streetAddress: "",
    state: "",
    district: "",
    city: "Hà Nội",
};
const stateDistrictMapping = {
    "Hoàn Kiếm": [
        "Hàng Bạc", "Hàng Đào", "Hàng Gai", "Tràng Tiền", "Phan Chu Trinh", "Chả Cá", "Cửa Đông"
    ],
    "Đống Đa": [
        "Phương Liên", "Kim Liên", "Đống Đa", "Thịnh Quang", "Nam Đồng", "Khâm Thiên", "Láng Thượng", "Nguyễn Phương"
    ],
    "Cầu Giấy": [
        "Dịch Vọng", "Dịch Vọng Hậu", "Mai Dịch", "Nghĩa Tân", "Trung Hòa", "Yên Hòa", "Dịch Vọng"
    ],
    "Hai Bà Trưng": [
        "Bạch Đằng", "Trần Khát Chân", "Lê Đại Hành", "Đồng Nhân", "Phố Huế", "Quỳnh Mai", "Vĩnh Tuy", "Thanh Lương"
    ],
    "Tây Hồ": [
        "Phú Thượng", "Tứ Liên", "Nhật Tân", "Quảng An", "Xuân La", "Thụy Khuê", "Nhật Tân"
    ],
    "Thanh Xuân": [
        "Khương Đình", "Khương Mai", "Hạ Đình", "Thanh Xuân Bắc", "Thanh Xuân Nam", "Thượng Đình", "Trường Thịnh", "Nguyễn Trãi"
    ],
    "Ba Đình": [
        "Phúc Xá", "Trúc Bạch", "Vĩnh Phúc", "Đội Cấn", "Ngọc Hà", "Ngọc Khánh", "Kim Mã", "Liễu Giai", "Chung Kỳ", "Cống Vị"
    ],
    "Hoàng Mai": [
        "Đại Kim", "Định Công", "Hoàng Liệt", "Hoàng Văn Thụ", "Lĩnh Nam", "Thịnh Liệt", "Yên Sở"
    ],
    "Long Biên": [
        "Thạch Bàn", "Gia Thụy", "Ngọc Lâm", "Phúc Lợi", "Long Biên", "Bồ Đề", "Việt Hưng", "Sài Đồng"
    ],
    "Nam Từ Liêm": [
        "Mỹ Đình 1", "Mỹ Đình 2", "Phú Đô", "Phương Canh", "Nam Từ Liêm", "Cầu Diễn", "Đại Mỗ", "Tây Mỗ"
    ],   
    "Gia Lâm": [
        "Gia Lâm", "Dương Xá", "Đức Giang", "Kiêu Kỵ", "Lương Điền", "Phú Thị", "Trung Màu"
    ],
    "Thanh Trì": [
        "Đại Kim", "Ngọc Hồi", "Liên Ninh", "Tam Hiệp", "Tứ Hiệp", "Tây Tựu"
    ],
   
};
const validationSchema = Yup.object().shape({
    streetAddress: Yup.string().required("Street address is required"),
    state: Yup.string().required("State is required"),
    district: Yup.string().required("District is required"),
    city: Yup.string().required("City is required"),
});

const Cart = () => {
    const [districtOptions, setDistrictOptions] = useState([]);   
    const auth = useSelector(store => store.auth);
    const cart = useSelector(store => store.cart);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);  
    console.log("Cart.....",cart)
    const handleOpenAddressModal = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (values) => {
        const totalPrice = cart.cartItems.reduce((total, item) => {
            return total + (item.food.price * item.quantity);
        }, 0);
        const data = {
            jwt: localStorage.getItem("jwt"),
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
            },
        };
        console.log("Order data:", data);
        dispatch(createOrder(data));
    };

    const createOrderUsingSelectedAddress = (address) => {
        const totalPrice = cart.cartItems.reduce((total, item) => {
            return total + (item.food.price * item.quantity);
        }, 0);
        const data = {
            jwt: localStorage.getItem("jwt"),
            order: {
                restaurantId: cart.cartItems[0].food?.restaurant.id,
                deliveryAddress: address,
                totalPrice,
            },
        };
        dispatch(createOrder(data));
    };

    return (
        <>
            <main className='lg:flex justify-between'>
                <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
                    {cart.cartItems.map((item) => <CartItem key={item.id} item={item} />)}
                    <Divider />
                    <div className='billDetails px-5 text-sm'>
                        <p className='font-extralight py-5'>Thanh Toán</p>
                        <div className='space-y-3'>
                            <div className='flex justify-between text-gray-400'>
                                <p>Tổng Cộng</p>
                                <p>{cart.cart?.total}đ</p>
                            </div>
                            <div className='flex justify-between text-gray-400'>
                                <p>Phí Vận Chuyển</p>
                                <p>10.000đ</p>
                            </div>
                            <Divider />
                        </div>
                        <div className='flex justify-between text-gray-400'>
                            <p>Tổng Thanh Toán</p>
                            <p>{cart.cart?.total}đ</p>
                        </div>
                    </div>
                </section>
                <Divider orientation='vertical' flexItem />
                <section className='lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>
                    <div>
                        <h1 className='text-center font-semibold text-2xl py-10'>Choose Delivery Address</h1>
                        <div className='flex gap-5 flex-wrap justify-center'>
                            {auth.user?.addresses.map((address) => (
                                <AddressCard 
                                    key={address.id}
                                    handleSelectAddress={() => createOrderUsingSelectedAddress(address)}
                                    item={address}
                                    showButton={true} 
                                />
                            ))}
                            <Card className="flex gap-5 w-64 p-5">
                                <AddLocationAltIcon />
                                <div className='space-y-3 text-gray-500'>
                                    <h1 className='font-semibold text-lg text-white'>Add New Address</h1>
                                    <Button variant='outlined' fullWidth onClick={handleOpenAddressModal}>Add</Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                        {({ values, setFieldValue }) => (
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            name="streetAddress"
                                            label="Street Address"
                                            fullWidth
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel id="state-label">Quận</InputLabel>
                                            <Select
                                                labelId="state-label"
                                                id="state"
                                                name="state"
                                                value={values.state}
                                                onChange={(e) => {
                                                    const selectedState = e.target.value;
                                                    setFieldValue("state", selectedState);
                                                    setDistrictOptions(stateDistrictMapping[selectedState] || []);
                                                    setFieldValue("district", ""); // Reset district when state changes
                                                }}
                                            >
                                                <MenuItem value=""><em>Vui lòng chọn quận</em></MenuItem>
                                                {Object.keys(stateDistrictMapping).map(state => (
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
                                                value={values.district}
                                                onChange={(e) => setFieldValue("district", e.target.value)}
                                                disabled={!values.state}
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
                                            value="Hà Nội"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button fullWidth variant='contained' type='submit' color='primary'>Deliver Here</Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Modal>
        </>
    );
}

export default Cart;
