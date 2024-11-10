import React, { useState } from 'react'
import ProfileNavigation from './ProfileNavigation'
import { Route, Routes, useNavigate } from 'react-router-dom'
import UserProfile from './UserProfile'
import Orders from './Orders'
import Address from './Address'
import Favourites from './Favourites'
import { TableOrders } from './TableOrders'
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Profile = () => {
  const [openSideBar, setOpenSideBar] = useState(false)
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate()
  return (
    <div className="md:flex flex flex-wrap justify-between">
      <div className="hidden md:block z-10 w-20%">
        <ProfileNavigation open={openSideBar} />
      </div>
      <div className="w-[100%] md:w-[80%]">
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="address" element={<Address />} />
          <Route path="favorites" element={<Favourites />} />
          <Route path="table-orders" element={<TableOrders />} />
        </Routes>
      </div>
      <div className='flex md:hidden w-full sticky-cart fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg z-50'>
        <Box sx={{ width: "100%" }}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Đơn hàng" onClick={() => navigate("orders")} icon={<ShoppingBagIcon />} />
            <BottomNavigationAction label="Đặt bàn" onClick={() => navigate("table-orders")} icon={<EventIcon />} />
            <BottomNavigationAction label="Yêu thích" onClick={() => navigate("favorites")} icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Tài khoản" onClick={() => navigate("")} icon={<AccountCircleIcon />} />
          </BottomNavigation>
        </Box>
      </div>


    </div>

  )
}

export default Profile