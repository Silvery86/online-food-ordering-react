import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import { Admin } from '../../AdminComponent/Admin/Admin'
import { CreateRestaurantForm } from '../../AdminComponent/CreateRestaurantForm/CreateRestaurantForm'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurantByUserId } from '../State/Restaurant/Action'
import { getUser } from '../State/Authentication/Action'
import { Auth } from '../Auth/Auth'
import { Navbar } from '../Navbar/Navbar'


const AdminRoute = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const jwt = localStorage.getItem("jwt")
    const auth = useSelector((store) => store.auth);
    const restaurant = useSelector(store => store.restaurant)
    useEffect(() => {
        // If JWT is in local storage and not already in auth, dispatch getUser
        if (jwt && !auth.jwt) {
            dispatch(getUser(jwt));
        }
    }, [jwt, auth.jwt, dispatch]);
    useEffect(() => {       
          dispatch(getRestaurantByUserId(jwt));        
      }, [jwt, dispatch]);
     

    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/*' element={!restaurant.usersRestaurant ? <CreateRestaurantForm /> : <Admin />} >
                </Route>
            </Routes>
            <Auth />
        </div>
    )
}

export default AdminRoute;
