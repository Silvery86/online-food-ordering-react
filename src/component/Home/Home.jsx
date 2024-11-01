import React, { useEffect, useState } from 'react'
import "./Home.css"
import MultiItemCarousel from './MultiItemCarousel'
import RestaurantCard from '../Restaurant/RestaurantCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurantsAction } from '../State/Restaurant/Action';
import { getAllEvents } from '../State/Event/Action';


function Home() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const  restaurant  = useSelector(store => store.restaurant)
  const  auth  = useSelector(store => store.auth)
  const event = useSelector(store => store.event)
  const eventsList = event.events
  console.log("Event....",eventsList)
  useEffect(() => {
      dispatch(getAllRestaurantsAction())
      dispatch(getAllEvents())
  },[jwt])
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
      const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % eventsList.length);
      }, 3000); // Change every 3 seconds

      return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  return (
    <div className='pb-10'>
      {/* Banner */}
        <section className="banner -z-50 relative flex flex-col justify-center items-center">
            <div className="w-[50nw] z-10 text-center">
                <h1 className="text-2xl lg:text-6xl font-bold z-10 py-5">{eventsList[currentIndex]?.title}</h1>
                <p className="z-10 text-gray-300 text-xl lg:text-4xl">{eventsList[currentIndex]?.description}</p>
            </div>
            <div className="cover absolute top-0 left-0 right-0">
                <img
                    src={eventsList[currentIndex]?.image}
                    alt={eventsList[currentIndex]?.title}
                    className="object-cover w-full h-full opacity-90"
                />
            </div>
            <div className="fadout"></div>
        </section>

        {/* Menu */}
        <section className='p-10 lg:py-10 lg:px-20'>
            <p className='text-2xl font-semibold text-gray-400 py-3 pb-10'>Món ăn nổi tiếng</p>
            <MultiItemCarousel/>
        </section>

        {/* Favourited Restaurant */}
        {auth.user 
        ?
        <section className='px-5 lg:px-20 pt-10'>
          <h1 className='text-2xl font-semibold text-gray-400 pb-3'>Nhà hàng của bạn</h1>
          <div className='flex flex-wrap items-center justify-left gap-5'>
            {
              restaurant.restaurants.map((item)=><RestaurantCard item={item}/>)
            }
          </div>
        </section> 
        : <></>}

        {/* All Restaurant */}
        <section className='px-5 lg:px-20 pt-10'>
          <h1 className='text-2xl font-semibold text-gray-400 pb-3'>Nhà hàng nổi tiếng</h1>
          <div className='flex flex-wrap items-center justify-left gap-5'>
            {
              restaurant.restaurants.map((item)=><RestaurantCard item={item}/>)
            }
          </div>
        </section> 
        
    </div>
  )
}

export default Home