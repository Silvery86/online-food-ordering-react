import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { Button, Card } from '@mui/material';

const AddressCard = ({ item, showButton, handleSelectAddress }) => {
    console.log("Address",item)
    return (
        <Card className="flex gap-5 w-64 p-5">
            <HomeIcon />
            <div className='space-y-3 text-gray-500'>
                <h1 className='font-semibold text-lg text-white'>Home</h1>
                <p>{item.streetAddress} - {item.state} - {item.city}</p>
                {showButton && (
                    <Button variant='outlined' fullWidth onClick={() => handleSelectAddress()}>Đặt hàng</Button>
                )}
            </div>
        </Card>
    )
}

export default AddressCard
