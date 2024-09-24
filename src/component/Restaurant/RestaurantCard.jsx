import { Card, Chip, IconButton } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const RestaurantCard = () => {
  return (
    <Card className='w-[18rem]'>
        <div className={`${true? 'cursor-pointer' : 'cursor-not-allowed'} relative`} >
            <img className="w-full h-[10rem] rounded-t-md object-cover" 
            src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/d2/7d/72/la-vong.jpg?w=1200&h=-1&s=1' alt=''/>
            <Chip size='small' className='absolute top-2 left-2' color={true?"success":"error"} label={true?"open":"closed"}/>
        </div>
        
        <div className='p-4 textPart lg:flex w-full justify-between'>
            <div className='space-y-1'>
                <p className='font-semibold text-lg'>Nhà Hàng Lã Vọng</p>
                <p className='text-gray-500 text-sm'>
                    Nhà hàng Lã Vọng - chuyên Buffet & Hải Sản tươi sống ra đời nhằm mang đến những tinh hoa ẩm thực kết hợp các món ăn Hải sản mang đẳng cấp cao, với phong cách kiến trúc Hoàng gia và chất lượng phục vụ hoàn hảo tới khách hàng Một số món ăn đặc trưng: - Súp Vi cá - Tôm hùm Nha Trang bỏ lò pho mai kiểu Louis - Cá Song sao hấp sốt xí muội kiểu Lã Vọng - Ốc Hoàng Hậu chế biến tại bàn
                </p>
            </div>
            <div>
                <IconButton>
                    {true?<FavoriteIcon/>:<FavoriteBorderIcon/>}
                </IconButton>
            </div>
        </div>
    </Card>
      
    
  )
}

export default RestaurantCard
