import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getEventById } from '../State/Event/Action';
import { Button, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';

export const EventDetails = () => {
    const theme = useTheme()
    const { id } = useParams();
    const dispatch = useDispatch();
    const event = useSelector(state => state.event)
    console.log("Event Details", event)
    useEffect(() => {
        dispatch(getEventById(id))
    }, [dispatch])
    const eventDetail = event.selectedEvent || {};
    return (
        <div className="container mx-auto px-4 py-10">
            <Typography style={{color : theme.palette.primary.main}} variant="h4" className="text-center mb-10 font-bold">
                {eventDetail.details?.header || "Event Title"}
            </Typography>
            {eventDetail.image && (
                <img
                    src={eventDetail.image}
                    alt={eventDetail.details?.header || "Event Image"}
                    className="w-full h-auto rounded-lg mb-6 shadow-md"
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
        </div>
    )
}
