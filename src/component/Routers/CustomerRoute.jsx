import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Home/Home'
import RestaurantDetails from '../Restaurant/RestaurantDetails'
import Cart from '../Cart/Cart'
import { Navbar } from '../Navbar/Navbar'
import { Auth } from '../Auth/Auth'
import { AboutUs } from '../Home/AboutUs'
import { Contact } from '../Home/Contact'
import { News } from '../Home/News'
import Profile from '../Profile/Profile'

import { PaymentProcess } from '../Payment/PaymentProcess'
import { PaymentSuccess } from '../Payment/PaymentSuccess'
import { PaymentFailed } from '../Payment/PaymentFailed'
import { EventDetails } from '../Event/EventDetails'
import CreateTableOrder from '../TableOrder/CreateTableOrder'
import { TableOrderThankYou } from '../TableOrder/TableOrderThankYou'

const CustomerRoute = () => {
    return (
        <div>
            <Navbar/>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/account/:register' element={<Home />} />
                    <Route path='/restaurant/:id' element={<RestaurantDetails />} />
                    <Route path='/about-us' element={<AboutUs />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path="/my-profile/*" element={<Profile />} />
                    <Route path="/events/event/:id" element={<EventDetails />} />
                    <Route path='/table-order' element={<CreateTableOrder />} />
                    <Route path='/table-order/success/:id' element={<TableOrderThankYou />} />
                    <Route path='/news' element={<News />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/payment/process' element={<PaymentProcess/>} />
                    <Route path='/payment/success/:id' element={<PaymentSuccess/>} />
                    <Route path='/payment/fail/:id' element={<PaymentFailed/>} />
                </Routes>
            <Auth/>
        </div>
    )
}

export default CustomerRoute