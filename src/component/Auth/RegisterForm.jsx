import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Snackbar, Alert } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../State/Authentication/Action';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup'; // Import Yup

const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "ROLE_CUSTOMER"
};

// Define validation schema
const validationSchema = Yup.object({
    fullName: Yup.string()
        .required("Vui lòng nhập họ tên"),
    email: Yup.string()
        .email("Email không đúng định dạng")
        .required("Vui lòng nhập email"),
    phone: Yup.string()
        .required("Vui lòng nhập số điện thoại")
        .matches(/^[0-9]{10}$/, "Số điện thoại phải có 10 chữ số"),
    password: Yup.string()
        .required("Vui lòng nhập mật khẩu")
        .matches(/[A-Z]/, "Mật khẩu phải có một chữ in hoa")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Mật khẩu phải có một ký tự đặc biệt")
        .min(8, "Mật khẩu phải có nhiều hơn 8 ký tự"),
    role: Yup.string()
        .required("Role is required")
});

export const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Access Redux states for registration status, success, and error messages
    const { error } = useSelector((state) => state.auth);

    // Local states to control Snackbar display
    const [open, setOpen] = React.useState(false);
    const [alertType, setAlertType] = React.useState('error');
    const [alertMessage, setAlertMessage] = React.useState('');

    const handleSubmit = (values) => {
        dispatch(registerUser({ userData: values, navigate }));
    }

    // Effect to show success or error messages in Snackbar
    useEffect(() => {
        if (error) {
            setAlertType('error');
            setAlertMessage(error);
            setOpen(true);
        }
    }, [error]);

    // Snackbar close handler
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div>
            <Typography variant='h5' className='text-center'>
                Đăng ký
            </Typography>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field
                            as={TextField}
                            name="fullName"
                            label="Họ và tên"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            error={touched.fullName && Boolean(errors.fullName)}
                            helperText={touched.fullName && errors.fullName}
                        />
                        <Field
                            as={TextField}
                            name="email"
                            label="Email"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                        />
                        <Field
                            as={TextField}
                            name="phone"
                            label="Số điện thoại"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            error={touched.phone && Boolean(errors.phone)}
                            helperText={touched.phone && errors.phone}
                        />
                        <Field
                            as={TextField}
                            name="password"
                            label="Mật khẩu"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            type="password"
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                            <Field
                                as={Select}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="role"
                                label="Role"
                            >
                                <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
                                <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Restaurant Owner</MenuItem>
                            </Field>
                        </FormControl>
                        <Button sx={{ mt: 2, padding: "1rem" }} fullWidth type='submit' variant='contained'>Đăng ký</Button>
                    </Form>
                )}
            </Formik>
            <Typography variant='body2' align="center" sx={{ mt: 3 }}>
                Nếu đã có tài khoản.
                <Button size='small' onClick={() => navigate("/account/login")}>
                    Đăng nhập
                </Button>
            </Typography>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}
