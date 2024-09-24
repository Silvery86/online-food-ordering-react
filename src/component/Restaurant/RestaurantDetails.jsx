import { Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MenuCard from './MenuCard';

const categories = [
    "Phở Tái",
    "Phở Chín",
    "Phở Nạm",
    "Phở Gầu"
]
const foodTypes = [
    { label: "All", value: "all" },
    { label: "Vegetarian Only", value: "vegetarian" },
    { label: "Non-Vegetarian", value: "non_vegetarian" },
    { label: "Seasonal", value: "seasonal" }
]

const menu = [1, 1, 1, 1, 1, 1, 1]

const RestaurantDetails = () => {
    const [foodType, setFoodType] = useState("");
    const [category, setCategory] = useState("");
    const handleFilter = (e) => {
        console.log(e.target.value, e.target.name)
    }
    return (
        <div className='px-5 lg:px-20'>
            <section>
                <h3 className='text-gray-500 py-2 mt-10'>Home/Restaurants/FastFood/2</h3>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <img className='w-full h-[40vh] object-cover'
                                src='https://noipho360.vn/wp-content/uploads/2022/05/pho-ly-quoc-su.jpg'
                                alt=''
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <img className='w-full h-[40vh] object-cover'
                                src='https://noidiennaupho.com/wp-content/uploads/2023/09/pho-ly-quoc-su-gan-day.jpg'
                                alt=''
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <img className='w-full h-[40vh] object-cover'
                                src='https://pholyquocsu.vn/wp-content/uploads/2022/09/mon-an-quoc-dan-700x700.jpg'
                                alt=''
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className='pt-3 pb-5'>
                    <h1 className='text-4xl font-semibold'>
                        Phở Lý Quốc Sư
                    </h1>
                    <p className='text-gray-500 mt-1'>
                        <span>
                            Đến với Hà Nội du khách sành ăn không bao giờ quên thưởng thức món Phở.
                            Để nói thương hiệu phở ngon nhất nhì Hà Thành phải kể đến Phở Lý Quốc Sư.
                        </span>
                    </p>
                    <div className='space-y-3 mt-3'>
                        <p className='text-gray-500 flex items-center gap-3'>
                            <LocationOnIcon />
                            <span>
                                Số 10, Lý Quốc Sư, Hoàn Kiếm, Hà Nội
                            </span>
                        </p>
                        <p className='text-gray-500 flex items-center gap-3'>
                            <CalendarTodayIcon />
                            <span>
                                Mon-Sun: 9:00 AM - 9:00 PM (Today)
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
                            Food Type
                        </Typography>
                        <FormControl className='py-10 space-y-5' component={"fieldset"}>
                            <RadioGroup onChange={handleFilter} aria-labelledby="demo-radio-buttons-group-label" defaultValue="all" name='food_type'>
                                {foodTypes.map((item) => (
                                    <FormControlLabel
                                        //key={item.value}
                                        value={item.value}
                                        control={<Radio />}
                                        label={item.label}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>

                        <Divider />

                        <Typography variant='h5' sx={{ paddingBottom: "1rem" }}>
                            Food Category
                        </Typography>
                        <FormControl className='py-10 space-y-5' component={"fieldset"}>
                            <RadioGroup onChange={handleFilter} name='food_category' defaultValue="all" >
                                {categories.map((item) =>
                                    <FormControlLabel
                                        //key={item}
                                        value={item}
                                        control={<Radio />}
                                        label={item}
                                    />
                                )}
                            </RadioGroup>
                        </FormControl>

                    </div>

                </div>
                <div className='space-y-5 lg:w-[80%] lg:pl-10'>
                    {menu.map((item) => <MenuCard />)}
                </div>
            </section>
        </div>
    )
}

export default RestaurantDetails
