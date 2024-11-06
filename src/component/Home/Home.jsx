import React, { useEffect, useState } from 'react'
import "./Home.css"
import MultiItemCarousel from './MultiItemCarousel'
import RestaurantCard from '../Restaurant/RestaurantCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurantsAction } from '../State/Restaurant/Action';
import banner1 from '../assets/banner/banner1.jpg'
import banner2 from '../assets/banner/banner2.jpg'
import banner3 from '../assets/banner/banner3.jpg'
import background_full from '../assets/images/background/background-full.webp'
import Slider from 'react-slick';
import { getAllEvents } from '../State/Event/Action';
import FavouriteRestaurant from '../Restaurant/FavouriteRestaurant';
import { useTheme } from '@mui/material/styles';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const defaultEventList = [
  {
    title: "Đặt đồ ăn mang về",
    description: "Đặt trước đến nhà hàng về ưu đãi giảm 40%",
    image: banner1,
  },
  {
    title: "Giao hàng tận nơi trong 2 tiếng",
    description: "Áp dụng nội thành Hà Nội",
    image: banner2,
  },
  {
    title: "Đặt bàn online",
    description: "Đặt bàn trước online nhận ưu đãi đến 10%",
    image: banner3,
  }
]

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const jwt = localStorage.getItem("jwt");
  const restaurant = useSelector(store => store.restaurant)
  const auth = useSelector(store => store.auth)
  const event = useSelector(store => store.event)
  const eventsList = event.events
  useEffect(() => {
    dispatch(getAllRestaurantsAction())
    dispatch(getAllEvents())
  }, [dispatch])
  console.log("Event List....", eventsList)
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };
  const theme = useTheme();
  const handleEventNavigate = (id) => {
    navigate(`/events/event/${id}`);
  };
  return (
    <div className='home relative pb-10'>

      {/* Banner */}
      <Slider {...settings}>
        {defaultEventList.map((banner, index) => (
          <section key={index} className="banner relative flex flex-col items-center justify-center align-middle pt-10">
            <div className="w-[60%] z-20 text-left mt-20 relative px-10">
              <h1
                style={{ color: theme.palette.primary.main }}
                className="text-2xl lg:text-6xl font-bold pt-10"
              >
                {banner.title || "Default Title"}
              </h1>
              <p
                style={{ color: theme.palette.black.main }}
                className="text-primary text-xl lg:text-4xl pt-8 font-semibold"
              >
                {banner.description || "Default Description"}
              </p>
            </div>
            <div className="cover absolute top-0 left-0 right-0 bottom-0 -z-10">
              <img
                src={banner.image || "../assets/images/default.jpg"}
                alt={banner.title || "Default Title"}
                className="object-cover w-full h-full"
              />
            </div>
          </section>
        ))}
      </Slider>

      {/* Menu */}
      <section className='foods-section pt-10 lg:py-20'>
        <p
          style={{ color: theme.palette.primary.main }}
          className='w-full text-center text-5xl font-semibold pb-20'
        >Món ăn ngon nổi bật</p>
        <MultiItemCarousel />
      </section>

      {/* Favourited Restaurant */}
      {auth.favorites.length > 0
        ?
        <section className='px-5 lg:px-20 pt-10'>
          <h1
            style={{ color: theme.palette.primary.main }}
            className='text-2xl font-semiboldpb-3'
          >Nhà hàng bạn thích</h1>
          <div className='flex flex-wrap items-center justify-left gap-5'>
            {
              auth.favorites.map((item) => <FavouriteRestaurant key={item.id} item={item} />)
            }
          </div>
        </section>
        : <></>}

      {/* Banner */}
      <Slider {...settings}>
        {eventsList.map((banner, index) => (
          <section key={index} className="banner relative flex flex-col items-center justify-center align-middle pt-10">
            <div className="w-[100%] z-20 text-center mt-10 relative px-20">
              <h1
                style={{ color: theme.palette.primary.main }}
                className="text-2xl lg:text-6xl font-bold pt-10"
              >
                {banner.title || "Default Title"}
              </h1>
              <p
                style={{ color: theme.palette.black.main }}
                className="text-primary text-xl lg:text-4xl pt-8 font-semibold"
              >
                {banner.description || "Default Description"}
              </p>
              <div className='mt-10'>
                <Button
                  variant='contained'
                  color='primary'
                  size="large"
                  className='button-animated' // Add your animation class here
                  onClick={() => handleEventNavigate(banner.eventId)}
                >
                  Xem Chi Tiết
                </Button>
              </div>
            </div>
            <div className="cover absolute top-0 left-0 right-0 bottom-0 -z-10">
              <img
                src={banner.image || "../assets/images/default.jpg"}
                alt={banner.title || "Default Title"}
                className="object-cover w-full h-full"
              />
            </div>
          </section>
        ))}
      </Slider>

      {/* All Restaurant */}
      <section className='px-5 lg:px-20 pt-10'>
        <h1
          style={{ color: theme.palette.primary.main }}
          className='w-full text-center text-5xl font-semibold pb-20'
        >Nhà hàng Foodsou</h1>
        <div className='flex flex-wrap items-center justify-left gap-5'>
          {
            restaurant.restaurants.map((item) => <RestaurantCard key={item.id} item={item} />)
          }
        </div>
      </section>
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

export default Home