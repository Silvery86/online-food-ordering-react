import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Home/Home'
import RestaurantDetails from '../Restaurant/RestaurantDetails'
import Cart from '../Cart/Cart'
import { Navbar } from '../Navbar/Navbar'
import { Auth } from '../Auth/Auth'
import { PaymentSuccess } from '../PaymentSuccess/PaymentSuccess'
const CustomerRoute = () => {
    return (
        <div>
            <Navbar/>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/account/:register' element={<Home />} />
                    <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/payment/success/:id' element={<PaymentSuccess/>} />
                </Routes>
            <Auth/>
        </div>
    )
}

export default CustomerRoute