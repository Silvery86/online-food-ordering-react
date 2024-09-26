import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const initialValues = {
    fullName: "",
    email: "",
    password: "",
    role: "ROLE_CUSTOMER"
}

export const RegisterForm = () => {
    const navigate = useNavigate();
    const handleSubmit = (value) => {
        console.log("Form values : ",value);
    }
    return (
        <div>
            <Typography variant='h5' className='text-center'>
                Đăng ký
            </Typography>
            <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                <Form>
                    <Field
                        as={TextField}
                        name="fullName"
                        label="Họ và tên"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <Field
                        as={TextField}
                        name="email"
                        label="Email"
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
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                        <Field
                            as={Select}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="role"
                            //value={age}
                            label="Role"
                            //onChange={handleChange}
                        >
                            <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
                            <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Restaurant Owner</MenuItem>
                            
                        </Field>
                    </FormControl>
                    <Button sx={{ mt: 2, padding: "1rem" }} fullWidth type='submit' variant='contained'>Login</Button>
                </Form>
            </Formik>
            <Typography variant='body2' align="center" sx={{ mt: 3 }}>
                Nếu đã có tài khoản.
                <Button size='small' onClick={() => navigate("/account/login")}>
                    Đăng nhập
                </Button>
            </Typography>
        </div>
    )
}
