import React from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Chip, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { findCart, removeCartItem, updateCartitem } from '../State/Cart/Action';
import { formatCurrency } from '../util/currencyFormat';

const CartItem = ({ item }) => {
    
    const { food, quantity, totalPrice, id, ingredients } = item;
    const auth = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const handleUpdateCartItem = async (value) => {
        // Calculate the new quantity
        const newQuantity = quantity + value;

        // If the quantity would go below 1, remove the item instead
        if (newQuantity < 1) {
            handleRemoveCartItem();
            window.location.reload();
        }

        // Dispatch the update cart item action
        const data = {
            cartItemId: item.id,
            quantity: newQuantity
        };
        await dispatch(updateCartitem({ data, jwt }));

        // Refresh the cart after the update
        dispatch(findCart(jwt));
    };

    const handleRemoveCartItem = async () => {
        await dispatch(removeCartItem({
            cartItemId: item.id,
            jwt: auth.jwt || jwt
        }));     
      
    };

    return (
        <div className='px-5'>
            <div className='lg:flex items-center lg:space-x-5'>
                <div>
                    <img className='w-[5rem] h-[5rem] object-cover' src={food.images[0]} alt={food.name} />
                </div>
                <div className='flex items-center justify-between lg:w-[70%]'>
                    <div className='space-y-1 lg:space-y-3 w-full'>
                        <p>{food.name}</p>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center space-x-1'>
                                <IconButton onClick={() => handleUpdateCartItem(-1)}>
                                    <RemoveCircleOutlineIcon />
                                </IconButton>
                                <div className='w-5 h-5 text-xs flex items-center justify-center'>
                                    {quantity}
                                </div>
                                <IconButton onClick={() => handleUpdateCartItem(1)}>
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    <p>{formatCurrency(totalPrice)}</p>
                </div>
            </div>
            {ingredients.length > 0 && (
                <div className='pt-3 space-x-2'>
                    {ingredients.map((ingredient, index) => (
                        <Chip key={index} label={ingredient} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CartItem;
