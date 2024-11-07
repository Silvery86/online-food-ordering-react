import { Button, Card } from '@mui/material'
import { green } from '@mui/material/colors'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@emotion/react';

export const TableOrderThankYou = () => {
    const navigate = useNavigate()
    const theme = useTheme()
    return (
        <div className='min-h-screen px-5'>
            <div className='flex flex-col items-center justify-center h-[90vh]'>
                <Card className='box w-full lg:w-2/4 flex flex-col items-center rounded-xl p-5'>
                    <TaskAltIcon sx={{ fontSize: "5rem", color: green[500] }} />
                    <h1
                        style={{ color: theme.palette.primary.main }}
                        className='py-5 text-2xl font-semibold'>
                        Đặt bàn thành công !
                    </h1>
                    <p
                        style={{ color: theme.palette.textColor.main }}
                        className='text-center'>Cảm ơn bạn đã chọn nhà hàng của chúng tôi!</p>
                    <p
                        style={{ color: theme.palette.textColor.main }}
                        className='text-center'> Nhân viên chúng tôi sẽ liên hệ xác nhận với bạn sớm nhất có thể!</p>

                    <p
                        style={{ color: theme.palette.textColor.main }}
                        className='py-2 text-center text-gray-200 text-lg'>Foodsou chúc bạn một ngày tốt lành!</p>
                    <Button onClick={() => { navigate("/") }} variant='contained' className='py-5' sx={{ margin: "1rem 0rem" }}>Quay lại trang chủ</Button>
                </Card>
            </div>
        </div>
    )
}
