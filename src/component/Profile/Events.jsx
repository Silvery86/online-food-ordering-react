import React, { useEffect } from 'react'
import { EventCard } from './EventCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEvents } from '../State/Event/Action';
import { isEmptyArray } from 'formik';


const Events = () => {
  const dispatch = useDispatch();
  const event = useSelector(store => store.event)
  const eventsList = event.events
  useEffect(() => {
    dispatch(getAllEvents())
  }, [])
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
  console.log("Event....", eventsList)
  return (
    
    <div className='mt-5 px-5 flex flex-wrap gap-5 justify-start items-center'>
      {
        !isEmptyArray(eventsList)
          ?          
          eventsList.map((item) => <EventCard />)          
          :
          <h1 className='w-full text-center text-xl'>Not have any event yet</h1>

      }
    </div>
  )
}

export default Events