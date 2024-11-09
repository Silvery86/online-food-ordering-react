import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { topMeal } from './topMeal';
import { CarouselItem } from './CarouselItem';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurantsAction } from '../State/Restaurant/Action';
import { getMenuItemsByRestaurantId } from '../State/Menu/Action';


function MultiItemCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,

  };
  const jwt = localStorage.getItem("jwt");
  const restaurant = useSelector(state => state.restaurant)
  const restaurantList = restaurant.restaurants || []
  const dispatch = useDispatch()
  const [allMenuItems, setAllMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchAllMenuItems = async () => {
      try {
        let combinedMenuItems = [];
        // Iterate over each restaurant and fetch menu items
        for (const restaurant of restaurantList) {
          const menuItems = await dispatch(getMenuItemsByRestaurantId({
            jwt,
            restaurantId: restaurant.id,
          }));
          // Combine the results into a single array
          combinedMenuItems = combinedMenuItems.concat(menuItems);
        }
        // Join all menu items into a single list
        setAllMenuItems(combinedMenuItems);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    if (restaurantList.length > 0) {
      fetchAllMenuItems();
    }
  }, [dispatch, restaurantList, jwt]);
  return (
    <div>
      <Slider {...settings}>
        {allMenuItems.map((item) =>
          <CarouselItem key={item.name} images={item.images} title={item.name} />
        )}
      </Slider>
    </div>
  )
}

export default MultiItemCarousel