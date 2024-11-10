import { Card, Chip, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite } from '../State/Authentication/Action';
import { isPresentInFavorites } from '../config/logic';
import { getRestaurantById } from '../State/Restaurant/Action';

const FavouriteRestaurant = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const auth = useSelector(store => store.auth);
    const handleAddToFavorite = () => {
        dispatch(addToFavorite({ jwt, restaurantId: item.id }))
    }
    const handleNavigateToRestaurant = () => {
        if (favoritesRestaurant.open) {
            navigate(`/restaurant/${favoritesRestaurant.id}`)
        }
    }
    const [favoritesRestaurant, setFavoritesRestaurant] = useState(null);
    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const restaurantId = item.id;
                const res = await dispatch(getRestaurantById({ restaurantId })); // Dispatch action and await response
                console.log("Restaurant Id:", res); // Log the returned data
                setFavoritesRestaurant(res); // Set state with the response
            } catch (error) {
                console.error("Failed to fetch restaurant data:", error);
            }
        };

        fetchRestaurant();
    }, [dispatch, item]);

    if (!favoritesRestaurant) {
        return <div>Loading...</div>; // Show loading state while fetching
    }
    return (
        <Card className='w-[45%] h-[50vh] md:w-[30%] md:h-[60vh]'>
            <div className={`${favoritesRestaurant.open ? 'cursor-pointer' : 'cursor-not-allowed'} relative`} >
                <img className="w-full h-[10rem] rounded-t-md object-cover"
                    src={item.images[0]} alt='' />
                <Chip size='small' className='absolute top-2 left-2' color={favoritesRestaurant.open ? "success" : "error"} label={favoritesRestaurant.open ? "Mở cửa" : "Đóng cửa"} />
                {auth.user
                    ?
                    <div className='absolute top-2 right-2'>
                        <IconButton onClick={handleAddToFavorite}>
                            {isPresentInFavorites(auth.favorites, favoritesRestaurant) ? <FavoriteIcon color="success" /> : <FavoriteBorderIcon color='white'/>}
                        </IconButton>
                    </div>
                    : <></>}
            </div>
            <div className='p-4 textPart lg:flex w-full justify-between'>
                <div className='space-y-1'>
                    <p onClick={handleNavigateToRestaurant} className='font-semibold text-lg cursor-pointer'>{favoritesRestaurant.name}</p>
                    <p className='text-gray-500 text-sm'>
                        {favoritesRestaurant.description}
                    </p>
                </div>


            </div>
        </Card>


    )
}

export default FavouriteRestaurant
