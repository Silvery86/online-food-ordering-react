import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../State/Authentication/Action';

const UserProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector(store => store.auth)
  console.log("Auth......",auth)
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  }
  return (
    <div className='min-h-[80vh] flex flex-col justify-center items-center text-center'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='py-5 text-2xl font-semibold'>Thông tin khách hàng</h1>
        <AccountCircleIcon sx={{ fontSize: "9rem" }} />
        <h1 className='py-5 text-2xl font-semibold'>{auth.user?.fullName ?? "Foodsou"}</h1>
        <p>Email: {auth.user?.email ?? "Foodsou"}</p>
        <p>Phone: {auth.user?.phone ?? "Not set"}</p>
        <Button variant='contained' onClick={handleLogout} sx={{ margin: "2rem 0rem" }}>
          Logout
        </Button>
      </div>

    </div>
  )
}

export default UserProfile
