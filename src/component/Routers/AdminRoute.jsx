import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Admin } from '../../AdminComponent/Admin/Admin'
import { CreateRestaurantForm } from '../../AdminComponent/CreateRestaurantForm/CreateRestaurantForm'
import { useDispatch, useSelector } from 'react-redux'


const AdminRoute = () => {
    const restaurant = useSelector(store => store.restaurant)
    return (
        <div>
            <Routes>
                <Route path='/*' element={!restaurant.usersRestaurant ? <CreateRestaurantForm /> : <Admin />} >
                </Route>
            </Routes>
        </div>
    )
}

export default AdminRoute;
