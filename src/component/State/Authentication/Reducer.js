import { isPresentInFavorites } from "../../config/logic";
import { ADD_TO_FAVORITE_FAILURE, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null,
    favorites: [],
    success: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        // Set loading state on request actions
        case REGISTER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case ADD_TO_FAVORITE_REQUEST:
            return { ...state, isLoading: true, error: null, success: null };

        // Success actions
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jwt: action.payload,
                success: "Đăng ký thành công!",
                error: null
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jwt: action.payload,
                success: "Đăng nhập thành công!",
                error: null
            };

        case GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                favorites: action.payload.favorites,
                success: "User data fetched successfully",
                error: null
            };

        case ADD_TO_FAVORITE_SUCCESS:
            const isFavorite = state.favorites.some(item => item.id === action.payload.id);
            return {
                ...state,
                isLoading: false,
                favorites: isFavorite
                    ? state.favorites.filter(item => item.id !== action.payload.id)  // Remove if already in favorites
                    : [action.payload, ...state.favorites],                         // Add to favorites
                success: isFavorite ? "Removed from favorites" : "Added to favorites",
                error: null
            };

        // Logout action
        case LOGOUT:
            return initialState;

        // Failure actions
        case REGISTER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,  
                success: null,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                success: null
            };
        case GET_USER_FAILURE:
        case ADD_TO_FAVORITE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                success: null
            };

        default:
            return state;
    }
};

export default authReducer;
