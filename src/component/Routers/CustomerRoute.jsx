import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Home/Home'
import RestaurantDetails from '../Restaurant/RestaurantDetails'
import Cart from '../Cart/Cart'
import { Navbar } from '../Navbar/Navbar'
import { Auth } from '../Auth/Auth'
import { PaymentSuccess } from '../PaymentSuccess/PaymentSuccess'
import { AboutUs } from '../Home/AboutUs'
import { Contact } from '../Home/Contact'
import { News } from '../Home/News'
const CustomerRoute = () => {
    return (
        <div>
            <Navbar/>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/account/:register' element={<Home />} />
                    <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails />} />
                    <Route path='/about-us' element={<AboutUs />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/news' element={<News />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/payment/success/:id' element={<PaymentSuccess/>} />
                </Routes>
            <Auth/>
        </div>
    )
}

export default CustomerRoute