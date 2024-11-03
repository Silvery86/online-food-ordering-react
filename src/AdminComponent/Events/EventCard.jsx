import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

export const EventCard = ({event}) => {
   
    return (
        <div>
            <Card sx={{ width: "100%" }}>
                <CardMedia
                component="img"
                    sx={{ height: "50vh" }}
                    src={event.image}
                />
                <CardContent>
                    <Typography variant='h5' sx={{ textAlign: "center" }}>
                        {event.title}
                    </Typography>
                    <Typography variant='body2' sx={{ textAlign: "center" }}>
                        {event.description}
                    </Typography>
                    <div className='py-2 space-y-2'>
                        <p>{event.location[0] == "ha_noi" ? "TP.Hà Nội" : ""}</p>
                        <p className='text-sm text-blue-500'>Từ: {event.startAt}</p>
                        <p className='text-sm text-red-500'>Đến:{event.endAt}</p>

                    </div>
                </CardContent>
                {false && <CardActions>
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </CardActions>}
            </Card>
        </div>
    )
}
