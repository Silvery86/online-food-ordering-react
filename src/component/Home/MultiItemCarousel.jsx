import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
  const settingsSmall = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 2,
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
        combinedMenuItems = shuffleArray(combinedMenuItems);
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
  // Shuffle function to randomize the array
  const shuffleArray = (array) => {
    let shuffledArray = [...array]; // Create a copy of the original array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
    }
    return shuffledArray;
  };
  return (
    <div>
      <div className='hidden md:block'>
        <Slider {...settings}>
          {allMenuItems.map((item) =>
            <CarouselItem key={item.name} images={item.images} title={item.name} />
          )}
        </Slider>
      </div>
      <div className='md:hidden'>
        <Slider {...settingsSmall}>
          {allMenuItems.map((item) =>
            <CarouselItem key={item.name} images={item.images} title={item.name} />
          )}
        </Slider>
      </div>
    </div>

  )
}

export default MultiItemCarousel