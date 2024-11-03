
import * as actionTypes from "./ActionType";

const initialState = {
    loading: false,
    orders: [],
    error: null,
    updateStatusLoading: false,
    updateStatusError: null,
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USERS_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case actionTypes.GET_USERS_ORDERS_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                orders: action.payload,
            };
        case actionTypes.GET_USERS_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case actionTypes.UPDATE_ORDER_STATUS_REQUEST:
            return {
                ...state,
                updateStatusLoading: true,
                updateStatusError: null,
            };
        case actionTypes.UPDATE_ORDER_STATUS_SUCCESS:
            return {
                ...state,
                updateStatusLoading: false,
                orders: state.orders.map(order =>
                    order.id === action.payload.id ? { ...order, status: action.payload.orderStatus } : order
                ),
            };
        case actionTypes.UPDATE_ORDER_STATUS_FAILURE:
            return {
                ...state,
                updateStatusLoading: false,
                updateStatusError: action.payload,
            };



        default:
            return state;
    }
};

export default orderReducer;