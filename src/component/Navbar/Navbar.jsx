import { Avatar, Badge, IconButton } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { pink } from '@mui/material/colors';
import "./Navbar.css"
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


export const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div className='px-4 z-50 sticky py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between'>
            <div className='lg:mr-10 cursor-pointer flex items-center space-x-4'>
                <li className='logo font-semibold text-gray-300 text-2xl'>
                    Online Food Ordering
                </li>
            </div>
            <div className='flex items-center space-x-2 lg:space-x-10'>
                <div className=''>
                    <IconButton>
                        <SearchIcon sx={{ fontSize: "1.5rem" }} />
                    </IconButton>
                </div>
                <div className=''>
                    {false ? 
                    <Avatar sx={{ bgcolor: "white", color: pink.A400 }}>A</Avatar>
                    : <IconButton onClick={()=>navigate("/account/login")}>
                        <Person/>
                    </IconButton>
                    }
                </div>
                <div className=''>
                    <IconButton>
                        <Badge badgeContent={4} color="primary">
                            <ShoppingCartIcon sx={{ fontSize: "1.5rem" }} />
                        </Badge>
                    </IconButton>
                </div>
            </div>

        </div>
    )
}
