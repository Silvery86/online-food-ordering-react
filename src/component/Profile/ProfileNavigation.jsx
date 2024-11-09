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
import { useDispatch } from 'react-redux';
import { logout } from '../State/Authentication/Action';


const menu = [
  { title: "Đơn hàng", slug: "orders", icon: <ShoppingBagIcon /> },
  { title: "Đặt bàn", slug: "table-orders", icon: <EventIcon /> },
  { title: "Yêu thích", slug: "favorites", icon: <FavoriteIcon /> },
  
  //{ title: "Địa chỉ", slug: "address", icon: <HomeIcon /> },
  //{ title: "Thanh toán", slug: "payment", icon: <AccountBalanceWalletIcon /> },
  { title: "Thông báo", slug: "notification", icon: <NotificationsIcon /> },
  
  { title: "Đăng xuất", slug: "logout", icon: <LogoutIcon /> },

]


const ProfileNavigation = ({ open, handleClose }) => {
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    if (item.slug === "logout") {
      dispatch(logout());
      navigate("/");
    } else {
      navigate(`/my-profile/${item.slug.toLowerCase()}`);
    }
  };

  return (
    <div>
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        onClose={handleClose}
        open={open}
        anchor="left"    
      >
        <div className="w-[50vw] lg:w-[20vw] h-full flex flex-col justify-center text-xl gap-6 pt-20 px-4">
          {menu.map((item, i) => (
            <React.Fragment key={item.slug}>
              <div
                onClick={() => handleNavigate(item)}
                className="flex items-center space-x-5 cursor-pointer py-2"
              >
                {item.icon}
                <span>{item.title}</span>
              </div>
              {i !== menu.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </div>
      </Drawer>
    </div>
  );
};


export default ProfileNavigation