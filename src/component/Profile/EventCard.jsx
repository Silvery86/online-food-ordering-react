import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

export const EventCard = () => {
    return (
        <div>
            <Card sx={{ width: 345 }}>
                <CardMedia
                    sx={{ height: 345 }}
                    src='https://ims.baoyenbai.com.vn/NewsImg/3_2024/319281_5-3-phobo.jpg'
                />
                <CardContent>
                    <Typography variant='h5' sx={{ textAlign: "center" }}>
                        Lễ hội phở Việt Nam
                    </Typography>
                    <Typography variant='body2' sx={{ textAlign: "center" }}>
                        Giảm 50% cho tất cả đơn hàng
                    </Typography>
                    <div className='py-2 space-y-2'>
                        <p>{"Thành phố Nam Định"}</p>
                        <p className='text-sm text-blue-500'>Từ:</p>
                        <p className='text-sm text-red-500'>Đến:</p>

                    </div>
                </CardContent>
                {false && <CardActions>
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </CardActions>}
            </Card>
        </div>
    )
}
