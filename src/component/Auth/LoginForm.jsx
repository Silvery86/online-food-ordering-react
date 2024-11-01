import { Alert, Button, Snackbar, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../State/Authentication/Action'



const initialValues = {
    email: "",
    password: ""
}
export const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Access Redux states for login status, success, and error messages
    const { isLoading, success, error } = useSelector((state) => state.auth);

    // Local states to control Snackbar display
    const [open, setOpen] = React.useState(false);
    const [alertType, setAlertType] = React.useState('error');
    const [alertMessage, setAlertMessage] = React.useState('');

    // Submit handler to dispatch the login action
    const handleSubmit = (values) => {
        dispatch(loginUser({ userData: values, navigate }));
    };

    // Effect to show success or error messages in Snackbar
    useEffect(() => {
        if (success) {
            setAlertType('success');
            setAlertMessage(success);
            setOpen(true);
        } else if (error) {
            setAlertType('error');
            setAlertMessage(error);
            setOpen(true);
        }
    }, [success, error]);

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
            <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                <Form>
                    <Field
                        as={TextField}
                        name="email"
                        label="Tên đăng nhập"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <Field
                        as={TextField}
                        name="password"
                        label="Mật khẩu"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        type="password"
                    />
                    <Button sx={{ mt: 2, padding: "1rem" }} fullWidth type='submit' variant='contained'>Login</Button>
                </Form>
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
