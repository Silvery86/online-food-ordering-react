
import * as actionTypes from "./ActionType";

const initialState = {
    loading: false,
    order: [],
    error: null,

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


        default:
            return state;
    }
};

export default orderReducer;