import React from 'react'
import RestaurantCard from '../Restaurant/RestaurantCard'
import { useSelector } from 'react-redux'
import FavouriteRestaurant from '../Restaurant/FavouriteRestaurant'

const Favourites = () => {
  const auth = useSelector(store => store.auth)
  return (
    <div>
      <h1 className='py-5 text-xl font-semibold text-center'>Nhà Hàng Yêu Thích</h1>
      <div className='flex flex-wrap gap-3 justify-center'>
        {auth.favorites.map((item) => <FavouriteRestaurant item={item}/>)}
      </div>
    </div>
  )
}

export default Favourites