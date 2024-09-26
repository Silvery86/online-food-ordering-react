import { Button, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../State/Authentication/Action'


const initialValues = {
    email:"",
    password:""
}
export const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = (values) => {
        dispatch(loginUser({userData:values,navigate}))
    }
  return (
    <div>
        <Typography variant='h5' className='text-center'>
            Đăng nhập
        </Typography>
        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
            <Form>
                <Field 
                as = {TextField}
                name = "email"
                label = "Tên đăng nhập"
                fullWidth
                variant = "outlined"
                margin = "normal"
                />
                 <Field 
                as = {TextField}
                name = "password"
                label = "Mật khẩu"
                fullWidth
                variant = "outlined"
                margin = "normal"
                />
                <Button sx={{mt:2,padding:"1rem"}} fullWidth type='submit' variant='contained'>Login</Button>
            </Form>
        </Formik>
        <Typography variant='body2' align="center" sx={{mt:3}}>
            Không có tài khoản?
            <Button size='small' onClick={() => navigate("/account/register")}>
                Đăng ký
            </Button>
        </Typography>
    </div>
  )
}
