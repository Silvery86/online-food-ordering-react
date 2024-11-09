import React, { useEffect, useState } from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { green } from '@mui/material/colors';
import { Button, Card } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import queryString from 'query-string';
import { useTheme } from '@emotion/react';

export const PaymentSuccess = () => {
    const theme = useTheme()
    const location = useLocation();
    const navigate = useNavigate()
    
    return (
        <div className='min-h-screen px-5'>
            <div className='flex flex-col items-center justify-center h-[90vh]'>
                <Card className='box w-full lg:w-2/4 flex flex-col items-center rounded-md p-5'>
                    <TaskAltIcon sx={{ fontSize: "5rem", color: green[500] }} />
                    <h1 style={{color : theme.palette.primary.main}} className='py-5 text-2xl font-semibold'>                       
                        Thanh toán thành công !
                    </h1>
                  
                    <p style={{color : theme.palette.black.main}} className='py-2 text-center text-xl'>Cảm ơn bạn đã chọn nhà hàng của chúng tôi ! <br/>
                        Nhân viên chúng tôi sẽ liên hệ và giao hàng cho bạn trong vòng 1 giờ!</p>
                    <p className='py-2 text-center text-xl font-semibold'>Chúc bạn có bữa ăn ngon miệng!</p>
                    <Button onClick={() => { navigate("/") }} variant='contained' className='py-5' sx={{ margin: "1rem 0rem" }}>Quay lại trang chủ</Button>
                </Card>
            </div>
        </div>
    )
}
