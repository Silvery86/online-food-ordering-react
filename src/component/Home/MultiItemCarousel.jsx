import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { topMeal } from './topMeal';
import { CarouselItem } from './CarouselItem';
import Slider from 'react-slick';


function MultiItemCarousel() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed:3000,
        arrows:false,
        
      };
  return (
    <div>
        <Slider {...settings}>
            {topMeal.map((item) => 
            <CarouselItem key={item.title} image={item.image} title={item.title}/>
            )}
        </Slider>
    </div>
  )
}

export default MultiItemCarousel