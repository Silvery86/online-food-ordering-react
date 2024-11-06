import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getEventById } from '../State/Event/Action';
import { Button, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import Slider from 'react-slick';

export const EventDetails = () => {
    const theme = useTheme()
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const event = useSelector(state => state.event)
    const eventsList = event.events
    useEffect(() => {
        dispatch(getEventById(id))
    }, [dispatch])
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };
    const handleEventNavigate = (id) => {
        navigate(`/events/event/${id}`);
    };
    const eventDetail = event.selectedEvent || {};
    return (
        <div className=" mx-auto px-10 py-10">
            <Typography style={{ color: theme.palette.primary.main }} variant="h4" className="text-center mb-10 font-bold">
                {eventDetail.details?.header || "Event Title"}
            </Typography>
            {eventDetail.image && (
                <img
                    src={eventDetail.image}
                    alt={eventDetail.details?.header || "Event Image"}
                    className="w-full h-[50vh] h-auto rounded-lg mb-6 shadow-md"
                />
            )}
            <div
                className="event-content prose lg:prose-lg mx-auto"
                dangerouslySetInnerHTML={{ __html: eventDetail.details?.content || "<p>No content available</p>" }}
            />
            {/* <div className="text-center mt-8">
                <Button variant="contained" color="primary" className="px-6 py-2">
                    Tham Gia Sự Kiện
                </Button>
            </div> */}
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
        </div>
    )
}
