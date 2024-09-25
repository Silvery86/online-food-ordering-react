import React from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const menu = [
  { title: "Đơn hàng", slug: "orders", icon: <ShoppingBagIcon /> },
  { title: "Yêu thích", slug: "favorites", icon: <FavoriteIcon /> },
  { title: "Địa chỉ", slug: "address", icon: <HomeIcon /> },
  { title: "Thanh toán", slug: "payment", icon: <AccountBalanceWalletIcon /> },
  { title: "Thông báo", slug: "notification", icon: <NotificationsIcon /> },
  { title: "Sự kiện", slug: "events", icon: <EventIcon /> },
  { title: "Đăng xuất", slug: "logout", icon: <LogoutIcon /> },

]


const ProfileNavigation = ({ open, handleClose }) => {
  const isSmallScreen = useMediaQuery('(max-width:900px)')
  const navigate = useNavigate();

  const handleNavigate = (item) => {
    navigate(`/my-profile/${item.slug.toLowerCase()}`)

  }

  return (
    <div>
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        onClose={handleClose}
        open={open}
        anchor='left'
        sx={{ zIndex: -1 }}
      >
        <div className='w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col justify-center text-xl gap-8 pt-16'>
          {menu.map((item, i) => <>
            <div onClick={() => handleNavigate(item)} className='px-5 flex items-center space-x-5 cursor-pointer'>
              {item.icon}
              <span>{item.title}</span>
            </div>
            {i !== menu.length - 1 && <Divider />}
          </>)}

        </div>
      </Drawer>

    </div>
  )
}

export default ProfileNavigation