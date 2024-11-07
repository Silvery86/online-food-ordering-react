import { Avatar, Badge, Button, IconButton } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { green, pink } from '@mui/material/colors';
import "./Navbar.css"
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';


export const Navbar = () => {
    const theme = useTheme()
    const auth = useSelector(store => store.auth);
    const cart = useSelector(store => store.cart);
    const navigate = useNavigate();
    const handleAvatarClick = () => {
        if (auth.user?.role === "ROLE_CUSTOMER") {
            navigate("/my-profile")
        } else {
            navigate("/admin/restaurant")
        }
    }
    const handleButtonClick = () => {       
          navigate("/cart");
      };
    return (
        <div className='px-4 z-50 sticky py-[.8rem] bg-primary lg:px-20 flex justify-between'>
            <div className='lg:mr-10 cursor-pointer flex items-center space-x-4'>
                <li onClick={() => navigate("/")} className='logo font-semibold text-primary text-3xl'>
                    Foodsou
                </li>
            </div>
            <div className='flex space-x-5 w-full justify-start items-center lg:space-x-8'>
                {/* Navigation Links */}
                <button onClick={() => navigate("/about-us")} className='text-white hover:underline text-xl'>
                    Về chúng tôi
                </button>
                <button onClick={() => navigate("/news")} className='text-white hover:underline text-xl'>
                    Tin tức
                </button>
                <button onClick={() => navigate("/contact")} className='text-white hover:underline text-xl'>
                    Liên hệ
                </button>    
                <Button color="error"  variant='contained' onClick={() => navigate("/table-order")} className='ml-3 pulse-button'>
                    Đặt bàn ngay
                </Button >            
            </div>
            <div className='flex items-center space-x-2 lg:space-x-10'>
                <div className=''>
                    <IconButton>
                        <SearchIcon sx={{ fontSize: "1.5rem" }} />
                    </IconButton>
                </div>
                <div className=''>
                    {auth.user ?
                        <Avatar onClick={handleAvatarClick} sx={{ bgcolor: theme.palette.white.main, color: green[500] }}>{auth.user?.fullName[0].toUpperCase()}</Avatar>
                        : <IconButton onClick={() => navigate("/account/login")}>
                            <Person />
                        </IconButton>
                    }
                </div>
                <div className=''>
                    <IconButton onClick={handleButtonClick}>
                        <div
                            style={{
                                display: 'inline-block',
                                transition: 'transform 0.3s ease',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.5)')}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        >
                            <Badge badgeContent={cart.cartItems.length} color="secondary">
                                <ShoppingCartIcon sx={{ fontSize: '1.5rem' }} />
                            </Badge>
                        </div>
                    </IconButton>
                </div>
            </div>

        </div>
    )
}
