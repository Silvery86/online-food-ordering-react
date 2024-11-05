import { Alert, Button, Snackbar, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../State/Authentication/Action'
import * as Yup from 'yup';

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Email không đúng định dạng")
        .required("Vui lòng nhập email"),
    password: Yup.string()
        .required("Vui lòng nhập mật khẩu")
        .matches(/[A-Z]/, "Mật khẩu phải có một chữ in hoa")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Mật khẩu phải có một ký tự đặc biệt")
        .min(8, "Mật khẩu phải có nhiều hơn 8 ký tự"),
});
const initialValues = {
    email: "",
    password: ""
}
export const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // Local states to control Snackbar display
    const [open, setOpen] = React.useState(false);
    const [alertType, setAlertType] = React.useState('error');
    const [alertMessage, setAlertMessage] = React.useState('');
    const { error, success } = useSelector(state => state.auth)
    const handleSubmit = (values) => {
        const result = dispatch(loginUser({ userData: values, navigate }));
    };
    useEffect(() => {
        if (success !== null && success == "Đăng nhập thành công!") {
            setAlertType('success');
            setAlertMessage(success);
            setOpen(true);
        }
        if (error !== null && error !== "") {
            setAlertType('error');
            setAlertMessage(error);
            setOpen(true);
        }
    }, [error, success]);
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
                Đăng nhập
            </Typography>
            <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
                {({ errors, touched }) => (
                    <Form>
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
                            name="password"
                            label="Mật khẩu"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            type="password"
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                        />
                        <Button sx={{ mt: 2, padding: "1rem" }} fullWidth type='submit' variant='contained'>Login</Button>
                    </Form>
                )}
            </Formik>
            <Typography variant='body2' align="center" sx={{ mt: 3 }}>
                Không có tài khoản?
                <Button size='small' onClick={() => navigate("/account/register")}>
                    Đăng ký
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
