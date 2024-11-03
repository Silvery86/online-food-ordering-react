import { LOGOUT } from "../Authentication/ActionType";
import * as actionTypes from "./ActionType";

const initialState = {
    cart: null,
    cartItems: [],
    loading: false,
    error: null,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ITEM_TO_CART_REQUEST:
        case actionTypes.FIND_CART_REQUEST:
        case actionTypes.GET_ALL_CART_ITEMS_REQUEST:
        case actionTypes.UPDATE_CART_ITEM_REQUEST:
        case actionTypes.REMOVE_CART_ITEM_REQUEST:
        case actionTypes.CLEAR_CART_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case actionTypes.FIND_CART_SUCCESS:
        case actionTypes.CLEAR_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cart: action.payload,
                cartItems: action.payload.items,
            };
        case actionTypes.ADD_ITEM_TO_CART_SUCCESS:
            const newItem = action.payload; // Ensure this payload has the correct structure
            const existingItemIndex = state.cartItems.findIndex(item => item.foodId === newItem.foodId);

            if (existingItemIndex >= 0) {
                // If it exists, update the quantity
                const updatedCartItems = [...state.cartItems];
                // Safely update the quantity assuming it's set to 1 for this action.
                updatedCartItems[existingItemIndex].quantity += 1; // Increment by 1, as you're adding one item at a time
                return {
                    ...state,
                    loading: false,
                    cartItems: updatedCartItems,
                };
            }

            // If not found, add the new item with an initialized quantity
            return {
                ...state,
                loading: false,
                cartItems: [{ ...newItem, quantity: 1 }, ...state.cartItems],
            };

        case actionTypes.UPDATE_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: state.cartItems.map(
                    (item) => item.id === action.payload.id ? action.payload : item
                ),
            };
        case actionTypes.REMOVE_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: state.cartItems.filter(
                    (item) => item.id !== action.payload
                ),
            };
        case actionTypes.FIND_CART_FAILURE:
        case actionTypes.UPDATE_CART_ITEM_FAILURE:
        case actionTypes.REMOVE_CART_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case LOGOUT:
            localStorage.removeItem("jwt");
            return {
                ...state,
                cartItems: [],
                cart: null,
                success: "Logout success",
            };

        default:
            return state;
    }
};

export default cartReducer;