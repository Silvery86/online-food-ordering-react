import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../State/Cart/Action';
import { useNavigate } from 'react-router-dom';

const MenuCard = ({ item }) => {
    const navigate = useNavigate();
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleAddItemToCart = () => {
        const reqData = {
            token: localStorage.getItem("jwt"),
            cartItem: {
                foodId: item.id,
                quantity: 1,
                ingredients: selectedIngredients,
            }
        }
        dispatch(addItemToCart(reqData));
    };

    const handleCheckBoxChange = (itemName) => {
        if (selectedIngredients.includes(itemName)) {
            setSelectedIngredients(selectedIngredients.filter((item) => item !== itemName));
        } else {
            setSelectedIngredients([...selectedIngredients, itemName]);
        }
    };

    return (
        <Box sx={{ border: '1px solid #ddd', borderRadius: 2, mb: 2, p: 2, backgroundColor: '#c2a8a8', display:"flex" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ width: '80%' }}>
                <Box display="flex" alignItems="center" gap={2}>
                    <img
                        className="w-[10rem] h-[10rem] object-cover rounded-xl"
                        src={item.images[0]}
                        alt={item.name}
                    />
                    <Box>
                        <p className="font-semibold text-xl">{item.name}</p>
                       
                        <p className="text-black-500">{item.description}</p>
                        <p className='text-xl text-green-800 my-2'> 
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                        </p>
                    </Box>
                </Box>
            </Box>
            <Box display="flex" justifyContent="end" sx={{ width: '20%', padding: "4rem 0.5rem" }}>
                {auth.user ? (
                    <Button
                        variant="contained"
                        disabled={!item.available}
                        onClick={handleAddItemToCart}
                    >
                        {item.available ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
                    </Button>
                ) : (
                    <Button
                        onClick={() => navigate(`/account/login`)}
                        variant="contained"
                        disabled={true}                    >
                        Đăng nhập để đặt hàng
                    </Button>
                )}
            </Box>
        </Box>

    );
};

export default MenuCard;
