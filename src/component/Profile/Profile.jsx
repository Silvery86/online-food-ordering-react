import React, { useState } from 'react'
import ProfileNavigation from './ProfileNavigation'
import { Route, Routes } from 'react-router-dom'
import UserProfile from './UserProfile'
import Orders from './Orders'
import Address from './Address'
import Favourites from './Favourites'
import Events from './Events'
import { TableOrders } from './TableOrders'


const Profile = () => {
  const [openSideBar, setOpenSideBar] = useState(true)
  return (
    <div className="lg:flex flex justify-between">
      <div className="sticky lg:w-[20%] z-10">
        <ProfileNavigation open={openSideBar} />
      </div>
      <div className="lg:w-[80%]">
        <Routes>
        <Route path="/" element={<UserProfile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="address" element={<Address />} />
          <Route path="favorites" element={<Favourites />} />
          <Route path="table-orders" element={<TableOrders />} />
        </Routes>
      </div>
    </div>

  )
}

export default Profile