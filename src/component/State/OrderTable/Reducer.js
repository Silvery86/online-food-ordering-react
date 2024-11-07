// reducer.js

import * as actionTypes from './ActionType';

const initialState = {
    tableOrders: [],
    tableOrder: null,
    loading: false,
    error: null,
};

const tableOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TABLE_ORDERS_REQUEST:
        case actionTypes.FETCH_TABLE_ORDER_BY_ID_REQUEST:
        case actionTypes.CREATE_TABLE_ORDER_REQUEST:
        case actionTypes.UPDATE_TABLE_ORDER_REQUEST:
        case actionTypes.DELETE_TABLE_ORDER_REQUEST:
        case actionTypes.FETCH_TABLE_ORDERS_BY_USER_ID_REQUEST:
        case actionTypes.FETCH_TABLE_ORDERS_BY_RESTAURANT_ID_REQUEST:
            return { ...state, loading: true, error: null };
        case actionTypes.UPDATE_ORDER_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case actionTypes.UPDATE_ORDER_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                tableOrders: state.tableOrders.map(order =>
                    order.id === action.payload.id ? { ...order, status: action.payload.orderStatus } : order
                ),
            };

        case actionTypes.FETCH_TABLE_ORDERS_SUCCESS:
            return { ...state, loading: false, tableOrders: action.payload };

        case actionTypes.FETCH_TABLE_ORDER_BY_ID_SUCCESS:
            return { ...state, loading: false, tableOrder: action.payload };

        case actionTypes.CREATE_TABLE_ORDER_SUCCESS:
            return { ...state, loading: false, tableOrders: [...state.tableOrders, action.payload] };

        case actionTypes.UPDATE_TABLE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                tableOrders: state.tableOrders.map(order =>
                    order.id === action.payload.id ? action.payload : order
                ),
            };

        case actionTypes.DELETE_TABLE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                tableOrders: state.tableOrders.filter(order => order.id !== action.payload),
            };

        case actionTypes.FETCH_TABLE_ORDERS_BY_USER_ID_SUCCESS:
        case actionTypes.FETCH_TABLE_ORDERS_BY_RESTAURANT_ID_SUCCESS:
            return { ...state, loading: false, tableOrders: action.payload };
        case actionTypes.UPDATE_ORDER_STATUS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case actionTypes.FETCH_TABLE_ORDERS_FAILURE:
        case actionTypes.FETCH_TABLE_ORDER_BY_ID_FAILURE:
        case actionTypes.CREATE_TABLE_ORDER_FAILURE:
        case actionTypes.UPDATE_TABLE_ORDER_FAILURE:
        case actionTypes.DELETE_TABLE_ORDER_FAILURE:
        case actionTypes.FETCH_TABLE_ORDERS_BY_USER_ID_FAILURE:
        case actionTypes.FETCH_TABLE_ORDERS_BY_RESTAURANT_ID_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default tableOrderReducer;
