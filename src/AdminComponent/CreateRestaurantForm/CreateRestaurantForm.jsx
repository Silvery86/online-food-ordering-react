import { AddPhotoAlternate, Close } from '@mui/icons-material';
import { Button, CircularProgress, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import Yup
import React, { useEffect, useState } from 'react';
import { uploadImageToCloudinary } from '../util/UploadToCloudinary';
import { useDispatch, useSelector } from 'react-redux';
import { createRestaurant, getRestaurantByUserId } from '../../component/State/Restaurant/Action';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const initialValues = {
    name: "",
    description: "",
    cuisineType: "",
    streetAddress: "",
    city: "Hà Nội",
    state: "",
    district: "",
    email: "",
    mobile: "",
    facebook: "https://www.facebook.com/",
    instargram: "https://www.instagram.com/",
    openingHours: "Thứ 2 - Chủ Nhật : 9:00 - 21:00",
    images: []
};

const stateDistrictMapping = {
    "Hoàn Kiếm": [
        "Hàng Bạc", "Hàng Đào", "Hàng Gai", "Tràng Tiền", "Phan Chu Trinh", "Chả Cá", "Cửa Đông"
    ],
    "Đống Đa": [
        "Phương Liên", "Kim Liên", "Đống Đa", "Thịnh Quang", "Nam Đồng", "Khâm Thiên", "Láng Thượng", "Nguyễn Phương"
    ],
    "Cầu Giấy": [
        "Dịch Vọng", "Dịch Vọng Hậu", "Mai Dịch", "Nghĩa Tân", "Trung Hòa", "Yên Hòa"
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


// Add Yup validation schema
const validationSchema = Yup.object({
    name: Yup.string().required("Vui lòng nhập tên nhà hàng"),
    description: Yup.string().required("Vui lòng nhập mô tả nhà hàng"),
    cuisineType: Yup.string().required("Vui lòng loại nhà hàng"),
    streetAddress: Yup.string().required("Vui lòng nhập tên nhà hàng"),
    city: Yup.string(),
    state: Yup.string().required("Vui lòng nhập tên quận"),
    district: Yup.string().required("Vui lòng nhập tên phường"),
    email: Yup.string().email("Email không đúng định dạng").required("Vui lòng nhập email"),
    mobile: Yup.string().required("Vui lòng nhập số điện thoại"),
    openingHours: Yup.string().required("Vui lòng nhập thời gian mở - đóng cửa"),
    images: Yup.array()
        .of(Yup.string().url("Định dạng ảnh không đúng"))
        .min(3, "Bạn cần tải 3 ảnh")
        .max(3, "Bạn chỉ có thể tải 3 ảnh") // Limit to 3 images
        .required("Vui lòng tải ảnh về nhà hàng"),
});

export const CreateRestaurantForm = () => {
    const theme = useTheme()
    const [uploadImage, setUploadImage] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");
    const auth = useSelector(store => store.auth);
    const restaurant = useSelector(store => store.restaurant);

    const formik = useFormik({
        initialValues,
        validationSchema, // Add the validation schema
        onSubmit: (values) => {
            const data = {
                name: values.name,
                description: values.description,
                cuisineType: values.cuisineType,
                address: {
                    streetAddress: values.streetAddress,
                    city: values.city,
                    state: values.state,
                    district: values.district,
                },
                openingHours: values.openingHours,
                contactInformation: {
                    email: values.email,
                    mobile: values.mobile,
                    facebook: values.facebook,
                    instargram: values.instargram,
                },
                images: values.images,
            };
            dispatch(createRestaurant({ data, token: jwt }));
        }
    });

    const [districtOptions, setDistrictOptions] = useState([]);
    useEffect(() => {
        // Update district options based on selected state
        if (formik.values.state) {
            setDistrictOptions(stateDistrictMapping[formik.values.state] || []);
            formik.setFieldValue("district", ""); // Reset district selection
        } else {
            setDistrictOptions([]); // Reset district options if state is not selected
        }
    }, [formik.values.state]);

    // useEffect(() => {
    //     const isRestaurantOwner = auth.user && auth.user.role === "ROLE_RESTAURANT_OWNER";
    //     const hasRestaurant = restaurant.usersRestaurant !== null;
    
    //     // Check if conditions are met before dispatching
    //     if (!isRestaurantOwner && !hasRestaurant) {
    //         navigate("/")
    //     }
    //   }, [jwt]);

    const handleImageChange = async (e) => {
        const files = e.target.files;
        if (files.length + formik.values.images.length > 3) {
            alert("Bạn chỉ có thể tải lên 3 ảnh");
            return;
        }

        setUploadImage(true);
        const uploadedImages = await Promise.all(
            Array.from(files).map(file => uploadImageToCloudinary(file))
        );
        formik.setFieldValue("images", [...formik.values.images, ...uploadedImages]);
        setUploadImage(false);
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...formik.values.images];
        updatedImages.splice(index, 1);
        formik.setFieldValue("images", updatedImages);
    };

    return (
        <div className='py-10 px-5 lg:flex items-center justify-center min-h-screen'>
            <div className='lg:max-w-4xl'>
                <h1
                    style={{ color: theme.palette.primary.main }}
                    className='font-bold text-2xl text-center py-3'>
                    Tạo nhà hàng của bạn
                </h1>
                <form onSubmit={formik.handleSubmit} className='space-y-4'>
                    <Grid container spacing={2}>
                        <Grid className='flex flex-wrap gap-5' item xs={12}>
                            <h3 className='w-full font-semibold'>Ảnh nhà hàng: <span className='text-red-500'>(Vui lòng tải 3 ảnh về nhà hàng)</span></h3>
                            <input
                                accept='image/*'
                                id='fileInput'
                                style={{ display: "none" }}
                                onChange={handleImageChange}
                                type='file'
                                multiple
                            />
                            <label className='relative' htmlFor='fileInput'>
                                <span className='w-24 h-24 cursor-pointer items-center flex justify-center p-3 border rounded-md border-gray-600'>
                                    <AddPhotoAlternate className='text-black' />
                                    {uploadImage && (
                                        <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex items-center justify-center'>
                                            <CircularProgress />
                                        </div>
                                    )}
                                </span>
                            </label>
                            <div className='flex flex-wrap gap-2'>
                                {formik.values.images.map((image, index) => (
                                    <div className='relative' key={index}>
                                        <img
                                            className='w-24 h-24 object-cover'
                                            src={image}
                                            alt={image}
                                        />
                                        <IconButton size='small' sx={{ position: "absolute", top: 0, right: 0, outline: "none" }} onClick={() => handleRemoveImage(index)}>
                                            <Close sx={{ fontSize: "1rem" }} />
                                        </IconButton>
                                    </div>
                                ))}
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id='name'
                                name='name'
                                label="Tên nhà hàng"
                                variant='outlined'
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id='description'
                                name='description'
                                label="Mô tả nhà hàng"
                                variant='outlined'
                                onChange={formik.handleChange}
                                value={formik.values.description}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField
                                fullWidth
                                id='cuisineType'
                                name='cuisineType'
                                label="Loại nhà hàng"
                                variant='outlined'
                                onChange={formik.handleChange}
                                value={formik.values.cuisineType}
                                error={formik.touched.cuisineType && Boolean(formik.errors.cuisineType)}
                                helperText={formik.touched.cuisineType && formik.errors.cuisineType}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField
                                fullWidth
                                id='openingHours'
                                name='openingHours'
                                label="Giờ mở cửa"
                                variant='outlined'
                                onChange={formik.handleChange}
                                value={formik.values.openingHours}
                                error={formik.touched.openingHours && Boolean(formik.errors.openingHours)}
                                helperText={formik.touched.openingHours && formik.errors.openingHours}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id='streetAddress'
                                name='streetAddress'
                                label="Địa chỉ chi tiết"
                                variant='outlined'
                                onChange={formik.handleChange}
                                value={formik.values.streetAddress}
                                error={formik.touched.streetAddress && Boolean(formik.errors.streetAddress)}
                                helperText={formik.touched.streetAddress && formik.errors.streetAddress}
                            />
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
                                {formik.touched.district && formik.errors.district && <div style={{ color: 'red' }}>{formik.errors.district}</div>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="state-label">Quận</InputLabel>
                                <Select
                                    labelId="state-label"
                                    id="state"
                                    name="state"
                                    value={formik.values.state}
                                    onChange={formik.handleChange}
                                    error={formik.touched.state && Boolean(formik.errors.state)}
                                >
                                    <MenuItem value=""><em>Vui lòng chọn quận</em></MenuItem>
                                    {Object.keys(stateDistrictMapping).map(state => (
                                        <MenuItem key={state} value={state}>{state}</MenuItem>
                                    ))}
                                </Select>
                                {formik.touched.state && formik.errors.state && <div style={{ color: 'red' }}>{formik.errors.state}</div>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id='city'
                                name='city'
                                label="Thành phố"
                                variant='outlined'
                                value={formik.values.city}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField
                                fullWidth
                                id='email'
                                name='email'
                                label="Email liên hệ"
                                variant='outlined'
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField
                                fullWidth
                                id='mobile'
                                name='mobile'
                                label="Điện thoại liên hệ"
                                variant='outlined'
                                onChange={formik.handleChange}
                                value={formik.values.mobile}
                                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                                helperText={formik.touched.mobile && formik.errors.mobile}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField
                                fullWidth
                                id='facebook'
                                name='facebook'
                                label="Facebook"
                                variant='outlined'
                                onChange={formik.handleChange}
                                value={formik.values.facebook}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField
                                fullWidth
                                id='instargram'
                                name='instargram'
                                label="Instagram"
                                variant='outlined'
                                onChange={formik.handleChange}
                                value={formik.values.instargram}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                    >
                        Tạo nhà hàng
                    </Button>
                </form>
            </div>
        </div>
    );
};
