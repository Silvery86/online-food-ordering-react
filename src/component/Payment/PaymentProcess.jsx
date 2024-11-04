import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';
import { updateOrderStatus } from '../State/Order/Action';

export const PaymentProcess = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        // Parse the query string parameters
        const params = queryString.parse(location.search);
        console.log(params); // Log the parameters to the console
        // You can now access the parameters like so:
        const amount = params.vnp_Amount;
        const bankCode = params.vnp_BankCode;
        const orderId = params.vnp_OrderInfo;
        const responseCode = params.vnp_ResponseCode;
        const transactionNo = params.vnp_TransactionNo;
        const jwt = localStorage.getItem("jwt")
        if (responseCode == "00") {
            // Update order status to "PAID"
            dispatch(updateOrderStatus(orderId, "PAID", jwt)); // Update to "PAID"
            // Navigate to the success page
            navigate(`/payment/success/${orderId}`);
        } else {
            // Update order status to "FAILED"
            dispatch(updateOrderStatus(orderId, "FAILED" , jwt)); // Update to "FAILED"
            // Navigate to the failure page
            navigate(`/payment/failed/${orderId}`);
        }

    }, [location]);
    return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress size="3rem"/>
        </Box>
    );
};


