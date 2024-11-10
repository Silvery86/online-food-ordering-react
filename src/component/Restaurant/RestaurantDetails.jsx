import { Avatar, AvatarGroup, Button, Chip, Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MenuCard from './MenuCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById, getRestaurantCategory, getRestaurantEvents } from '../State/Restaurant/Action';
import { getMenuItemsByRestaurantId } from '../State/Menu/Action';
import background_full from '../assets/images/background/background-full.webp'
import "./RestaurantDetails.css"
import { formatCurrency } from '../util/currencyFormat';
import { ShoppingCart } from '@mui/icons-material';


const foodTypes = [
    { label: "Tất cả", value: "all" },
    { label: "Đồ Tươi Sống", value: "non_vegetarian" },
    { label: "Đồ Ăn Chay", value: "vegetarian" },
    { label: "Theo Mùa", value: "seasonal" }
]
const RestaurantDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const restaurant = useSelector(store => store.restaurant);
    const menu = useSelector(store => store.menu)
    const cart = useSelector(store => store.cart)
    const cartList = cart.cartItems || []
    console.log("Cart.....", cartList)
    const [selectedCategory, setSelectedCategory] = useState("");
    const { id } = useParams();
    const [foodType, setFoodType] = useState("");
    const handleFilter = (e) => {
        setFoodType(e.target.value)
        console.log(e.target.value, e.target.name)
    }
    const handleFilterCategory = (e, value) => {
        setSelectedCategory(value);
        console.log(e.target.value, e.target.name)
    }
    useEffect(() => {
        dispatch(getRestaurantById({ restaurantId: id }));
        dispatch(getRestaurantCategory({ restaurantId: id }));
        dispatch(getRestaurantEvents({ restaurantId: id }))

    }, [dispatch, id])
    useEffect(() => {
        dispatch(getMenuItemsByRestaurantId({
            jwt,
            restaurantId: id,
            nonveg: foodType === "non_vegetarian",
            seasonal: foodType === "seasonal",
            vegetarian: foodType === "vegetarian",
            foodCategory: selectedCategory,
        }));
    }, [selectedCategory, foodType, id, jwt, dispatch])

    // Stiky Cart Data
    const [stickyCart, setStickyCart] = useState({
        images: [],
        totalCart: 0,
        cartQuantity: 0,
        cartItems: 0,
    });
    // Update sticky cart data whenever cartList changes
    useEffect(() => {
        let newStickyCart = {
            images: [],
            totalCart: 0,
            cartQuantity: 0,
            cartItems: 0,
        };

        cartList.forEach(item => {
            if (item.food.images && item.food.images.length > 0) {
                // Add the first image if it is not already present
                if (!newStickyCart.images.includes(item.food.images[0])) {
                    newStickyCart.images.push(item.food.images[0]);
                }
            }
            newStickyCart.totalCart += item.quantity * item.food.price;
            newStickyCart.cartQuantity += item.quantity;
            newStickyCart.cartItems += 1;
        });

        // Update state with new stickyCart
        setStickyCart(prevStickyCart => ({
            ...prevStickyCart,
            ...newStickyCart,
        }));

        console.log("Updated Sticky Data:", newStickyCart); // Debug log
    }, [cartList, stickyCart.images.length, stickyCart.cartQuantity, stickyCart.cartItems]);  // Runs every time `cartList` changes

    return (
        <div className='relative px-5 lg:px-20'>
            <section className='pt-5'>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <img className='w-full h-[30vh] md:h-[80vh] object-cover rounded-xl'
                                src={restaurant.restaurant?.images[0]}
                                alt=''
                            />
                        </Grid>
                        <Grid item xs={6} lg={6}>
                            <img className='w-full h-[20vh] md:h-[40vh] object-cover rounded-xl'
                                src={restaurant.restaurant?.images[1]}
                                alt=''
                            />
                        </Grid>
                        <Grid item xs={6} lg={6}>
                            <img className='w-full h-[20vh] md:h-[40vh] object-cover rounded-xl'
                                src={restaurant.restaurant?.images[2]}
                                alt=''
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className='flex justify-center flex-wrap'>
                    <div className='w-[100%] md:w-[80%] pt-3 pb-5'>
                        <h1 className='text-4xl font-semibold'>
                            {restaurant.restaurant?.name}
                        </h1>
                        <p className='text-gray-500 mt-1'>
                            <span>
                                {restaurant.restaurant?.description}
                            </span>
                        </p>
                        <div className='space-y-3 mt-3'>
                            <p className='text-gray-500 flex items-center gap-3'>
                                <LocationOnIcon />
                                <span>
                                    {restaurant.restaurant?.address.streetAddress} - {restaurant.restaurant?.address.state} - {restaurant.restaurant?.address.city}
                                </span>
                            </p>
                            <p className='text-gray-500 flex items-center gap-3'>
                                <CalendarTodayIcon />
                                <span>
                                    {restaurant.restaurant?.openingHours}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className='w-[100%] md:w-[20%] flex justify-center align-middle py-10'>
                        <Button onClick={() => { navigate("/table-order") }} variant='contained' className='pulse-button'>Đặt bàn ngay!</Button>
                    </div>
                </div>

            </section>
            <Divider />
            <section className='pt-[2rem] md:flex relative pb-[90px]'>

                <div className='hidden md:block space-y-10 w-[100%] md:w-[20%] filter'>
                    <div className='flex flex-wrap md:box space-y-5 lg:sticky top-2 '>
                        <Typography variant='h5' sx={{ width: "100%" }}>
                            Thực đơn :
                        </Typography>
                        <FormControl sx={{ width: "100%" }} component={"fieldset"}>
                            <RadioGroup
                                onChange={handleFilterCategory}
                                name='food_category'
                                value={selectedCategory}
                            >
                                {restaurant.categories.map((item) =>
                                    <FormControlLabel
                                        key={item.id}
                                        value={item.name}
                                        control={<Radio />}
                                        label={item.name}
                                    />
                                )}
                            </RadioGroup>
                        </FormControl>
                        <Divider />
                        {/* <Typography variant='h5'>
                            Loại thực đơn :
                        </Typography>
                        <FormControl className='space-y-5' component={"fieldset"}>
                            <RadioGroup onChange={handleFilter} aria-labelledby="demo-radio-buttons-group-label" defaultValue="all" name='food_type'>
                                {foodTypes.map((item) => (
                                    <FormControlLabel
                                        key={item.value}
                                        value={item.value}
                                        control={<Radio />}
                                        label={item.label}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl> */}
                    </div>

                </div>
                <div className='flex md:hidden space-y-10 w-[100%] md:w-[20%] filter'>
                    <div className='flex flex-wrap md:box space-y-5 lg:sticky top-2 '>
                        <Typography variant='h5' sx={{ width: "100%" }}>
                            Thực đơn :
                        </Typography>
                        <FormControl sx={{ width: "100%" }} component={"fieldset"}>
                            <RadioGroup
                                onChange={handleFilterCategory}
                                name='food_category'
                                value={selectedCategory}
                                row={true}
                            >
                                {restaurant.categories.map((item) =>
                                    <FormControlLabel
                                        key={item.id}
                                        value={item.name}
                                        control={<Radio />}
                                        label={item.name}
                                    />
                                )}
                            </RadioGroup>
                        </FormControl>
                        <Divider />
                        {/* <Typography variant='h5'>
                            Loại thực đơn :
                        </Typography>
                        <FormControl className='space-y-5' component={"fieldset"}>
                            <RadioGroup onChange={handleFilter} aria-labelledby="demo-radio-buttons-group-label" defaultValue="all" name='food_type'>
                                {foodTypes.map((item) => (
                                    <FormControlLabel
                                        key={item.value}
                                        value={item.value}
                                        control={<Radio />}
                                        label={item.label}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl> */}
                    </div>
                </div>
                <div className='space-y-5 w-[100%] md:w-[80%] md:pl-10'>
                    {menu.menuItems.map((item) => <MenuCard key={item.id} item={item} />)}
                </div>
            </section>
            {/* Sticky Cart */}
            {cartList.length > 0
                ?
                <div className="sticky-cart fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg z-50">
                    <div className="flex justify-between items-center px-5 lg:px-12">
                        <AvatarGroup max={5}>
                            {stickyCart.images.length > 0
                                ? stickyCart.images.map((image, index) => (
                                    <Avatar key={index} alt="" src={image} sx={{ width: 50, height: 50 }} />
                                ))
                                : <Avatar alt="Default" src="/static/images/avatar/1.jpg" />
                            }
                        </AvatarGroup>

                        <Button
                            variant="contained"
                            onClick={() => navigate('/cart')}
                            endIcon={<ShoppingCart color='black' />}
                            size="large"
                        >
                            {formatCurrency(stickyCart.totalCart)}
                        </Button>
                    </div>
                </div>
                :
                <></>
            }


            <div className="home__cover absolute top-0 left-0 right-0 bottom-0 -z-10">
                <img
                    src={background_full || "../assets/images/default.jpg"}
                    alt=""
                    className="object-cover w-full h-full"
                />
            </div>
        </div>


    )
}

export default RestaurantDetails
