import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import { Admin } from '../../AdminComponent/Admin/Admin'
import { CreateRestaurantForm } from '../../AdminComponent/CreateRestaurantForm/CreateRestaurantForm'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurantByUserId } from '../State/Restaurant/Action'
import { getUser } from '../State/Authentication/Action'


const AdminRoute = () => {   
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const jwt = localStorage.getItem("jwt")
    const auth = useSelector((store) => store.auth);
    const restaurant = useSelector(store => store.restaurant) 
   
    useEffect(() => {               
          dispatch(getUser(jwt));  
          dispatch(getRestaurantByUserId(jwt));  
           
      }, [jwt || auth.jwt]);    
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
