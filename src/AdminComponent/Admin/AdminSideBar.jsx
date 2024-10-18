import React from 'react'
import { Dashboard, Event, LocalDining, MenuBook, ShoppingBag, SoupKitchen, Storefront, Logout } from '@mui/icons-material';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../component/State/Authentication/Action';
const menu = [
    { title: "Trang Chủ", slug: "dashboard", icon: <Dashboard />, path: "/" },
    { title: "Đơn Hàng", slug: "orders", icon: <ShoppingBag />, path: "/orders" },
    { title: "Thực Đơn", slug: "menu", icon: <MenuBook />, path: "/menu" },
    { title: "Món Ăn", slug: "category", icon: <LocalDining />, path: "/category" },
    { title: "Nguyên Liệu", slug: "ingredients", icon: <SoupKitchen />, path: "/ingredients" },
    { title: "Sự Kiện", slug: "event", icon: <Event />, path: "/event" },
    { title: "Chi Tiết", slug: "details", icon: <Storefront />, path: "/details" },
    { title: "Đăng Xuất", slug: "logout", icon: <Logout />, path: "/logout" },


]
export const AdminSideBar = ({ handleClose }) => {
    const isSmallScreen = useMediaQuery("(max-width:1080px)")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleNavigate = (item) => {
        navigate(`/admin/restaurant${item.path}`)
        if(item.slug === "logout"){
            navigate("/")
            dispatch(logout())
            handleClose()
        }
    }
    
    return (
        <div>
            <>
                <Drawer
                    variant={isSmallScreen ? "temporary" : "permanent"}
                    onClose={handleClose}
                    open={true}
                    anchor='left'
                    sx={{ zIndex: 1 }}
                >
                    <div className='w-[70vw] lg:w-[20vw] h-screen flex flex-col justify-center text-xl space-y-[1.65rem]'>
                        {menu.map((item, i) => <>
                            <div onClick={() => handleNavigate(item)} className='px-5 flex items-center gap-5 cursor-pointer'>
                                {item.icon}
                                <span>{item.title}</span>
                            </div>
                            {i !== menu.length - 1 && <Divider />}
                        </>)}

                    </div>
                </Drawer>
            </>
        </div>
    )
}
