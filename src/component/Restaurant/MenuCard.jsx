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
        <div className="border-slate-100 border-solid mb-2 p-2 bg-pink-200 flex flex-wrap rounded-xl h-[30vh]">
            <div className="flex justify-between items-center md:w-[80%] w-[100%]">
                <Box display="flex" alignItems="center" gap={2}>
                    <img
                        className="w-[10rem] h-[10rem] object-cover rounded-xl"
                        src={item.images[0]}
                        alt={item.name}
                    />
                    <Box>
                        <p className="font-semibold text-xl">{item.name}</p>

                        <p className="text-black-500 h-[3rem] md:h-[5rem] overflow-y-hidden">{item.description}</p>
                        <p className='text-xl text-green-800 my-2'>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                        </p>
                    </Box>
                </Box>
            </div>
            <div className="flex justify-between items-center md:w-[20%] w-[100%]">
                {auth.user ? (
                    <Button sx={{width:"100%"}}
                        variant="contained"
                        disabled={!item.available}
                        onClick={handleAddItemToCart}
                    >
                        {item.available ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
                    </Button>
                ) : (
                    <Button sx={{width:"100%"}}
                        onClick={() => navigate(`/account/login`)}
                        variant="outlined"
                        disabled={false}                    >
                        Đăng nhập để đặt hàng
                    </Button>
                )}
            </div>
        </div>

    );
};

export default MenuCard;
