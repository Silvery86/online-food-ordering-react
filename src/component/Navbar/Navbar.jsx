import { Avatar, Badge, Button, IconButton, Menu, MenuItem } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { green, pink } from '@mui/material/colors';
import "./Navbar.css"
import { Alarm, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/Foodsou-removebg.png'

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
    // Menu bar
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className='px-5 z-50 sticky py-[.5rem] bg-primary lg:px-20 flex justify-between items-center md:py-[.8rem]'>
            <div className='cursor-pointer md:hidden flex justify-center items-center'>
                <IconButton
                    aria-label="more"
                    id="menu-button"
                    aria-controls={open ? 'menu-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'menu-button',
                    }}
                >
                    <MenuItem onClick={() => navigate("/about-us")}>Về chúng tôi</MenuItem>
                    <MenuItem onClick={() => navigate("/news")}>Tin tức</MenuItem>
                    <MenuItem onClick={() => navigate("/contact")}>Liên hệ</MenuItem>                   
                </Menu>
                <Button color="error" variant='contained' onClick={() => navigate("/table-order")} className='ml-3 pulse-button' size='small'>
                    Đặt bàn ngay
                </Button >
            </div>
            <div className='lg:mr-10 cursor-pointer items-center space-x-4 md:flex'>
                <li onClick={() => navigate("/")} className='logo font-semibold text-primary text-3xl'>
                    Foodsou
                </li>
            </div>
            <div className='hidden md:flex space-x-5 w-full justify-start items-center lg:space-x-8'>
                {/* Navigation Links */}
                <button onClick={() => navigate("/about-us")} className='text-white hover:underline md:text-xl'>
                    Về chúng tôi
                </button>
                <button onClick={() => navigate("/news")} className='text-white hover:underline md:text-xl'>
                    Tin tức
                </button>
                <button onClick={() => navigate("/contact")} className='text-white hover:underline md:text-xl'>
                    Liên hệ
                </button>
                <Button color="error" variant='contained' onClick={() => navigate("/table-order")} className='ml-3 pulse-button'>
                    Đặt bàn ngay
                </Button >
            </div>
            <div className='flex items-center space-x-2 lg:space-x-10'>
                {/* <div className=''>
                    <IconButton>
                        <SearchIcon sx={{ fontSize: "1.5rem" }} />
                    </IconButton>
                </div> */}
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
