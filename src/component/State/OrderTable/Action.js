// actions.js
import { api } from "../../config/api"
import * as actionTypes from './ActionType';

// Fetch all table orders
export const fetchTableOrders = (token) => async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_TABLE_ORDERS_REQUEST });
    try {
        const response = await api.get('/api/public/table-orders', {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: actionTypes.FETCH_TABLE_ORDERS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: actionTypes.FETCH_TABLE_ORDERS_FAILURE, payload: error.message });
    }
};

// Fetch a table order by ID
export const fetchTableOrderById = (id, token) => async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_TABLE_ORDER_BY_ID_REQUEST });
    try {
        const response = await api.get(`/api/public/table-orders/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: actionTypes.FETCH_TABLE_ORDER_BY_ID_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: actionTypes.FETCH_TABLE_ORDER_BY_ID_FAILURE, payload: error.message });
    }
};

// Create a table order
export const createTableOrder = (orderData, token) => async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_TABLE_ORDER_REQUEST });
    try {
        const response = await api.post('/api/public/table-orders', orderData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: actionTypes.CREATE_TABLE_ORDER_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: actionTypes.CREATE_TABLE_ORDER_FAILURE, payload: error.message });
    }
};

// Update a table order by ID
export const updateTableOrder = (id, orderData, token) => async (dispatch) => {
    dispatch({ type: actionTypes.UPDATE_TABLE_ORDER_REQUEST });
    try {
        const response = await api.put(`/api/public/table-orders/${id}`, orderData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: actionTypes.UPDATE_TABLE_ORDER_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: actionTypes.UPDATE_TABLE_ORDER_FAILURE, payload: error.message });
    }
};

// Delete a table order by ID
export const deleteTableOrder = (id, token) => async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_TABLE_ORDER_REQUEST });
    try {
        await api.delete(`/api/public/table-orders/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: actionTypes.DELETE_TABLE_ORDER_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: actionTypes.DELETE_TABLE_ORDER_FAILURE, payload: error.message });
    }
};

// Fetch table orders by user ID
export const fetchTableOrdersByUserId = (userId, token) => async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_TABLE_ORDERS_BY_USER_ID_REQUEST });
    try {
        const response = await api.get(`/api/public/table-orders/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: actionTypes.FETCH_TABLE_ORDERS_BY_USER_ID_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: actionTypes.FETCH_TABLE_ORDERS_BY_USER_ID_FAILURE, payload: error.message });
    }
};

// Fetch table orders by restaurant ID
export const fetchTableOrdersByRestaurantId = (restaurantId, token) => async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_TABLE_ORDERS_BY_RESTAURANT_ID_REQUEST });
    try {
        const response = await api.get(`/api/public/table-orders/restaurant/${restaurantId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: actionTypes.FETCH_TABLE_ORDERS_BY_RESTAURANT_ID_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: actionTypes.FETCH_TABLE_ORDERS_BY_RESTAURANT_ID_FAILURE, payload: error.message });
    }
};
