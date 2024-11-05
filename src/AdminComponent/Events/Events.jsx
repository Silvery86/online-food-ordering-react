
import { Box, Button, Grid, Modal, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { hasFormSubmit } from '@testing-library/user-event/dist/utils';
import { useNavigate } from 'react-router-dom';
import { EventCard } from './EventCard';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantEvents } from '../../component/State/Restaurant/Action';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const initialValue = {
  image: "",
  location: "",
  name: "",
  startAt: null,
  endAt: null
}
export const Events = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const restaurant = useSelector(state => state.restaurant)
  const jwt = localStorage.getItem("jwt")
  const [eventsLoaded, setEventsLoaded] = useState(false);

  useEffect(() => {
    if (restaurant.usersRestaurant?.id && jwt && !eventsLoaded) {
      dispatch(getRestaurantEvents({ restaurantId: restaurant.usersRestaurant.id, jwt }));
      setEventsLoaded(true); // Set flag to true after events are fetched
    }
 
  }, [restaurant.usersRestaurant?.id, jwt, eventsLoaded, dispatch]);

  const restaurantEventList = restaurant.restaurantsEvents;

  console.log("Restaurant.....", restaurantEventList);


  return (
    <div>
      <div className='p-5'>
        <Button onClick={() => navigate(`/admin/restaurant/add-event`)} variant='contained'>
          Tạo sự kiện
        </Button>
        <Grid container spacing={2} className='pt-5'>

          {restaurantEventList.map((event) =>
            <Grid item sx={12} lg={12}>
              <EventCard event={event}/>
            </Grid>
          )}
        </Grid>

      </div>
    </div>
  )
}
