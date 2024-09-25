import { Button, Card } from '@mui/material'
import React from 'react'

const OrderCard = () => {
  return (
    <Card className='flex justify-between items-center p-5'>
        <div className='flex items-center space-x-5'>
            <img 
            className='h-16 w-16' 
            src='https://pholyquocsu.vn/wp-content/uploads/2022/09/mon-an-quoc-dan-768x768.jpg' 
            alt='' />
            <div>
              <p>Phở bò</p>
              <p>50.000đ</p>
            </div>
        </div>
        <div>
          <Button className='cursor-not-allowed'>Completed</Button>
        </div>

    </Card>
  )
}

export default OrderCard