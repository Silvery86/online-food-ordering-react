import React from 'react'
import { Button, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Cancel } from '@mui/icons-material';
import { red } from '@mui/material/colors';

export const PaymentFailed = () => {
    const navigate = useNavigate();
    return (
        <div className='min-h-screen px-5'>
            <div className='flex flex-col items-center justify-center h-[90vh]'>
                <Card className='box w-full lg:w-1/4 flex flex-col items-center rounded-md p-5'>
                    <Cancel sx={{fontSize:"5rem",color:red[500]}}/>
                    <h1 className='py-5 text-2xl font-semibold'>
                        Order Failed !
                    </h1>
                    <p className='py-2 text-center text-gray-400'>Please check your payment method or checkout again!</p>
                    <p className='py-2 text-center text-gray-200 text-lg'>Have A Greate Day!</p>
                    <Button onClick={() => {navigate("/")}} variant='contained' className='py-5' sx={{margin:"1rem 0rem"}}>Go To Home</Button>
                </Card>
            </div>
        </div>
    )
}
