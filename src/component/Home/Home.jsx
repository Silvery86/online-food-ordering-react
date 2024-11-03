import React, { useEffect, useState } from 'react'
import "./Home.css"
import MultiItemCarousel from './MultiItemCarousel'
import RestaurantCard from '../Restaurant/RestaurantCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurantsAction } from '../State/Restaurant/Action';
import banner1 from '../assets/banner/banner1.jpg'
import banner2 from '../assets/banner/banner2.jpg'
import banner3 from '../assets/banner/banner3.jpg'
import Slider from 'react-slick';
import { getAllEvents } from '../State/Event/Action';

const defaultEventList = [
  {
    title: "Banner 1",
    description: "Banner 1 description",
    image: banner1,
  },
  {
    title: "Banner 2",
    description: "Banner 2 description",
    image: banner2,
  },
  {
    title: "Banner 3",
    description: "Banner 3 description",
    image: banner3,
  }
]

function Home() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const restaurant = useSelector(store => store.restaurant)
  const auth = useSelector(store => store.auth)
  const event = useSelector(store => store.event)
  const eventsList = event.events
  const combinedEventsList = eventsList.length > 0
    ? [...eventsList, ...defaultEventList]
    : defaultEventList;
  useEffect(() => {
    dispatch(getAllRestaurantsAction())
    dispatch(getAllEvents())
  }, [])
  console.log("Combined Events .....", combinedEventsList)
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
    <div className='pb-10'>
      {/* Banner */}

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
            <div className="fadout absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-black/0 via-black/10 to-black/100"></div>
          </section>
        )}
      </Slider>

      {/* Menu */}
      
      <section className='relative p-10 lg:py-10 lg:px-20'>
      <div className="fadout absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-black/100 via-black/90 to-black/0"></div>
        <p className='text-2xl font-semibold text-gray-400 py-3 pb-10'>Món ăn nổi tiếng</p>
        <MultiItemCarousel />
      </section>

      {/* Favourited Restaurant */}
      {auth.user
        ?
        <section className='px-5 lg:px-20 pt-10'>
          <h1 className='text-2xl font-semibold text-gray-400 pb-3'>Nhà hàng của bạn</h1>
          <div className='flex flex-wrap items-center justify-left gap-5'>
            {
              restaurant.restaurants.map((item) => <RestaurantCard item={item} />)
            }
          </div>
        </section>
        : <></>}

      {/* All Restaurant */}
      <section className='px-5 lg:px-20 pt-10'>
        <h1 className='text-2xl font-semibold text-gray-400 pb-3'>Nhà hàng nổi tiếng</h1>
        <div className='flex flex-wrap items-center justify-left gap-5'>
          {
            restaurant.restaurants.map((item) => <RestaurantCard item={item} />)
          }
        </div>
      </section>

     
    </div>
  )
}

export default Home