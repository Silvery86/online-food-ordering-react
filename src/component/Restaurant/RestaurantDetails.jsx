import { Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MenuCard from './MenuCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById, getRestaurantCategory, getRestaurantEvents } from '../State/Restaurant/Action';
import { getUser } from '../State/Authentication/Action';
import { getMenuItemsByRestaurantId } from '../State/Menu/Action';
import { defaultEventList } from '../Home/Home';
import Slider from 'react-slick';


const foodTypes = [
    { label: "Tất cả", value: "all" },
    { label: "Đồ Ăn Chay", value: "vegetarian" },
    { label: "Đồ Tươi Sống", value: "non_vegetarian" },
    { label: "Theo Mùa", value: "seasonal" }
]
const slidingContent = [
    {
        title: "Content Title",
        description: "Content Description",
        image: "https://images01.nicepage.com/a1389d7bc73adea1e1c1fb7e/f55c87d06a345e9c94021f3e/3007283.jpg"
    },
    {
        title: "Content Title1",
        description: "Content Description1",
        image: "https://images01.nicepage.com/a1389d7bc73adea1e1c1fb7e/f55c87d06a345e9c94021f3e/3007283.jpg"
    },
    // Add more content objects as needed
];
const RestaurantDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const auth = useSelector(store => store.auth);
    const restaurant = useSelector(store => store.restaurant);
    const event = useSelector(store => store.event)
    const menu = useSelector(store => store.menu)
    const eventsList = event.events
    const [selectedCategory, setSelectedCategory] = useState("");
    const { id } = useParams();
    const [foodType, setFoodType] = useState("");
    const [category, setCategory] = useState("");
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

    }, [])
    
    useEffect(() => {
        dispatch(getMenuItemsByRestaurantId({
            jwt,
            restaurantId: id,
            nonveg: foodType === "vegetarian",
            seasonal: foodType === "non_vegetarian",
            vegetarian: foodType === "seasonal",
            foodCategory: selectedCategory,
        }));
    }, [selectedCategory, foodType])
    // console.log("Restaurant:", restaurant)
    const combinedEventsList = eventsList.length > 0
        ? [...eventsList]
        : [];
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
    };
    return (
        <div>
            <section>
                <Slider {...settings}>
                    {combinedEventsList.map((banner, index) =>
                        <section key={index} className="banner z-50 relative flex flex-col items-center justify-center align-middle pt-10">
                            <div className="z-10 text-center mt-10">
                                <h1 className="text-2xl lg:text-6xl font-bold pt-5">
                                    {banner.title || "Default Title"}
                                </h1>
                                <p className="text-gray-300 text-xl lg:text-4xl">
                                    {banner.description || "Default Description"}
                                </p>
                            </div>
                            <div className="cover absolute top-0 left-0 right-0">
                                <img
                                    src={banner.image || "../assets/images/default.jpg"}
                                    alt={banner.title || "Default Title"}
                                    className="object-cover w-full h-full brightness-110"
                                />
                            </div>                           
                        </section>
                    )}
                </Slider>
            </section>

            <div className='px-5 lg:px-20'>           
                <section className='pt-5'>
                    <div>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <img className='w-full h-[80vh] object-cover'
                                    src={restaurant.restaurant?.images[0]}
                                    alt=''
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <img className='w-full h-[40vh] object-cover'
                                    src={restaurant.restaurant?.images[1]}
                                    alt=''
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <img className='w-full h-[40vh] object-cover'
                                    src={restaurant.restaurant?.images[2]}
                                    alt=''
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div className='pt-3 pb-5'>
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
                </section>
                <Divider />

                <section className='pt-[2rem] lg:flex relative'>
                    <div className='space-y-10 lg:w-[20%] filter'>
                        <div className='box space-y-5 lg:sticky top-28'>
                            <Typography variant='h5' sx={{ paddingBottom: "1rem" }}>
                                Loại thực đơn :
                            </Typography>
                            <FormControl className='py-10 space-y-5' component={"fieldset"}>
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
                            </FormControl>

                            <Divider />

                            <Typography variant='h5' sx={{ paddingBottom: "1rem" }}>
                                Thực đơn :
                            </Typography>
                            <FormControl className='py-10 space-y-5' component={"fieldset"}>
                                <RadioGroup
                                    onChange={handleFilterCategory}
                                    name='food_category'
                                    value={selectedCategory}
                                //defaultValue="all" 
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
                        </div>

                    </div>
                    <div className='space-y-5 lg:w-[80%] lg:pl-10'>
                        {menu.menuItems.map((item) => <MenuCard key={item.id} item={item} />)}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default RestaurantDetails
