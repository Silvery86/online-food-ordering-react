import React from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Chip, IconButton, TableCell, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { findCart, removeCartItem, updateCartitem } from '../State/Cart/Action';
import { formatCurrency } from '../util/currencyFormat';
const TAX_RATE = 0.07;

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
    return qty * unit;
}

function createRow(desc, qty, unit) {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price };
}

function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
    createRow('Paperclips (Box)', 100, 1.15),
    createRow('Paper (Case)', 10, 45.99),
    createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

const CartItem = ({ item }) => {

    const { food, quantity, totalPrice, id } = item;
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
        <TableRow key={id}>
            <TableCell align='center' >
                <div className='flex justify-center items-center'>
                    <img
                        className="w-[8rem] h-[8rem] object-cover rounded-xl"
                        src={food.images[0]}
                        alt={food.name}
                    />
                </div>
            </TableCell>
            <TableCell align="center">{food.name}</TableCell>
            <TableCell align="center">{formatCurrency(food.price)}</TableCell>
            <TableCell align="center">
                <div className='flex justify-center items-center flex-nowrap'>
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

            </TableCell>
            <TableCell align="right">{formatCurrency(item.totalPrice)}</TableCell>
        </TableRow>


    );
}

export default CartItem;
