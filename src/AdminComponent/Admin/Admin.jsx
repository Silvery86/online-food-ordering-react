import React, { useEffect } from 'react'
import { AdminSideBar } from './AdminSideBar'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from '../Dashboard/Dashboard'
import { Orders } from '../Orders/Orders'
import { Menu } from '../Menu/Menu'
import { FoodCategory } from '../FoodCategory/FoodCategory'
import { Ingredients } from '../Ingredients/Ingredients'
import { Events } from '../Events/Events'
import { RestaurantDetails } from './RestaurantDetails'
import { CreateMenuForm } from '../Menu/CreateMenuForm'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurantCategory } from '../../component/State/Restaurant/Action'
import { fetchRestaurantsOrder } from '../../component/State/RestaurantOrder/Action'
import { OrdersDetails } from '../Orders/OrdersDetails'
import { CreateEvent } from '../Events/CreateEvent'
import { getUser } from '../../component/State/Authentication/Action'

export const Admin = () => {
  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt")
  const restaurant = useSelector(state => state.restaurant)
  const auth = useSelector(state => state.auth)
  const handleClose = () => {


  }
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }

  }, [jwt || auth.jwt]);
  useEffect(() => {
    dispatch(getRestaurantCategory({
      jwt: jwt,
      restaurantId: restaurant.usersRestaurant?.id,
    }))
    dispatch(fetchRestaurantsOrder({
      jwt: jwt,
      restaurantId: restaurant.usersRestaurant?.id,
    }))

  }, [jwt])
  return (

    <div>
      <div className='lg:flex justify-between'>
        <div className="sticky lg:w-[20%] z-10">
          <AdminSideBar handleClose={handleClose} />
        </div>
        <div className='lg:w-[80%]'>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/order/:id' element={<OrdersDetails />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/category' element={<FoodCategory />} />
            <Route path='/ingredients' element={<Ingredients />} />
            <Route path='/event' element={<Events />} />
            <Route path='/details' element={<RestaurantDetails />} />
            <Route path='/add-menu' element={<CreateMenuForm />} />
            <Route path='/add-event' element={<CreateEvent />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
