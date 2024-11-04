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
        if (item.open) {
            navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`)
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
        <Card className='w-[18rem]'>
            <div className={`${true ? 'cursor-pointer' : 'cursor-not-allowed'} relative`} >
                <img className="w-full h-[10rem] rounded-t-md object-cover"
                    src={favoritesRestaurant.images[0]} alt='' />
                <Chip size='small' className='absolute top-2 left-2' color={favoritesRestaurant.open ? "success" : "error"} label={favoritesRestaurant.open ? "Mở cửa" : "Đóng cửa"} />
            </div>

            <div className='p-4 textPart lg:flex w-full justify-between'>
                <div className='space-y-1'>
                    <p onClick={handleNavigateToRestaurant} className='font-semibold text-lg cursor-pointer'>{favoritesRestaurant.name}</p>
                    <p className='text-gray-500 text-sm'>
                        {favoritesRestaurant.description}
                    </p>
                </div>
                {auth.user
                    ?
                    <div>
                        <IconButton onClick={handleAddToFavorite}>
                            {isPresentInFavorites(auth.favorites, favoritesRestaurant) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                    </div>
                    : <></>}

            </div>
        </Card>


    )
}

export default FavouriteRestaurant
