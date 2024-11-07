import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
    Grid,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurantsAction } from '../State/Restaurant/Action';
import { createTableOrder } from '../State/OrderTable/Action';
import { useTheme } from '@emotion/react';


const CreateTableOrder = () => {
    const dispatch = useDispatch();
    const theme = useTheme()
    useEffect(() => {
        dispatch(getAllRestaurantsAction());
    }, []);

    const restaurant = useSelector((state) => state.restaurant);

    // Generate time options from 9:00 to 21:00
    const timeOptions = Array.from({ length: 25 }, (_, i) => {
        const hours = 9 + Math.floor(i / 2);  // Get the hour (9 to 21)
        const minutes = i % 2 === 0 ? '00' : '30';  // Alternate between 00 and 30 minutes
        return `${hours}:${minutes}`;
    }).filter((time) => parseInt(time.split(':')[0]) <= 21);

    // Calculate the min and max date for the DatePicker
    const minDate = dayjs().startOf('day'); // Today's date at 00:00
    const maxDate = minDate.add(2, 'months'); // Two months from today

    const validationSchema = Yup.object({
        restaurant: Yup.string().required('Vui lòng chọn nhà hàng'),
        dateOrder: Yup.date()
            .min(minDate.toDate(), 'Date must be today or later')  // Ensure the date is today or later
            .max(maxDate.toDate(), `Date must be within the next 2 months`)  // Ensure the date is within the next 2 months
            .required('Vui lòng chọn ngày đặt bàn'),
        timeOrder: Yup.string().required('Vui lòng chọn thời gian đặt bàn'),
        numberOfGuests: Yup.number()
            .integer('Hãy nhập số')
            .min(1, 'Số khách phải lớn hơn 0')
            .required('Vui lòng nhập số lượng khách'),
        customerNote: Yup.string(),
        customerName: Yup.string().required('Vui lòng nhập tên người đặt bàn'),
        customerPhone: Yup.string()
            .matches(/^[0-9]+$/, 'Số điện thoại không đúng')
            .required('Vui lòng nhập số điện thoại đặt bàn'),
    });
    
    const formik = useFormik({
        initialValues: {
            restaurant: '',
            dateOrder: minDate.toDate(),  // Default to today's date
            timeOrder: '',
            numberOfGuests: '',
            customerNote: '',
            customerName: '',
            customerPhone: '',
        },
        validationSchema,
        onSubmit: (values) => {
            // Convert the date to the desired format (DD/MM/YYYY) before submitting
            const formattedDate = dayjs(values.dateOrder).format('DD/MM/YYYY');
            // Pass the formatted date along with the other form values
            values = { ...values, dateOrder: formattedDate }
            console.log(values)
            //dispatch(createTableOrder({ ...values, dateOrder: formattedDate }));
        },
    });

    return (
        <div className='px-10 pb-10'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form onSubmit={formik.handleSubmit}>
                    <Typography
                        variant="h4"
                        className='text-center font-semibold py-3'
                        style={{ color: theme.palette.primary.main }}
                    >Vui lòng điền thông tin đặt bàn</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Nhà hàng</InputLabel>
                                <Select
                                    name="restaurant"
                                    value={formik.values.restaurant}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.restaurant && Boolean(formik.errors.restaurant)}
                                >
                                    {restaurant.restaurants.map((restaurant) => (
                                        <MenuItem key={restaurant.id} value={restaurant.id}>
                                            {restaurant.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {formik.touched.restaurant && formik.errors.restaurant && (
                                    <Typography color="error">{formik.errors.restaurant}</Typography>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth margin="normal">
                                <DatePicker
                                    label="Vui lòng chọn ngày đặt bàn"
                                    value={formik.values.dateOrder ? dayjs(formik.values.dateOrder) : null}
                                    onChange={(value) => formik.setFieldValue('dateOrder', value ? value.toDate() : '')}
                                    minDate={minDate}  // Prevent selecting a date before today
                                    maxDate={maxDate}  // Prevent selecting a date more than 2 months ahead
                                    format="DD/MM/YYYY"  // Display date in DD/MM/YYYY format
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            error={formik.touched.dateOrder && Boolean(formik.errors.dateOrder)}
                                            helperText={formik.touched.dateOrder && formik.errors.dateOrder}
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Thời gian đặt bàn</InputLabel>
                                <Select
                                    name="timeOrder"
                                    value={formik.values.timeOrder}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.timeOrder && Boolean(formik.errors.timeOrder)}
                                >
                                    {timeOptions.map((time) => (
                                        <MenuItem key={time} value={time}>
                                            {time}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {formik.touched.timeOrder && formik.errors.timeOrder && (
                                    <Typography color="error">{formik.errors.timeOrder}</Typography>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Số lượng khách"
                                name="numberOfGuests"
                                type="number"
                                value={formik.values.numberOfGuests}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.numberOfGuests && Boolean(formik.errors.numberOfGuests)}
                                helperText={formik.touched.numberOfGuests && formik.errors.numberOfGuests}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Tên người đặt bàn"
                                name="customerName"
                                value={formik.values.customerName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.customerName && Boolean(formik.errors.customerName)}
                                helperText={formik.touched.customerName && formik.errors.customerName}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Điện thoại người đặt"
                                name="customerPhone"
                                value={formik.values.customerPhone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.customerPhone && Boolean(formik.errors.customerPhone)}
                                helperText={formik.touched.customerPhone && formik.errors.customerPhone}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Ghi chú"
                                name="customerNote"
                                value={formik.values.customerNote}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Grid>
                    </Grid>
                    <div className='flex justify-center items-center mt-2'>
                        <Button color="primary" variant="contained" type="submit">
                            Đặt bàn ngay !
                        </Button>
                    </div>

                </form>
            </LocalizationProvider>
        </div>
    );
};

export default CreateTableOrder;
